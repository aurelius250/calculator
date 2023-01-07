function add(num1, num2){ 
    return num1 + num2;
}

function subtract(num1, num2){ 
    return num1 - num2;
}

function multiply(num1, num2){ 
    return num1 * num2; 
}

function divide(num1, num2){ 
    return num1 / num2; 
}

function operate(num1, operator, num2){ 
    switch(operator){ 
        case "+": 
        return add(num1, num2);

        case "-": 
        return subtract(num1, num2); 

        case "*": 
        return multiply(num1, num2); 

        case "&#247": 
        return divide(num1, num2);
    }
}

function calculate(){ 
    let displayArray = []; 
    const screen = document.getElementsByClassName("screenDigits")[0];
 
    function addToScreen(displayArray){ 
        screen.textContent = "";
        if(displayArray.length == 0){ 
            screen.textContent = "";
            return;
        }
        for(operand of displayArray){ 
            screen.textContent += operand;
        }
        console.log(displayArray);
    } 

    function executeEquation(){ 
        screen.textContent = "";
        for(let i = 0; i < displayArray.length - 1; i++){ 
            screen.textContent = operate(+displayArray[i], displayArray[i+1], +displayArray[i+2]).toString();
        displayArray.length = 0;
            return;
        }
    }
    function addToCalculations(buttonPressed, displayArray){ 

        if(displayArray.length == 0){ 
            displayArray[0] = buttonPressed; 
            addToScreen(displayArray); 
            return; 
        }
        if(buttonPressed == "="){ 
            executeEquation();
            return;
        }
        if(buttonPressed == "Delete"){ 
            let toDelete = displayArray[length - 1].split()[this.length - 1]; 

            displayArray.splice(displayArray.length - 1, 1);
            addToScreen(displayArray);
            return;
        }

        if(buttonPressed == "Clear"){ 
            displayArray.length = 0;
            addToScreen(displayArray);
            return;
        }

        if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "&#247"){ 
            let prevOperand = displayArray[displayArray.length - 1];
            if(prevOperand == "+" || prevOperand == "-" || prevOperand == "*" || prevOperand == "&#247"){ 
                displayArray[displayArray.length - 1] = buttonPressed;
            }
        }

        if(+buttonPressed === +buttonPressed){ 
            if(+displayArray[displayArray.length - 1] === +displayArray[displayArray.length - 1]){ 
                displayArray[displayArray.length - 1] += buttonPressed
            } else { 
            displayArray.push(buttonPressed);  
            }
        }
        else{ 
            displayArray.push(buttonPressed);
        }
        addToScreen(displayArray);

    }

    const allButtons = Array.from(document.querySelectorAll("button")); 

    for(let i = 0; i < allButtons.length - 1; i++){ 
        allButtons[i].addEventListener("click", (e) => { 
            const buttonPressed = e.target.textContent; 
            addToCalculations(buttonPressed, displayArray);
        }); 
    }

    }
const intOne = 5; 
const intTwo = 2; 
calculate();