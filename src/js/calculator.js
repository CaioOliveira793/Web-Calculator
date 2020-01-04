class Calculator {
	constructor(queryExpressionEl, queryNumberEl, queryBtnNumbersEl, queryBtnOperationsEl) {
		this.expressionEl = document.querySelector(queryExpressionEl);
		this.numberEl = document.querySelector(queryNumberEl);

		this.expression = '';
		this.numberEl.innerHTML = '0';

		const btnNumbers = [...document.querySelectorAll(queryBtnNumbersEl)];
		const btnOperations = [...document.querySelectorAll(queryBtnOperationsEl)];

		this.setCalculatorEvents(btnNumbers, btnOperations);
	}

	operations = {
		["CE"]: () => {
			this.numberEl.innerHTML = '0';
		},
		["C"]: () => {
			this.numberEl.innerHTML = '0';
			this.expressionEl.innerHTML = '';
			this.expression = '';
		},
		["."]: () => {
			if (this.numberEl.innerHTML === '')
				this.numberEl.innerHTML = '0.';
			else if (!this.numberEl.innerHTML.includes('.'))
				this.numberEl.innerHTML += '.';
		},
		["+/-"]: () => {
			if (this.numberEl.innerHTML === '') return;

			const currentNumber = this.numberEl.innerHTML;
			if (currentNumber[0] === "-")
				this.numberEl.innerHTML = currentNumber.slice(1);
			else
				this.numberEl.innerHTML = '-' + currentNumber;
		},
		["+"]: () => {
			this.addOperation("+");
		},
		["-"]: () => {
			this.addOperation("-");
		},
		["*"]: () => {
			this.addOperation("*");
		},
		["/"]: () => {
			this.addOperation("/");
		},
		["="]: () => {
			this.addOperation("=");
		}
	}

	setCalculatorEvents(btnNumbers, btnOperations) {
		btnNumbers.forEach((btn) => {
			btn.onclick = () => {
				this.addNumber(btn.innerHTML);
			}
		});

		btnOperations.forEach((btn) => {
			btn.onclick = () => {
				if (this.operations[btn.innerHTML]) this.operations[btn.innerHTML]();
			}
		})
	}

	addNumber(number) {
		if (this.numberEl.innerHTML === '0' || this.numberEl.innerHTML === '-0')
			this.numberEl.innerHTML = number;
		else
			this.numberEl.innerHTML += number;
	}

	addOperation(operator) {
		const currentNumber = this.numberEl.innerHTML;
		const currentExpression = this.expressionEl.innerHTML.slice(0, -1);

		if (currentNumber === '') {
			this.expressionEl.innerHTML = `${currentExpression} ${operator}`;
		} else {
			this.expressionEl.innerHTML += ` ${currentNumber} ${operator}`;
			this.expression = currentExpression.slice(0, -1);
			this.numberEl.innerHTML = '';
		}

		if (operator === '=') {
			this.numberEl.innerHTML = eval(this.expression);
			this.expressionEl.innerHTML = '';
			this.expression = '';
		}
	}
}

const myCalculator = new Calculator('.display-expression', '.display-number', '.btn-number', '.btn-operator');
