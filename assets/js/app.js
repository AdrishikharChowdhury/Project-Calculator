let toggle = document.querySelector("#toggle");
let toggler = document.querySelector(".toggle-button");
let clear=document.querySelector("#clear");
let multi=document.querySelector("#multi");
let minus=document.querySelector("#minus");
let del=document.querySelector("#delete");
let divide=document.querySelector("#divide");
let plus=document.querySelector("#plus");
let equal=document.querySelector("#equal");
let decimal=document.querySelector("#decimal");
let zero=document.querySelector("#zero");
let seven=document.querySelector("#seven");
let eight=document.querySelector("#eight");
let nine=document.querySelector("#nine");
let four=document.querySelector("#four");
let five=document.querySelector("#five");
let six=document.querySelector("#six");
let one=document.querySelector("#one");
let two=document.querySelector("#two");
let three=document.querySelector("#three");
let display=document.querySelector("#ans");
let firstVal="";
let secondVal="";
let operator="";
let isAnswer=false;
let isPoint=false;

toggle.addEventListener("click", () => {
    toggler.classList.toggle("on");
    toggler.classList.toggle("off");
        document.body.classList.toggle("dark-mode");
});

const buttons = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero","plus", "minus", "multi", "divide", "equal", "clear", "delete", "decimal"];

buttons.forEach((buttonId)=>{
    let button=document.getElementById(buttonId);
    switch(buttonId)
    {
        case "clear":
            button.addEventListener("click",()=>{
                display.innerText="0";
                firstVal="";
                secondVal="";
                operator="";
                isAnswer=false;
            });
            break;
        case "delete":
            button.addEventListener("click",()=>{
                display.innerText = display.innerText.slice(0, -1);
                if(display.innerText==="")
                {
                    display.innerText="0"; 
                }
            })
            break;
            case "plus":
            case "minus":
            case "multi":
            case "divide":
                button.addEventListener("click", () => {
                    if (!firstVal && display.innerText === "0") {
                        if (buttonId === "minus") {  
                            display.innerText = "-";
                            return;
                        } else {
                            return;
                        }
                    }
                    if (firstVal && operator && display.innerText === operator) {
                        if (buttonId === "minus") {
                            display.innerText = "-";
                            return;
                        } else {
                            return;
                        }
                    }
                    if (firstVal && operator && display.innerText !== operator) {
                        secondVal = display.innerText;
                        if (secondVal === "-") return;  
                        firstVal = result(firstVal, secondVal, operator);
                        display.innerText = firstVal;  // ✅ Maintain correct values
                        operator = "";
                    }
                    firstVal = display.innerText;
                    isPoint = false;
                    operator = operatorStore(buttonId);
                    display.innerText = button.innerText;
                });
                break;
                      
        case "equal":
            button.addEventListener("click",()=>{
                if (!firstVal || !operator || display.innerText === operator) return;
                secondVal = display.innerText;
                let ans = result(firstVal, secondVal, operator);
                operator = "";
                isAnswer = true;
                display.innerText=ans;
            });
            break;
        default:
            button.addEventListener("click",()=>{
                if (isAnswer)
                {
                    display.innerText = "";
                    isAnswer = false; 
                }
                if (buttonId === "decimal") {
                    if (isPoint) return;  // ✅ Prevent multiple decimal points
                    isPoint = true;
                }
                if(display.innerText==="0" || display.innerText===operator)
                {
                    display.innerText=""; 
                }
                display.innerText+=button.innerText;
            });
            break;
    }
})

const operatorStore=(operator)=>{
    switch(operator)
    {
        case "plus":
            return "+";
        case "minus":
            return "-"
        case "multi":
            return "×";
        case "divide":
            return "÷"
        default:
            return null;
    }
}

const result=(firstVal,secondVal,operator)=>{
    let ans;
    firstVal=parseFloat(firstVal);
    secondVal = parseFloat(secondVal);;
    switch(operator)
    {
        case "+":
            ans=firstVal+secondVal;
            break;
        case "-":
            ans=firstVal-secondVal;
            break;
        case "×":
            ans=firstVal*secondVal;
            break;
        case "÷":
            if(secondVal===0)
            {
                display.innerText = "Math Error";  
                firstVal = "";
                secondVal = "";
                operator = "";
                isAnswer = true;
                return "Math Error";
            }
            ans=firstVal/secondVal;
            break;
        default:
            ans="Invalid";
    }
    if (!Number.isInteger(ans)) {
        ans = parseFloat(ans.toFixed(10));
    }
    return ans.toString();
};