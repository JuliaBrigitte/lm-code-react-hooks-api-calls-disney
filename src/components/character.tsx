import { DisneyCharacter } from "../disney_character"
import {useFavourites} from "../FavouritesInclUpdateContext";

interface CharacterProps{
    character: DisneyCharacter;
    updateFavourites: (favourites: Array<number>) => void;
    characters: Array<DisneyCharacter>
}

// notice we're updating the props destructuring to access the two new props too:
const Character : React.FC<CharacterProps> = ( { character, updateFavourites, characters }) => {
    const characterFavourites = useFavourites();

    // Define a default in case the character doesn't have an image
    let imageSrc = "https://picsum.photos/300/200/?blur";
    if (character.imageUrl)
    {
        // API seems to include extra path for images so here we strip it off to fetch raw image
        //imageSrc = character.imageUrl.substring(0, character.imageUrl.indexOf('/revision'));
        imageSrc = character.imageUrl;

    }

    function toggleFavouriteForCharacter(characterId : number)
    {
        if (characterFavourites.filter((character: DisneyCharacter) => character._id === characterId).length === 0)
        {
            // add to favourites
            const addToFavourites = characters.filter((character: DisneyCharacter) => character._id === characterId);
            updateFavourites([...characterFavourites, ...addToFavourites]);
        }
        else
        {
            // remove from favourites
            const updatedFavourites = characterFavourites.filter((character: DisneyCharacter) => character._id !== characterId);
            updateFavourites(updatedFavourites);
        }
    }

    return (
        <article className="character-item">

            <h2>{character.name}</h2>

            <div className="character-item__actions" onClick={() => toggleFavouriteForCharacter(character._id)}>
                {characterFavourites.filter((eachCharacter: DisneyCharacter) => eachCharacter._id === character._id).length === 0 ? "Add to Favourites" : "Favourited"}
            </div>

            <img className="character-item__img" src={imageSrc} alt={character.name} />

        </article>
        )
}

export default Character