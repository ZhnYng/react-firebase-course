import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"
import React from 'react'

export default function Auth() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSignIn = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err){
      console.error(err)
    }
  };

  const handleSignInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, googleProvider);
    } catch (err){
      console.error(err)
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth, googleProvider)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col max-w-md">
      <input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}
