require('dotenv').config();
const apiKey = process.env.REACT_APP_API_KEY; 
const apiCalls = {

    fetchCountriesData: ()  => {
        return fetch(`http://api.countrylayer.com/v2/all?access_key=${apiKey}`)
            .then((response) => checkForErrors(response))
          
    }

}

const checkForErrors = (response:any) => {
  if(response.ok) {
    console.log(response);
    return response.json();
  } else {
    throw `${response.status} ERROR. Could not access server data.`
  }
} 

export default apiCalls;