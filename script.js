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

var tableData="";

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

//Schema
// var role = {
//   id: "123",
//   name: "Full-Stack developer",
//   department: "dept-name",
//   description: "This is description",
//   location: "Hyderabad",
//   employees: ["employee-1", "employee-2"]
// };

// var employee = {
//   userProfile: {
//     link: "assets/profile-pic-1.png",
//     firstName: "Edgar",
//     lastName: "Jones",
//     email: "edgar@tezo.com",
//   },
//   empNo: "TZ002341",
//   dob: new Date("2002-02-12"),
//   mobNumber: "9999999999",
//   managerName: "Edgar Holmes",
//   projectName: "UI/UX",
//   roleId: "123",
//   status: true,
//   joinDate: new Date("2023-03-12"),

//   role: {
//     id: "123",
//     name: "Full-Stack developer",
//     department: "dept-name",
//     description: "This is description",
//     location: "Hyderabad",
//     employees: ["employee-1", "employee-2"],
//   },
// };


// Populating the table with rows
//Fetching data from JSON
var data = "";
fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    data = json.employees;
    populateTableData();
    tableRows = document.querySelectorAll(".employee-table tbody tr");
  });
  
function populateTableData() {
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
    <td><input type="checkbox" name="check" /></td>
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
    <td>...</td>
    `;
    tableBody.appendChild(row);
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
  btn.classList.toggle("active");
  for (let button of buttons) {
    if (button !== btn) {
      button.classList.toggle("not-allowed");
    }
  }

  for (let i = 0; i < tableRows.length; i++) {
    const nameStartingLetter = data[i].userProfile.firstName[0];
    if (nameStartingLetter != char) {
      tableRows[i].classList.toggle("hide");
    }
  }
}

//Exporting to CSV
// const tableData = document.querySelectorAll(".employee-table");

// function exportToCSV(){
//   let csv_data = [];
//   for(let i=0; i<tableRows.length;i++){
//     let cols = tableRows[i].querySelectorAll('td,th');
//   }
// }

//Fliter options
const filterSelect = document.getElementsByClassName("filter-options-btn");
function resetFilter() {
  filterSelect[0].selectedIndex = 0;
  filterSelect[1].selectedIndex = 0;
  filterSelect[2].selectedIndex = 0;
  showAllRows();
}

function showAllRows() {
  tableRows.forEach((row) => {
    row.classList.remove("hide");
  });
}

function filterOptionsApply() {
  showAllRows();
  //Status
  for (row of tableRows) {
    var status = row.children[6].children[0].innerHTML;
    if (filterSelect[0].value == "") break;
    else if (status != filterSelect[0].value) {
      row.classList.add("hide");
    }
  }

  //Location
  for (row of tableRows) {
    city = row.children[2].innerHTML;
    if (filterSelect[1].value == "") break;
    else if (city != filterSelect[1].value) {
      row.classList.add("hide");
    }
  }

  //Department
  for (row of tableRows) {
    var department = row.children[3].innerHTML;
    if (filterSelect[2].value == "") break;
    else if (department != filterSelect[2].value) {
      row.classList.add("hide");
    }
  }
}