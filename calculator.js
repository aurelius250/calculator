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
 
    function addToScreen(buttonPressed, displayArray){ 
        const screen = document.getElementsByClassName("screenDigits")[0];
        screen.textContent = "";
        for(operand of displayArray){ 
            screen.textContent += operand;
        }
        console.log(displayArray);
    } 
    
    function numberChecker(elementOne, elementTwo){ 
        return +elementOne === +elementTwo; 
    }
    function addToCalculations(buttonPressed, displayArray){ 
        
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
        return displayArray;
    }

    const allButtons = Array.from(document.querySelectorAll("button")); 
    for(let i = 0; i < allButtons.length - 1; i++){ 
    allButtons[i].addEventListener("click", (e) => { 
        const buttonPressed = e.target.textContent; 
        addToCalculations(buttonPressed, displayArray);
        addToScreen(buttonPressed, displayArray);
    }); 
}
}


const intOne = 5; 
const intTwo = 2; 

console.log(operate(intOne, "subtract", intTwo));
calculate();