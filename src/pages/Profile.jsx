import React from 'react';
import {getAuth} from 'firebase/auth'


function Profile() {
  const auth=getAuth()
  // const [user,setUser]=useState(null)
  // React.useEffect=(()=>{
  //    console.log(auth.currentUser)
  //   },[]) 
  return ( <div>
    <h1>Profile</h1>
  </div>)
}

export default Profile