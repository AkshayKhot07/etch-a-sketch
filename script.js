"use strict";

// Overall container and grid creation container (mainContainer)
let container = document.querySelector(".container");
let mainContainer = document.querySelector(".main-container");

// Grid input range
let gridInput = document.getElementById("grid-input");
let gridDesc = document.querySelector(".grid-desc");
let gridInputValue = gridInput.value;
gridCreate(gridInputValue);

// Color picker
let pickColor = document.getElementById("pickColor");
let pickColorValue = pickColor.value;

pickColor.addEventListener("input", function (e) {
  pickColorValue = this.value;
});

// rainbow, eraser, toggle grid buttons
let rainbowBtn = document.getElementById("rainbowBtn");
let eraserBtn = document.getElementById("eraserBtn");
let gridLinesBtn = document.getElementById("gridlineBtn");

//Grid change function
gridInput.addEventListener("change", function (e) {
  mainContainer.innerHTML = "";
  let gridInputValue = gridInput.value;
  gridDesc.textContent = `Grid size: ${gridInputValue} x ${gridInputValue}`;
  console.log(gridInputValue);
  gridCreate(gridInputValue);

  sketchStart();
});

//Function that creates grid
function gridCreate(n) {
  for (let i = 0; i < n; i++) {
    const singleDiv = document.createElement("div");
    mainContainer.appendChild(singleDiv);
    singleDiv.classList.add("single-div");
    for (let j = 0; j < n; j++) {
      const subDiv = document.createElement("div");
      singleDiv.appendChild(subDiv);
      subDiv.classList.add("sub-div");
      subDiv.classList.add("toggle-btn");
    }
  }
}

///////Initial stage ---start--////////
function sketchStart() {
  let subDivs = Array.from(document.querySelectorAll(".sub-div"));

  let isMouseDown = false;

  container.addEventListener("mousemove", function (e) {
    if (e.target.classList.contains("container")) {
      isMouseDown = false;
    }
  });

  subDivs.forEach((subDiv) => {
    subDiv.addEventListener("mousedown", function (event) {
      isMouseDown = true;
    });
  });

  subDivs.forEach((subDiv) => {
    subDiv.addEventListener("mouseup", function (event) {
      isMouseDown = false;
    });
  });

  subDivs.forEach((subDiv) => {
    subDiv.addEventListener("mousemove", function (event) {
      if (isMouseDown) {
        if (rainbowBtn.classList.contains("toggleBtn")) {
          let element = event.target;
          element.style.backgroundColor = randomRGBColor();
        } else if (eraserBtn.classList.contains("toggleBtn")) {
          let element = event.target;
          element.style.backgroundColor = "#FFFFFF";
        } else {
          let element = event.target;
          element.style.backgroundColor = pickColorValue;
        }
      } else {
        return;
      }
    });
  });

  function dragAndDrop() {
    subDivs.forEach((subDiv) => {
      subDiv.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
    });

    subDivs.forEach((subDiv) => {
      subDiv.addEventListener("drop", (e) => {
        e.preventDefault();
      });
    });
  }

  dragAndDrop();
}

sketchStart();
///////Initial stage ---end--////////

//Rainbow Color
let randomRGBColor = function () {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  let bgColor = `rgb(${x},${y},${z})`;
  // console.log(bgColor);
  return bgColor;
};

//Rainbow button toggle
rainbowBtn.addEventListener("click", function (e) {
  eraserBtn.classList.remove("toggleBtn");
  rainbowBtn.classList.toggle("toggleBtn");
});

//Eraser button
eraserBtn.addEventListener("click", function (e) {
  rainbowBtn.classList.remove("toggleBtn");
  eraserBtn.classList.toggle("toggleBtn");
});

//Toggle grid lines
gridLinesBtn.addEventListener("click", function () {
  let subDivs = Array.from(document.querySelectorAll(".sub-div"));
  gridLinesBtn.classList.toggle("toggleBtn");
  if (!gridLinesBtn.classList.contains("toggleBtn")) {
    subDivs.forEach((subDiv) => subDiv.classList.remove("toggle-btn"));
  } else if (gridLinesBtn.classList.contains("toggleBtn")) {
    subDivs.forEach((subDiv) => subDiv.classList.add("toggle-btn"));
  }
});

//Clear button
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function () {
  let subDivs = Array.from(document.querySelectorAll(".sub-div"));
  subDivs.forEach((subDiv) => (subDiv.style.backgroundColor = "#FFFFFF"));
});
