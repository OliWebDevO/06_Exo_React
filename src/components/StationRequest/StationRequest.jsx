//! Axios est une librairie qui permet de réaliser des requete ajax
//? Exemple :
//  axios.get('noure.be/demo?limit=42').then(({data}) => ...);
//  axios.get('noure.be/demo', { params: { limit: 42 }}).then(({data}) => ...);
//? Equivalent Fetch
//  fetch('noure.be/demo?limit=42').then(res => res.json()).then(data => ...);

// Composant dédié à la request 
// - Il fait la requête (fetch/axios/...)
// - Ensuite, en fonction de l'etat de la requete :
//   - Chargement ...
//   - Resultat de la requête

import axios from "axios";
import { useEffect } from "react"

//   - L'erreur de la requête
const StationRequest = ({stationToFind}) => {

    // Effet dans lequel on réalise la requete
    // Attention, celui doit ppetre limité au nom de la station
    useEffect(()=> {
        // Exemple de requete : https://api.irail.be/v1/liveboard/?station=Hourpes&format=json&lang=fr
        axios.get('https://api.irail.be/v1/liveboard/', {
            params: {
                station: stationToFind,
                lang : 'fr',
                format:'json'
            }
    }).then(({data}) => {
        console.log(data);
        const result = {
                        stationName: data.station,
                        updateTime: new Date(data.timestamp * 1000),
                        departuresCount: data.departures.number,
                        departures: data.departures.departure.map(
                            dep => ({
                                id: dep.id,
                                stationName: dep.station,
                                time: new Date(dep.time * 1000),
                                delay: dep.delay / 60,
                                platform: dep.platform
                            })
                        )
                    }
                    console.log(result);
    });

    },[stationToFind]);

    return (
        <div>
            <div>
jhvhgjgvhbjgv
            </div>
        </div>
    )
}

export default StationRequest