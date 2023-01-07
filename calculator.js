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

function numCheck(element){ 
    return +element === +element;
}


function calculate(){ 
    let displayArray = []; 
    const screen = document.getElementsByClassName("screenDigits")[0];
    const allButtons = Array.from(document.querySelectorAll("button")); 
    console.log(allButtons);
    console.log(displayArray);

    let buttonPressed; 
        for(let i = 0; i <= allButtons.length - 1; i++){ 
        allButtons[i].addEventListener("click", (e) => { 
            buttonPressed = e.target.textContent; 
            console.log(buttonPressed);
            buttonPress();
        }); 
    }
    function buttonPress(){ 
        addToCalculations(buttonPressed, displayArray)
    }
    
    function addToScreen(displayArray){ 
        screen.textContent = "";
       
        for(operand of displayArray){ 
            screen.textContent += operand.toString();
        }
        console.log(displayArray);
    } 

    function clearScreen(){ 
        displayArray.length = 0;
        screen.textContent = "";
        return;
    }

    function isOperator(element){ 
        return(element == "+" || element == "-" || element == "*" || element == "&#247");
    }

    calculate.clearScreen = clearScreen; 

    function executeEquation(displayArray){ 
        clearScreen();
        let result = 0;
        //Chain the operations. 
        for(let i = 0; i < displayArray.length - 1; i++){ 
            result = operate(+displayArray[i], displayArray[i+1], +displayArray[i+2])
            displayArray = displayArray.splice(i, 3); 
            i += 3;
        }
        addToScreen(displayArray);
    }

    //Split function to smaller pieces. Dont repeat yourself. 
    function addToCalculations(buttonPressed, displayArray){ 
        if(displayArray.length == 0){ 
            displayArray[0] = buttonPressed; 
            addToScreen(displayArray); 
            return; 
        }
        console.log(allButtons);

        if(buttonPressed == "Clear"){ 
            clearScreen(); 
            return;
        }
        
        if(buttonPressed == "="){ 
            executeEquation(displayArray);
            return;
        }

        if(buttonPressed == "Delete"){ 
            console.log("delete detected");
            if(displayArray.length == 1){ 
                clearScreen();
            }
            if(+displayArray[displayArray.length - 1] === +displayArray[displayArray.length - 1]){ 
                if(displayArray[displayArray.length - 1].split("").length > 2){ 
                    let toDelete = displayArray[displayArray.length - 1];
                    let splittedDelete = toDelete.split("");
                    splittedDelete.splice(splittedDelete.length - 1, 1);
                    displayArray[displayArray.length - 1] = splittedDelete.join("");
                } 
                    else { 
                        displayArray.splice(displayArray.length - 1, 1); 
                    }
                }
            else { 
                displayArray.splice(displayArray.length - 1, 1); 
            }
            addToScreen(displayArray);
            return;
        }
             
        if(isOperator(buttonPressed)){ 
            let prevElement = displayArray[displayArray.length - 1];
            if(isOperator(prevElement)){ 
                displayArray[displayArray.length - 1] = buttonPressed;
            } else { 
                displayArray.push(buttonPressed);
            }
        }
        if(numCheck(buttonPressed)){ 
            let prevElement = displayArray[displayArray.length - 1];
            if(numCheck(prevElement)){ 
                displayArray[displayArray.length - 1] += buttonPressed
            } 
            else{ 
            displayArray.push(buttonPressed);
            }
        }
        
        addToScreen(displayArray);
    }
}

calculate();