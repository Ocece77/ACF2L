const city = "melun";
const key = '0e6f971e90046c4413777ba6ed031375';
const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=fr`;
const meteoData = document.getElementById("meteo-data");
const meteoDesc= document.getElementById("meteo-desc");
const meteoCondition = document.getElementById("meteo-condition");

window.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(()=>{
    $("#cookieModal").modal() //On appelle le modal après 1.5 seconde
  }, 1500)

  const day = new Date();

  /*Appel de l'API de Open weather  */
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    meteoData.innerHTML = `
    <p class="font-weight-bold" >Météo du ${day.getDate()}/${day.getMonth()}/${day.getFullYear()}  </p>
    <h1 class="text-white" style="font-size: 5em;">${data["main"]["temp"]}°c</h1>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">`
    meteoDesc.textContent = data.weather[0].description
    if ( data.visibility < 10000){ /*Un visibilité égal ou supérieur à 10km est considéréé comme dégagée */
      meteoCondition.textContent = "Les conditions ne sont pas optimal pour le vol"
    } else{
      meteoCondition.textContent = "Vous pouvez voler en toute sécurité"
    }

  })
  .catch(error => console.log(error))
})


