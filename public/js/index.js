console.log("Client side javascript is loaded");


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".messageOne");
const messageTwo = document.querySelector(".messageTwo");
const iconImg = document.querySelector(".icon-img");


messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
 e.preventDefault();
 
 messageOne.textContent = "loading...";
 messageTwo.textContent = "";
 iconImg.style.opacity = 0;
 
 fetch("/weather/?address=" + search.value.trim()).then((response) => {
  response.json().then((data) => {
   if (data.error) {
    (messageOne.textContent = data.error);
   } else {
    
    weatherIcon = data.icon;
    let weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    

    messageOne.textContent = data.forecast + " at ";
    messageTwo.textContent = data.location;
    
    if (weatherIcon) {
     iconImg.setAttribute("src", weatherIconURL);
     iconImg.style.opacity = 1;
    } else {
     iconImg.style.opacity = 0;
    }

    console.log(iconImg);
   }
  });
  
  
 });
 
});