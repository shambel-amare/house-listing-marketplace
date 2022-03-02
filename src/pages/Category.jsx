import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'


function Category() {

  const [listings,setListings] = useState(null)
  const [loading,setLoading] = useState(true)

  const params = useParams()

  useEffect(()=>{
    const fetchListings= async()=>{
      try {
        //get a reference
        const listingsRef=collection(db,'listings')

        //create a auery

        const q = query(listingsRef,where('type','==',params.categoryName),orderBy('timestamp','desc'),limit(10))

        //Excute query
        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch data')
      }
    }
    fetchListings()
  },[params.categoryName])

  return (
    <div className='catagory'>
      <header>
        <p className="pageHeader">
          {params.categoryName==='rent'? 'places for rent':'places for sale'}
        </p>
      </header>
      {loading ? <Spinner/> : listings && listings.length > 0 ? <> 
      <main>
        <ul className="categoryListings">{listings.map((listing)=>{
          <h3 key={listing.id}>{listing.data.name}</h3>
        })}</ul>
      </main>
      </>: <p>No Listing for {params.categoryName} </p> }
    </div>
  )
}

export default Category