import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import OAuth from '../components/OAuth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'

function SignIn() {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    email:'',
    password: ''
  })
  const {email,password}=formData

  const navigate=useNavigate()
  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))

  }

  const onSubmit=async (e)=>{
    e.preventDefault()
    try {
          const auth=getAuth()

    const userCredential=await signInWithEmailAndPassword(auth,email,password)

    if(userCredential.user){
      navigate('/')
    }
      
    } catch (error) {
      toast.error('Wrong Credentials')
      
    }
  } 

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Wellcome Back!</p>
      </header>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange}/>
        
        <div className="passwordInputDiv">
          <input type={showPassword?'text':'password'} className='passwordInput' placeholder="Password" id='password' value={password} onChange={onChange} />
          <img className="showPassword" src={visibilityIcon} alt='show password' onClick={()=>setShowPassword((prevState)=>!prevState)}/>
        </div>
      </form> 
      <div className="signInBar"> 
        <p className="signInText">
          Sign In
        </p>
        <button className="signInButton">
          <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
        </button>
        <Link to='/forgot-password' className='forgotPasswordLink'> Forgot Password</Link> 
      </div>
      <OAuth /> 
      <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
    </div>
  )
}

export default SignIn