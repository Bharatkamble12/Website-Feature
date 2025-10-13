document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("examForm");

  // Optional: remove borders from inputs for cleaner look in PDF
  const inputs = element.querySelectorAll("input");
  inputs.forEach(input => input.style.border = "none");

  const options = {
    margin: 10,
    filename: 'Filled_Exam_Form.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(element).save();

  // Restore borders after PDF generation (for user clarity)
  inputs.forEach(input => input.style.border = "1px solid #ccc");
});
