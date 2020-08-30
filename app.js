window.addEventListener('load',()=>{
    let long;
    let lat;
    let tempretureDescription = document.querySelector(".tempreture-description");
    let tempretureDegree = document.querySelector(".tempreture-degree");
    let locationTimezone= document.querySelector(".Location-Timezone");
    let Icon = document.querySelector(".Icon");
    let sunRise = document.querySelector(".sunrise");
    let sunSet = document.querySelector(".sunset");
    let feelsLike = document.querySelector(".feels-Like");


    const key = "72c6cafddd46de908624b9af948f06a3";
    const weather = {};

    weather.tempreture = {
        unit : "celcius"
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            
            // const api = '${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}';
            
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            fetch(api)
            .then(respose=>{
                return respose.json();

            })
            .then(data=>{
                console.log(data);
                weather.tempreture = Math.floor(data.main.temp-273);
                weather.desc = data.weather[0].description;
                weather.city = data.name;
                weather.country = data.sys.country;
                weather.locationTimezone = data.timezone;
                weather.icon = data.weather[0].icon;
                weather.sunR = Math.floor(data.sys.sunrise);
                weather.sunS = Math.floor(data.sys.sunset);
                weather.fl = Math.floor(data.main.feels_like - 273);
                
            })
            .then(function(){
                tempretureDegree.textContent = weather.tempreture;
                locationTimezone.textContent = weather.country;
                //tempretureDescription.textContent = weather.description;
                tempretureDescription.textContent = weather.desc;
                Icon.innerHTML = `<img src = "icons/${weather.icon}.png"/>`;
                sunRise.textContent = weather.sunR;
                sunSet.textContent = weather.sunS;
                feelsLike.textContent = weather.fl;
            });
        });

       
    }
});