// Root element
const root = document.getElementById("root");

// State variables
let currentInput = "0"; // Current number being input
let storedValue = null; // Previous number stored for operations
let operator = null; // Current operator

// Button labels for the calculator
const buttons = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

// Function to create an element with specified classes
const createElement = (tag, classes = [], text = "") => {
  const element = document.createElement(tag);
  if (classes.length) element.classList.add(...classes);
  if (text) element.textContent = text;
  return element;
};

// Build the calculator
const calculator = createElement("div", ["calculator"]);

// Create and append the display
const display = createElement("div", ["calculator-display"]);
display.textContent = currentInput;
calculator.appendChild(display);

const updateDisplay = () => {
  if (storedValue !== null && operator !== null && currentInput === "0") {
    // Display only the stored value and operator while waiting for the next input
    display.textContent = `${storedValue} ${operator}`;
  } else if (storedValue !== null && operator !== null) {
    // Show the full expression
    display.textContent = `${storedValue} ${operator} ${currentInput}`;
  } else {
    // Default display of current input
    display.textContent = currentInput;
  }
};
  
// Perform calculations
const operate = (a, b, op) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : "Error"; // Handle division by zero
      default:
        return b; // If no operator, return the second operand
    }
  };
  
// Function to handle button clicks
const handleButtonClick = (label) => {
    if (!isNaN(label) || label === ".") {
      // Handle numbers and decimal point
      if (currentInput === "0" && label !== ".") {
        currentInput = label; // Replace initial zero
      } else if (currentInput.includes(".") && label === ".") {
        // Prevent multiple decimals
        return;
      } else {
        currentInput += label;
      }
    } else if (label === "AC") {
      // Reset calculator
      currentInput = "0";
      storedValue = null;
      operator = null;
    } else if (label === "+/-") {
      // Toggle sign of the current input
      currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : `-${currentInput}`;
    } else if (label === "%") {
      // Convert current input to percentage
      currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (label === "=") {
      // Perform calculation
      if (storedValue !== null && operator !== null) {
        currentInput = operate(storedValue, currentInput, operator).toString();
        storedValue = null; // Reset stored value after calculation
        operator = null; // Reset operator
      }
    } else {
      // Handle operators (+, -, *, /)
      if (storedValue === null) {
        storedValue = currentInput; // Store the first value
      } else if (operator) {
        // Perform intermediate calculation
        storedValue = operate(storedValue, currentInput, operator).toString();
      }
      operator = label; // Set the new operator
      currentInput = "0"; // Reset input for the next number
    }
    updateDisplay();
  };
  

// Create and append the button grid
const buttonContainer = createElement("div", ["calculator-buttons"]);
buttons.forEach((label, index) => {
  const buttonClasses = ["calculator-button"];
  if (label === "0" && index === 16) buttonClasses.push("button-wide");
  const button = createElement("button", buttonClasses, label);
  // Attach click event to each button
  button.addEventListener("click", () => handleButtonClick(label));
  buttonContainer.appendChild(button);
});
calculator.appendChild(buttonContainer);



// Add calculator to the root element
root.appendChild(calculator);