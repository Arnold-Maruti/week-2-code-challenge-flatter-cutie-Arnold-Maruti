// Your code here
document.addEventListener('DOMContentLoaded', displayImage)
function displayImage(){
 return fetch("http://localhost:3000/characters")
        .then(resp=>resp.json())
        .then(data=>{
               data.forEach(element => {
               const menu=document.querySelector("#character-bar");
               const spantag=document.createElement("span");
               spantag.innerText=element.name;
               spantag.addEventListener("click",()=> displayDetails(element))
               menu.appendChild(spantag);

    });
})
}
function displayDetails(element){
    document.querySelector("#name").innerText=element.name;
    const images=document.querySelector("img")
    images.src=element.image;
    images.id=element.id;
    images.alt=element.name;
    document.querySelector("#vote-count").innerText=element.votes;
}