const searchBar=document.getElementById("searchBar");
const projectsList=document.getElementById("projectsList");
const projects=projectsList.getElementsByTagName("li");

searchBar.addEventListener("keyup",function(){
 const searchValue=searchBar.value.toLowerCase();

 for (let i=0; i<projects.length; i++){
    let project=projects[i].textContent.toLowerCase();
    if(project.includes(searchValue)){
        projects[i].classList.remove("hidden");
    }else{
        projects[i].classList.add("hidden");
    }
 }
}
)