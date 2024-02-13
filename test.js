
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


var selectedFilter = {
    "char":[],
    "status":[],
    "location":[],
    "department":[]
}

const filterDiv = document.querySelector(".filter-alphabets");

for (let i = 1; i <= 26; i++) {
  const btn = document.createElement("div");
  const char = String.fromCharCode(64 + i);
  btn.setAttribute('onclick','addToFilter(this)')
  btn.innerHTML = `${char}`;
  filterDiv.appendChild(btn);
}

function addToFilter(element){
    var criteria="";
    if(element.innerHTML.length()==1){
        criteria="char";
    }
    else{
        criteria=element.classList[1];
    }
    var filterName=element.innerHTML;
    var arr = selectedFilter[criteria];
    if(!arr.includes(filterName)){
        arr.push(filterName);
    }
    else{
        arr.splice(arr.indexOf(filterName),1);
    }
    element.classList.toggle("active");
    if(element.classList==0){
        applyFilter();
    }
}

function showDropdown(currFilterOption){
    currFilterOption.nextElementSibling.classList.toggle("active");
}

function applyFilter(){
    let types=Object.keys(selectedFilter);
    var arr=[];
    types.forEach((type)=>{
        arr=selectedFilter[type];
    })
    arr.forEach((value)=>{
        console.log(value);
    })
}
