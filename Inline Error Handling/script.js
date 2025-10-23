const form = document.getElementById("registerForm");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirm");

const msg = document.getElementById("msg");

nameField.addEventListener("input", validateName);
emailField.addEventListener("input", validateEmail);
passwordField.addEventListener("input", validatePassword);
confirmPasswordField.addEventListener("input", validateConfirmPassword);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validateName() &
    validateEmail() &
    validatePassword() &
    validateConfirmPassword()
  ) {
    msg.style.color = "green";
    msg.textContent = "form Succesfuly validated";
    form.reset();
    setTimeout(() => (msg.textContent = ""), 3000);
  } else {
    msg.style.color = "red";
    msg.textContent = "please fix the error above";
  }
});

function validateName() {
  const nameValue = nameField.value.trim();
  if (nameValue.length < 3) {
    setError(nameField, "Name must be at least 3 char");
    return false;
  }
  setSuccess(nameField, "Looks Good!");
  return true;
}

function validateEmail() {
  const emailValue = emailField.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    setError(emailField, "Theek se dal chu**ye");
    return false;
  }
  setSuccess(emailField, "Accha hai");
  return true;
}

function validatePassword() {
  const passValue = passwordField.value.trim();
  const passPattern = /^(?=.*\d).{6,}$/;
  if (!passPattern.test(passValue)) {
    setError(passwordField, "Bhul gaya");
    return false;
  }
  setSuccess(passwordField, "Acha  hai");
  return true;
}

function validateConfirmPassword() {
  const passValue = passwordField.value.trim();
  const confirmValue = confirmPasswordField.value.trim();
  if (confirmValue !== passValue || confirmValue === "") {
    setError(confirmPasswordField, "Match nahi hua");
    return false;
  }
  setSuccess(confirmPasswordField, "Password Matched");
  return true;
}

function setError(input, message) {
  const group = input.parentElement;
  const small = group.querySelector("small");
  group.className = "form-group error";
  small.textContent = message;
}
function setSuccess(input,message){
    const group=input.parentElement;
    const small=group.querySelector("small");
    group.className="form-group success";
    small.textContent=message;
}
