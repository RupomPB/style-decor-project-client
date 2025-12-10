import React, { useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './../../Firebase/firebase.init';


const googleProvider =new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true)

    // new user create
    const createUser =( email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
 
    // sign in user
    const signInUser =(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign in with google
    const signInWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

// user logout
const logoutUser =()=>{
    return signOut(auth);
}

    // update userinfo
    const updataUserProfile =(profile)=>{
        return updateProfile(auth.currentUser, profile)
    }

    // observer
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
            console.log(currentUser)
        })

        return ()=>{
            unsubscribe()
        }

    },[ ])




    const authInfo ={
        createUser,
        signInWithGoogle,
        signInUser,
        logoutUser,
        updataUserProfile,
        user,
        loading,
        setUser,


    }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
