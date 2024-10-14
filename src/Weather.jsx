import React, { useState } from 'react'

export default function Weather() {
    const [cityName,setCityName]= useState('');

    const [data,setData]= useState({});
    
    const d = async()=>{

        let key ='455109f6d9da753f2f4d276fe69a2c26';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${key}`
        let p = await fetch(url);
        let d = await p.json();
        setData(d);
    }

    console.log(data);

  return (
    <div>
        
        <input type='text' onChange={(e)=>{
        setCityName(e.target.value);
        }}/>
        <input type='button' value="save" onClick={d}/>

    </div>
  )
}
