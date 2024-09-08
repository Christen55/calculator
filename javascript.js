let digital='';
let numbers;
let result='';
let screen=document.getElementById('screen');
let Result;
let div;
let modul;
let degree='';
let numbers3=[];
let isRoot=false;

function reverso(){
    functions=document.getElementById('functions');
    document.getElementById('functions').classList.toggle('block'); 
    document.getElementById('buttons').classList.toggle('none');
}
function rootexp(sign, num, number=''){
    console.log(result);

    let stringBeforeRoot=result.slice(0,  num);
    screen.innerHTML=`${stringBeforeRoot}`; 

    div=document.createElement('div'); 
    div.className="box";
    screen.appendChild(div); 
    if (sign=="√"){
        let text=document.createElement('div'); 
        text.textContent='√';
        screen.appendChild(text);
    }

    div.addEventListener('click', function (e) {   
        isRoot=true;  
        console.log(isRoot);
        
    });

    if(isRoot){
        if (sign=="√"){
            div.classList.toggle('boxClick');
        }
        else{
            div.classList.toggle('boxpClick');
        }
        console.log(number);
        degree+=number; 
        div.innerHTML=`${degree}`;   
        console.log(degree);  
    }        
    screen.addEventListener('dblclick', function (e) {
        if(isRoot){
            isRoot=false;
            console.log(isRoot);
            console.log(numbers);
            result=document.getElementById('screen').innerHTML;
            digital=document.getElementById('screen').innerHTML;
            degree='';
        }          
    }); 
}
function displayDigital(number){
    console.log(digital);
    console.log(numbers);
    digital+=number;
    result+=number;
   
    screen.style.color='black';
    numbers=digital.match(/\d+(\.\d+)?|[()\/×!+-√^]/g);
    
    

    if(numbers[numbers.length-1]=="^" || (numbers.includes("^") && isRoot==true)){
        rootexp("^", digital.lastIndexOf("^"), number);
    }
    else if(numbers[numbers.length-1]=="√" || (numbers.includes("√") && isRoot==true)){
        rootexp("√", digital.lastIndexOf("√"), number);
    }

    else{
        screen.innerHTML=`${result}`;
    }
    brackets();
}

const operations = {};
const bracket={};

function  brackets(){
    for(i=0;i<numbers.length; i++){
        if(numbers[i]=='('){
            bracket["("]=i;
            if (!'×/+-!()>'.includes(numbers[i-1]) && i!=0){
                numbers.splice(i, 0, '×');
            }
        }
    }
    
    for(i=numbers.length;i> bracket["("]; i--){
        if(numbers[i]==')'){
            bracket[")"]=i;
            if (!'×/+-!()<='.includes(numbers[i+1])){
                numbers.splice(i+1, 0, '×');
            }
        } 
    }
}


function operators(){
    for(i=numbers.length;i>=0; i--){
        if('×/+-p√!'.includes(numbers[i])){
            operations[numbers[i]]=i
        } 
    }   
}

let numbers2;


let equal=document.getElementById('equal');
   
equal.addEventListener('click', function math(){
    console.log("numbers=", numbers);
    if( ["("] in bracket &&  [")"] in bracket){
        numbers2=numbers;
        clear(operations);
        numbers=numbers.slice(bracket["("]+1, bracket[")"]);
        digital=numbers.join('');
        operators();
        calculator();
        brackets();
    }

    else{
    operators();
    calculator();
    }
    
    function checkBrackets(bracketLeftIndex, bracketRightIndex, numbers, result){
        if(["("] in bracket && [")"] in bracket && numbers.length==1){
            numbers2.splice(bracketLeftIndex,bracketRightIndex-bracketLeftIndex+1,  result);
            numbers=numbers2;
            clear(bracket);
            console.log(numbers);
        }
        else if(["("] in bracket && [")"] in bracket){
            console.log(numbers2);
            console.log(numbers);
            numbers3=numbers2.slice(bracketRightIndex);
            numbers4=numbers2.slice(0, bracketLeftIndex+1);
            console.log(numbers2);
            numbers=numbers4.concat(numbers,numbers3);
            console.log(numbers);
        }
        digital=numbers.join('');
        console.log(digital);
        return [numbers, digital];
    }
    function functions(){
        brackets();
        operators();
        math();
    }
            
    function calculator(){
        if(operations["+"]==0){
            Result=Decimal(numbers[operations['+']+1]);
            numbers.splice(operations["+"]+1,2,Result);
            arrays=checkBrackets(bracket["("], bracket[")"], numbers, Result);            
            numbers=arrays[0]; digital=arrays[1];
            delete operations["+"];
            functions();
        }
        for (i=0; i<numbers.length; i++){
            if(("×/+(-".includes(numbers[i]) && numbers[i+1]=="-") || operations["-"]==0){
                if (numbers[i]=="-" && numbers[i+1]=="-"){
                    Result=-numbers[operations["-"]+2];
                    numbers.splice(operations["-"]+1,2,Result);
                }
                else{
                    Result=-numbers[operations["-"]+1];
                    numbers.splice(operations["-"],2,Result);
                }
                arrays=checkBrackets(bracket["("], bracket[")"], numbers, Result);            
                numbers=arrays[0]; digital=arrays[1];
                delete operations["-"];
                functions();
            }
        }
        if("!" in operations){
            Result=1;
            for(i=1; i<=numbers[operations["!"]-1]; i++){
                Result*=i;
            }
            numbers.splice(operations["!"]-1,2,Result);
            arrays=checkBrackets(bracket["("], bracket[")"], numbers, Result);
            numbers=arrays[0]; digital=arrays[1];
            delete operations["!"];
            functions();
        }
    
        if("√" in operations || "p" in operations){
            if(operations["√"]<operations["p"] || !("p" in operations)){
                if (!'×/+-!()√'.includes(numbers[(numbers.indexOf("√")-35)]) && (numbers.indexOf("√")-34)!=0){
                    numbers.splice(numbers.indexOf("√")-34, 0, '×');
                    Result=Math.pow(numbers[operations["√"]+8], (1/numbers[operations["√"]-11]));
                    numbers.splice(operations["√"]-33,42,Result);
                }
                else{
                    Result=Math.pow(numbers[operations["√"]+7], (1/numbers[operations["√"]-12]));
                    numbers.splice(operations["√"]-34,42,Result);
                }      
                delete operations["√"];
            }

            else{
                console.log(Decimal(numbers[operations["p"]+7]));
                Result=Decimal(numbers[operations["p"]-17]).pow(Decimal(numbers[operations["p"]+7]));
                numbers.splice(operations["p"]-17,31,Result);
                delete operations["p"]; 
            }
            arrays=checkBrackets(bracket["("], bracket[")"], numbers, Result);
            numbers=arrays[0]; digital=arrays[1];   
            delete operations["/"];
            functions();
        }
    
        if("×" in operations || "/" in operations){
            console.log(operations);
                
            if((operations['×']<operations['/'] && ("×" in operations)) || !("/" in operations)){
                Result=Decimal(numbers[operations['×']-1]).mul(Decimal(numbers[operations['×']+1]));  
                numbers.splice(operations['×']-1,3,Result);
                delete operations["×"];
            }

            else if((operations['×']>operations['/'] && ("/" in operations)) || !("×" in operations)){
                Result=Decimal(numbers[operations['/']-1]).div(Decimal(numbers[operations['/']+1]));  
                numbers.splice(operations['/']-1,3,Result);
                delete operations["/"];     
            }
            arrays=checkBrackets(bracket["("], bracket[")"], numbers, Result);  
            numbers=arrays[0]; digital=arrays[1];
            functions();
        
        }   

        if("+" in operations || "-" in operations){
            console.log(operations["-"]);
                    
            if((operations["+"]<operations["-"] && ("+" in operations)) || !("-" in operations)){
                Result=Decimal(numbers[operations["+"]-1]).add(Decimal(numbers[operations["+"]+1]));  
                numbers.splice(operations["+"]-1,3,Result);
                delete operations["+"];
            }

            else if((operations["+"]>operations["-"] && ("-" in operations)) || !("+" in operations)){
                Result=Decimal(numbers[operations["-"]-1]).sub(Decimal(numbers[operations["-"]+1]));
                numbers.splice(operations["-"]-1,3,Result);
                delete operations["-"];
            }
            arrays=checkBrackets(bracket["("], bracket[")"], numbers, Result);
            numbers=arrays[0]; digital=arrays[1];
            functions();        
        }

    }
            
/*

    if(modul!=null){
                sign=result.charAt(result.length-1);
                console.log(modul);
                if(modul<0){
                    modul=-modul;
                }
                else if(modul>=0){
                    modul=modul;
                }
                if(sign!='='){
                    digital=digital+sign;
                }
            }
*/            
    let sign=digital.charAt(digital.length-1);
                
    if(sign=="="){
        digital=digital.slice(0,digital.length-1);
    }
    screen.innerHTML=`${result}${digital}`;
             
});
   
    
function show(){
    screen.innerHTML=`${digital}`;
    
}
function clear( dic){
    for (key in dic){
        delete dic[key];
    }
}

function clearAll(){
    clear(operations);
    clear(bracket);
    degree='';
    result="";
    digital='';
    isRoot=false;
    screen.innerHTML=`${result}`;
    console.log(result);
}

function clearLastNumber(){
    console.log(degree);
    let lastNumber=digital.slice(digital.length-1);
    console.log("lastnumber =", lastNumber);
    console.log(numbers);

    if(numbers[numbers.length-2]=="√" || numbers[numbers.length-2]=="^"){
        degree=degree.slice(0,degree.length-1);
        console.log(degree);
        div.innerHTML=`${degree}`;
        console.log(div);
        result=result.slice(0,result.length-1);
        digital=digital.slice(0,digital.length-1);
        if(degree==""){
            console.log(degree);
            div.classList.remove('boxpClick');
            isRoot=false;
        }
        
    }
    if (lastNumber==">"){
        console.log(degree);
        if (numbers[numbers.length-7].length==1){
            numbers=numbers.slice(0,numbers.length-30);
            digital=digital.slice(0, digital.length-34);
            result=result.slice(0, result.length-34);
            numbers.push("^"); 
            digital=digital+"^";
            rootexp("^", numbers.lastIndexOf("^"));
        }
        else{
            lastNumber=digital.at(-7);
            digital=digital.slice(0, digital.length-35);
            result=result.slice(0, result.length-35);
            digital=digital+"^";
            console.log(digital);
            console.log(degree);
            console.log(numbers[numbers.length-7]);
            rootexp("^", numbers.length-30, numbers[numbers.length-7]);
        }
        
       
    }
    /*else if (numbers[numbers.length-1]==">"){
        console.log(numbers);
        degree=degree.slice(0,degree.length-1);
        console.log(degree);
        div.innerHTML=`${degree}`;
        result=result.slice(0,result.length-1);
        digital=digital.slice(0,digital.length-1);
        if(degree==""){
            div.classList.toggle('boxClick');
        } 
    }*/
    
    else{
        if(lastNumber in operations){
            operations[lastNumber]=null;
        }
        else if(lastNumber in bracket){
            bracket[lastNumber]=null;
        }
        console.log(numbers);
        result=result.slice(0,result.length-1);
        digital=digital.slice(0,digital.length-1);
        screen.innerHTML=`${result}`;
        
    }

    numbers=digital.match(/\d+(\.\d+)?|[()\/×+-√^]/g);
   console.log(numbers);
}
