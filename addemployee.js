const form = document.querySelector("#employeeForm");
const btn = document.querySelector("#submit-button");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  // show the form values
  const formData = new FormData(form);
  const employeePicURL = "assets/" + formData.get("profileImage").name;
  const employeeFirstName = formData.get("firstName");
  const employeeLastName = formData.get("lastName");
  const employeeEmail = formData.get("email");
  const employeeJoinDate = formData.get("joiningDate");
  const employeeLocation = formData.get("location");
  const employeeRole = formData.get("jobTitle");
  const employeeNumber = formData.get("empNo");
  const employeeDepartment = formData.get("department");
  const employeeMobileNumber = formData.get("mobileNumber");

  var employee = {
    userProfile: {
      link: employeePicURL,
      firstName: employeeFirstName,
      lastName: employeeLastName,
      email: employeeEmail,
    },
    empNo: employeeNumber,
    dob: employeeJoinDate,
    mobNumber: employeeMobileNumber,
    managerName: "Edgar Holmes",
    projectName: "UI/UX",
    roleId: "123",
    status: true,
    joinDate: employeeJoinDate,
    role: {
      id: "123",
      roleName: employeeRole,
      department: employeeDepartment,
      description: "This is description",
      location: employeeLocation,
      employees: ["employee-1", "employee-2"],
    },
  };
  var oldData = JSON.parse(localStorage.getItem("employeesDetails"));

  oldData.push(employee);
  localStorage.setItem("employeesDetails", JSON.stringify(oldData)); 
  window.opener.location.reload();
  alert("New Employee data has been added");
  window.close();
});
