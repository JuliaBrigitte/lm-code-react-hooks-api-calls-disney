
// our props have two properties - a number, and a function that takes a number and returns void
// we can define this as an interface, or anonymously like this:
import {useState} from "react";
import {useFavourites} from "../FavouritesInclUpdateContext";
import {DisneyCharacter} from "../disney_character";
import character from "./character";

const Navigation : React.FC<{ currentPage: number, setCurrentPage: (page: number) => void, characters: Array<DisneyCharacter>, setCharacters: (characters: Array<DisneyCharacter>) => void, allCharacters: Array<DisneyCharacter>
}>
	= ({ currentPage, setCurrentPage, characters, setCharacters, allCharacters }) =>
	{
    const nextPage = () => {
        if (currentPage <= characters.length%100)
        {
            const newPageNumber = currentPage + 1;
            setCurrentPage(newPageNumber);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            const newPageNumber = currentPage - 1;
            setCurrentPage(newPageNumber);
        }
    }

    const [showFavourites, setShowFavourites] = useState<boolean>(true)
    const favourites = useFavourites();

    const toggleFavouritesOrAll = () =>
    {
        if (showFavourites)
        {
            setCharacters(favourites);
            setCurrentPage(1);
        }
        else
        {
            setCharacters(allCharacters);
        }
        setShowFavourites(!showFavourites);

    }

    return (
        <div className="navigation">
            {showFavourites?
            <div className="navigation__item">
                <button className="navigation__button" onClick={prevPage}>Prev Page</button>
            </div>:""}
            <div className="navigation__item">
                <button className="navigation__button" onClick={toggleFavouritesOrAll}>{(showFavourites ? "Show Favourites" : "All Characters")}</button>
            </div>
            {showFavourites?
            <div className="navigation__item">
                <button className="navigation__button" onClick={nextPage}>Next Page</button>
            </div>:""}
        </div>

    )
}

export default Navigation;