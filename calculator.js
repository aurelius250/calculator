function add(num1, num2) { 
    return (+num1) + (+num2);
}

function subtract(num1, num2) { 
    return num1 - num2;
}

function multiply(num1, num2) { 
    return num1 * num2; 
}

function divide(num1, num2) { 
    
    return num1 / num2; 
}

function operate(num1, operator, num2) { 
    switch(operator) { 
        case "+": 
            return add(num1, num2);

        case "-": 
            return subtract(num1, num2); 

        case "*": 
            return multiply(num1, num2); 

        case "÷": 
            return divide(num1, num2);
    }
}

function numCheck(element) { 
    return +element === +element;
}

function calculate() { 
  
    let displayArray = []; 
    const screen = document.getElementsByClassName("screenDigits")[0];   
    const allButtons = Array.from(document.querySelectorAll("button")); 
    let buttonPressed; 

    for(let i = 0; i <= allButtons.length - 1; i++) { 
        allButtons[i].addEventListener("click", (e) => { 
        buttonPressed = e.target.textContent; 
        console.log(buttonPressed);
        buttonPress();
        }); 
    }

    function orderOfOperations(displayArray) { 

        for(let i = 0; i < displayArray.length; i++){ 
            let element = displayArray[i];
            let indexOfElement = displayArray.indexOf(element);
            let nextElementIndex = indexOfElement+1; 
            let prevElementIndex = indexOfElement-1;
            
             if(isOperator(element)) { 
                if(!displayArray[i+1]) { 
                    displayArray.pop();
                    continue;
                }
                if(!displayArray[prevElementIndex]) { 
                   if(element == "-") { 
                       if(numCheck(displayArray[nextElementIndex])) { 
                       displayArray[indexOfElement] = displayArray[nextElementIndex] * -1; 
                       displayArray.splice(nextElementIndex, 1);
                        } else { 
                       displayArray.shift();
                        }
                    }
                }
            
             switch(element) { 
                 case "*": 
                    let multResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]).toFixed(2); 
                    displayArray.splice(prevElementIndex, 3); 
                    displayArray.splice(prevElementIndex, 0, multResult);
                    addToScreen(displayArray);
                    i--;
                    continue;

                 case "÷": 
                    if(displayArray[nextElementIndex] == 0) {
                        displayArray = ["Can't divide by 0 dumbass"];
                        clearScreen();
                        continue; 
                    }

                let divideResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]).toFixed(2); 
                displayArray.splice(prevElementIndex, 3); 
                displayArray.splice(prevElementIndex, 0, divideResult);
                addToScreen(displayArray);
                i--;
                continue;
             }
         }
        }

        for(let i = 0; i < displayArray.length; i++) { 
            let element = displayArray[i];
            let indexOfElement = displayArray.indexOf(element);
            let prevElementIndex = indexOfElement - 1; 
            let nextElementIndex = indexOfElement + 1; 

            if(isOperator(element)) { 
       
             if(!displayArray[prevElementIndex]) { 
                if(element == "-") { 
                    if(numCheck(nextElementIndex)) { 
                    displayArray[indexOfElement] = displayArray[nextElementIndex] * -1;
                    displayArray.splice(nextElementIndex, 1);

                    } else { 
                    displayArray.shift();
                    }
                }
             }

                switch(element) { 
                    case "+": 
                        let addResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]); 
                        displayArray.splice(prevElementIndex, 3); 
                        displayArray.splice(prevElementIndex, 0, addResult);
                        addToScreen(displayArray);
                        i--;
                        continue;

                    case "-": 
                        let subtractResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]); 
                        displayArray.splice(prevElementIndex, 3); 
                        displayArray.splice(prevElementIndex, 0, subtractResult);
                        addToScreen(displayArray);
                        i--;
                        continue;
                 }
         }
        }

        addToScreen(displayArray);
        return; 
     }
     
    // Called from button event listener 
    function buttonPress() { 
        addToCalculations(buttonPressed, displayArray)
    }
    
    // Clears screen, replaces with updated array of operands 
    function addToScreen(displayArray) { 
        screen.textContent = "";
       
        for(operand of displayArray) { 
            screen.textContent += operand.toString();
        }
        console.log(displayArray);
    } 

    // Resets memory/screen
    function clearScreen() { 
        displayArray.length = 0;
        screen.textContent = "";
        return;
    }

    calculate.clearScreen = clearScreen; 

    // Checks for operator
    function isOperator(element) { 
        return(element == "+" || element == "-" || element == "*" || element == "÷");
    }
   
    function deleteElement() { 
        const lastElement = displayArray[displayArray.length - 1]; 
        console.log("delete detected");
        
        
        if(numCheck(lastElement)) { 

            if(lastElement.split("").length > 1) { 

                let toDelete = displayArray[displayArray.length - 1];
                let splittedDelete = toDelete.split("");
                splittedDelete.splice(splittedDelete.length - 1, 1);
                displayArray[displayArray.length - 1] = splittedDelete.join("");
                addToScreen(displayArray);
                return;

            } 

            if(displayArray.length == 1) { 
                clearScreen();
                return;
            } else { 
                displayArray.splice(displayArray.length - 1, 1); 
                addToScreen(displayArray);
                return;
            }

        }

        else { 
            displayArray.splice(displayArray.length - 1, 1); 
            addToScreen(displayArray);
            return;
        } 
           
    }
    //Split function to smaller pieces. Dont repeat yourself. 

    function addToCalculations(buttonPressed, displayArray) { 

        if(displayArray.length == 0) { 
            if(buttonPressed == "Delete"){ 
                return;
            }
            displayArray[0] = buttonPressed; 
            addToScreen(displayArray); 
            return; 
        }

        switch(buttonPressed) { 
            case "Clear": 
                clearScreen(); 
                return;

            case "=": 
                orderOfOperations(displayArray);
                return;

            case "Delete": 
                deleteElement();
                return;              
        }
     
        if(isOperator(buttonPressed)) { 
            let prevElement = displayArray[displayArray.length - 1];
            if(isOperator(prevElement)) { 
                displayArray[displayArray.length - 1] = buttonPressed;
            } else { 
                displayArray.push(buttonPressed);
            }
        }

        if(numCheck(buttonPressed)) { 
            let prevElement = displayArray[displayArray.length - 1];
            if(numCheck(prevElement)) { 
                displayArray[displayArray.length - 1] += buttonPressed
            } 
            else { 
            displayArray.push(buttonPressed);
            }
        }
        
        addToScreen(displayArray);
    }
}

calculate();