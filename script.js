const info = {
    student_name: '',
    email: '',
    image: '',
    website: '',
    gender: '',
    skillArr: [],
}
let submitBtn = document.getElementById("submit");

const getData = () => {
    info.student_name = document.getElementById('name').value;
    info.email = document.getElementById('email').value;
    info.image = document.getElementById('image').value;
    info.website = document.getElementById('website').value;
    info.gender = document.querySelector('input[name="gender"]:checked').value;
    let skills = document.querySelectorAll('.check-box:checked');

    info.skillArr = [];
    skills.forEach((item) => {
        info.skillArr.push(item.value);
    })

    if (localStorage.getItem("infoSection") === null) {
        infoItem = [];
    }
    else {
        infoItem = JSON.parse(localStorage.getItem("infoSection"));
    }
    infoItem.push(info);
    localStorage.setItem("infoSection", JSON.stringify(infoItem));
}

const showData = () => {
    let cardContainer = document.getElementById("card-Container");

    let cards = '';

    let getLocalStorage = localStorage.getItem("infoSection");

    if (getLocalStorage === null) {
        console.log("null");
    }
    else {
        cardDivArr = JSON.parse(getLocalStorage);

        cardDivArr.forEach((item, index) => {

            cards += `<div class="card">
            <img src=${item.image} alt="Profile Picture">
            <div class="info">
                <p>Name : ${item.student_name}</p>
                <p>Email : ${item.email}</p>
                <p>Website : <a href="${item.website}">Click here</a></p>
                <p>Gender : ${item.gender}</p>
                <p>Skills : ${item.skillArr.join(", ")}</p>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        </div>`;
        })
    }
    cardContainer.innerHTML = cards;
}

const deleteData = (index) => {
    let getList = JSON.parse(localStorage.getItem("infoSection"));
    getList.splice(index, 1);

    localStorage.setItem("infoSection", JSON.stringify(getList));
    window.location.reload();
}

showData();

submitBtn.addEventListener(('click'), () => {
    getData();
    showData();
})