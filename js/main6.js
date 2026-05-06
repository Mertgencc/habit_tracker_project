let habit = [];
let selectedCategory = "Hepsi";
let editID = null;

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

function addHabit() {
  const nameInput = document.getElementById("nameInput");
  const typeInput = document.getElementById("typeInput");
  const categoryInput = document.getElementById("category");

  const name = nameInput.value;
  const type = typeInput.value;
  const category = categoryInput.value;

  if (name === "" || type === "") return;

  if (editID) {
    const item = habit.find((h) => h.id === editID);

    item.name = name;
    item.type = type;
    item.category = category;

    editID = null;
  } else {
    const newItem = {
      id: generateID(),
      name: name,
      type: type,
      category: category,
      completed: false,
    };

    habit.push(newItem);
  }

  localStorage.setItem("habit", JSON.stringify(habit));

  renderHabit();

  nameInput.value = "";
  typeInput.value = "";
}

function renderHabit() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  let filteredHabit = habit;

  if (selectedCategory !== "Hepsi") {
    filteredHabit = habit.filter((item) => item.category === selectedCategory);
  }

  const completedCount = habit.filter((item) => item.completed).length;
  const totalCount = habit.length;

  document.getElementById("progressText").textContent =
    completedCount + " / " + totalCount + " tamamlandı";

  filteredHabit.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.name + " " + item.type + " " + item.category;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;

    checkbox.onchange = function () {
      item.completed = !item.completed;
      localStorage.setItem("habit", JSON.stringify(habit));
      renderHabit();
    };

    if (item.completed) {
      li.style.textDecoration = "line-through";
    }

    const btn = document.createElement("button");
    btn.textContent = "Sil";

    btn.onclick = function () {
      habit = habit.filter((h) => h.id !== item.id);
      localStorage.setItem("habit", JSON.stringify(habit));
      renderHabit();
    };

    const btn2 = document.createElement("button");
    btn2.textContent = "Düzenle";

    btn2.onclick = function () {
      document.getElementById("nameInput").value = item.name;
      document.getElementById("typeInput").value = item.type;
      document.getElementById("category").value = item.category;

      editID = item.id;
    };

    li.appendChild(checkbox);
    li.appendChild(btn);
    li.appendChild(btn2); 
    list.appendChild(li);
  });
}
