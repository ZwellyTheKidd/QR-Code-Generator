// Get DOM elements
const inputField = document.getElementById('url');
const qrCode = document.getElementById('qr-code');
const qrCanvas = document.getElementById('qr-canvas');
const downloadButton = document.getElementById('download-button');

// Listen for changes to the URL field
inputField.addEventListener('input', function() {
  // Generate QR code image URL
  const url = inputField.value.trim();
  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(url)}`;

  // Update QR code image and canvas
  qrCode.src = qrCodeUrl;
  const ctx = qrCanvas.getContext('2d');
  const img = new Image();
  img.src = qrCodeUrl;
  img.addEventListener('load', function() {
    ctx.drawImage(img, 0, 0, 200, 200);
  });
});

// Listen for download button click
downloadButton.addEventListener('click', function() {
  const url = inputField.value.trim();
  const filename = `QR_${url.replace(/[\W_]+/g, "_")}.png`;

  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', filename);
  qrCanvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  });
});