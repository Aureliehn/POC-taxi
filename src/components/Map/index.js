import '../../index.css'
import M from 'materialize-css'
import React, {useRef,useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import { marker, polyline } from "leaflet";
const Map = () =>{

    const mapRef = useRef()
    const center = {
        lat:45.76,
        lng:4.83
    }
    const zoom= 12;
    const containerStyle = {
        width:'100%',
        height:'500px',
        zIndex:'10', 
        marginTop:'2em'
    }
    const initialMarkers = [];
    const initialAddress = '';

    const [markers, setMarkers] = useState(initialMarkers);
    const [departure, setDeparture] = useState(initialAddress);
    const [endAdress, setendAdress] = useState(initialAddress);

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

    return(
        <div className="row center">
                <div className="col s12 m8 offset-m2"> 
                    <div className="card hoverable" style={{padding:"2em"}}>
                        <form>
                           <div className="col s12 m8 d-flex align-items-center justify-content-center">
                                <input type='text' placeholder="Adresse de départ" id='departure' value={departure} onChange={(e)=>setDeparture(e.target.value)}></input>
                                <button>Ajouter</button>
                            </div>
                            <div className="col s12 m8 d-flex align-items-center">
                                <input type='text' placeholder="Adresse d'arrivée" value={endAdress} onChange={(e)=>setendAdress(e.target.value)}></input>
                                <button>Ajouter</button>
                            </div>
                            <div className="col s12 m8 d-flex align-items-center mb-1em">
                            <button className=" me-1em">Vérifier</button>
                            <button className=" mb-1">Réinitialiser</button>
                            </div>
                            <MapContainer 
                            center={center} 
                            zoom={zoom} 
                            style={containerStyle}
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

                            <a className="waves-effect waves-light btn" style={{marginTop:'2em'}}>
                                <i class="material-icons left">phone_in_talk</i>Rappel du chauffeur
                            </a>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default Map;