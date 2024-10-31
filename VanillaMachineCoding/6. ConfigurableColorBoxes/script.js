// Design and implement a web page that dynamically creates a series of boxes having varying widths
// and colors using vanilla JS, HTML and CSS.

// Requirements:
//  - Dynamically generate boxes inside a container on the webpage.
//  -   Eac box should be clickable. Display and alert with the color of the clicked box.
//  -   Write scalable, clean, readable and well structured code.

// We will have a config array of object in which each object contains the details of a box.
const boxConfig = [
  { color: "red", width: "33.33%" },
  { color: "green", width: "33.33%" },
  { color: "yellow", width: "33.33%" },
  { color: "blue", width: "50%" },
  { color: "orange", width: "50%" },
  { color: "purple", width: "70%" },
  { color: "pink", width: "30%" },
];

const container = document.createElement("div");
container.className = "container";

function render() {
  boxConfig.forEach((config, index) => {
    const box = document.createElement("div");
    box.className = "box";
    box.style.width = config.width;
    box.style.backgroundColor = config.color;

    // First Approach
    // But what if we have 100+ boxes we cannot add 100+ event listeners, this will slow our app
    // Therefore we will use the concept of event delegation, and we will add the listener to the
    // parent element and i.e. container
    //   box.addEventListener("click", () => {
    //     alert(`Clicked ${index + 1} ${config.color} colored box`);
    //   });

    container.appendChild(box);
  });
}

container.addEventListener("click", (e) => {
  const clickedElement = e.target;
  if (clickedElement.classList.contains("box")) {
    const index = Array.from(container.children).indexOf(clickedElement);
    const config = boxConfig[index];
    alert(`Color of box ${index + 1} is ${config.color}.`);
  }
});

const addConfig = document.createElement("div");
addConfig.className = "add-config";

const color = document.createElement("input");
color.setAttribute("placeholder", "Enter color");

const width = document.createElement("input");
width.setAttribute("placeholder", "Enter width");

const submit = document.createElement("button");
submit.innerText = "Go!";

const form = document.createElement("div");
form.className = "form";

submit.addEventListener("click", () => {
  const colorObj = color.value;
  const widthObj = width.value;
  const result = {
    color: colorObj,
    width: widthObj,
  };
  boxConfig.push(result);
  render();
});

render();

document.body.appendChild(container);
form.appendChild(color);
form.appendChild(width);
form.appendChild(submit);
addConfig.appendChild(form);
container.appendChild(addConfig);
