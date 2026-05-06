let habit = [];
let selectedCategory = "Hepsi";

window.onload = function () {
  const data = localStorage.getItem("habit");

  if (data) {
    habit = JSON.parse(data);
  }

  document.getElementById("category").onchange = function (e) {
    selectedCategory = e.target.value;
    renderHabit();
  };
  renderHabit();
};

function generateID() {
  return Date.now();
}

function addHabit(){
    const name = document.getElementById("nameInput");
    const type = document.getElementById("typeInput");
    const category = document.getElementById("categoryInput");

    name = nameInput.value;
    type = typeInput.value;
    category = categoryInput.value;

    if(name === " " || type === " ");

    const newItem = {
        id:generateID(),
        name:name,
        type:type,
        category:category,
        completed: false,
    }

    habir.push(newItem);
    localStorage.setItem("habit", JSON.stringify(habit));

    renderHabit();

    nameInput.value = "";
    typeInput.value = "";
    
}