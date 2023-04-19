const generateBtn = document.querySelector(".generate-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const promptInput = document.querySelector(".prompt-input");
const generatedImage = document.querySelector(".generated-image");
const downloadBtn = document.querySelector(".download-btn");

const showNotification = (message) => {
  alert(message);
};

const generateImage = async () => {
  const prompt = promptInput.value;

  if (prompt) {
    try {
      alert("Image is loading...");

      const response = await fetch("http://localhost:4000/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      const image = `data:image/jpeg;base64,${data.image}`;
      generatedImage.src = image;
      downloadBtn.href = image;
    } catch (error) {
      console.log(error);
      showNotification("The image could not be generated.");
      generatedImage.src = "images/image-placeholder.png";
    }
  } else {
    showNotification("Please enter the prompt");
  }
};

const cancel = () => {
    document.getElementById("prompt").value = "";
    window.reload();
};

generateBtn.addEventListener("click", cancel);
generateBtn.addEventListener("click", generateImage);