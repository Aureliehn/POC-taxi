export default class LocationService{

    static addLocation(location){
        console.log("service", location)
        return fetch(`http://localhost:3004/locations`,{
            method: 'POST',
            body: JSON.stringify(location),
            headers: {'Content-Type':'application/json'},
        })
        .then(response =>response.json())
    }
}
