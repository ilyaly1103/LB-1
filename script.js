const mainContainer = document.getElementById("main-container");
const calculateButton = document.getElementById("calculate-btn");
const clearHistoryButton = document.getElementById("clear-history-button");
const inputsContainer = document.getElementById("inputs");
const resultContainer = document.getElementById("result");
const selectShape = document.getElementById("shape-select");

class Shape {
  Rectagle(width, height) {
    this.width = width;
    this.height = height;

    return this.width * this.height;
  }

  Circle(raduis) {
    this.raduis = raduis;

    return 3.14 * this.raduis ** 2;
  }

  Triangle(sideA, sideB, sideC) {
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;

    const semiPerimiter = (this.sideA + this.sideB + this.sideC) / 2;

    return Math.sqrt(
      semiPerimiter *
        (semiPerimiter - this.sideA) *
        (semiPerimiter - this.sideB) *
        (semiPerimiter - this.sideC),
    );
  }
}

class CalculationHistory {
  constructor(listElementId) {
    this.listElement = document.getElementById(listElementId);
    this.storageKey = "calc_history";
  }

  getHistory() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  save(record) {
    const history = this.getHistory();
    history.push(record);
    localStorage.setItem(this.storageKey, JSON.stringify(history));
    this.render();
  }

  render() {
    this.listElement.innerHTML = "";
    const history = this.getHistory();

    history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      this.listElement.appendChild(li);
    });
  }

  clear() {
    localStorage.removeItem(this.storageKey);
    this.render();
  }
}

const historyManager = new CalculationHistory("history-list");
historyManager.render();

mainContainer.addEventListener("click", (event) => {
  if (event.target.id === "calculate-btn") {

    const inputsArray = document.querySelectorAll("#inputs input");
    const regex = /^\d+(\.\d+)?$/;

    for (let input of inputsArray) {
      if (!regex.test(input.value)) {
        alert("Одна з форм заповнена неправильно або не заповнена!");
        return; 
      }
    }

    const shapeType = document.getElementById("shape-select").value;

    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild);
    }

    if (shapeType === "rectangle") {
      const inputWidth = document.getElementById("width").value;
      const inputHeight = document.getElementById("height").value;

      const p = document.createElement("p");
      const result = new Shape().Rectagle(
        Number(inputWidth),
        Number(inputHeight),
      );

      p.textContent = `Площа дорівнює: ${result}`;

      resultContainer.appendChild(p);

      const resultText = `Фігура: Прямокутник, Площа: ${result}`;
      historyManager.save(resultText);
    } else if (shapeType === "circle") {
      const inputRadius = document.getElementById("radius").value;

      const p = document.createElement("p");
      const result = new Shape().Circle(Number(inputRadius));

      p.textContent = `Площа дорівнює: ${result}`;

      resultContainer.appendChild(p);

      const resultText = `Фігура: Коло, Площа: ${result}`;
      historyManager.save(resultText);
    } else if (shapeType === "triangle") {
      const inputSideA = document.getElementById("sideA").value;
      const inputSideB = document.getElementById("sideB").value;
      const inputSideC = document.getElementById("sideC").value;

      const p = document.createElement("p");
      const result = new Shape().Triangle(
        Number(inputSideA),
        Number(inputSideB),
        Number(inputSideC),
      );

      p.textContent = `Площа дорівнює: ${result}`;

      resultContainer.appendChild(p);

      const resultText = `Фігура: Трикутник, Площа: ${result}`;
      historyManager.save(resultText);
    }
    
  } else if (event.target.id === "clear-history-button") {
    historyManager.clear();
  }
});

selectShape.addEventListener("change", (event) => {
  const shape = event.target.value;

  while (inputsContainer.firstChild) {
    inputsContainer.removeChild(inputsContainer.firstChild);
  }

  switch (shape) {
    case "rectangle":
      let inputWidth = document.createElement("input");
      inputWidth.id = "width";
      inputWidth.placeholder = "Ширина";
      inputWidth.type = "number";
      inputWidth.required = true;
      inputsContainer.appendChild(inputWidth);

      let inputHeight = document.createElement("input");
      inputHeight.id = "height";
      inputHeight.placeholder = "Висота";
      inputHeight.type = "number";
      inputHeight.required = true;
      inputsContainer.appendChild(inputHeight);

      break;

    case "circle":
      let inputRadius = document.createElement("input");
      inputRadius.id = "radius";
      inputRadius.placeholder = "Радіус";
      inputRadius.type = "number";
      inputRadius.required = true;
      inputsContainer.appendChild(inputRadius);

      break;

    case "triangle":
      let inputSideA = document.createElement("input");
      inputSideA.id = "sideA";
      inputSideA.placeholder = "Сторона А";
      inputSideA.type = "number";
      inputSideA.required = true;
      inputsContainer.appendChild(inputSideA);

      let inputSideB = document.createElement("input");
      inputSideB.id = "sideB";
      inputSideB.placeholder = "Сторона В";
      inputSideB.type = "number";
      inputSideB.required = true;
      inputsContainer.appendChild(inputSideB);

      let inputSideC = document.createElement("input");
      inputSideC.id = "sideC";
      inputSideC.placeholder = "Сторона С";
      inputSideC.type = "number";
      inputSideC.required = true;
      inputsContainer.appendChild(inputSideC);

      break;
  }
});
