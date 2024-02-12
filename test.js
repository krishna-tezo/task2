
function sortTable(column){
    const tableRows = document.querySelectorAll(".employee-table-row")
    var shouldSwitch;
    var dir="asc";
    var switching = true;
    while(switching){
        switching=false;
        for(let i=1;i<tableRows.length-1;i++){
            shouldSwitch=false;
            if(column=='user'){
                x=tableRows[i].querySelector(".user-profile-name").innerHTML[0];
                y=tableRows[i+1].querySelector(".user-profile-name").innerHTML[0];                
            }
            else{
                x=tableRows[i];

            }
            
        }
    }
}