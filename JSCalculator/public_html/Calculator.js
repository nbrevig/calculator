var display = document.getElementById('display');
var disHtml = display.innerHTML;
var inputN1 = [];
var num = 20;
var symbols = ['+', '-', '×', '÷'];
var equation = display.innerHTML;
   
//detects if a button is pressed
for(i=0;i<num;i++){
    inputN1.push(document.getElementById('b' + i));  
    inputN1[i].addEventListener("click", inputType);
}
//checks which button type was pressed
function inputType(input){
    character = (input.target.className === 'num' || input.target.className === 'operator') ? displayCharacter(input) : undefined;
    deleteNumber = (input.target.id === 'b15') ? backspace(input) : undefined;
	clearTerm = (input.target.id === 'b16') ? clear() : undefined;
    clearDisplay = (input.target.id === 'b17') ? clearEverything() : undefined;
	equateAnswer = (input.target.id === 'b19') ? answer() : undefined;
}

//displays character
function displayCharacter(n){
    display.innerHTML += n.target.innerText;
}
//clears current term
function clear(){
	for(i=display.innerHTML.length-1;i>0;i--){
		if(display.innerHTML[i] === '+'||display.innerHTML[i] === '-'||display.innerHTML[i] === '×'||display.innerHTML[i] === '÷'){ 
			display.innerHTML = display.innerHTML.slice(0, i);
			break;
		}
		if(i === 1){display.innerHTML = '';};
	}
}
//clears all characters
function clearEverything(){
    display.innerHTML = '';
}
//deletes a character
function backspace(){
	display.innerHTML = display.innerHTML.slice(0, -1)
}
//filters out duplicate values in arrays
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
//sorts arrays numerically 
function sortNumber(a, b) {
  return a - b;
}

function answer(){
	equation = display.innerHTML;
	var term = [];
	var symbolLoc = [];
	var orgSymbolLocs = [];
	var symbolCheck;
	var symbol = [];
	var orgSymbols = [];
	var answer;
	var point1;
	var point2;
	
	//checks which symbols are in the equation
	for(i=0;i<symbols.length;i++){
		for(e=0;e<equation.length;e++) {
			if (equation[e] === symbols[i]){symbol.push(i)};
		}
	}
	//checks where the symbols are located in the equation
	for(i=0;i<symbol.length;i++){	
		for(s=0;s<equation.length;s++) {
			if (equation[s] === symbols[symbol[i]]){symbolLoc.push(s)}
		}	
	}
	//filters out duplicate values
	symbolLoc = symbolLoc.filter(onlyUnique);
	
	//organizes the symbols from least to greatest
	for(i=0;i<symbol.length;i++){
		orgSymbolLocs = symbolLoc.slice();
		orgSymbolLocs.sort(sortNumber);
		
		orgSymbols.push(symbol[symbolLoc.indexOf(orgSymbolLocs[i])]);
	}
	//organizes terms in order
	for(i=0;i<orgSymbolLocs.length+1;i++){
		checkPoint1 = (orgSymbolLocs[i-1] !== undefined) ? point1 = orgSymbolLocs[i-1]+1 : point1 = 0;
		checkPoint2 = (orgSymbolLocs[i] !== undefined) ? point2 = orgSymbolLocs[i] : point2 = equation.length; 
		
		//if(point2 === 0){continue;}
		
		//if(orgSymbols[i-1] === 1 && i > 1){point1 -= 1;}
			
		term.push(equation.slice(point1, point2))
		
		console.log(point1)
		console.log(point2)

	}
	//checks for blank terms
	for(i=0;i<term.length;i++){
		if(term[i] === '' && orgSymbols[i] === 1){
			term[i+1] = -term[i+1];
			term.splice(i,1);
			
			orgSymbols.splice(i,1);
		}
	}
	//combines like terms
	for(i=0;i<symbol.length;i++){
		//combines multiplication and division terms
		for(s=0;s<orgSymbols.length;s++) {
			
			if (orgSymbols[s] >= 2){	
				term[s] = equateTerms(term[s], term[s+1], orgSymbols[s]);
					
				if(term[s+1] !== undefined){term.splice(s+1, 1)}
				
				orgSymbols.splice(s, 1);
				
				s -= 1;
				
			}	
		}
	}
	
//combines addition and subtraction terms
	for(i=0;i<symbol.length;i++){
		for(s=0;s<orgSymbols.length;s++) {
			
			if (orgSymbols[s] <= 1){	
				term[s] = equateTerms(Number(term[s]), Number(term[s+1]), orgSymbols[s]);
					
				if(term[s+1] !== undefined){term.splice(s+1, 1)}
				
				orgSymbols.splice(s, 1);
				
				s -= 1;
			}
		}	
	}

	display.innerHTML = term[0];
}
//equats two terms
function equateTerms(term1, term2, expression){
	if(expression === 2){return multiply(term1, term2)}
	if(expression === 3){return divide(term1, term2)}
	if(expression === 0){return add(term1, term2)}
	if(expression === 1){return subtract(term1, term2)}
}


function add(input1, input2){
	return input1 + input2;
}

function subtract(input1, input2){
	return input1 - input2;
}

function multiply(input1, input2){
	return input1 * input2;
}

function divide(input1, input2){
	return input1 / input2;
}