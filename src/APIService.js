export default class APIService{
    
    // Inserta un usuario
    static InsertUsuario(body){
        return fetch("http://localhost:5000/usuarios",{
            "method":"POST",
            headers : { "Content-Type":"application/json" },
            body:JSON.stringify(body)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

}