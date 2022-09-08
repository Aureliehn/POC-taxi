import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import LocationService from "../services/locations.service";

const Map = (props) => {
    
    const {pseudo} = props.userData
    const mapRef = useRef();
    const center = {
        lat: 45.76,
        lng:4.83
    }
    const zoom = 12;

    const initialMarkers = [];
    const initialAddress = '';

    const [markers, setMarkers] = useState(initialMarkers);
    const [departure, setDeparture] = useState(initialAddress);
    const [endPoint, setendPoint] = useState(initialAddress);

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

    const geoCode = (e) =>{
        e.preventDefault()
        const departureAddress = departure
        const allMarker = [...initialMarkers];

        return fetch(`https://nominatim.openstreetmap.org/search/?format=json&addressdetails=1&q=${departureAddress}`)
            .then((response)=>response.json())
            .then((data)=> {
                if(data[0].lat){
                    const marker = {
                        position:{
                            lat: data[0].lat,
                            lng: data[0].lon
                        },
                        draggable: true
                    }
                allMarker.push(marker, ...markers)
                setMarkers(allMarker)
                mapRef.current.flyTo(marker.position,13)
                }
            })
        }
    const geoCodeEnd = (e) =>{
        e.preventDefault()
        const markerEnd = [...initialMarkers];
        return fetch(`https://nominatim.openstreetmap.org/search/?format=json&addressdetails=1&q=${endPoint}`)
            .then((response)=>response.json())
            .then((data)=> {
                if(data[0].lat){
                const marker = {
                    position:{
                        lat: data[0].lat,
                        lng: data[0].lon
                    },
                    draggable: true
                    
                }
                markerEnd.push(marker, ...markers)
                setMarkers(markerEnd)
                mapRef.current.flyTo(marker.position,13)
                }
            })
    }

    const addLocation = (locations)=>{
        LocationService.addLocation(locations)
    }
    const handleSubmit = () =>{
        if(departure !='' && endPoint !=''){
            const locations = [departure, endPoint]
            addLocation(locations)
            setDeparture(initialAddress);
            setendPoint(initialAddress)
            const reset=[]
            setMarkers(reset)
        }
    }

    const reset=()=>{
        const m = mapRef.current
        const reset=[]
        setMarkers(reset)
        setDeparture(initialAddress);
        setendPoint(initialAddress)
        for(let i in m._layers) {
            if(m._layers[i]._path != undefined) {
                try {
                    m.removeLayer(m._layers[i]);
                }
                catch(e) {
                    console.log("problem with " + e + m._layers[i]);
                }
            }
        }
    }
    return(
        
        <div className="slContainer">
            <div className="formBoxLeftMap">
                <MapContainer 
                        center={center} 
                        zoom={zoom} 
                        className='mapBox'
                        ref={mapRef}>
                                    
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                            {/* <MapContent
                            onClick={mapClicked}
                            /> */}
                    {markers.map((marker, index) => (
                        <MarkerContent
                                key={index}
                                position={marker.position}
                                onMarkerClick={event => markerClicked(marker, index)}
                                onDragEnd={event => markerDragEnd(event, index)}
                        />
                    ))}
                    </MapContainer>
            </div>
            <div className='formBoxRightMap'>
            <h3>Quel est votre trajet {pseudo} ?</h3>
            <div className="formMapContent">
                
                <form>
                <div className="inputBox">
                    <input type='text' id='departure' value={departure} onChange={(e)=>setDeparture(e.target.value)}></input>
                    <label htmlFor="departure">Adresse de départ</label>
                </div>
                <button onClick={geoCode}>Ajouter</button>

                <div className="inputBox">
                <input type='text' value={endPoint} onChange={(e)=>setendPoint(e.target.value)}></input>
                    <label htmlFor="enPoint">Adresse d'arrivée</label>
                    
                </div>
                <button onClick={geoCodeEnd}>Ajouter</button>
                

                <div className='linkMapContainer'>
                        <button onClick={reset} className=" ">Réinitialiser</button>
                        <button className="" onClick={handleSubmit}>Rappel</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Map;