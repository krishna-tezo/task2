const collapseBtn = document.querySelector(".side-panel-collapse-btn");
const mainContainer = document.querySelector(".main-container");
const sidePanel = document.querySelector(".side-panel");
const logoImage = document.querySelector(".logo-img");
const selectorTitles = document.querySelectorAll(".side-panel-title");
const rightLogos = document.querySelectorAll(".side-panel-logo-right");
const updateBox = document.querySelector(".side-panel-update-box");
const sidePanelHeadings = document.querySelectorAll(".side-panel-heading");
const svgImages = document.querySelectorAll(".svg-image");
const headerContainer = document.querySelectorAll(
  ".side-panel-header-container"
);
const pseudoSideBar = document.querySelector(".pseudo-side-bar");

// Collapse
var isCollapsed = false;
function sidePanelToggle() {
  mainContainer.classList.toggle("collapsed");
  updateBox.classList.toggle("hide");
  pseudoSideBar.classList.toggle("hide");

  if (isCollapsed == false) {
    logoImage.src = "assets/tezo-logo-icon.svg";
  } else {
    logoImage.src = "assets/tezo-logo.svg";
  }

  for (let i = 0; i < selectorTitles.length; i++) {
    headerContainer[i].classList.toggle("collapsed");
    selectorTitles[i].classList.toggle("hide");
  }

  for (let heading of sidePanelHeadings) {
    heading.classList.toggle("hide");
  }

  for (let rightLogo of rightLogos) {
    rightLogo.classList.toggle("hide");
  }

  collapseBtn.classList.toggle("collapsed");
  isCollapsed = !isCollapsed;
}

// Populating the table with rows
//Fetching data from JSON
var data = [];
fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    if (!localStorage.getItem("employeesDetails")) {
      localStorage.setItem("employeesDetails", JSON.stringify(json.employees));
    }
    data = localStorage.getItem("employeesDetails");
    data = JSON.parse(data);
    populateTableData(data);
  });

function populateTableData(data) {
  const tableBody = document.querySelector(".employee-table-data");
  for (let i = 0; i < data.length; i++) {
    var imgLink = data[i].userProfile.link;
    var firstName = data[i].userProfile.firstName;
    var lastName = data[i].userProfile.lastName;
    var email = data[i].userProfile.email;
    var location = data[i].role.location;
    var department = data[i].role.department;
    var role = data[i].role.roleName;
    var empId = data[i].empNo;
    var status = "";
    var joinDt = data[i].joinDate;

    if (data[i].status == true) {
      status = "Active";
    } else {
      status = "Inactive";
    }

    const row = document.createElement("tr");
    row.classList.add("employee-table-row");
    row.innerHTML = `
    <td><label><input type="checkbox" name="check" id="check-box" class="row-checkbox" onclick="displayDelete()"/></label> </td>
    <td>
        <div class="table-user">
          <img
            src="${imgLink}"
            alt="user-profile-pic"
          />
          <div>
            <p class="user-profile-name">${firstName + " " + lastName}</p>
            <p class="user-profile-email">${email}</p>
          </div>
        </div>
    </td>
    <td>${location}</td>
    <td>${department}</td>
    <td>${role}</td>
    <td>${empId}</td>
    <td><div class="status-btn">${status}</div></td>
    <td>${joinDt}</td>
    <td>
      <div class="ellipsis">
        <div class="ellipsis-icon">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
        <div class="ellipsis-menu">
          <div>View Details</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>
      </div>
    </td>
    `;
    tableBody.appendChild(row);
  }
}

const ellipsis = document.querySelectorAll(".ellipsis");
ellipsis.forEach((elp) => {
  elp.addEventListener("click", showEllipsisMenu);
});

function showEllipsisMenu() {
  this.children[1].classList.toggle("active");
}

function unpopulateTableData() {
  const tableBody = document.querySelector(".employee-table-data");
  //Delete all childs before
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

//Rendering A to Z buttons
const filterDiv = document.querySelector(".filter-alphabets");

for (let i = 1; i <= 26; i++) {
  const btn = document.createElement("button");
  const char = String.fromCharCode(64 + i);
  btn.onclick = filterNames.bind(this, char, btn);
  btn.innerHTML = `${char}`;
  filterDiv.appendChild(btn);
}

//Filtering the rows
const buttons = document.querySelectorAll(".filter-alphabets button");
var isApplied = false;

function filterNames(char, btn) {
  unpopulateTableData();
  let filteredData = [];
  let data = JSON.parse(localStorage.getItem("employeesDetails"));

  for (let employee of data) {
    if (employee.userProfile.firstName[0] == char) {
      filteredData.push(employee);
    }
  }

  if (!isApplied) {
    populateTableData(filteredData);
  } else {
    populateTableData(data);
  }

  isApplied = !isApplied;
  btn.classList.toggle("active");
  for (let button of buttons) {
    if (button !== btn) {
      button.classList.toggle("not-allowed");
    }
  }
}

//Fliter options

//Hide Buttons
const btnFilters = document.querySelectorAll(".filter-options-btn");
const filterSelect = document.getElementsByClassName("filter-options-btn");
filterSelect[0].onchange = () => {
  console.log(filterSelect[0].value);
  btnFilters[3].style.display = "inline-block";
  btnFilters[4].style.display = "inline-block";
};
filterSelect[1].onchange = () => {
  console.log(filterSelect[1].value);
  btnFilters[3].style.display = "inline-block";
  btnFilters[4].style.display = "inline-block";
};
filterSelect[2].onchange = () => {
  console.log(filterSelect[2].value);
  btnFilters[3].style.display = "inline-block";
  btnFilters[4].style.display = "inline-block";
};


function filter(criteria, selectedOption, filteredData) {
  var tempData = filteredData.slice();
  var empData = undefined;
  for (let employee of filteredData) {
    if (criteria == "location") {
      empData = employee["role"]["location"];
    } else if (criteria == "department") {
      empData = employee["role"]["department"];
    } else {
      empData = employee[criteria];
      if (empData == false) {
        empData = "Inactive";
      } else {
        empData = "Active";
      }
    }
    if (empData != selectedOption) {
      const index = tempData.indexOf(employee);
      tempData.splice(index, 1);
    }
  }
  filteredData = tempData.slice();
  return filteredData;
}

function filterOptionsApply() {
  let filteredData = JSON.parse(localStorage.getItem("employeesDetails"));

  if (filterSelect[0].value != "") {
    filteredData = filter(
      "status",
      filterSelect[0].value,
      filteredData
    ).slice();
  }
  if (filterSelect[1].value != "") {
    filteredData = filter(
      "location",
      filterSelect[1].value,
      filteredData
    ).slice();
  }
  if (filterSelect[2].value != "") {
    filteredData = filter(
      "department",
      filterSelect[2].value,
      filteredData
    ).slice();
  }

  unpopulateTableData();
  populateTableData(filteredData);
}

//Reset Filter
function resetFilter() {
  let data = JSON.parse(localStorage.getItem("employeesDetails"));
  filterSelect[0].selectedIndex = 0;
  filterSelect[1].selectedIndex = 0;
  filterSelect[2].selectedIndex = 0;

  btnFilters[3].style.display = "none";
  btnFilters[4].style.display = "none";

  unpopulateTableData();
  populateTableData(data);
}

// Add Employee
function handleAddEmployee() {
  unpopulateTableData();
  window.open("addemployee.html");
  var newData = localStorage.getItem("employeesDetails");
  populateTableData(newData);
}

//Delete Selection
// const tableRows = document.querySelectorAll(".employee-table-row"
function displayDelete() {
  const checkBoxes = document.querySelectorAll(".row-checkbox");
  const delBtn = document.querySelector(".btn-delete");
  let count = 0;
  for (let checkBox of checkBoxes) {
    if (checkBox.checked == true) {
      count++;
    }
  }
  if (count > 0) {
    delBtn.style.display = "block";
  } else {
    delBtn.style.display = "none";
  }
}
