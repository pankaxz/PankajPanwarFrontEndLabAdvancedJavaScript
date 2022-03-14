window.onload = StartApp

function StartApp() {
  let inputCity = document.getElementById('inputCity')
  inputCity.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      GetResults(event.target.value)
    }
  })
}

const api = {
  url: 'https://api.openweathermap.org/data/2.5/weather?q=',
  key: 'a383fd447260dd46f0e7fec3546f7bca',
}

function GetResults(cityName) {
  fetch(`${api.url}${cityName}&appid=${api.key}&units=metric`)
    .then((response) => {
      return response.json()
    })
    .then((responseBody) => {
      MapResponse(responseBody)
    })
    .catch(() => {
      alert('wrong value entered')
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
  cityName.innerText = name

  let dateValue = document.querySelector('.date')
  dateValue.innerText = date()

  let weatherValue = document.querySelector('.weather')
  weatherValue.innerText = weather
}
