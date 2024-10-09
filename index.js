// fetching button category
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console(error));
};
const loadPets = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console(error));
};

// function
const loadCategoryPet = () => {
  document.getElementById("spinner").style.display = "none";
};

const handleSearch = (category) => {
  document.getElementById("spinner").style.display = "block";
  // fetch
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("active");
        displayPets(data.data);
      })
      .catch((error) => console(error));
    loadCategoryPet();
  }, 2000);
};
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
// modal-1
const showPetDetail = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  console.log(data.petData);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
             <div>
              <img class ="rounded-lg"
                src=${data.petData.image}
                alt=""
              />
            </div>
            <div class="card-body">
              <h2 class="card-title text-3xl font-bold"> ${
                data.petData.pet_name
                  ? `${data.petData.pet_name}`
                  : "Not Available"
              }</h2>
              <p><i class="fa-solid fa-table-cells-large mr-1"></i>Breed: ${
                data.petData.breed ? `${data.petData.breed}` : "Not Available"
              }</p>
              <p><i class="fa-solid fa-cake-candles mr-1"></i>Birth: ${
                data.petData.date_of_birth
                  ? `${data.petData.date_of_birth}`
                  : "Not Available"
              }</p>
              <p><i class="fa-solid fa-venus-mars mr-1"></i> Gender: ${
                data.petData.gender ? `${data.petData.gender}` : "Not Available"
              }</p>
              <p><i class="fa-solid fa-hand-holding-dollar mr-1"></i>Price: $${
                data.petData.price ? `${data.petData.price}` : "Not Available"
              }</p>
              <p><i class="fa-solid fa-syringe mr-1"></i></i>Price: ${
                data.petData.vaccinated_status
                  ? `${data.petData.vaccinated_status}`
                  : "Not Available"
              }</p>
                  <h1 class="text-3xl font-bold">Details Information</h1>
                  <p class ="text-gray-500 font-normal text-sm">${
                    data.petData.pet_details
                  }</p>
                  </div>
            <div class="modal-action">
              <form method="dialog"> 
                <button class="btn w-full">Close</button>
              </form>
              
            </div>
          </div>
        </dialog>
  `;
  my_modal_1.showModal();
};
// Modal-2
function countModal(button) {
  const modal = document.getElementById("countModal");
  const countdownElement = document.getElementById("countdown");
  modal.style.display = "block";

  let timeLeft = 3;
  countdownElement.textContent = timeLeft;
  const countdown = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= -1) {
      clearInterval(countdown);
      modal.style.display = "none";
      button.classList.add("btn-disabled");
    }
  }, 1000);
}

// display
const displayCategories = (categories) => {
  const buttonCategory = document.getElementById("button-category");
  categories.forEach((item) => {
    const button = document.createElement("div");
    button.innerHTML = `
        <button id="btn-${item.category}" onclick ="handleSearch('${item.category}')" class="btn lg:btn-lg category-btn rounded-3xl font-bold text-2xl space-y-4 border-blue-400 flex gap-6"><img class ="h-10 w-10" src="${item.category_icon}">${item.category}</button>
        `;

    buttonCategory.append(button);
  });
};

const displayPets = (pets) => {
  const petContainer = document.getElementById("pets");
  petContainer.innerHTML = "";

  if (pets.length == 0) {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
      <div class="min-h-screen flex flex-col gap-5 justify-center items-center">
          <img src="images/error.webp" alt="">
          <h4 class="text-3xl font-bold">No Information Available</h4>
        <p class="text-gray-600">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        </div>
      `;
    return;
  } else {
    petContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card bg-base-100 p-2 border border-gray-300 ";
    card.innerHTML = `
            <div>
              <img class ="rounded-lg"
                src=${pet.image}
                alt=""
              />
            </div>
            <div class="card-body">
              <h2 class="card-title text-extrabold"> ${
                pet.pet_name ? `${pet.pet_name}` : "Not Available"
              }</h2>
              <p><i class="fa-solid fa-table-cells-large mr-1"></i>Breed: ${
                pet.breed ? `${pet.breed}` : "Not Available"
              }</p>
              <p><i class="fa-solid fa-cake-candles mr-1"></i>Birth: ${
                pet.date_of_birth ? `${pet.date_of_birth}` : "Not Available"
              }</p>
              <p><i class="fa-solid fa-venus-mars mr-1"></i> Gender: ${
                pet.gender ? `${pet.gender}` : "Not Available"
              }</p>
              <p><i class="fa-solid fa-hand-holding-dollar mr-1"></i>Price: $${
                pet.price ? `${pet.price}` : "Not Available"
              }</p>
              <div class="flex gap-3 justify-between">
                <button onclick ="addPhoto('${pet.image}')" class="btn">
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button onclick ="countModal(this)" class="btn font-bold text-teal-700">Adopt</button>
                <button onclick = "showPetDetail('${
                  pet.petId
                }')" class="btn font-bold text-teal-700">Details</button>
              </div>
            </div>
        `;
    petContainer.append(card);
  });
};
const addPhoto = (photo) => {
  const likePhoto = document.getElementById("photo");
  const div = document.createElement("div");
  div.innerHTML = `
  <img class ="w-full mt-2 rounded-md p-1 border border-gray-300" src="${photo}" alt="">
  `;
  likePhoto.append(div);
};

loadCategories();
loadPets();
