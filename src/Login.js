import React from 'react';
import {firebase} from './Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from 'react-bootstrap';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const SignInWithGoogle= ()=>{

    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const name = user.displayName;
        const email = user.emailVerified;
        if(user.metadata.lastSignInTime === user.metadata.creationTime){
            console.log("AAAAAAAAAAAAAAAAA");
        }else{
            console.log(user.metadata.lastSignInTime);
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });

}

    const Login = () => {

    
    
    return ( <Button variant="primary" type="submit" onClick={SignInWithGoogle}> Iniciar sesión </Button>  );
}

export default Login;