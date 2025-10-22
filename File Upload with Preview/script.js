const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const fileInfo = document.getElementById('fileInfo');
const uploadBtn = document.getElementById('uploadBtn');
const imagePreview = document.getElementById('imagePreview');

let selectedFiles = [];

if (dropZone) {
  dropZone.addEventListener('click', () => fileInput?.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer?.files || [];
    selectedFiles = Array.from(files);
    handleFiles({ target: { files } });
  });
}

if (fileInput) fileInput.addEventListener('change', (e) => {
  selectedFiles = Array.from(e.target.files);
  handleFiles(e);
});

function handleFiles(event) {
  const files = event?.target?.files || [];
  if (!imagePreview || !fileInfo) return;

  imagePreview.innerHTML = '';
  fileInfo.textContent = '';

  let validCount = 0;

  Array.from(files).forEach(file => {
    if (file.size > 10 * 1024 * 1024) { // Increased to 10MB for all files
      const p = document.createElement('p');
      p.textContent = `⚠️ "${file.name}" is too large (max 10MB).`;
      p.style.color = '#f08a24';
      imagePreview.appendChild(p);
      return;
    }

    validCount++;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result;
        img.style.maxWidth = '100px';
        img.style.marginRight = '8px';
        imagePreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files, show file icon or name
      const div = document.createElement('div');
      div.style.display = 'inline-block';
      div.style.marginRight = '8px';
      div.style.padding = '10px';
      div.style.border = '1px solid #ccc';
      div.style.borderRadius = '4px';
      div.style.background = '#f9f9f9';
      div.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      imagePreview.appendChild(div);
    }
  });

  if (files.length > 0) {
    fileInfo.textContent = `${validCount} valid file(s) selected out of ${files.length}`;
  } else {
    fileInfo.textContent = '';
  }
}

if (uploadBtn) {
  uploadBtn.addEventListener('click', () => {
    if (selectedFiles.length === 0) {
      alert('Please select a file first!');
      return;
    }
    alert('Files are ready to upload');
  });
}
