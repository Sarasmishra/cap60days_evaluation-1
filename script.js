let currentPage = 1;
// number of employee per page
const limit = 10  
let departmentfilter =""
let genderfilter =""
let sort = ""

function fetchemployee(page){
    let url =`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`
   if(departmentfilter){
    url+= `&filterBy=department&filterValue=${departmentfilter}`
   }
   if(genderfilter){
    url+=`&filterBy=gender&filterValue=${genderfilter}`
   }
   if(sort){
    url+=`&sort=salary&order=${sort}`
   }


   
fetch(url)
.then(response =>{
    return response.json();
})
.then(data =>{
    console.log("data received",data)
    displayEmployee(data.data)

})


}





function displayEmployee(employees){
    let employeebody = document.querySelector('#employeeBody')
    employeebody.innerHTML = ""
    employees.forEach((employee,index)=>{
        // it create a new row
        const row = employeebody.insertRow();
        const cellIndex = row.insertCell(0);
        const cellname = row.insertCell(1);
        const cellGender = row.insertCell(2)
        const cellDepartment = row.insertCell(3)
        const cellSalary = row.insertCell(4)

        cellIndex.textContent = index +1;
        cellname.textContent = employee.name
        cellGender.textContent = employee.gender
        cellDepartment.textContent = employee.department
        cellSalary.textContent = employee.salary
  
         

    })
}     

function Navigation(data){
    currentPage += data
    console.log(currentPage)
    if(currentPage<1){
        currentPage = 1;
    }
    fetchemployee(currentPage)
}

function applyfilter(){
    const departmentfilterselect = document.querySelector('#departmentfilter')
    departmentfilter = departmentfilterselect.value
    const genderfilterselect = document.querySelector('#genderfilter')
     genderfilter = genderfilterselect.value
     const sortselect = document.querySelector('#sort')
     sort = sortselect.value;
    //   reset to first page when applying filter
     fetchemployee(1)
}







fetchemployee(currentPage);



