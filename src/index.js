// Your code here
document.addEventListener('DOMContentLoaded', displayImage)
const newVote=document.querySelector("#votes-form");
const totalVotes=document.querySelector("#vote-count")

let selectedElement;


function displayImage(){
 return fetch("https://b-l-k.vercel.app/characters")
        .then(resp=>resp.json())
        .then(data=>{
               data.forEach(element => {
               const menu=document.querySelector("#character-bar");
               const spantag=document.createElement("span");
               spantag.innerText=element.name;
               spantag.addEventListener("click",()=> {
                selectedElement=element;
               displayDetails(selectedElement)})
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
    totalVotes.innerText=element.votes;
}
   


newVote.addEventListener("submit",(e)=>{
    e.preventDefault();
    let vote=e.target.voteNumber.value;
    handleClick(selectedElement, vote);
    newVote.reset()
});
       





function handleClick(selectedElement,vote){
    selectedElement.votes+=parseInt(vote,10);
     fetch(`https://b-l-k.vercel.app/characters/${selectedElement.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {votes: selectedElement.votes}
            )
            })
            .then(resp=>resp.json())
            .then(data=>console.log(data))
        }




document.querySelector("#reset-btn").addEventListener("click",()=>{
    totalVotes.innerText=0;
    resetButton(selectedElement)
})
function resetButton(selectedElement){
    fetch(`https://b-l-k.vercel.app/characters/${selectedElement.id}`,
        {
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            },
        }
    )
    .then(resp=>resp.json)
    .then(data=>console.log(data))
}
       


    
