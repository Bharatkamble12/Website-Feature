const form=document.getElementById("signupForm");
const usernameInput=document.getElementById("username");
const email=document.getElementById("email");
const passwordInput=document.getElementById("password");
const confirmPassword=document.getElementById("confirmPassword");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    validateInputs();
});

function validateInputs(){
    if(usernameInput.value.trim()===''){
        setError(usernameInput,'Username is Required')
    }else{
        setSuccess(usernameInput);
    }



    if(!isValidEmail(email.value)){
        setError(email,'Invalid email Address')
    }else{
        setSuccess(email);
    }

    if(passwordInput.value.length<6){
        setError(passwordInput,'Password must be at least 6  characters');
    }else{
        setSuccess(passwordInput);
    }
    if(confirmPassword.value!==passwordInput.value ||confirmPassword.value===''){
        setError(confirmPassword,'Password does not match');
    }else{
        setSuccess(confirmPassword);
    }
}

function setError(input,message){
    const small=input.nextElementSibling;
    small.style.display='block';
    small.textContent=message;
    input.classList.add('error');
    input.classList.remove('success');
}
function setSuccess(input){
    const small=input.nextElementSibling;
    small.style.display='none';
    input.classList.add('success');
    input.classList.remove('error');
}
function isValidEmail(email){
  return /^\S+@\S+\.\S+$/.test(email);
}

