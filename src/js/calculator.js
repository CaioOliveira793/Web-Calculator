const displayExpression = document.getElementsByClassName("display-expression")[0];
const displayCurrent = document.getElementsByClassName("display-current")[0];

let expression = "";

const isNumber = (value) => !isNaN(parseInt(value, 10));

const addOperation = (operator) => {
	const lastExpressionValue = expression[expression.length - 1];

	if (!isNumber(lastExpressionValue)) {
		if (displayCurrent.innerHTML === "") {
			expression = expression.slice(0, -1) + operator;
		} else {
			expression += ` ${parseFloat(displayCurrent.innerHTML)} ${operator}`;
		}
	}
	displayExpression.innerHTML = expression;
	displayCurrent.innerHTML = "";
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
		const operator = "=";
		const lastExpressionValue = expression[expression.length - 1];

		if (isNaN(parseInt(lastExpressionValue, 10))) {
			if (displayCurrent.innerHTML === "") {
				expression = expression.slice(0, -1);
				displayExpression.innerHTML = expression + operator;

				if (operator === "=")
					displayCurrent.innerHTML = eval(expression);
			} else {
				expression += ` ${parseFloat(displayCurrent.innerHTML)} ${operator}`;
			}
		}
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