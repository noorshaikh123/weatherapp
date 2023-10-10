import './home.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import image1 from './humidity.png';
import image2 from './hot.png';

export default function Home(){
    const [city, setCity] = useState('Pune');
    const [temp, setTemp] = useState('0');
    const [humidity, setHumidity] = useState('0');
    const [message, setMessage] = useState('');

    async function loadweather(){
    try{
    
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`)

        setTemp((response.data.main.temp -273.15).toFixed(2));
        setHumidity(response.data.main.humidity);
        console.log(response);
        setMessage('city found')
    
}
catch(err){
    setTemp(0)
    setMessage('city not found')
}
}

    useEffect(()=>{loadweather()}, [city])

    return(
    <div>
    <h1 className='title'>Weather for {city}</h1>

    <input 
    type='text' 
    className='textbox' 
    placeholder='Enter City Name'
    value={city} onChange= {(e)=>{setCity(e.target.value)}}
    />

<p className='msg'>{message}</p>

    <h1 className='text'><img src={image2} className='image'/> Temperature: {temp} °C</h1><br/>
    <h1 className='text'><img src={image1} className='image'/> Humidity: {humidity} %</h1>
    </div>
    )
}

