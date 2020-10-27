console.log("Client side javascript is loaded");


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".messageOne");
const messageTwo = document.querySelector(".messageTwo");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
 e.preventDefault();

 messageOne.textContent = "loading...";
 messageTwo.textContent = "";
 
 fetch("http://localhost:3000/weather/?address=" + search.value.trim()).then((response) => {
  response.json().then((data) => {
   if (data.error) {
    (messageOne.textContent = data.error);
   } else {
    messageOne.textContent = data.forecast + " at ";
    messageTwo.textContent = data.location;
   }
  });
  
  
 });
 
})