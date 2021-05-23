
// IMPORT PACKGES
import express from 'express';
import colors from 'colors';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config();
const app = express();

// Import functions
import fetchCovidData from './functions/covid-19-data.js';

// Create a Public folder
app.use(express.static('public'));

// GET ROUTEs
// Get covid data
app.get('/api/covid-19-data/:country', async (req,res)=>{
    const country  = req.params.country;
    //console.log(country);
    // Fetch data
     let data = await fetchCovidData(country);
    // Check
    if(data){
      return  res.status(200).json(data);
    }
    res.status(404)
});

// Get countries from json
app.get('/api/world-countries-names', async (req,res)=>{
    fs.readFile('./countries.json', 'utf8', (err, j)=>{
        if(err) throw err;
        let countries = JSON.parse(j);
        if(countries){
            res.status(200).json(countries);
        }else{
            res.status(404).json({message:'Not found'});
        }
    });
});
// Get Google Maps Key
app.get('/api/gmapskey', (req, res)=>{
    res.status(200).json({key:`${process.env.GMAPS_KEY}`})
});
// Server listener
let PORT = process.env.PORT | 3000
app.listen(PORT, ()=>  console.log(`Server beating on port ${PORT}`.america));