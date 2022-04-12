import {useState, useEffect,useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {db} from '../firebase.config'
import {v4 as uuidv4} from 'uuid'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'


function CreateListing() {
    const [loading,setLoading]=useState(false)
    const [geolocationEnabled, setGeolocationEnabled] = useState(false)
    const [formData, setFormData]=useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedprice: 0,
        images: {},
        latitude:0,
        longitude:0,

    })

    const {type,name,bedrooms,bathrooms,parking,furnished,address,offer,regularPrice,discountedPrice,images,latitude,longitude}=formData
    const auth=getAuth()
    const navigate=useNavigate()
    const isMounted=useRef(true)

    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,(user) =>{
                if(user){
                    setFormData({...formData,userRef: user.uid})
                }else{
                    navigate('/sign-in')
                }
            })
        }

        return ()=> {
            isMounted.current=false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isMounted])
    const onSubmit= async (e)=>{
  
      e.preventDefault()

      setLoading(true)

      if(discountedPrice >= regularPrice){
        setLoading(false)
        toast.error('Discount price should be less than regular price!')
        return
      }
      if (images.length > 6){
        setLoading(false)
        toast.error('MAXIMUM 6 IMAGES')
        return
      }
      let geolocation = {}
      let location

      if (geolocationEnabled){
        //setup geolocation from google geocode API
        const response = await fetch(/*geocode Api with address= {address} key = geocodeapi key */)
        const data = await response.json()

        //the above gives results array with a single object that have a geometry object that has location as latitude and longtiude
        // it also gives an addres field that has a fullformated address data which is location name

        
        geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
        geolocation.lng = data.results[0]?.geometry.location.lng ?? 0

        location = data.status ==='ZERO_RESULTS ' ? undefined : data.results[0]?.formated_address

        
       if (location === undefined || location.includes('undefined')){
         setLoading(false)
         toast.error('please enter a correct address')
         return
       }
      }

      else {

        geolocation.lat = latitude
        geolocation.lng = longitude
        
      }

      //Store images in the firebase
      const storeImage = async (image)=>{

        return new Promise ((resolve,reject)=>{
          const storage = getStorage()
          const fileName=`${auth.currentUser.uid}-${image.name}-${uuidv4()}`
          //create storage reference
          const storageRef = ref(storage, 'images/'+ fileName)
          //create upload task
          const uploadTask = uploadBytesResumable(storageRef,image)

          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on('state_changed',
          (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      }, 
      (error) => {
        reject(error)
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          default:
            break;
          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    )
    })
      }
      const imgUrls = await Promise.all(
        [...images].map((image)=> storeImage(image))
        ).catch(()=>{
          setLoading(false)
          toast.error('Image can not be uploaded')
          return
        })
      
        const formDataCopy = {
          ...formData,
          imgUrls,
          geolocation,
          timestamp: serverTimestamp(),
        }
//we dont want the images because we need the imgurl and we already have them in imgUrls function
//we also dont want the address we get location from input or from formatted address from geolocation
      formDataCopy.location=address;
      delete formDataCopy.images;
      delete formDataCopy.address;
        
        !formDataCopy.offer && delete formDataCopy.discountedprice

        const docRef = await addDoc(collection(db,'listings'), formDataCopy)

      setLoading(false)
      toast.success('Listing Saved!')
      navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }
    const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='profile'>
        <header> 
            <p className='pageHeader' >Create a Listing</p>
        </header>
        <main>
            <form onSubmit={onSubmit}>
                <label className='formLabel'>Sell / Rent</label>
                <div className="formButtons">
                    <button type='button' className={type==='sale' ? 'formButtonActive' : 'formButton' } id='type' value='sale' onClick={onMutate}>
                        Sell
                    </button>
                    <button type='button' className={type==='rent' ? 'formButtonActive' : 'formButton' } id='type' value='rent' onClick={onMutate}>
                        Rent 
                    </button>
                </div>
                <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name ?? ""}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />

          <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Bedrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bedrooms'
                value={bedrooms }
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Bathrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
          </div>

          <label className='formLabel'>Parking spot</label>
          <div className='formButtons'>
            <button
              className={parking ? 'formButtonActive' : 'formButton'}
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Furnished</label>
          <div className='formButtons'>
            <button
              className={furnished ? 'formButtonActive' : 'formButton'}
              type='button'
              id='furnished'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address ?? ""}
            onChange={onMutate}
            required
          />

          {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className='formLabel'>Offer</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}

          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Create Listing
          </button>
            </form>
        </main>
    </div>
  )
}

export default CreateListing