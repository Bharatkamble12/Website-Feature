// Function to calculate total fee
function calculateTotalFee() {
  const formFee = parseFloat(document.getElementById('formFee').value) || 0;
  const examFee = parseFloat(document.getElementById('examFee').value) || 0;
  const capFee = parseFloat(document.getElementById('capFee').value) || 0;
  const marksFee = parseFloat(document.getElementById('marksFee').value) || 0;
  const total = formFee + examFee + capFee + marksFee;
  document.getElementById('totalFee').value = total;
}

// Add event listeners to fee inputs for auto-calculation
document.addEventListener('DOMContentLoaded', function() {
  const feeInputs = ['formFee', 'examFee', 'capFee', 'marksFee'];
  feeInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', calculateTotalFee);
    }
  });
});

// Initial calculation
calculateTotalFee();

// Download PDF logic
document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("examForm");

  // Basic validation: check if required fields are filled
  const requiredFields = ['name', 'mother', 'email', 'contact', 'prn', 'college', 'course', 'semester'];
  let isValid = true;
  requiredFields.forEach(id => {
    const field = document.getElementById(id);
    if (field && !field.value.trim()) {
      isValid = false;
      field.style.border = '2px solid red';
      field.style.borderRadius = '0.375rem';
    } else if (field) {
      field.style.border = '';
    }
  });

  if (!isValid) {
    alert('Please fill in all required fields marked in red.');
    return;
  }

  // Optional: style inputs for cleaner PDF (remove focus styles, etc.)
  const inputs = element.querySelectorAll("input");
  inputs.forEach(input => {
    input.style.border = "none";
    input.style.outline = "none";
    input.style.boxShadow = "none";
  });

  const options = {
    margin: [10, 10, 10, 10],
    filename: 'SPPU_Exam_Form.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(element).save().then(() => {
    // Restore styles after PDF generation
    inputs.forEach(input => {
      input.style.border = '1px solid #d1d5db'; // Tailwind border-gray-300 equivalent
      input.style.outline = '';
      input.style.boxShadow = '';
    });
  }).catch((error) => {
    console.error('PDF generation failed:', error);
    alert('PDF download failed. Please check the console for errors.');
  });
});
