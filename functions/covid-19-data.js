// FETCH COVID DATA
import fetch from 'node-fetch';
const fetchCovidData = async (country)=>{
    try{
    // FETCH
    const response = await fetch(`${process.env.COVID19_URL}/${country}`, {
        method: 'GET',
       headers: { 
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-HOST': process.env.RAPIDAPI_HOST
        }
    });
    let data = await response.json();
    return data;
    }catch(error){
        console.log(error);
        return error;
    }
};
export default fetchCovidData;