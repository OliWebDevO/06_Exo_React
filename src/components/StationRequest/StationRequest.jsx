
import axios from "axios";
import { useEffect, useState } from "react"
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

const DashBoardItem = ({stationName, time, delay, platform}) => {
    return (
        <li>
            Gare : {stationName} // Quai : {platform}
            <br />
            // Arrivé : {time.toLocaleTimeString()} {delay > 0 && `+${delay}`} à la date du {time.toLocaleDateString()} {delay > 0 && "Retard : " + delay + " minutes"}
        </li>
    )
}


const DashBoard = ({stationName, updateTime, departuresCount, departures}) => {
    return (
        <>
        <p>Il y a {departuresCount} trains au départ de {stationName}</p>
        <p>liste des départs :</p>
        <ul>
            {departures.map(dep => <DashBoardItem key ={dep.id} {...dep}/>)}
        </ul>
        </>
    )
}

//   - L'erreur de la requête
const StationRequest = ({stationToFind}) => {
    
    const [searchResult, setSearchResult] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    // Effet dans lequel on réalise la requete
    // Attention, celui doit ppetre limité au nom de la station
    useEffect(()=> {
            
        //? Mise à jour des states avant d'envoyer la requete 
        //Tout est a valeur initial sauf le loading

        setSearchResult(null);
        setError(false);
        setLoading(true);

        // Exemple de requete : https://api.irail.be/v1/liveboard/?station=Hourpes&format=json&lang=fr
        axios.get('https://api.irail.be/v1/liveboard/', {
            params: {
                station: stationToFind,
                lang : 'fr',
                format:'json'
            }
    }).then(({data}) => {

        //? Données brutes recues depuis la webAPI
        console.log(data);

        //! converti les données dans un format adapté à nos besoins
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

                    //? Données converties
                    console.log(result);

                    //! Mise a jour du state apres la requete
                    setLoading(false);
                    setSearchResult(result);

    }).catch(err => {

        //! Mise à jour du state 
        setLoading(false);
        setError(true);
    })

    },[stationToFind]);

    return (
        <div>
            <div>
                {isLoading ? (
                <p>Chargement ...</p>
                ) : searchResult ? (
                    <DashBoard {...searchResult}/>
                ) : error ? (
                    <p>Erreur lors de la requête</p>
                ) : (
                    <p>Aucune donnée... </p>
                )
            }
            </div>
        </div>
    )
}

export default StationRequest