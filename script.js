// https://httpbin.org/post
// http://localhost:3000/images
const fileInput = document.getElementById("fileInput1");
const form = document.getElementById("form1");
const progressBar = document.getElementById("progressBar");
const progressBarContainer = document.getElementById("progressBarContainer");
const uploadSummary = document.getElementById("uploadSummary");

fileInput.addEventListener("change", () => {
  const userImage = fileInput.files[0];
  const formData = new FormData();
  formData.append("user-image", userImage);
  progressBarContainer.style.display = "block";

  const req = new XMLHttpRequest();
  req.open("POST", "https://webhook.site/d289839e-0b12-4abd-9b11-0e3e8f113e24");

  req.upload.addEventListener("progress", (e) => {
    const percentCompleted = Math.round((e.loaded * 100) / e.total);
    progressBar.setAttribute("value", percentCompleted);
    progressBar.nextElementSibling.innerText = percentCompleted + " %";
  });

  // When the request completes
  req.addEventListener("load", () => {
    progressBar.nextElementSibling.innerText = "0 %";
    progressBarContainer.style.display = "none";

    const reader = new FileReader();
    const summaryItem = document.createElement("div");
    const img = document.createElement("img");
    const desc = document.createElement("div");
    desc.innerHTML = `<div>${userImage.name}</div><p>${Math.round(
      userImage.size / 1000
    )} Kb</p>`;
    summaryItem.appendChild(img);
    summaryItem.appendChild(desc);
    uploadSummary.appendChild(summaryItem);
    console.log(userImage);

    img.setAttribute("height", 110);
    img.setAttribute("width", 110);
    reader.onloadend = () => {
      img.src = reader.result;
    };

    console.log(req.response);
    reader.readAsDataURL(userImage);
  });

  req.send(formData);
});
