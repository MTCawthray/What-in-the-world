import { useState, useEffect } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import QuizPage from '../QuizPage/QuizPage';
import ErrorHandling from '../ErrorHandling/ErrorHandling';
import apiCalls from '../../api/apiCalls';
import './App.css';
const { v4: uuidv4 } = require('uuid');


interface IAppState{
  countries: {
    name: {
      common:string
    }
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
  const [countries, setCountries] = useState<IAppState['countries']>([]);
  const [selectedCountry, setSelectedCountry]= useState<any>('Select A Country');
  const [error, setError] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');
  const [displayCountry, setDisplayCountry] = useState<any>({});
  const history = useHistory();

   // ***********************************************
    /*PASSING ALL COUNTRY NAMES AS DROP DOWN OPTION*/ 
   // ***********************************************
  const countryNames = () => {
    let nameList = countries.map(country => country.name.common).sort();
    let dropList = nameList.map(country => { 
    return (
      <option 
        key={uuidv4()}
        >{country}
      </option> 
    )
  })
  return dropList;
}

   // ***********************************************
    /*FIND COUNTRY WITH MATCHING NAME FROM DROP DOWN*/ 
   // ***********************************************
  const getCurrentCountry = () => {
    const country = countries.find(currCountry => currCountry.name.common.includes(selectedCountry));
    setDisplayCountry(country);
  }
  
   // ***********************************************
        /*ERROR HANDLE FOR SELECT DROP DOWN*/ 
   // ***********************************************
  const errorCheck = (e: any) => {
    e.preventDefault()
    if (selectedCountry.includes('Select A Country')) {
      setError('Please select a country')
    } else {
      handleSubmit(e)
    }
  }
  
   // ***********************************************
        /*BUTTON EVENT HANDLE HELPER FUNCTION*/ 
   // ***********************************************
  const handleSubmit = (e:any) => {
    getCurrentCountry();
    history.push(`/${selectedCountry}`);
    setSelectedCountry('Select A Country');
    setError('');
  }

   // ***********************************************
              /*UPDATING STATE*/ 
   // ***********************************************
  useEffect(() => {
    setServerError('');
    apiCalls.fetchCountriesData()
      .then((data) => setCountries(data))
      .catch((err) => {
        setServerError(err)
        history.push(`/country/${err}`)
      })
  }, [history])

   // ***********************************************
              /*SETTING LOCAL STORAGE*/ 
   // ***********************************************
  useEffect(() => {
    if (displayCountry) {
      localStorage.setItem('currentCountry', JSON.stringify(displayCountry));
    }
  }, [displayCountry])
  
  return (
    <div className="App">
      <header>
        <Link to="/" className="home-click">
          <h1>What In The World</h1>
        </Link>
      </header>
      <Switch>
        <Route exact path="/" render={ () => {
          return (
            <main className="mainDisplay">
              <p className="instructions-question">
                Want to see how well you know the world?
              </p>
              <p className="instructions"> 
                Select a country to test or expand your knowledge!
              </p>
              <form className="country-selector">
                <select className="country-dropdown" onChange={(e) => setSelectedCountry(e.target.value)}>
                  <option value=''>
                    {selectedCountry}
                  </option>
                  options={countryNames()} 
                </select>
                <button onClick={(e) => errorCheck(e)} className="dropdown-btn">
                  Submit Country
                </button>
                {error !== '' && <p className="input-error-message">{error}</p>}
              </form>
            </main>
          )
        }
        }/>
        <Route exact path="/:country" render={ ({ match }) => {
          return ( 
            <QuizPage 
              name="country"
              currentCountry={displayCountry}
              country={displayCountry.name}
            />)
          }
        }/>
        <Route render={ () => {
          return (
            <ErrorHandling 
              errorMessage={serverError} 
            />) 
        }}/>
      </Switch>
    </div>
  );
}

export default App;
