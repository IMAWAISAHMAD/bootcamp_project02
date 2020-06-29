import React,{useState,useEffect}from 'react';
import {NativeSelect,FormControl} from '@material-ui/core';
import {fetchCountries} from '../../api';
import styles from './CountryPicker.module.css';


export const CountryPicker = ({handleCountryChange}) => {
    const [countries,setCountries] = useState([]);
    useEffect(()=>{
        const getCountries = async ()=>{
            setCountries(await fetchCountries());
        }
        getCountries();
        
    },[setCountries])
    return (
        <FormControl className={styles.formControl} defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
            <NativeSelect>
            <option value="">Global</option>
            {countries.map((country,i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;