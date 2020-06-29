 import axios from 'axios';
 const api_url = 'https://covid19.mathdro.id/api';

 export const fetchData = async (country)=>{
    let changableApiUrl = api_url; 
    if(country){
      changableApiUrl = `${api_url}/countries/${country}`;
    }
    try{
      const {data: {confirmed,deaths,recovered,lastUpdate}} = await axios.get( changableApiUrl);
      const requiredData = {
        confirmed,
        deaths,
        recovered,
        lastUpdate
      }
      return requiredData;
    }catch(err){
      console.log(err);
    }
 }
 export const fetchDailyData = async () => {
   try{
    const {data} = await axios.get(`${api_url}/daily`);
    const extractedDailyData = data.map((dailyData)=>{
      return ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate
      });
    });
    return extractedDailyData;

   }
   catch(err){
    console.log(err);
   }
 }

 export const fetchCountries = async ()=>{
  try{
   const {data:{countries}} = await axios.get(`${api_url}/countries`);
   return countries.map(country=>country.name);
  }
  catch(err){
    console.log(err);
  }
 }