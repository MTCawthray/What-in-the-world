const apiCalls = {

    fetchCountriesData: ()  => {
        return fetch('https://restcountries.com/v3.1/all')
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