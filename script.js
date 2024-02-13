var data = [];
var displayData = [];

// Collapse
var isCollapsed = false;
function sidePanelToggle() {
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

//Populating the table with rows
//Fetching data from JSON
fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    if (!localStorage.getItem("employeesDetails"))
      localStorage.setItem("employeesDetails", JSON.stringify(json.employees));
    data = JSON.parse(localStorage.getItem("employeesDetails"));
    displayData = data.slice();
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

function showEllipsisMenu(div) {
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
  const div = document.createElement("div");
  const char = String.fromCharCode(64 + i);
  div.setAttribute("onclick", "addToFilter(this)");
  div.innerHTML = `${char}`;
  filterDiv.appendChild(div);
}

function showDropdown(currFilterOption) {
  currFilterOption.nextElementSibling.classList.toggle("active");
  const btnFilters = document.querySelectorAll(".filter-options-btn");
  btnFilters[3].style.display = "inline-block";
  btnFilters[4].style.display = "inline-block";
}

//Adding data to the object
var selectedFilter = {
  char: [],
  status: [],
  location: [],
  department: [],
};

function addToFilter(element) {
  var criteria = "";
  if (element.innerHTML.length == 1) {
    criteria = "char";
  } else {
    displayDelete();
    criteria = element.classList[1];
  }
  var filterName = element.innerHTML;
  var arr = selectedFilter[criteria];
  if (!arr.includes(filterName)) {
    arr.push(filterName);
  } else {
    arr.splice(arr.indexOf(filterName), 1);
  }
  element.classList.toggle("active");
  if (criteria == "char") {
    applyFilter();
  }
}

function applyFilter() {
  displayData = data.slice();
  let types = Object.keys(selectedFilter);
  var arr = [];
  types.forEach((type) => {
    arr = selectedFilter[type];
    if (arr.length > 0) alphabetFilter(type, arr);
  });
  unpopulateTableData();
  populateTableData(displayData);
}

function alphabetFilter(type, arr) {
  var tempData = displayData.slice();
  var valueToCompare = undefined;

  for (let employee of displayData) {
    if (type == "char") {
      valueToCompare = employee.userProfile.firstName[0];
    } else if (type == "location") {
      valueToCompare = employee["role"]["location"];
    } else if (type == "department") {
      valueToCompare = employee["role"]["department"];
    } else {
      valueToCompare = employee[type];
      if (valueToCompare == false) {
        valueToCompare = "Inactive";
      } else {
        valueToCompare = "Active";
      }
    }

    let isMatched = false;
    for (let i of arr) {
      if (valueToCompare == i) {
        isMatched = true;
      }
    }
    if (!isMatched) {
      tempData.splice(tempData.indexOf(employee), 1);
    }
  }
  displayData = tempData.slice();
}

//Reset Filter
function resetFilter() {
  selectedFilter.status = [];
  selectedFilter.location = [];
  selectedFilter.department = [];
  let filterBtn = document.querySelectorAll(".drop-down-menu");
  applyFilter();
  filterBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
  btnFilters[3].style.display = "none";
  btnFilters[4].style.display = "none";
}

//Table To CSV
var csvData = "";
function exportToCSV() {
  let employees = displayData.slice();
  let headers = Object.keys(employees[0]);
  headers.forEach((item) => {
    if (item == "userProfile") {
      csvData += "Name" + ", ";
      Object.keys(employees[0]["userProfile"]).forEach((userProfileItem) => {
        if (userProfileItem == "email") {
          csvData += userProfileItem + ", ";
        }
      });
    } else if (item == "role") {
      Object.keys(employees[0]["role"]).forEach((roleItem) => {
        if (
          roleItem == "roleName" ||
          roleItem == "department" ||
          roleItem == "location"
        ) {
          csvData += roleItem + ", ";
        }
      });
    } else {
      csvData += item + ", ";
    }
  });
  csvData += "\n";
  csvData = getData(csvData,employees);
  console.log(csvData);
  downloadCSVFile(csvData);
}
function getData(csvData,employees) {
  for (let employee of employees) {
    let headers = Object.keys(employees[0]);
    headers.forEach((item) => {
      if (item == "userProfile") {
        let name = "";
        let email = "";
        Object.keys(employees[0]["userProfile"]).forEach((userProfileItem) => {
          if (userProfileItem == "firstName" || userProfileItem == "lastName")
            name += employee["userProfile"][userProfileItem] + " ";
          else if (userProfileItem == "email") {
            email += employee["userProfile"][userProfileItem];
          }
        });
        csvData += name + ", " + email + ", ";
      } else if (item == "role") {
        Object.keys(employees[0]["role"]).forEach((roleItem) => {
          if (
            roleItem == "roleName" ||
            roleItem == "department" ||
            roleItem == "location"
          ) {
            csvData += employee["role"][roleItem] + ", ";
          }
        });
      } else {
        csvData += employee[item] + ", ";
      }
    });
    csvData += "\n";
  }
  return csvData;
}

function downloadCSVFile(csvData) {
  var blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const exportBtn = document.querySelector(".employees-header-btn-export");
  var link = document.createElement("a");
  if (link.download !== undefined) {
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "mydata.csv");
    link.style.visibility = "hidden";
    link.click();
  }
}

// Add Employee
function handleAddEmployee() {
  unpopulateTableData();
  window.open("addemployee.html");
  var newData = JSON.parse(localStorage.getItem("employeesDetails"));
  populateTableData(newData);
}

//Delete Selection
//const tableRows = document.querySelectorAll(".employee-table-row"
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