import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import LocationService from "../services/locations.service";


const Map = (props) => {
    
    // data user 
    const {pseudo, email} = props.userData;

    // init map
    const mapRef = useRef();
    const initialCenter = {
        lat: 45.76,
        lng: 4.83
    }
    const zoom = 12;

    const initialMarkers = [];
    const [markers, setMarkers] = useState(initialMarkers);
    const markerClicked = (marker, index) => {   
        console.log(marker.position.lat, marker.position.lng) 
    }

    const markerDragEnd = (event, index) => {
        console.log(event.lat, event.lng)
    } 

    const MarkerContent = (props) => {
        const markerRef = useRef();
        const { position, draggable, onMarkerClick, onDragEnd } = props;  
        
        return <Marker
                    position={position}
                    draggable={draggable}
                    eventHandlers={{
                        click: event => onMarkerClick(event),
                        dragend: () => onDragEnd(markerRef.current.getLatLng())
                    }}
                    ref={markerRef}
                >
                    <Popup>
                        <b>{position.lat}, {position.lng}</b>
                    </Popup>
                </Marker>
    }

    // data map
    const itinerary ={
        departure: "",
        finish:""
    }

    const [dataItinerary, setDataItinerary] = useState(itinerary)

    const {departure, finish} = dataItinerary

    // form

    const handleChange = e => {
        e.preventDefault()
        setDataItinerary({...dataItinerary, [e.target.id]: e.target.value});
        return setTimeout(() => {
        fetch(`https://nominatim.openstreetmap.org/search/?format=json&addressdetails=1&q=${e.target.value}`)
        .then((response)=>response.json())
        .then((data)=>{
                    if(data[0].lat){
                        const marker = {
                            position:{
                                lat: data[0].lat,
                                lng: data[0].lon
                            },
                            draggable: true
                        }
                    initialMarkers.push(marker, ...markers)
                    setMarkers(initialMarkers)
                    mapRef.current.flyTo(marker.position,13)
                    }
                })
                .catch(e =>{console.log(e)})
            }, 2000)
        }
        
    

    const handleSubmit=(e)=>{
        console.log('form')
        e.preventDefault();
        const locations = [departure, finish, pseudo, email]
        LocationService.addLocation(locations)
    }

    return(
        <div className="slContainer">
            <div className="formBoxLeftMap">
                <MapContainer center={initialCenter} zoom={zoom} className='mapBox' ref={mapRef}>
                    <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                    </TileLayer>
                    {markers.map((marker, index) => (
                        <MarkerContent
                        key={index}
                        position={marker.position}
                        onMarkerClick={event =>markerClicked(marker,index)}
                        onDragEnd={event=> markerDragEnd(event, index)}>
                        </MarkerContent>
                    ))}
                </MapContainer>
            </div>

            <div className='formBoxRightMap'>
                <h3>Quel est votre trajet {pseudo} ?</h3>
                <div className="formMapContent">
                        
                        <form onSubmit={handleSubmit}>
                            
                            <div className="inputBox">
                                <input type="text" id="departure" value={departure} onChange={handleChange}></input>
                                <label htmlFor="departure">Adresse de départ</label>
                            </div>
                            <div className="inputBox">
                                <input type="text" id="finish" value={finish} onChange={handleChange}></input>
                                <label htmlFor="finish">Adresse d'arrivée</label>
                            </div>
                            <div className='linkMapContainer'>
                                
                                <button>Rappel du chauffeur</button>
                            </div>
                        </form>
                        <button>Réinitialiser</button>

                </div>
            </div>


        </div>
    )
}


export default Map;