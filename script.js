"use strict";

const mainContainer = document.querySelector(".main-container");

let n = 32;

for (let i = 0; i < n; i++) {
  const singleDiv = document.createElement("div");
  mainContainer.appendChild(singleDiv);
  singleDiv.classList.add("single-div");
  const subDiv = document.createElement("div");
  singleDiv.appendChild(subDiv);
  subDiv.classList.add("sub-div");
}
