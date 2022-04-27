import './App.css';
import React, {useEffect, useState } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';
import axios from 'axios';



const App : React.FC = () => {
  // Some dummy state representing disney characters
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([
    {
      _id: 6,
      name: "'Olu Mel",
      imageUrl: "https://static.wikia.nocookie.net/disney/images/6/61/Olu_main.png"
    },
    {
      _id: 25,
      name: "Abu",
      imageUrl: "https://static.wikia.nocookie.net/disney/images/3/3f/Profile_-_Abu.png"
    },
    {
      _id: 30,
      name: "Ace",
      imageUrl: "https://static.wikia.nocookie.net/disney/images/1/1e/Profile_-_Ace.png"
    },
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() =>
    {
        console.log("useEffect triggered");
        getCharacters(currentPage).then();
    });

   const getCharacters = async (pageNumber : number) => {
     try
     {
       const response = await axios.get('https://api.disneyapi.dev/characters?page=' + pageNumber);
       setCharacters(response.data.data);
     }
     catch(error)
     {
       // do something with the error here
     }
   }

  return (
    <div className="page">
      <Header currentPage={currentPage} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CharacterContainer characters={characters} />
    </div>
  );
}

export default App;








