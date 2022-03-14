window.onload = StartApp

function StartApp() {
  let inputCity = document.getElementById('inputCity')
  let submitButton = document.getElementById('submit')
  inputCity.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      GetResults(event.target.value)
    }
  })

  submitButton.addEventListener('click', () => {
    GetResults(inputCity.value)
  })
}

const api = {
  url: 'https://api.openweathermap.org/data/2.5/weather?q=',
  key: 'a383fd447260dd46f0e7fec3546f7bca',
}

function GetResults(cityName) {
  fetch(`${api.url}${cityName}&appid=${api.key}&units=metric`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert('ERROR')
      }
    })
    .then((responseBody) => {
      if (responseBody === undefined) {
        alert('ERROR')
      } else {
        MapResponse(responseBody)
      }
    })
}

function MapResponse(response) {
  console.log(response)

  let name = response.name
  let date = () => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    let curr = new Date()

    return (
      days[curr.getDay()] +
      curr.getDate() +
      months[curr.getMonth()] +
      curr.getFullYear()
    )
  }
  let weather = response.weather[0].main

  let cityName = document.querySelector('.cityName')
  cityName.innerText = 'City : ' + name

  let dateValue = document.querySelector('.date')
  dateValue.innerText = 'Date : ' + date()

  let weatherValue = document.querySelector('.weather')
  weatherValue.innerText = 'Weather : ' + weather

  let highTemp = document.querySelector('.high')
  let lowTemp = document.querySelector('.low')
  let high = Math.floor(response.main.temp_max)
  let low = Math.floor(response.main.temp_min)
  highTemp.innerText = `High : ${high} °C`
  lowTemp.innerText = `Low : ${low} °C`
  document.querySelector('.infoWrapper').style.display = 'flex'
}
