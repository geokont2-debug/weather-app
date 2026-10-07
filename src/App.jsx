import { useState } from "react";
import "./App.css";
function App() {
  const[city,setCity] = useState("");
 const [weather, setWeather] = useState(null);
  const[condition,setCondition] = useState("");
  const getWeather = async () => {
const geoResponse = await fetch(
  `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
);
const geoData = await geoResponse.json();
const latitude = geoData.results[0]. latitude;
const longitude =geoData.results[0]. longitude;
const response = await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
);
const data = await response.json();
setWeather(data);
console.log(data.current.weather_code);
const code = data.current.weather_code;
let weatherCondition= "";
if (code===0) {
  weatherCondition = "Clear";
}else if (code<=3) {
   weatherCondition = "Cloudy";

}else if (code === 45 || code === 48) {
  weatherCondition = "Fog";
} else if (code>=51 && code <=57) {
  weatherCondition = "Drizzle";   
} else if (code >=61 && code <=67) {
  weatherCondition = "Rain";
}else if (code >= 80 && code <= 82) {
  weatherCondition = "Showers";
} else if(code >=71 && code<=77) {
  weatherCondition ="Snow";
} else if (code>=95) {
 weatherCondition = "Thunderstorm";  
 }
setCondition(weatherCondition);
  };
  return (
    <div className="weather=card">
<h1>Weather App</h1>
<h2>{city}</h2>
<input 
value={city}
onChange={(e)  => setCity(e.target.value)}
/>
<button onClick={getWeather}>Search</button>
{weather && <p>Temperature:{weather.current.temperature_2m}°C</p>}
{condition &&<p>Condition:{condition}</p>}
    </div>
  ); 

}
export default App;