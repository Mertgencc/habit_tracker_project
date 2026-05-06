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

    if(name === " " || type === " ") return;

    const newItem = {
        id:generateID(),
        name:name,
        type:type,
        category:category,
        completed: false,
    }

    habit.push(newItem);
    localStorage.setItem("habit", JSON.stringify(habit));

    renderHabit();

    nameInput = "";
    typeInput = "";

}

function renderHabit(){
    const list = document.getElementById("habitList");
    list.innerHTML = "";

    let filteredHabit = habit;

    if(selectedCategory !== "Hepsi"){
        filteredHabit = habit.filter(item => item.category === selectedCategory);
    }

    filteredHabit.forEach(function(item){
        const li = document.createElement("li");
        li.textContent = item.name + " " + item.type + " " + item.category;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;

        checkbox.onchange = function(){
            item.completed = !item.completed;
            localStorage.setItem("habit", JSON.stringify(habit));
            renderHabit();
        }

        if(item.completed){
            li.style.textDecoration = "line-through";
        }

        const btn = document.createElement("button");
        btn.textContent = "Sil";

        btn.onclick = function(){
            filteredHabit = habit.filter((h) => h.id !== item.id);
            localStorage.setItem("habit", JSON.stringify(habit));
            renderHabit();
        }

        li.appendChild(checkbox);
        li.appendChild(btn);
        list.appendChild(li);
    })
}