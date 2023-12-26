const API = "http://localhost:8000/users";

let container = document.querySelector(".container");
let contactForm = document.querySelector(".contactForm");
let inputContainer = document.querySelector(".input-container");
let inputName = document.querySelector(".inputName");
let inputSurname = document.querySelector(".inputSurname");
let inputPhoto = document.querySelector(".inputPhoto");
let inputPhone = document.querySelector(".inputPhone");
let btn = document.querySelector(".btn");
let contactList = document.querySelector("#contactList");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !inputName.value == "" &&
    !inputSurname.value == "" &&
    !inputPhone.value == "" &&
    !inputPhoto.value == ""
  ) {
    let user = {
      name: inputName.value,
      surname: inputSurname.value,
      phone: inputPhone.value,
      photo: inputPhoto.value,
    };
    setObj(user);
  } else {
    alert(`Упс, кажется вы что-то не заполнели?
    Проверьте все поля и перезаполните форму`);
  }
  inputName.value = "";
  inputSurname.value = "";
  inputPhone.value = "";
  inputPhoto.value = "";
});

function setObj(user) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  });
}

function showList() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      contactList.innerHTML = "";
      data.forEach((elem) => {
        contactList.innerHTML += `<li id = ${elem.id}
            <span>${elem.name}</span>
            <span>${elem.surname}</span>
            <span>${elem.phone}</span>
            <img src ="${elem.photo}" alt="">
            <button id = ${elem.id} class="btnDelete">delete</button>
            <button id = ${elem.id} class="btnEdit">edit</button></li>`;
      });
    });
}
showList();

document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  console.log(del_class);
  if (del_class.includes("btnDelete")) {
    const del_id = e.target.id;
    console.log(del_id);
    fetch(`${API}/${e.target.id}`, {
      method: "DELETE",
    }).then(() => showList());
  }
});
let editModal = document.querySelector(".editModal");
let inpName = document.querySelector(".inputNameModal");
let inpSurname = document.querySelector(".inputSurnameModal");
let inpPhone = document.querySelector(".inputPhoneModal");
let inpPhoto = document.querySelector(".inputPhotoModal");
let btnModal = document.querySelector(".btnModal");

document.addEventListener("click", (e) => {
  let edit_class = [...e.target.classList];
  if (edit_class.includes("btnEdit")) {
    editModal.style.display = "block";
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpName.value = data.name;
        inpSurname.value = data.surname;
        inpPhone.value = data.phone;
        inpPhoto.value = data.photo;
        btnModal.setAttribute("id", data.id);
      });
  }
});

btnModal.addEventListener("click", () => {
  let editTask = {
    name: inpName.value,
    surname: inpSurname.value,
    phone: inpPhone.value,
    photo: inpPhoto.value,
  };
  editedList(editTask, btnModal.id);
  editModal.style.display = "none";
});

function editedList(editTask, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editTask),
  }).then(() => showList());
}
