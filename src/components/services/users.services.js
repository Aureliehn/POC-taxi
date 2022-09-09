export default class UsersService{

    static addUser(user){
        console.log("service", user)
        return fetch(`http://localhost:3001/users`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type':'application/json'},
        })
        .then(response =>response.json())
    }
}