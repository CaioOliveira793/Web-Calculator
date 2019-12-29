const displayExpression = document.getElementsByClassName("display-expression")[0];
const displayCurrent = document.getElementsByClassName("display-current")[0];

let expression = "";

const isNumber = (value) => !isNaN(parseInt(value, 10));

const addOperation = (operator) => {
	const currentNumber = displayCurrent.innerHTML;

	if (currentNumber === "") {
		displayExpression.innerHTML = `${displayExpression.innerHTML.slice(0, -1)} ${operator}`;
	} else {
		displayExpression.innerHTML += ` ${currentNumber} ${operator}`;
		expression = displayExpression.innerHTML.slice(0, -2);
		displayCurrent.innerHTML = "";
	}

	if (operator === "=") {
		displayCurrent.innerHTML = eval(expression);
		displayExpression.innerHTML = "";
		expression = "";
	}
}

const operations = {
	["CE"]: () => {
		displayCurrent.innerHTML = "0";
	},
	["C"]: () => {
		displayCurrent.innerHTML = "0";
		displayExpression.innerHTML = expression = "";
	},
	["+"]: () => {
		addOperation("+");
	},
	["-"]: () => {
		addOperation("-");
	},
	["*"]: () => {
		addOperation("*");
	},
	["/"]: () => {
		addOperation("/");
	},
	["."]: () => {
		if (displayCurrent.innerHTML === "")
			displayCurrent.innerHTML += "0.";
		else if (!displayCurrent.innerHTML.includes("."))
			displayCurrent.innerHTML += ".";
	},
	["+/-"]: () => {
		if (displayCurrent.innerHTML === "") return;

		const currentNumber = displayCurrent.innerHTML;
		if (currentNumber[0] === "-")
			displayCurrent.innerHTML = currentNumber.slice(1);
		else
			displayCurrent.innerHTML = "-" + currentNumber;
	},
	["="]: () => {
		addOperation("=");
	}
}

const numberButtons = [...document.getElementsByClassName("btn-number")];
numberButtons.forEach((btn) => {
	btn.onclick = () => {
		if (displayCurrent.innerHTML === "0" || displayCurrent.innerHTML === "-0")
			if (btn.innerHTML !== "0" && displayCurrent.innerHTML[0] === "-")
				displayCurrent.innerHTML = "-" + btn.innerHTML;
			else
				displayCurrent.innerHTML = btn.innerHTML;
		else
			displayCurrent.innerHTML += btn.innerHTML;
	}
})

const operationsButtons = [...document.getElementsByClassName("btn-operator")];
operationsButtons.forEach((btn) => {
	btn.onclick = () => {
		if (operations[btn.innerHTML]) operations[btn.innerHTML]();
	}
})

function init() {
	displayCurrent.innerHTML = "0";
}

init();