let cityName= document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let w_forecast=document.querySelector(".weather_forecast");
let w_temperature=document.querySelector(".weather_temperature");
let w_icon=document.querySelector(".weather_icon");
let w_minTemp=document.querySelector(".weather_min");
let w_maxTemp=document.querySelector(".weather_max");
let w_feelsLike=document.querySelector(".weather_feelsLike");
let w_humidity=document.querySelector(".weather_humidity");
let w_pressure=document.querySelector(".weather_pressure");
let w_wind=document.querySelector(".weather_wind");
let citySearch=document.querySelector(".weather_search");

const getCountryName=(code)=>{
    return new Intl.DisplayNames([code],{type:"region"}).of(code);
}
const getDateTime=(dt)=>{
    const curDate= new Date(dt*1000);
    console.log(curDate);
    const options={
        weekDays:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minutes:"numeric"
    };
    const formatter=new Intl.DateTimeFormat("en-us",options);
    return formatter.format(curDate);
    
};
let city="nashik";
citySearch.addEventListener("submit",(e)=>{
  e.preventDefault();
  let cityName=document.querySelector(".city_name");
  console.log(cityName.value);
  
  city=cityName.value;
  getWeatherData();
  cityName.value="";
});
const getWeatherData=async()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6`;
    try{
        const res=await fetch(weatherUrl);
        const data = await res.json();
        const{main,name,weather,wind,sys,dt}=data;
        cityName.innerHTML=`${name},${getCountryName(sys.country)}`;
        dateTime.innerHTML=getDateTime(dt);
        w_forecast.innerHTML=weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        w_temperature.innerHTML=`${main.temp}&#176`;
        w_minTemp.innerHTML=`MIN:${main.temp_min.toFixed()}&#176`;
        w_maxTemp.innerHTML=`MAX:${main.temp_max.toFixed()}&#176`;
        w_feelsLike.innerHTML= `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML= `${main.humidity}%`;
        w_wind.innerHTML= `${wind.speed}m/s`;
        w_pressure.innerHTML= `${main.pressure}hpa`;
    }catch(error){
        console.log(error);
    }
};
document.body.addEventListener("load",getWeatherData()); 