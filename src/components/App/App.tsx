import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import mapIcon from '../../assets/WorldMap.jpg';
import QuizPage from '../QuizPage/QuizPage';
import apiCalls from '../../api/apiCalls';
import { stringify } from 'querystring';
const { v4: uuidv4 } = require('uuid')


interface IState{
  countries: {
    name: string
    population: number
  }[],
  currentCountry: {
    name: string
    population: number
    capital: string
    borders: string[]
  } | undefined
  country: string
}

const App = () => {
  const [countries, setCountries] = useState<IState['countries']>([]);
  const [selectedCountry, setSelectedCountry]= useState<any>('Select A Country')
  const [displayCountry, setDisplayCountry] = useState<any>({})

  const countryNames = countries.map(country => { 
    return (
      <option 
        key={uuidv4()}
        >{country.name}
      </option> 
    )
  })
     // ********* Function to get chosen country for QuizPage component ********//
  const getCurrentCountry = () => {
    const country = countries.find(currCountry => currCountry.name.includes(selectedCountry))
    console.log('inside getCurrentCountry', country)
    setDisplayCountry(country);
  }

        // ******* Button click function  ********//
  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log('inside handleSubmit', selectedCountry);
    getCurrentCountry()
  }

  useEffect(() => {
    apiCalls.fetchCountriesData()
      .then((data) => setCountries(data))
  }, [])

  return (
    <div className="App">
      <header>
        <Link to="/">
          <h1>What In The World</h1>
        </Link>
      </header>
      <Route exact path="/" render={ () => {
        return (
          <main className="mainDisplay">
            <>
            <form 
              className="country-selector">
              <select 
                className="country-dropdown"
                onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value="">
                    {selectedCountry}
                  </option>
                options={countryNames}
              </select>
              
                <button onClick={(e) => handleSubmit(e)} 
                  className="dropdown-btn">
                  <Link className= "country-submit" to={`/${selectedCountry}`}>
                  Submit Country
                  </Link>
                </button>
              
            </form>
            </>
            <img src={mapIcon} alt="world map" className="worldMapImg" />
          </main>
        )
      }
      }/>
      <Route exact path="/:country" render={ ({ match }) => {
        return <QuizPage 
          // {...match}
          
          currentCountry={displayCountry}
          country={displayCountry.name}
          />
      }
    }/>
    </div>
  );
}

export default App;
// DONE:
//useEffect on pageload to fetch the country data set the state as an array of objects
// Pass props down to map { destructure to just send country name}
//This will display the Map component on pageload
// the basic layout will be a header with an h1 element
// a main with <Map /> component and image (image will eventually become the iteractive map.

// TO-DO:
//We will set up routes to render based on url
// testing! 