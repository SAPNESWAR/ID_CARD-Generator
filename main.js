document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("result");
  const preview = document.getElementById("preview");
  const view = document.getElementById("view");
  const addTemplateButton = document.getElementById("addTemplate");

  canvas.width = 400;
  canvas.height = 250;

  const ctx = canvas.getContext("2d");
  ctx.font = "20px Helvetica";

  preview.addEventListener("click", prev);
  view.addEventListener("click", showCard);
  addTemplateButton.addEventListener("click", addTemplate);

  function prev() {
    let inEsignature = document.getElementById("inEsignature").value;
    let inBirth = document.getElementById("inBirth").value;
    let inField = document.getElementById("inField").value;
    let inYear = document.getElementById("inYear").value; // Corrected variable name
    let inNum = document.getElementById("inNum").value;

    const esignature = document.getElementById("esignature");
    const birth = document.getElementById("birth");
    const field = document.getElementById("field");
    const year = document.getElementById("year"); // Changed to "year"
    const num = document.getElementById("num");

    esignature.innerHTML = inEsignature;
    birth.innerHTML = inBirth;
    field.innerHTML = inField;
    year.innerHTML = "Year: " + inYear; // Corrected assignment
    num.innerHTML = "ID: " + inNum;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#158";
    ctx.fillRect(0, 0, canvas.width, 56);
    ctx.fillStyle = "#fff";
    ctx.fillText("Campus Card", 10, 25);
    ctx.font = "16px Arial";
    ctx.fillText("Undergraduate", 15, 45);
    ctx.fillStyle = "#000";
    ctx.fillText(esignature.innerHTML, 110, 90);
    ctx.fillText(birth.innerHTML, 110, 115);
    ctx.fillText(field.innerHTML, 110, 140);
    ctx.fillText(year.innerHTML, 110, 165); // Changed to "year"
    ctx.fillText(num.innerHTML, 110, 190); // Adjusted position for "ID" field

    const img = document.getElementById("imgDisplayed");
    ctx.drawImage(img, 250, 60, 100, 100);
  }

  function showCard() {
    prev(); // Update the card
    // Additional logic to display the card
  }

  function addTemplate() {
    const newTemplateName = prompt("Enter the name of the new template:");
    if (newTemplateName) {
      const select = document.getElementById("template");
      const option = document.createElement("option");
      option.value = newTemplateName.toLowerCase().replace(/\s/g, "-");
      option.textContent = newTemplateName;
      select.appendChild(option);
    }
  }

  const download = document.getElementById("down");
  download.addEventListener("click", function () {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(canvas.msToBlob(), "Card.png");
    } else {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = canvas.toDataURL();
      a.download = "Card.png";
      a.click();
      document.body.removeChild(a);
    }
  });
  
  // Function to load the uploaded image
  function loadImage(event) {
    const img = document.getElementById("imgDisplayed");
    img.src = URL.createObjectURL(event.target.files[0]);
    img.onload = function() {
      prev(); // Update the card once the image is loaded
    }
  }
  
  // Attach event listener to the file input
  const fileInput = document.getElementById("file");
  fileInput.addEventListener("change", loadImage);
});
