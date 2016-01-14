var code, input, timeout;
var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;
function noFunc(x){alert("No such function: "+x)}
function fb(x,y){return(typeof x)=="undefined"?y:x}
function regexify(x,y){if(x instanceof RegExp)return x;var z="",i=0,a=!1;for(;i<x.length;i++)x[i]=="%"?x=x.slice(0,i)+"\\"+x.slice(i):z+=(x[i]=="\\"?(i++,x[i]=="A"?a?"A-Z":"[A-Z]":x[i]=="a"?a?"a-z":"[a-z]":x[i]=="l"?a?"A-Za-z":"[A-Za-z]":x[i]=="V"?a?" -?B-DF-HJ-NP-TV-`b-df-hj-np-tv-\uFFFF":"[^AaEeIiOoUu]":x[i]=="v"?a?"AaEeIiOoUu":"[AaEeIiOoUu]":"\\"+x[i]):x[i]=="["?(a=!0,"["):x[i]=="]"?(a=!1,"]"):x[i]);return RegExp(z,y===""?"":(y||"")+"g")}

var pairs_1_3 = { 
	// Unicode shortcuts
	// Using \u<hex> to avoid encoding incompatibilities
	"@":	  "XYZ{",
	"_":	  "Z{Z",
	"\u00A1": "Um@",  // ¡ - 161
	"\u00A2": "Us2 ", // ¢ - 162
	"\u00A3": "m@",   // £ - 163
	"\u00A4": "s2 ",  // ¤ - 164
	"\u00A5": "==",   // ¥ - 165
	"\u00A6": "!=",   // ¦ - 166
	"\u00A7": "<=",   // § - 167
	"\u00A8": ">=",   // ¨ - 168
	"\u00A9": "&&",   // © - 169
	"\u00AA": "||",   // ª - 170
	"\u00AB": "&&!",  // « - 171
	"\u00AC": "q ",   // ¬ - 172
//	"\u00AD": "",	  //	 173 is an unprintable
	"\u00AE": "m_",   // ® - 174
	"\u00AF": "s0,",  // ¯ - 175
	"\u00B0": "++",   // ° - 176
	"\u00B1": "+=",   // ± - 177
	"\u00B2": "p2 ",  // ² - 178
	"\u00B3": "p3 ",  // ³ - 179
	"\u00B4": "--",   // ´ - 180
	"\u00B5": "-=",   // µ - 181
	"\u00B6": "===",  // ¶ - 182
	"\u00B7": "qR ",  // · - 183
	"\u00B8": "qS ",  // ¸ - 184
	"\u00B9": ") ",   // ¹ - 185
	"\u00BA": "((",   // º - 186
	"\u00BB": "(((",  // » - 187
	"\u00BC": ".25",  // ¼ - 188
	"\u00BD": ".5",   // ½ - 189
	"\u00BE": ".75",  // ¾ - 190
//	"\u00BF": "",	  // ¿ - 191 - reserved for future use
	"\u00C0": "!==",  // À - 192
	"\u00C1": ">>>",  // Á - 193
	"\u00C2": "~~",   // Â - 194
	"\u00C3": "} ",   // Ã - 195
	"\u00D0": "$new Date$(" // Ð - 208
};

var pairs_2_0 = { 
	// A new list of Unicode shortcuts
	// Using \u<hex> to avoid encoding incompatibilities
	"@":	  "XYZ{",
	"_":	  "Z{Z",
	"\u00A1": "!=",   // ¡ - 161
	"\u00A2": "==",   // ¢ - 162
	"\u00A3": "<=",   // £ - 163
	"\u00A4": ">=",   // ¤ - 164
	"\u00A5": "===",  // ¥ - 165
	"\u00A6": "!==",  // ¦ - 166
	"\u00A7": "+=",   // § - 167
	"\u00A8": "++",   // ¨ - 168
	"\u00A9": "&&",   // © - 169
	"\u00AA": "||",   // ª - 170
	"\u00AB": "<<",   // « - 171
	"\u00AC": "&&!",  // ¬ - 172
//	"\u00AD": "",	  //	 173 is an unprintable
	"\u00AE": "-=",   // ® - 174
	"\u00AF": "--",   // ¯ - 175
	"\u00B0": "|=",   // ° - 176
	"\u00B1": "~~",   // ± - 177
	"\u00B2": "p2 ",  // ² - 178
	"\u00B3": "p3 ",  // ³ - 179
	"\u00B4": "&=",   // ´ - 180
	"\u00B5": "^=",   // µ - 181
	"\u00B6": "%=",   // ¶ - 182
	"\u00B7": ">>>",  // · - 183
	"\u00B8": ") ",   // ¸ - 184
	"\u00B9": ">>>0", // ¹ - 185
	"\u00BA": "((",   // º - 186
	"\u00BB": ">>",   // » - 187
	"\u00BC": ".25",  // ¼ - 188
	"\u00BD": ".5",   // ½ - 189
	"\u00BE": ".75",  // ¾ - 190
	"\u00BF": " ?",	  // ¿ - 191
	"\u00C0": " :",   // À - 192
	"\u00C1": "} ",   // Á - 193
	"\u00C2": "+1",   // Â - 194
	"\u00C3": "-1",   // Ã - 195
	"\u00C4": "*2",   // Ä - 199
	"\u00C5": "/2",   // Å - 197
	"\u00C6": "%2",   // Æ - 198
	"\u00C7": "&1",   // Ç - 199
	"\u00C8": "|1",   // È - 200
	"\u00C9": "^1",	  // É - 201
	"\u00CA": "|0",   // Ê - 202
	"\u00CB": "$new ",// Ë - 203
	"\u00CD": "))",   // Ì - 204
	"\u00CE": "$while(",//Í- 205
	"\u00CF": "$for(",// Î - 206
	"\u00D0": "$new Date$(" // Ð - 208
};

function df(o,n,f){Object.defineProperty(o.prototype,n,{enumerable:false,configurable:false,writable:true,value:f})}

String.prototype.repeat = String.prototype.repeat || function(x){if(x<0)return'';return Array(x+1).join(this)};
df(String,'a',function(x){return this.lastIndexOf(x)});
df(String,'b',function(x){return this.indexOf(x)});
df(String,'c',function(x){return this.charCodeAt(x)});
df(String,'d',function(x){
	if(arguments.length<2){return(typeof x=="object"?x[0]:x).match(/[\S\s]{1,2}/g).reduce(function(o,f){return o.split(f[0]).join(f[1])},this)}
	else{return[].reduce.call(arguments,function(o,f,i,a){return i%2?o:o.replace(regexify(f,'g'),a[i+1]);},this)}});
df(String,'e',function(x,y,z){x=regexify(x,z||"g");var t=this,u;for(var i=1e8;i--&&t!==u;)u=t,t=t.replace(x,y||"");return t});
df(String,'f',function(x,y){return this.match(regexify(x,y))});
df(String,'g',function(x){return this.charAt(x||0)});
df(String,'h',function(x,y){return this.substring(0,x)+y+this.substring(x+y.length)});
df(String,'i',function(x,y){return this.substring(0,x)+y+this.substring(x)});
df(String,'j',function(x,y){y=fb(y,1);return this.substring(0,x)+this.substring(x+y)});
df(String,'k',function(x,y){y=fb(y,"");return this.replace(regexify(x,y),"")});
df(String,'l',function(){return this.length});
df(String,'m',function(x,y){return this.split(y||'').map(x).join(y||'')});
df(String,'n',function(x){x=x||10;if(x==10)return parseFloat(this);else return parseInt(this,x)});
df(String,'o',function(x){return this.replace(regexify('[^'+x+']','gi'),"")}); // Removes all but specified characters. Similar to TeaScript's O function
df(String,'p',function(x){return this.repeat(x)});
df(String,'q',function(x){x=fb(x,"");return this.split(x)});
df(String,'r',function(x,y,z){y=fb(y,"");return this.replace(regexify(x,z),y)});
df(String,'s',function(x,y){y=fb(y,this.length);if(y<0)y+=this.length;return this.substring(x,y)});
df(String,'t',function(x,y){y=fb(y,this.length);return this.substr(x,y)});
df(String,'u',function(){return this.toUpperCase()});
df(String,'v',function(){return this.toLowerCase()});
df(String,'w',function(){return this.split('').reverse().join('')});
df(String,'x',function(x){return x==1?this.trimRight():x==2?this.trimLeft():this.trim()});
df(String,'y',function(){return this.split("\n").y().join("\n")});
df(String,'z',function(n){return this.split("\n").z(n).join("\n")});
df(String,'\u00E0',function(x){return this.q()['\u00E0']().map(function(y){return y.q()})});
df(String,'\u00E1',function(x){return this.q()['\u00E1']().map(function(y){return y.q()})});
df(String,'\u00E2',function(x){return this.search(x)});
df(String,'\u00E3',function(x){return this.q()['\u00E3'](x).map(function(a){return a.q()})});
df(String,'\u00E4',function(x){return this.q()['\u00E3']().map(function(a){return x(a[0],a[1],a.q())})});
df(String,'\u00E8',function(x){return this.f(x).length});

df(Array,'a',function(x){return(typeof x)=="function"?this.map(function(a,b,c){return!!x(a,b,c)}).lastIndexOf(true):this.lastIndexOf(x)});
df(Array,'b',function(x){return(typeof x)=="function"?this.map(function(a,b,c){return!!x(a,b,c)}).indexOf(true):this.indexOf(x)});
df(Array,'c',function(){var f=[];for(var i of this){if(i instanceof Array)for(var j of i.c())f.push(j);else f.push(i);}return f});
df(Array,'d',function(x){return this.some(x)});
df(Array,'e',function(x){return this.every(x)});
df(Array,'f',function(x){x=fb(x,function(y){return!!y});return this.filter((typeof x)=="function"?x:function(y){return x==y})});
df(Array,'g',function(x){return this[x||0]});
df(Array,'h',function(x,y){this[x]=y;return this});
df(Array,'i',function(x,y){this.splice(x,0,y);return this});
df(Array,'j',function(x,y){y=fb(y,1);return this.splice(x,y)});
df(Array,'k',function(x){this.splice(this.indexOf(x),1);return this});
df(Array,'l',function(){return this.length});
df(Array,'m',function(x){return this.map(x)});
df(Array,'n',function(x){return this.sort(x)});
df(Array,'o',function(x){x=x||1;if(x>1){for(var a=[];x--;)a.push(this.pop());return a}else return this.pop()});
df(Array,'p',function(){for(var i of [].slice.call(arguments))this.push(i);return this});
df(Array,'q',function(x){return this.join(x||"")});
df(Array,'r',function(x,y){return this.reduce(x,y||(typeof this[0]=="number"?0:""))});
df(Array,'s',function(x,y){y=fb(y,this.length);return this.slice(x,y)});
df(Array,'t',function(x,y){y=fb(y,this.length);return this.slice(x,x+y)});
df(Array,'u',function(){for(var i of [].slice.call(arguments))this.unshift(i);return this});
df(Array,'v',function(){return this.shift()});
df(Array,'w',function(){return this.reverse()});
df(Array,'x',function(){return this.reduce(function(a,b){return a+parseFloat(b)},0)});
df(Array,'y',function(){var t="string"==typeof this[0],n=t?this.map(function(t){return t.split("")}):this,x,y,z=n.reduce(function(p,q){return Math.max(p,q.length)},0),a=[];for(y=0;y<z;y++)a[y]=t?Array(n.length).fill(" "):[];for(y=0;y<n.length;y++)for(x=0;x<n[y].length;x++)a[x][y]=n[y][x];return t?a.map(function(r){var i=0;return r.join("")}):a});
df(Array,'z',function(n){if((typeof n)!="number")n=1;n%=4;if(n<0)n+=4;var f=function(l){return l.w()};return n==1?this.y().map(f):n==2?this.w().map(f):n==3?this.map(f).y():this}); // (clockwise) 1: 90deg, 2: 180deg, 3: -90deg
df(Array,'\u00E0',function(x){var f=function(y,z,a){if(y.length===0&&z.length===0)return;if(z.length===0){a.push(y)}else{var n=y.slice(0);n.push(z[0]);f(n,z.slice(1),a);f(y,z.slice(1),a)}return a};return f([],this,[]).filter(function(z){return x?z.length===x:1})});
df(Array,'\u00E1',function(x){var p=[],u=[],f=function(z){var c,i;for(i=0;i<z.length;i++){c=z.splice(i,1)[0];u.push(c);if(z.length===0)p.push(u.slice());f(z);z.splice(i,0,c);u.pop()}return p};var l;return f(this).map(function(z){return z.slice(0,x||z.length)})["\u00E2"]()});
df(Array,'\u00E2',function(){var u={},a=[];for(var i of this)if(!u.hasOwnProperty(i))u[i]=1,a.push(i);return a});
df(Array,'\u00E3',function(x){x=fb(x,2);var a=[];for(var i=0;i<=this.length-x;i++)a.push(this.slice(i,i+x));return a});
df(Array,'\u00E4',function(x){return this['\u00E3']().map(function(z){return z.reduce(x)})});
df(Array,'\u00E5',function(x,y){var a=[];this.reduce(function(q,r,s){var t=x(q,r,s);a.push(t);return t},y||(typeof this[0]=="number"?0:""));return a});
df(Array,'\u00E6',function(x){return this.f(x)[0]});
df(Array,'\u00E7',function(x){return this.fill(x)});
df(Array,'\u00E8',function(x){return this.f(x).length});

df(Number,'a',function(){return Math.abs(this)});
df(Number,'b',function(x,y){return this<x?x:this>y?y:this});
df(Number,'c',function(x){x=fb(x,1);return Math.ceil(this/x)*x});
df(Number,'d',function(){return String.fromCharCode(this)});
df(Number,'e',function(x){return this*Math.pow(10,x)});
df(Number,'f',function(x){x=fb(x,1);return Math.floor(this/x)*x});
df(Number,'g',function(){return this.toString()=="NaN"?"NaN":this<0?-1:this>0?1:0});
df(Number,'h',function(){noFunc('Nh')});
df(Number,'i',function(x){return setInterval(x,this)});
df(Number,'j',function(){return this.k().length===1});
df(Number,'k',function(){var n=this,r,f=[],x,d=1<n;while(d){r=Math.sqrt(n);x=2;if(n%x){x=3;while(n%x&&((x+=2)<r));}f.push(x=x>r?n:x);d=(x!=n);n/=x;}return f});
df(Number,'l',function(){var n=this|0,x=this|0;if(n<1)return 1;while(--n)x*=n;return x});
df(Number,'m',function(x){return Math.min(this,x)});
df(Number,'n',function(){return-this});
df(Number,'o',function(x,y){var z=this;y=fb(y,1);if(typeof(x)==="undefined")x=z,z=0;if(x<z)_=x,x=z,z=_;var r=[],i=0;if(y>0)for(;z<x;z+=y)r.push(z);else if(y<0)for(;z<x;x+=y)r.push(x);return r});
df(Number,'p',function(x){x=fb(x,2);return Math.pow(this,x)});
df(Number,'q',function(x){x=fb(x,2);return Math.pow(this,1/x)});
df(Number,'r',function(x){x=fb(x,1);return Math.round(this/x)*x});
df(Number,'s',function(x){x=fb(x,10);return this.toString(x)});
df(Number,'t',function(x){return setTimeout(x,this)});
df(Number,'u',function(){return this%2===1?1:0});
df(Number,'v',function(){return this%2===0?1:0});
df(Number,'w',function(x){return Math.max(this,x)});
df(Number,'x',function(){noFunc('Nx')});
df(Number,'y',function(){noFunc('Ny')});
df(Number,'z',function(){noFunc('Nz')});
df(Number,'\u00E0',function(x){var n=this|0;x=fb(x,0)|0;if(x<0||n<0)return 0;if(x===0)return Math.pow(2,n)-1;return Math.round(n.l()/(x.l()*(n-x).l()))});
df(Number,'\u00E1',function(x){var n=this|0;x=fb(x,0)|0;if(x<0||n<0)return 0;if(x===0)return n.l();return n["\u00E0"]()*x.l()});

// Shorter Date properties. All but k accept an argument: 0 = get, 1 = set, 2 = getUTC, and 3 = setUTC.
function ts(x){return["get","set","getUTC","setUTC"][x||0]}
df(Date,'a',function(x,y){return this[ts(x||0)+"Milliseconds"](y||0)});
df(Date,'b',function(x,y){return this[ts(x||0)+"Seconds"](y||0)});
df(Date,'c',function(x,y){return this[ts(x||0)+"Minutes"](y||0)});
df(Date,'d',function(x,y){return this[ts(x||0)+"Hours"](y||0)});
df(Date,'e',function(x,y){return this[ts(x||0)+"Day"](y||0)});
df(Date,'f',function(x,y){return this[ts(x||0)+"Date"](y||0)});
df(Date,'g',function(x,y){return this[ts(x||0)+"Month"](y||0)});
df(Date,'h',function(x,y){return this[ts(x||0)+"Year"](y||0)}); // Note: getYear() and setYear() do not have UTC partners
df(Date,'i',function(x,y){return this[ts(x||0)+"FullYear"](y||0)});
df(Date,'j',function(x,y){return this[ts(x||0)+"Time"](y||0)}); // Note: getTime() and setTime() do not have UTC partners
df(Date,'k',function(){return this.getTimezoneOffset()});

// Ds accepts one argument that controls how the string is formatted. Some formats may not work on some browsers.
df(Date,'s',function(x){return this["to"+["","Date","Time","ISO","GMT","UTC","Locale","LocaleDate","LocaleTime"][x||0]+"String"]()});

df(Date,'l',function(){noFunc('Dl')});
df(Date,'m',function(){noFunc('Dm')});
df(Date,'n',function(){noFunc('Dn')});
df(Date,'o',function(){noFunc('Do')});
df(Date,'p',function(){noFunc('Dp')});
df(Date,'q',function(){noFunc('Dq')});
df(Date,'r',function(){noFunc('Dr')});
df(Date,'t',function(){noFunc('Dt')});
df(Date,'u',function(){noFunc('Du')});
df(Date,'v',function(){noFunc('Dv')});
df(Date,'w',function(){noFunc('Dw')});
df(Date,'x',function(){noFunc('Dx')});
df(Date,'y',function(){noFunc('Dy')});
df(Date,'z',function(){noFunc('Dz')});

// Shorter Date properties
Date.p = Date.parse;

// Shorter Math properties
Math.a = Math.atan2;
Math.g = function(n){var f=Math.sqrt(5),g=.5*(1+f);return(1/f)*(Math.pow(g,n)-Math.pow(-g,-n))}; // Fibonacci
Math.r = function(x,y){x=fb(x,1);y=fb(y,0);return Math.random()*x+y};
Math.q = function(x,y,z){x=fb(x,1);y=fb(y,0);z=fb(z,1);return Math.floor(Math.random()*z)/z*x+y};
Math.s = Math.sin;
Math.c = Math.cos;
Math.t = Math.tan;
Math.h = Math.hypot || function hypot(){return Math.sqrt(arguments.reduce(function(a,b){return a+b*b}))};

Math.P = Math.PI;
Math.Q = 1.618033988749894848;
Math.S = Math.SQRT_2;
Math.T = Math.SQRT_1_2;

// String compression
shoco.c = function (str) { return Array.prototype.map.call(shoco.compress(str), function (char) { return String.fromCharCode(char) }).join('') };
shoco.d = function (str) { return shoco.decompress(new Uint8Array( ( str.constructor == Array ? str[0] : str ).split('').map(function (char) {return char.charCodeAt(0)})))};

void(0);

function clear_output() {
	document.getElementById("output").value = "";
	document.getElementById("stderr").innerHTML = "";
}

function output(x) {
	document.getElementById("output").value += x;
}

function stop() {
	running = false;
	document.getElementById("run").disabled = false;
	document.getElementById("stop").disabled = true;
	document.getElementById("clear").disabled = false;
	document.getElementById("timeout").disabled = false;
}

function interrupt() {
	error("Interrupted");
}

function error(msg) {
	document.getElementById("stderr").innerHTML = msg;
	alert(msg);
	stop();
}

function success(result) {
	output(result);
	alert("Result: "+result);
}

function evalInput(input) {
	var input_mode = "next", current, processed = [], level = 0;
	input = (input+" ").split("");
	for(var index = 0; index<input.length; index++) {
		char = input[index];
		switch (input_mode) {
			case "next":
				if (/[0-9.-]/.test(char)) {
					input_mode = "number";
					current = char;
				} else if (/["']/.test(char)) {
					input_mode = "string "+char;
					current = "";
				} else if (char == "[") {
					input_mode = "array";
					current = "";
					level = 1;
				}
				break;
			case "number":
				if (/[0-9.]/.test(char)) {
					current += char;
				} else {
					processed.push(+current);
					current = undefined;
					input_mode = "next";
				}
				break;
			case "string \"":
				if (char == "\"") {
					processed.push(current);
					current = undefined;
					input_mode = "next";
				} else if (char == "\\" && /'"\\/.test(input[index+1])) {
					current += input[++index];
				} else {
					current += char;
				}
				break;
			case "string '":
				if (char == "'") {
					processed.push(current);
					current = undefined;
					input_mode = "next";
				} else if (char == "\\" && /'"\\/.test(input[index+1])) {
					current += input[++index];
				} else {
					current += char;
				}
				break;
			case "array":
				if (char == "[")
					level++;
				if (char == "]")
					level--;
				if (level === 0) {
					processed.push(evalInput(current));
					current = undefined;
					input_mode = "next";
				} else {
					current += char;
				}
				break;
		}
	}
	return processed;
}

function run() {
	clear_output();
	document.getElementById("run").disabled = true;
	document.getElementById("stop").disabled = false;
	document.getElementById("clear").disabled = true;
	document.getElementById("input").disabled = false;
	document.getElementById("timeout").disabled = false;

	code = document.getElementById("code").value;
	input = document.getElementById("input").value;
	timeout = document.getElementById("timeout").checked;

	A = 10,
	B = 11,
	C = 12,
	D = 13,
	E = 14,
	F = 15,
	G = 16,
	H = 32,
	I = 64,
	J = -1,
	K = Date,
	L = 100,
	M = Math,
	N = evalInput(input),
	O = {
		a:function(){alert.apply(window,arguments)},
		l:function(){console.log.apply(console,arguments)},
		r:clearInterval,
		o:output,
		p:function(x){output(x+"\n")},
		c:shoco.c,
		d:shoco.d,
		v:function(x){var r="";try{r=eval(transpile(x))}catch(e){error(e)}return r},
		x:function(x){var r="";try{r=eval(x)}catch(e){error(e)}return r}
	},
	P = "",
	Q = "\"",
	R = "\n",
	S = " ",
	T = 0,
	U = N.length <= 0? 0 : N[0],
	V = N.length <= 1? 0 : N[1],
	W = N.length <= 2? 0 : N[2],
	X = N.length <= 3? 0 : N[3],
	Y = N.length <= 4? 0 : N[4],
	Z = N.length <= 5? 0 : N[5];

	evalJapt(code, function(code){if(location.hostname!=="ethproductions.github.io")alert("JS code: "+code)}, success, error);

	document.getElementById("run").disabled = false;
	document.getElementById("stop").disabled = true;
	document.getElementById("clear").disabled = false;
	document.getElementById("input").disabled = false;
	document.getElementById("timeout").disabled = false;
}

function newvars() {
	A = [],
	B = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	C = "abcdefghijklmnopqrstuvwxyz",
	D = "QWERTYUIOP\nASDFGHJKL\nZXCVBNM",
	E = "[a-z]",
	F = "[A-Za-z]",
	G = 36,
	H = 65,
	I = 91,
	J = ",",
	L = ".";
}

function subparen(code) {
	var level = 0, min = 0;
	for(var i=0;i<code.length;i++) {
		if(code[i]=='(')
			level++;
		if(code[i]==')')
			level--, min = Math.min(min, level);
	}
	if(min < 0) code = '('.repeat(-min) + code, level-=min;
	if(level > 0) code += ')'.repeat(level);
	return code;
}

function fixParens(code) {
	var cade = "", mode = "next", char = "", curr = "", temp = "", level = 0;
	for(var i=0;i<code.length;i++) {
		char = code[i];
		switch(mode) {
			case "next":
				if (char == ";") {
					cade += subparen(curr) + char;
					curr = "";
				} else if (char == "[") {
					mode = "array";
					level = 0;
				} else if (char == "{") {
					mode = "brackets";
					level = 0;
				} else {
					curr += char;
				}
				break;
			case "array":
				if (char == "[") {
					level++;
				} else if (char == "]") {
					level--;
				}
				if (level < 0) {
					curr += "[" + fixParens(temp) + "]";
					temp = "";
					mode = "next";
				} else {
					temp += char;
				}
				break;
			case "brackets":
				if (/{@_/.test(char)) {
					level++;
				} else if (char == "}") {
					level--;
				}
				if (level < 0) {
					curr += "{" + temp + "}";
					temp = "";
					mode = "next";
				} else {
					temp += char;
				}
				break;
		}
	}
	cade += subparen(curr);
	return cade;
}

function transpile(code) {
	/* For Lexer */
	var level = 0,	  // Current number of parentheses or curly braces that we're inside
		temp = "",
		pairs = pairs_1_3,  // Version of Unicode shortcuts to use
	  
		i = 0,
		j = 0,

		strings = [],   // Stores the {...} inside strings
		outp = "";	  // Temporary output

	// Some helpful functions
	function isChar (str, char) { return RegExp('^['+char+']$').test(str); }

	for (i = 0; i < code.length; i++) {
		var char = code[i];
		if (char === ";" && i === 0) { outp += "newvars()"; }
		else if (isChar(char, "`'\"A-Z0-9\\(\\[{") && isChar(outp.slice(-1), "`\"A-Z0-9\\)\\]}")
			&& !(isChar(char,"0-9") && isChar(outp.slice(-1),"0-9"))) {
			outp += ",";
		}
		else if (isChar(outp.slice(-1),"+\\-&|\\^") && isChar(char," \\)\\]};"))
			code = code.slice(0,i)+'1'+code.slice(i);
		else if (isChar(outp.slice(-1),"*%") && isChar(char," \\)\\]};"))
			code = code.slice(0,i)+'2'+code.slice(i);
		
		if (isChar(char, "`\"")) { // If new token is a quotation mark " or backtick `
			var qm = outp.slice(-1) === "?"; // Question Mark
			var str = "";
			for (i++; code[i] !== char && i < code.length; i++) {
				if (code[i] === "\\") { // If we encounter a backslash
					str += "\\" + code[++i]; // Go to next character and store
				} else if (code[i] === "{") { // If it is a { - This is for the "{2+1}" stuff
					temp = "";
					for (level = 1, i++; level > 0 && i < code.length; i++) {
						if (code[i] === "}") {
							level--;
						} else if (code[i] === "{") {
							level++;
						}
						temp += code[i];
					}
					strings[j] = transpile(temp.slice(0,-1));
					str += "{" + j++ + "}";
					i--;
				} else if (code[i] === ":" && qm) {
					str += "\":\"";
					qm = false;
				} else if (code[i] === "\n") {
					str += "\\n";
				} else {
					str += code[i];
				}
			}
			if (char === "`") str = shoco.d(str);
			outp += "\"" + str.replace(/([^\\])\{(\d)}/g,function(_,x,y){return x+"\"+("+strings[y]+")+\""}) + "\""; // Add this character to the output

			continue; // Jump to next iteration
		}
		else if (char === "$") {
			for (i++; code[i] !== "$" && i < code.length; i++) {
				if (code[i] === "\\" && code[i+1] === "$") { // If we encounter a backslash
					i++; // Go to next character and store
					outp += "$";
				} else {
					outp += code[i];
				}
			}
		}
		else if (isChar(char, "A-Z{")) {
			var letters = "";
			for (; isChar(code[i], "A-Z") && i < code.length; i++) {
				letters += code[i];
			}
			if (code[i] === "{") {
				outp += "function(" + letters.split("").join(",") + "){";
				temp = "";
				for (level = 1, i++; level > 0 && i < code.length; i++) {
					if (code[i] === "{") {
						level++;
					} else if (code[i] === "}") {
						level--;
					}
					temp += code[i];
				}
				if (temp.slice(-1) !== "}")
					temp += "}";
				else i--;
				var tr = transpile(temp.slice(0,-1));
				if (tr.lastIndexOf(";") < 0)
					outp += "return " + tr + "}";
				else
					outp += tr.slice(0,tr.lastIndexOf(";")+1) + "return " + tr.slice(tr.lastIndexOf(";")+1) + "}";
			}
			else {
				outp += letters.split("").join(",");
				i--;
			}
		}
		else if (char === "'") {
			if (code[++i] === "\n")
				outp += '"\\n"';
			else
				outp += "\"" + code[i] + "\"";
		}
		else if (char === "#") {
			outp += code[++i].charCodeAt(0);
		}
		else if (char === " ") {
			outp += ")";
		}
		else if (char === ")") {
			outp += "))";
		}
		else if (isChar(char, "a-z")) {
			if (outp.slice(-1) === "(") {
				outp += "function(c){return c."+char+"()}";
			} else if (isChar(outp.slice(-1),"0-9")) {
				if (char === "e") {
					outp += char;
				} else {
					outp += " ." + char + "(";
				}
			} else {
				outp += "." + char + "(";
			}
		}
		else if (isChar(char, "\\u00E0-\\u00F6\\u00F8-\\u00FF")) {
			if (outp.slice(-1) === "(") {
				outp += "function(c){return c[\"\\u00" + char.charCodeAt(0).toString(16).toUpperCase() + "\"]()}";
			} else {
				outp += "[\"\\u00" + char.charCodeAt(0).toString(16).toUpperCase() + "\"](";
			}
		}
		else if (pairs[char]) {
			code = code.slice(0,i+1) + pairs[char] + code.slice(i+1);
		}
		else if (outp.slice(-2) === "(!" && [">>>","===","!=="].indexOf(code.slice(i,i+3)) > -1) {
			outp = outp.slice(0,-1) + "function(a,b){return b"+code.slice(i,i+3)+"a}";
			i+=2;
		}
		else if (outp.slice(-1) === "(" && [">>>","===","!=="].indexOf(code.slice(i,i+3)) > -1) {
			outp += "function(a,b){return a"+code.slice(i,i+3)+"b}";
			i+=2;
		}
		else if (outp.slice(-2) === "(!" && ["<<",">>","==","!=","<=",">=","||","&&"].indexOf(code.slice(i,i+2)) > -1) {
			outp = outp.slice(0,-1) + "function(a,b){return b"+code.slice(i,i+2)+"a}";
			i++;
		}
		else if (outp.slice(-1) === "(" && ["<<",">>","==","!=","<=",">=","||","&&"].indexOf(code.slice(i,i+2)) > -1) {
			outp += "function(a,b){return a"+code.slice(i,i+2)+"b}";
			i++;
		}
		else if (outp.slice(-2) === "(!" && isChar(char, "+\\-*%\\^&|<>") && !isChar(code[i+1],"+\\-=")) {
			outp = outp.slice(0,-1) + "function(a,b){return b"+char+"a}";
		}
		else if (outp.slice(-1) === "(" && isChar(char, "+\\-*%\\^&|<>") && !isChar(code[i+1],"+\\-=")) {
			outp += "function(a,b){return a"+char+"b}";
		}
		else {
			outp += char;
		}
	}
	
	outp = fixParens(outp);
	return outp;
}

function evalJapt(code, before, onsuccess, onerror) {
	code = transpile(code);
	if (before) before(code);
	try {
		var result = eval(code);
		if (onsuccess) onsuccess(result);
	} catch (e) {
		if (onerror) onerror(e);
	}
}
