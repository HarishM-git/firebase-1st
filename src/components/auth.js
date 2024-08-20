import {auth,gAuth} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth'
import {useState} from 'react'
export const Auth =()=>{
  const [email, setEmail] = useState()
  const [Pass, setPass] = useState()

  console.log(auth?.currentUser?.email);
  
  const signIn = async ()=>{
    try{
      await createUserWithEmailAndPassword(auth,email,Pass)
    }
    catch(e){
      console.log(e);
      console.error(e)
      
    }
  }
  const signInGoogle = async ()=>{
    try{
      await signInWithPopup(auth,gAuth)
    }
    catch(e){
      console.log(e);
      console.error(e)
      
    }
  }
  const signOUT = async ()=>{
    try{
      await signOut(auth)
      console.log('signed OUT')
    }
    catch(e){
      console.log(e);
      console.error(e)
      
    }
  }
   return(
    <div>
      <input type="email" placeholder="enter your email" onChange={(e)=>{
        setEmail(e.target.value)
      }}/>
      <input type="password" placeholder="enter your Pass" onChange={(e)=>{
        setPass(e.target.value)
      }}/>
      <button onClick={signIn}>Sign in</button>
      <button onClick={signInGoogle}>Sign in with GOOGLE</button>
      <button onClick={signOUT}>Sign OUT</button>
    </div>
   )
}