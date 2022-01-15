import React from 'react';
import {firebase} from './Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, getAdditionalUserInfo } from "firebase/auth";
import { Button } from 'react-bootstrap';
import {useGlobalState} from 'state-pool';
import { useHistory } from "react-router-dom";
import { useState } from 'react';


const Login = () => {
    const [usuario, setUsuario] = useGlobalState("user");
    const history = useHistory();
    const [error, setError] = useState(null);

    const crearUsuario = (id, name)=>{
        const body = {"nombre":name, "edad": 18, "ubicacion": "Desconocida", "descripcion":""};

        fetch('http://localhost:5000/usuarios/'+id, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((res) => {
            if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();

        }).then((data)=>{
            
            data["id"] = id;

            setUsuario(data);
            history.push("/editPerfil");

        })
        .catch(err => {
            setError(err.name);
        })
    }

    const cargarUsuario= (id)=>{

        fetch("http://localhost:5000/usuarios/"+id)
        .then(res => {
            if (!res.ok) { // error coming back from server
              throw Error('could not fetch the data for that resource');
            }
           
            return res.json();
        })
        .then(data => {
            
            data["id"] = id;

            setUsuario(data);
            history.push("/listarViajes");
            
            
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
            const token = credential.accessToken;
            
            const user = result.user;
            
            const name = user.displayName;
            
            const id = user.uid;
            const isNew = getAdditionalUserInfo(result).isNewUser;
            
            if(isNew){
                console.log("Soy nuevo");
                crearUsuario(id,name);
            }else{
                console.log("Soy viejo");
                cargarUsuario(id);
            }
            
            
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