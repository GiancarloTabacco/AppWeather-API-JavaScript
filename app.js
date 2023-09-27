window.addEventListener('load', () => {
    let lon
    let lat
  
    let temperatureValue = document.getElementById('temperature-value')
    let temperatureDescription = document.getElementById('temperature-description')
  
    let location = document.getElementById('location')
    let animatedIcon = document.getElementById('animated-icon')
  
    let windSpeed = document.getElementById('wind-speed')
  
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //console.log(position.coords.latitude)
        lon = position.coords.longitude
        lat = position.coords.latitude
        //Current location
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=72f67cddeefa597e117715e50b1e737c`
  
        //console.log(url)
        //Location by city
        //const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=72f67cddeefa597e117715e50b1e737c`
  
        //console.log(url)
  
        fetch(url)
          .then(response => { return response.json()})
          .then(data => {
            //console.log(data)
  
            let temp = Math.round(data.main.temp) - 273.15;
            temp = Math.floor(temp);
            //console.log(temp)
            temperatureValue.textContent = `${temp} ° C`
  
            //console.log(data.weather[0].description)
            let desc = data.weather[0].description
            temperatureDescription.textContent = desc.toUpperCase()
            location.textContent = data.name
  
            windSpeed.textContent = `${data.wind.speed} m/s`
  
            //for static icons
            //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`                     
            //icono.src = urlIcon
            //console.log(data.weather[0].icon)
  
            //for dynamic icons
            console.log(data.weather[0].main)
            switch (data.weather[0].main) {
              case 'Thunderstorm':
                animatedIcon.src='animated/thunder.svg'
                
                break;
              case 'Drizzle':
                animatedIcon.src='animated/rainy-2.svg'
                
                break;
              case 'Rain':
                animatedIcon.src='animated/rainy-7.svg'
                
                break;
              case 'Snow':
                animatedIcon.src='animated/snowy-6.svg'
                
                break;
              case 'Clear':
                animatedIcon.src='animated/day.svg'
                
                break;
              case 'Atmosphere':
                animatedIcon.src='animated/weather.svg'
               
                break;
              case 'Clouds':
                animatedIcon.src='animated/cloudy-day-1.svg'
                
                break;
              default:
                animatedIcon.src='animated/cloudy-day-1.svg'
               
            }
  
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  })
  