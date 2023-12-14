const pageLimit = 10;
let currentPage = 1;
let totalPages;
let data;

async function fetchData() {
  const response = await fetch(`https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json`);
  data = await response.json();

  totalPages = Math.ceil(data.length / pageLimit);

  displayItems();

  pagination();
}

function displayItems() {
  const startIndex = (currentPage - 1) * pageLimit;
  const endIndex = startIndex + pageLimit;

  const currentItems = data.slice(startIndex, endIndex);

  const container = document.getElementById("items");
  container.innerHTML = "";

  currentItems.forEach((item) => {
    container.innerHTML += `
      <div class="dataItem">
        <h3>Name: ${item.name}</h3>
        <h5>ID: ${item.id}</h5>
        <h6>Email: ${item.email}</h6>
      </div>
    `;
  });
}

function pagination() {
  const container = document.getElementById("pagination-container");
  container.innerHTML = "";

  if (currentPage > 1) {
    container.innerHTML += `<a href="#" class="pagination-link" data-action="prev">Previous</a>`;
  }

  container.innerHTML += `<span id="currentPage">  Page ${currentPage} </span>`;

  if (currentPage < totalPages) {
    container.innerHTML += `<a href="#" class="pagination-link" data-action="next">Next</a>`;
  }
}

document.getElementById("pagination-container").addEventListener("click", function (event) {
  const action = event.target.dataset.action;

  if (action === "prev") {
    goToPrevious();
  } else if (action === "next") {
    goToNext();
  }
});

function goToPrevious() {
  if (currentPage > 1) {
    currentPage--;
    displayItems();
    pagination();
  }
}

function goToNext() {
  if (currentPage < totalPages) {
    currentPage++;
    displayItems();
    pagination();
  }
}

fetchData();
