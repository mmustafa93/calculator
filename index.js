const root = document.getElementById("root");


// Create the calculator container
const calculator = document.createElement("div");
calculator.classList.add("calculator");

// Create the display
const display = document.createElement("div");
display.classList.add("calculator-display");
calculator.appendChild(display);

// Create the button grid
const buttons = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("calculator-buttons");

// Add buttons to the grid
buttons.forEach((label, index) => {
  const button = document.createElement("button");
  button.classList.add("calculator-button");

  // Special styling for the stretched "0" button
  if (label === "0" && (index === 16)) {
    button.classList.add("button-wide");
  }

  button.textContent = label;
  buttonContainer.appendChild(button);
});


// Append everything to the root container
calculator.appendChild(buttonContainer);
root.appendChild(calculator);