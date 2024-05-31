import { useState } from "react"
import { useId } from "react"


const SearchForm = ({ onSearch, labelContent }) => {

    //Id d'accessibilité du form
    const formId = useId();

    //State du contenu
    const [query, setQuery] = useState('');
    
    const handleQuerySubmit = (e) => {

        //Previent le comportement par default du form
        e.preventDefault();
        
        //Envoyé des données (state) vers le composant parent
        // La fonction trim() supprime les espaces avant et après le texte '      louvain     la    neuve       ' sera 'louvain     la    neuve'
        // .replaceAll(/\s+/g, ' ' est une regex qui remplace tout espace ENTRE les infos envoyées genre = 'louvain       la       neuve' sera 'louvain la neuve'
        onSearch(query.trim().replaceAll(/\s+/g, ' '));

        //Reset le formulaire
        setQuery('');
    }

    // rendu
    return (
        <form action="" onSubmit={handleQuerySubmit}>
            {labelContent && (
                <label htmlFor={formId}>{labelContent}</label>
            )}
            {/* Résumé du binding
                - value = {...} : State -> input (si le state est modifié, l'input aussi) 
                - onChange = {...} : Input -> State (si l'input est modifié , le state change*/}
            <input 
            id={formId} value={query} onChange={(e)=>setQuery(e.target.value)} // Binding input -> state
            type="text" name=""/>
            <button type="submit">🔍Search Station</button>
        </form>
    )
}

export default SearchForm