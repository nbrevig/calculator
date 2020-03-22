var chars = [];
var numChars = [];

for(i=48;i<59;i++){
	chars.push(i);
}
for(i=96;i<112;i++){
	if(i === 108){continue;}
	numChars.push(i);
}


numChars.push(8);
numChars.push(67);
numChars.push(46);
numChars.push(192);
numChars.push(13);

document.onkeydown = function(e){
	for(let = i=0;i<20;i++){
		if(e.keyCode === chars[i] || e.keyCode === numChars[i]){
			document.getElementById('b' + i).click();
			break;
		}
	}
};
