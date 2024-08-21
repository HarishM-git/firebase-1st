// Auth.js
import { auth, gAuth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
// import '../Auth.css'; // Import the CSS file

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [Pass, setPass] = useState('');

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, Pass);
      alert("sucessfully SIGNED IN")

    } catch (e) {
      alert("Some thing went wrong try AGAIN")
      console.error(e);
    }
  };

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, gAuth);
      alert("sucessfully SIGNED IN")
    } catch (e) {
      alert("Some thing went wrong try AGAIN")

      console.error(e);
    }
  };

  const signOUT = async () => {
    try {
      await signOut(auth);
      console.log('signed OUT');
      alert("sucessfully SIGNED OUT")
    } catch (e) {
      console.error(e);
      alert("Some thing went wrong try AGAIN")
    }
  };

  return (
    <div className="Auth">
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button className="sign-in" onClick={signIn}>Sign In</button>
      <button className="google-sign-in" onClick={signInGoogle}>Sign In with Google</button>
      <button className="sign-out" onClick={signOUT}>Sign Out</button>
    </div>
  );
};
