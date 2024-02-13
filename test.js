// function sortTable(column){
//     const tableRows = document.querySelectorAll(".employee-table-row")
//     var shouldSwitch;
//     var dir="asc";
//     var switching = true;
//     while(switching){
//         switching=false;
//         for(let i=1;i<tableRows.length-1;i++){
//             shouldSwitch=false;
//             if(column=='user'){
//                 x=tableRows[i].querySelector(".user-profile-name").innerHTML[0];
//                 y=tableRows[i+1].querySelector(".user-profile-name").innerHTML[0];
//             }
//             else{
//                 x=tableRows[i];

//             }

//         }
//     }
// }

//Table Sort

var arr1 = [
  {
    name: "abhishek",
    roll: "2",
  },
  {
    name: "krishna",
    roll: "1",
  },
  {
    name: "harsh",
    roll: "3",
  },
  {
    name: "aman",
    roll: "4",
  },
];

arr1.sort((a, b) => {
  if (a.name - b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});
// arr1.sort();
console.log(arr1);
