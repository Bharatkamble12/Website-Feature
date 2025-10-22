const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');
const formSteps = document.querySelectorAll('.form-step');

let currentStep = 0;

// Buttons
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const prev2 = document.getElementById('prev2');
const prev3 = document.getElementById('prev3');
const form = document.getElementById('multiStepForm');

// Initialize first step and progress
if (formSteps && formSteps.length > 0) formSteps[0].classList.add('active');
updateProgressBar();

// Validation functions
function validateStep(stepIndex) {
  const currentFormStep = formSteps[stepIndex];
  const inputs = currentFormStep.querySelectorAll('input[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.style.borderColor = '#ff6b6b';
      isValid = false;
    } else {
      input.style.borderColor = '#e0e0e0';
    }
  });

  return isValid;
}

function showError(message) {
  // Simple error display - you could enhance this with a proper error element
  alert(message);
}

// Event listeners
if (next1) next1.addEventListener('click', () => {
  if (validateStep(currentStep)) {
    changeStep(1);
  } else {
    showError('Please fill in all required fields.');
  }
});

if (next2) next2.addEventListener('click', () => {
  if (validateStep(currentStep)) {
    changeStep(1);
  } else {
    showError('Please fill in all required fields.');
  }
});

if (prev2) prev2.addEventListener('click', () => changeStep(-1));
if (prev3) prev3.addEventListener('click', () => changeStep(-1));

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      alert('Form submitted successfully!');
      // Reset form or redirect as needed
      form.reset();
      currentStep = 0;
      updateProgressBar();
      formSteps.forEach(step => step.classList.remove('active'));
      if (formSteps[0]) formSteps[0].classList.add('active');
    } else {
      showError('Please fill in all required fields.');
    }
  });
}

function changeStep(stepChange) {
  if (!formSteps || formSteps.length === 0) return;
  const newIndex = currentStep + stepChange;
  if (newIndex < 0 || newIndex >= formSteps.length) return;

  formSteps[currentStep]?.classList.remove('active');
  currentStep = newIndex;
  formSteps[currentStep]?.classList.add('active');
  updateProgressBar();
}

function updateProgressBar() {
  if (!progress || !circles || circles.length === 0) return;

  circles.forEach((circle, index) => {
    if (index <= currentStep) circle.classList.add('active');
    else circle.classList.remove('active');
  });

  const actives = document.querySelectorAll('.circle.active').length;
  const denom = circles.length - 1;
  const pct = denom > 0 ? ((actives - 1) / denom) * 100 : 0;
  progress.style.width = isFinite(pct) ? pct + '%' : '0%';
}
