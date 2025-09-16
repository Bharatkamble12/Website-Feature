    const toggleSwitch = document.querySelector('.toggle-switch');
    if(localStorage.getItem("theme")==="dark"){
        document.body.classList.add("dark");
        toggleSwitch.classList.add("active");
    }
    function toggleDarkMode(){
        document.body.classList.toggle("dark");
        toggleSwitch.classList.toggle("active");
        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme","dark");
        }else{
            localStorage.setItem("theme","light");
        }
    }