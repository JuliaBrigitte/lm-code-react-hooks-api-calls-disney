import React, { useContext, useState } from "react";
import {DisneyCharacter} from "./disney_character";
const FavouritesContext = React.createContext<any | null>(null);
const FavouritesUpdateContext = React.createContext<any | null>(null);

export function useFavourites()
{
    return useContext(FavouritesContext)
}
export function useFavouritesUpdate()
{
    return useContext(FavouritesUpdateContext)
}

const FavouritesInclUpdateContext: React.FC = ({ children }) =>
{
    const [characterFavourites, setCharacterFavourites] = useState<Array<DisneyCharacter>>([]);
    return (
        <FavouritesContext.Provider value={characterFavourites}>
            <FavouritesUpdateContext.Provider value={setCharacterFavourites}>
                {children}
            </FavouritesUpdateContext.Provider>
        </FavouritesContext.Provider >
    )
}

export default FavouritesInclUpdateContext;