let habit = [];
let selectedCategory = "Hepsi";

window.onload = function(){
    const data = localStorage.getItem("habit");

    if(data){
        habit = JSON.parse(data);
    }

    document.getElementById("category").onchange = function(e){
        selectedCategory = e.target.value;
        renderHabit();
    }
    renderHabit();
}