import React from 'react';
import {firebase} from './Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, getAdditionalUserInfo } from "firebase/auth";
import { Button } from 'react-bootstrap';
import {useGlobalState} from 'state-pool';
import { useHistory } from "react-router-dom";
import { useState } from 'react';


const Login = () => {
    const [usuario, setUsuario] = useGlobalState("user");
    const [token, setToken] = useGlobalState("token");
    const history = useHistory();
    const [error, setError] = useState(null);

    const cargarCrearUsuario= (token, nombre, isNew)=>{

        fetch('https://flaskhalfwayhome.herokuapp.com/loginUsuario', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({"nombre":nombre})
        })
        .then(res => {
            if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
            }
        
            return res.json();
        })
        .then(data => {
            setToken(token);
            setUsuario(data);
            
            if(isNew){
                history.push("/editPerfil");
            }else{
                history.push("/listarViajes");
            }

            
            
        })
        .catch(err => {
            setError(err.name);
        })

    }

    const SignInWithGoogle= ()=>{
    
    
        let auth = getAuth();
        let provider = new GoogleAuthProvider();
    
        if(auth.currentUser){
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
            });
        }
        
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const user = result.user;
            const name = user.displayName;
            const isNew = getAdditionalUserInfo(result).isNewUser;

            auth.currentUser.getIdToken()
            .then(data => {
            
                cargarCrearUsuario(data,name, isNew)
                
                
            })

            
            
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

            setError(errorMessage);
        });
    
    }

    return ( 
        <div>
            <Button variant="primary" type="submit" onClick={SignInWithGoogle}> Iniciar sesión </Button> 
            { error && <div>{ error }</div> }
        </div>
    );
}

export default Login;