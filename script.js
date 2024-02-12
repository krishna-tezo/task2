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

var data = [];
var alphabetFiltered = [];
var optionFiltered = [];
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
fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    localStorage.setItem("employeesDetails", JSON.stringify(json.employees));
    localStorage.setItem("alphabetFiltered", JSON.stringify(json.employees));
    localStorage.setItem("optionFiltered", JSON.stringify(json.employees));
    data = JSON.parse(localStorage.getItem("employeesDetails"));
    alphabetFiltered=json.employees;
    optionFiltered=json.employees;
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
      <div class="ellipsis" onclick="showEllipsisMenu(this)">
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


function showEllipsisMenu(div){
    div.children[1].classList.toggle("active");
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
var isAlphabetFiltered = false;
var isOptionFiltered=false;

function filterNames(char, btn) {
  alphabetFiltered=JSON.parse(localStorage.getItem("optionFiltered"));
  var tempData = alphabetFiltered.slice();
  if (!isAlphabetFiltered) {
    for (let employee of alphabetFiltered) {
      if (employee.userProfile.firstName[0] != char) {
        const index = tempData.indexOf(employee);
        tempData.splice(index, 1);
      }
    }
    alphabetFiltered=tempData.slice();
    localStorage.setItem("alphabetFiltered",JSON.stringify(alphabetFiltered));
    unpopulateTableData();
    populateTableData(alphabetFiltered);
  } else {
    localStorage.setItem("alphabetFiltered",JSON.stringify(data));
    unpopulateTableData();
    let oFiltered= JSON.parse(localStorage.getItem("optionFiltered"));
    populateTableData(oFiltered);
  }

  isAlphabetFiltered = !isAlphabetFiltered;
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

function filter(criteria, selectedOption) {
  
  let tempData = optionFiltered.slice();

  var empData = undefined;

  for (let employee of optionFiltered) {
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
  optionFiltered=tempData.slice();

}

function filterOptionsApply() {
  optionFiltered = JSON.parse(localStorage.getItem("alphabetFiltered"));
  if (filterSelect[0].value != "") {
    filter("status", filterSelect[0].value);
  }
  if (filterSelect[1].value != "") {
    filter("location", filterSelect[1].value);
  }
  if (filterSelect[2].value != "") {
    filter("department", filterSelect[2].value);
  }
  unpopulateTableData();
  populateTableData(optionFiltered);
  localStorage.setItem("optionFiltered",JSON.stringify(optionFiltered));
}

//Reset Filter
function resetFilter() {
  localStorage.setItem("optionFiltered",JSON.stringify(data));
  filterSelect[0].selectedIndex = 0;
  filterSelect[1].selectedIndex = 0;
  filterSelect[2].selectedIndex = 0;
  
  btnFilters[3].style.display = "none";
  btnFilters[4].style.display = "none";
  
  unpopulateTableData();
  let aData = JSON.parse(localStorage.getItem("alphabetFiltered"));
  populateTableData(aData);
}

// Add Employee
function handleAddEmployee() {
  unpopulateTableData();
  window.open("addemployee.html");
  var newData = JSON.parse(localStorage.getItem("employeesDetails"));
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
