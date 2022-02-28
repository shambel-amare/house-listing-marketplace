import {useState} from 'react'
import {Link,useNavigate,UseNavigate, useNavigationType} from 'react-router-dom'
import {ReactComponent as ArroeRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPassword,setShowpassword]=useState(false)
  const [formData,setFormData]=useState({
    email:'',
    password: ''
  })
  const {email,password}=formData

  const navigate=useNavigate()

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Wellcome Back!</p>
      </header>

    </div>
  )
}

export default SignIn