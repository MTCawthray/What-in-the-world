require('dotenv').config();
const apiKey = process.env.REACT_APP_API_KEY; 
const apiCalls = {

    fetchCountriesData: ()  => {
        return fetch('https://restcountries.eu/rest/v2/all')
            .then((response) => checkForErrors(response))
          
    }

}

const checkForErrors = (response:any) => {
  if(response.ok) {
    return response.json();
  } else {
    throw `${response.status} ERROR. Could not access server data.`
  }
} 

export default apiCalls;