var A, B, C, D, E, F, G, H, I, J, _K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z; // Japt variables

var isnode = typeof window === "undefined";
if (isnode) var shoco = require("../dependencies/shoco");

// K defaults to new Date()
Object.defineProperty(isnode ? global : window, "K", {
	enumerable: false,
	configurable: true,
	get: function() {
		return fb(_K, new Date());
	},
	set: function(x) {
		return _K = x; 
	}
});

// Runs whenever the program contains a non-existant function call
function noFunc(x) {
	Japt.error("No such function: " + x);
}

// Detects whether the variable is defined
function id(x) {
	return typeof x !== "undefined";
}

// Fallback: returns x if x is defined, y otherwise (like ||, but only if x is undefined)
function fb(x, y) {
	return id(x) ? x : y;
}

// Positive modulo (like Python's %)
function pm(x, y) {
	return (  // Puts x in the range
		x % y // (-y, +y)
		+ y   // ( 0, 2y)
	) % y;    // [ 0,  y)
}

// Defines a function on a prototype
function df(target, properties) {
	for (var key in properties) properties[key] = { value: properties[key], writable: true };
	Object.defineProperties(target, properties);
}

// Converts a string to a regex, Japt-style
function regexify(string, flags) {
	if (string instanceof RegExp)
		// you dirty rotten liar
		return string;
	string = String(string);
	
	if (flags !== "") {
		flags = String(fb(flags, ""));
		if (!flags.contains("g"))
			flags += "g";
	}
	
	var regex = "", inCharClass = false;
	for(var i = 0; i < string.length; i++) {
		var char = string[i];
		if (char === "%") {
			string = string.slice(0, i + 1) + "\\" + string.slice(i + 1);
		}
		else if (char === "\\") {
			char = string[++i];
			if (char === "A")
				regex += inCharClass ? "A-Z" : "[A-Z]";
			else if (char === "a")
				regex += inCharClass ? "a-z" : "[a-z]";
			else if (char === "l")
				regex += inCharClass ? "A-Za-z" : "[A-Za-z]";
			else if (char === "L")
				regex += inCharClass ? "\\W_\\d" : "[^A-Za-z]";
			else if (char === "V")
				regex += inCharClass ? "\\W0-9B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z_" : "[^AaEeIiOoUu]";
			else if (char === "v")
				regex += inCharClass ? "AaEeIiOoUu" : "[AaEeIiOoUu]";
			else if (char === "Y")
				regex += inCharClass ? "\\W0-9B-DF-HJ-NP-TV-XZb-df-hj-np-tv-xz_" : "[^AaEeIiOoUuYy]";
			else if (char === "y")
				regex += inCharClass ? "AaEeIiOoUuYy" : "[AaEeIiOoUuYy]";
			else
				regex += "\\" + char;
		}
		else {
			if (char === "[")
				inCharClass = true;
			else if (char === "]")
				inCharClass = false;
			regex += char;
		}
	}
	
	return RegExp(regex, flags);
}

// Converts a regex string to a regex literal, Japt-style
function regexify2(string) {
	if (string.length === 1) {
		return {
			"\n": /\n/g
		}[string] || regexify2("/\\" + string + "/");
	}
	var end = string.lastIndexOf("/");
	var flags = string.slice(end + 1);
	string = string.slice(1, end);
	
	if (flags.contains("g"))
		flags = flags.replace("g", "");
	else
		flags += "g";
	
	var dotAll = false;
	if (flags.contains("s")) {
		dotAll = true;
		flags = flags.replace("s", "");
	}
	
	var regex = "", inCharClass = false, parens = 0;
	for(var i = 0; i < string.length; i++) {
		var char = string[i];
		if (char === "\\") {
			char = string[++i];
			if (char === "A")
				regex += inCharClass ? "A-Z" : "[A-Z]";
			else if (char === "a")
				regex += inCharClass ? "a-z" : "[a-z]";
			else if (char === "l")
				regex += inCharClass ? "A-Za-z" : "[A-Za-z]";
			else if (char === "L")
				regex += inCharClass ? "\\W_\\d" : "[^A-Za-z]";
			else if (char === "V")
				regex += inCharClass ? "\\W0-9B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z_" : "[^AaEeIiOoUu]";
			else if (char === "v")
				regex += inCharClass ? "AaEeIiOoUu" : "[AaEeIiOoUu]";
			else if (char === "Y")
				regex += inCharClass ? "\\W0-9B-DF-HJ-NP-TV-XZb-df-hj-np-tv-xz_" : "[^AaEeIiOoUuYy]";
			else if (char === "y")
				regex += inCharClass ? "AaEeIiOoUuYy" : "[AaEeIiOoUuYy]";
			else
				regex += "\\" + char;
		}
		else if (char === "." && dotAll) {
			regex += "[^]";
		}
		else if (char === "\n") {
			regex += "\\n";
		}
		else {
			if (char === "[")
				inCharClass = true;
			else if (char === "]")
				inCharClass = false;
			else if (!inCharClass && isChar(char, "*+") && /(^|(^|[^\\])[?*+^(|])$/.test(regex))
				regex += dotAll? "[^]" : ".";
			else if (!inCharClass && isChar(char, "?") && /(^|(^|[^\\])[?^(|])$/.test(regex))
				regex += dotAll? "[^]" : ".";
			else if (char === "(")
				parens += 1;
			else if (char === ")") {
				parens -= 1;
				while (parens < 0) {
					regex = "(" + regex;
					parens += 1;
				}
			}
			regex += char;
		}
	}
	
	if (inCharClass) regex += "]";
	while (parens > 0) regex += ")", parens -= 1;
	
	return RegExp(regex, flags);
}

// Converts an operator/method and an argument to a function, Japt-style
function functify(operator, argument) {
	if (typeof operator === "function")
		return operator;
	
	var hasArg = id(argument),
		func = "f=function(a,b){return ",
		isMethod = /^!?[a-zà-öø-ÿ]$/.test(operator);
	
	if (isMethod) {
		if (operator[0] !== "!")
			func += "a." + operator + (hasArg ? "(b)" : "()");
		else
			func += "b." + operator.slice(1) + "(a)";
	}
	else {
		if (operator[0] !== "!" || operator.slice(0, 2) === "!=")
			func += "a" + operator + "b";
		else
			func += "b" + operator.slice(1) + "a";
	}
	func += "}";
	
	return eval(func);
}

// Returns whether the character is in a specified range
function isChar(char, chars) {
	return RegExp('^[' + chars + ']$').test(char);
}

// Stringifies an object in a good-looking way
function str(x) {
	if (x.constructor === Array)
		return '[' + x.map(str).join(', ') + ']';
	if (x.constructor === String)
		return JSON.stringify(String(x));
	return String(x);
}

// Escapes all special regex characters so they can be used in a regex
function regescape(s) {
	return String(s).replace(/[()[\]{}\-+*^$|\\/.]/g, "\\$&");
}

// Deep-clones an object (note: does not work on arbitrary objects)
function clone(x) {
	if (x instanceof Array)
		return x.map(clone);
	if (x instanceof Date)
		return new Date(x);
	return x;
}

var pairs_1_3 = { 
	// Unicode shortcuts
	// Using \u<hex> to avoid encoding incompatibilities
	"@":    "XYZ{",
	"_":    "Z{Z",
	"\xA1": "Um@",  // ¡ - 161
	"\xA2": "Us2 ", // ¢ - 162
	"\xA3": "m@",   // £ - 163
	"\xA4": "s2 ",  // ¤ - 164
	"\xA5": "==",   // ¥ - 165
	"\xA6": "!=",   // ¦ - 166
	"\xA7": "<=",   // § - 167
	"\xA8": ">=",   // ¨ - 168
	"\xA9": "&&",   // © - 169
	"\xAA": "||",   // ª - 170
	"\xAB": "&&!",  // « - 171
	"\xAC": "q ",   // ¬ - 172
//	"\xAD": "",	  //	 173 is an unprintable
	"\xAE": "m_",   // ® - 174
	"\xAF": "s0,",  // ¯ - 175
	"\xB0": "++",   // ° - 176
	"\xB1": "+=",   // ± - 177
	"\xB2": "p2 ",  // ² - 178
	"\xB3": "p3 ",  // ³ - 179
	"\xB4": "--",   // ´ - 180
	"\xB5": "-=",   // µ - 181
	"\xB6": "===",  // ¶ - 182
	"\xB7": "qR ",  // · - 183
	"\xB8": "qS ",  // ¸ - 184
	"\xB9": ") ",   // ¹ - 185
	"\xBA": "((",   // º - 186
	"\xBB": "(((",  // » - 187
	"\xBC": ".25",  // ¼ - 188
	"\xBD": ".5",   // ½ - 189
	"\xBE": ".75",  // ¾ - 190
//	"\xBF": "",	  // ¿ - 191 - reserved for future use
	"\xC0": "!==",  // À - 192
	"\xC1": ">>>",  // Á - 193
	"\xC2": "~~",   // Â - 194
	"\xC3": "} ",   // Ã - 195
	"\xC4": "+1",   // Ä - 196
	"\xC5": "s1 ",  // Å - 197
	"\xC6": "o@",   // Æ - 198
	"\xC7": "o_",   // Ç - 199
	"\xC8": "XYZ{X",// È - 200
	"\xC9": "-1",   // É - 201
	"\xD0": "$new Date$(", // Ð - 208
	"\xD7": "r*1 ", // × - 215
	"\xDF": "$rp$(" // ß - 223
};

var pairs_2_0 = { 
	// A new list of Unicode shortcuts
	// Using \u<hex> to avoid encoding incompatibilities
	"@":	  "XYZ{",
	"_":	  "Z{Z",
	"\xA1": "!=",   // ¡ - 161
	"\xA2": "==",   // ¢ - 162
	"\xA3": "<=",   // £ - 163
	"\xA4": ">=",   // ¤ - 164
	"\xA5": "===",  // ¥ - 165
	"\xA6": "!==",  // ¦ - 166
	"\xA7": "+=",   // § - 167
	"\xA8": "++",   // ¨ - 168
	"\xA9": "&&",   // © - 169
	"\xAA": "||",   // ª - 170
	"\xAB": "<<",   // « - 171
	"\xAC": "&&!",  // ¬ - 172
//	"\xAD": "",	  //	 173 is an unprintable
	"\xAE": "-=",   // ® - 174
	"\xAF": "--",   // ¯ - 175
	"\xB0": "|=",   // ° - 176
	"\xB1": "~~",   // ± - 177
	"\xB2": "p2 ",  // ² - 178
	"\xB3": "p3 ",  // ³ - 179
	"\xB4": "&=",   // ´ - 180
	"\xB5": "^=",   // µ - 181
	"\xB6": "%=",   // ¶ - 182
	"\xB7": ">>>",  // · - 183
	"\xB8": ") ",   // ¸ - 184
	"\xB9": ">>>0", // ¹ - 185
	"\xBA": "((",   // º - 186
	"\xBB": ">>",   // » - 187
	"\xBC": ".25",  // ¼ - 188
	"\xBD": ".5",   // ½ - 189
	"\xBE": ".75",  // ¾ - 190
	"\xBF": " ?",	  // ¿ - 191
	"\xC0": " :",   // À - 192
	"\xC1": "} ",   // Á - 193
	"\xC2": "+1",   // Â - 194
	"\xC3": "-1",   // Ã - 195
	"\xC4": "*2",   // Ä - 199
	"\xC5": "/2",   // Å - 197
	"\xC6": "%2",   // Æ - 198
	"\xC7": "&1",   // Ç - 199
	"\xC8": "|1",   // È - 200
	"\xC9": "^1",	  // É - 201
	"\xCA": "|0",   // Ê - 202
	"\xCB": "$new ",// Ë - 203
	"\xCD": "))",   // Ì - 204
	"\xCE": "$while(",//Í- 205
	"\xCF": "$for(",// Î - 206
	"\xD0": "$new Date$(" // Ð - 208
};

var permcache = {};
function perm (arr, len) {
	if (len === 0)
		return [[]];
	if (arr.length < 2)
		return [x];
	
	var id = len + ';' + str(arr);
	if (permcache[id])
		return permcache[id];
	
	var result = [];
	for (var index in arr)
		if (+index === arr.indexOf(arr[index]))
			perm(arr.slice(0, index).concat(arr.slice(+index + 1)), len - 1).map(function(b) {
				result.push([arr[index]].concat(b));
			});
	
	return permcache[id] = result;
}

var combcache = {};
function comb(arr, len) {
	if (len === 0)
		return [[]];
	if (arr.length < 1 && !isNaN(len))
		return [];
	
	var id = len + ';' + str(arr);
	if (combcache[id])
		return ccache[id];
	
	var result = [];
	for (var index in arr)
		if (+index === arr.indexOf(arr[index]))
			comb(arr.slice(+index + 1), len - 1).map(function(b) {
				result.push([arr[index]].concat(b));
			});
	
	if (isNaN(len)) result.push([]);
	return combcache[id] = result;
}

if (!id(String.prototype.repeat)) String.prototype.repeat = function(len) {
	len = Math.trunc(fb(len, 1));
	
	var i = Math.pow(2, Math.floor(Math.log2(len)));
	var str = '';
	while (i >= 1) {
		str += str + (len / i % 2 < 1 ? '' : this);
		len %= i;
		i /= 2;
	}
	return str;
};

if (!id(String.prototype.contains)) String.prototype.contains = function(str) {
	return this.indexOf(str) > -1;
};

if (!id(Array.prototype.contains)) Array.prototype.contains = function(item) {
	return this.indexOf(item) > -1;
};

if (!id(Math.trunc)) Math.trunc = function(n) {
	if (isNaN(n))
		return NaN;
	if (n < 0)
		return Math.ceil(n);
	return Math.floor(n);
};

df(String.prototype, {
	a: function(x,y){return typeof x=="function"||id(y)?this.q().a(x,y):this.lastIndexOf(x)},
	b: function(x,y){return typeof x=="function"||id(y)?this.q().b(x,y):this.indexOf(x)},
	c: function(x,y){x=fb(x,0);if(typeof x==="number")return this.charCodeAt(pm(x,this.length));x=functify(x,y);return this.m(function(a,b,c){var z=x(a.charCodeAt(0),fb(y,b),c);return typeof z==="number"?z.d():z})},
	d: function(x){if(arguments.length<2){return(typeof x=="object"?x[0]:x).match(/[\S\s]{1,2}/g).reduce(function(o,f){return o.split(f[0]).join(f[1])},this)}else{return[].reduce.call(arguments,function(o,f,i,a){return i%2?o:o.replace(regexify(f,'g'),a[i+1]);},this)}},
	e: function(x,y,z){x=regexify(x,z||"g");var t=this,u;for(var i=1e8;i--&&t!==u;)u=t,t=t.replace(x,y||"");return t},
	f: function(x,y){return this.match(regexify(x,y))},
	g: function(x){var l=this.length;x=pm(fb(x,0),l);return this[x]},
	h: function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);return this.substring(0,x)+y+this.substring(x+y.length)},
	i: function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);return this.substring(0,x)+y+this.substring(x)},
	j: function(x,y){y=fb(y,1);return this.substring(0,x)+this.substring(x+y)},
	k: function(x,y){if(["<",">"].contains(x)||typeof x==="function"){x=functify(x,y);return this.q().filter(function(a,b,c){return!x(a,fb(y,b),c)}).q()};return this.replace(regexify('['+x+']',y?'g':'gi'),"")},
	l: function(){return this.length},
	m: function(x,y,z){if(typeof x==="string")return this.q(z).m(x,y).q(z);return this.q(y).m(x).q(y)},
	n: function(x,y){if(typeof x==="string")x=x.q();if(x instanceof Array){x=x.map(String);return(this.match(RegExp(clone(x).ñ('l').w().map(regescape).join("|"),y?'gi':'g'))||[]).reduce(function(p,c){var i=x.findIndex(function(z){return z.v()==c.v()});if(i<0)return NaN;return p*x.length+i},0)}x=x||10;if(x==10)return parseFloat(this);else return parseInt(this,x)},
	o: function(x,y){if(["<",">"].contains(x)||typeof x==="function"){x=functify(x,y);return this.q().filter(function(a,b,c){return x(a,fb(y,b),c)}).q()};return this.replace(regexify('[^'+x+']',y?'g':'gi'),"")},
	p: function(x,y){x=fb(x,2);return typeof x==="number"?this.repeat(x):this+[this].m(x,y)},
	q: function(x){x=fb(x,"");return this.split(x)},
	r: function(x,y,z){y=fb(y,"");return this.replace(regexify(x,z),y)},
	s: function(x,y){y=fb(y,this.length);if(y<0)y+=this.length;return this.substring(x,y)},
	t: function(x,y){y=fb(y,this.length);return this.substr(x,y)},
	u: function(){return this.toUpperCase()},
	v: function(){return this.toLowerCase()},
	w: function(){return this.split('').reverse().join('')},
	x: function(x){return x==1?this.trimRight():x==2?this.trimLeft():this.trim()},
	y: function(){return this.split("\n").y().join("\n")},
	z: function(n){return this.split("\n").z(n).join("\n")},
	à: function(x){return this.q().à(x).map(function(y){return y.q()})},
	á: function(x){return this.q().á(x).map(function(y){return y.q()})},
	â: function(x){return this.search(x)},
	ã: function(x,y){return this.q().ã(x,y).map(function(a){return a.q()})},
	ä: function(x,y){x=functify(x);return this.q().ã(2,y).map(function(a){return x(a[0],a[1],a.q())})},
	å: function(x,y){return this.q().å(x,y)},
	ç: function(x){x=fb(x,' ')+'';return this.replace(/[^]/g,x);},
	è: function(x){return (this.f(x)||[]).length},
	é: function(x){return this.q().é(x).q()},
	ê: function(x){return typeof x==="string"?this==this.w():this+this.slice(0,Math.floor(fb(x,0))%2?this.length:-1).w()},
	ë: function(x,y){return this.q().ë(x,y).q()},
	î: function(x){x=fb(x,' ')+'';return this.replace(/[^]/g,function(_,i){return x[i%x.length]});},
	ò: function(x){return this.q().ò(x).map(function(a){return a.q()})},
	ó: function(x){return this.q().ó(x).map(function(a){return a.q()})},
	ô: function(x,y){return this.q().ô(x,y).map(function(a){return a.q()})},
	ö: function(x){if(!id(x))return this[Math.random()*this.length|0];return this.q().ö(x).q()},
	ø: function(x){if(!id(x))return false;if(!(x instanceof Array))x=[x];var s=this;return x.some(function(a){return s.contains(a)})}
});

df(Array.prototype, {
	a: function(x,y){if(id(y))x=functify(x,y);return typeof x=="function"?this.map(function(a,b,c){return!!x(a,fb(y,b),c)}).lastIndexOf(true):this.lastIndexOf(x)},
	b: function(x,y){if(id(y))x=functify(x,y);return typeof x=="function"?this.map(function(a,b,c){return!!x(a,fb(y,b),c)}).indexOf(true):this.indexOf(x)},
	c: function(x){if(id(x))return this.concat(x);var f=[];for(var i of this){if(i instanceof Array)for(var j of i.c())f.push(j);else f.push(i);}return f},
	d: function(x,y){x=fb(x,function(y){return!!y});x=functify(x,y);return this.some(function(a,b,c){return x(a,fb(y,b),c)})},
	e: function(x,y){x=fb(x,function(y){return!!y});x=functify(x,y);return this.every(function(a,b,c){return x(a,fb(y,b),c)})},
	f: function(x,y){if(x instanceof Array){y=fb(y,0)%3;if(y===2)return this.filter(function(q){var a=x.indexOf(q);if(~a)x.splice(a,1);return~a});else if(y===1)return this.filter(function(q,i,a){return~x.indexOf(q)&&a.indexOf(q)===i});else return this.filter(function(q){return~x.indexOf(q)})}x=fb(x,function(y){return!!y});x=functify(x,y);return this.filter(function(a,b,c){return x(a,fb(y,b),c)})},
	g: function(x){var l=this.length;x=pm(fb(x,0),l);return this[x]},
	h: function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);this[x]=y;return this},
	i: function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);this.splice(x,0,y);return this},
	j: function(x,y){y=fb(y,1);return this.splice(x,y)},
	k: function(x,y){if(!id(x)||typeof x==="function"||(typeof x==="string"&&id(y))){x=functify(fb(x,function(z){return z}),y);return this.filter(function(a,b,c){return!x(a,fb(y,b),c)})}if(x instanceof Array)return this.filter(function(a){return!x.contains(a)});this.splice(this.indexOf(x),1);return this},
	l: function(){return this.length},
	m: function(x,y){x=functify(x,y);return this.map(function(q,r,s){return x(q,fb(y,r),s)})},
	n: function(x){x=functify(fb(x,function(x,y){return(x>y)-(x<y)}));return this.sort(x)},
	o: function(x){x=x||1;if(x>1){for(var a=[];x--;)a.push(this.pop());return a}else return this.pop()},
	p: function(){for(var i of [].slice.call(arguments))this.push(i);return this},
	q: function(x){return this.join(x||"")},
	r: function(x,y){x=functify(x,0);return this.reduce(function(q,r,s){return x(q,r,s)},y||(typeof this[0]=="number"?0:""))},
	s: function(x,y){y=fb(y,this.length);return this.slice(x,y)},
	t: function(x,y){y=fb(y,this.length);return this.slice(x,x+y)},
	u: function(){for(var i of [].slice.call(arguments))this.unshift(i);return this},
	v: function(){return this.shift()},
	w: function(){return this.reverse()},
	x: function(x,y){x=functify(fb(x,function(z){return z}),y);return this.reduce(function(a,b,i,z){b=x(b,fb(y,i),z);return a+(isNaN(+b)?parseFloat(b)||0:+b)},0)},
	y: function(){var t="string"==typeof this[0],n=t?this.map(function(t){return t.split("")}):this,x,y,z=n.reduce(function(p,q){return Math.max(p,q.length)},0),a=[];for(y=0;y<z;y++)a[y]=t?Array(n.length).fill(" "):[];for(y=0;y<n.length;y++)for(x=0;x<n[y].length;x++)a[x][y]=n[y][x];return t?a.map(function(r){var i=0;return r.join("")}):a},
	z: function(n){if((typeof n)!="number")n=1;n%=4;if(n<0)n+=4;var f=function(l){return l.w()};return n==1?this.y().map(f):n==2?this.w().map(f):n==3?this.map(f).y():this},
	à: function(x){var f=function(y,z,a){if(y.length===0&&z.length===0)return;if(z.length===0){a.push(y)}else{var n=y.slice(0);n.push(z[0]);f(n,z.slice(1),a);f(y,z.slice(1),a)}return a};return f([],this,[]).filter(function(z){return x?z.length===x:1})},
	//df(Array,'à',function(x){var a=[[]],s=[];for(var i=0;i<this.length;++i){var l=a.length;for(var j=0;j<l;j++){var b=a[j].concat([this[i]]);if(s.indexOf(str(b))<0)a.push(b),s.push(str(b));}}return a},
	á: function(x){var p=[],u=[],f=function(z){var c,i;for(i=0;i<z.length;i++){c=z.splice(i,1)[0];u.push(c);if(z.length===0)p.push(u.slice());f(z);z.splice(i,0,c);u.pop()}return p};var l;return f(this).map(function(z){return z.slice(0,x||z.length)})["â"]()},
	//df(Array,'à',function(x){x=fb(x,NaN);return comb(this,x)});
	//df(Array,'á',function(x){x=fb(x,1/0);return perm(this,x)},
	â: function(x){var a=[];x=this.concat(fb(x,[]));for(var i=0;i<x.length;i++)if(a.indexOf(x[i])<0)a.push(x[i]);return a},
	ã: function(x,y){x=fb(x,2);var a=[];if(id(y))a[0]=this.slice(0,x-1),a[0].unshift(y);for(var i=0;i<=this.length-x;i++)a.push(this.slice(i,i+x));return a},
	ä: function(x,y){x=functify(x);return this.ã(2,y).map(function(z){return z.reduce(x)})},
	å: function(x,y){x=functify(x);var a=[];this.reduce(function(q,r,s){var t=x(q,r,s);a.push(t);return t},y||(typeof this[0]=="number"?0:""));return a},
	æ: function(x,y){x=functify(fb(x,function(q){return!!q}),y);for(var i=0;i<this.length;i++)if(x(this[i],fb(y,i)))return this[i]},
	ç: function(x){return this.map(function(){return clone(x)})},
	è: function(x,y){return this.f(x,y).length},
	é: function(x){var r=[],l=this.length,i=l;for(x=pm(-fb(x,1),l);i--;x++)r.push(this[x%l]);return r},
	ê: function(x){return typeof x==="string"?str(this)===str(this.slice().w()):this.concat(this.slice(0,Math.floor(fb(x,0))%2?this.length:-1).w())},
	ë: function(x,y){x=fb(x,2);y=fb(y,0);return this.slice(y).filter(function(a,b){return b%x==0})},
	ì: function(x){if(typeof x==="string")x=x.q();x=fb(x,10);return this.reduce(function(a,b){return x instanceof Array?a*x.length+x.indexOf(b):a*x+parseFloat(b)},0)},
	í: function(x,y){if(!(x instanceof Array)){y=x,x=[];for(var i=0;i<this.length;i++)x[i]=i}y=functify(fb(y,function(a,b){return[a,b]}),0);return this.map(function(a,b,c){return y(a,x[b],c)})},
	î: function(x){x=fb(x,[0]);return this.map(function(_,i){return x[i%x.length]});},
	ñ: function(x,y){x=functify(fb(x,function(z){return z}),y);return this.sort(function(a,b,i){a=x(a,fb(y,i));b=x(b,fb(y,i));return(a>b)-(a<b)})},
	ò: function(x){if(this.length===0)return[];x=fb(x,2);var a=[],i=0;if(typeof x==="number"){for(;i<this.length;i+=x)a.push(this.slice(i,i+x));}else{x=functify(fb(x,function(z){return z}),0);for(a.push([this[0]]),i=1;i<this.length;a.g(-1).push(this[i++]))x(this[i-1],this[i],this)&&a.push([])}return a;},
	ó: function(x){if(this.length===0)return[];x=fb(x,2);var a=[],i=0;if(typeof x==="number"){for(;i<this.length;i++)a[i%x]=a[i%x]||[],a[i%x].push(this[i]);}else{x=functify(fb(x,function(z){return z}),0);for(a.push([this[0]]),i=1;i<this.length;a.g(-1).push(this[i++]))x(this[i-1],this[i],this)||a.push([])}return a;},
	ô: function(x,y){if(this.length===0)return[];x=functify(fb(x,function(z){return!z}),y);var a=[],i=0;for(a.push([]);i<this.length;i++)x(this[i],fb(y,i),this)?a.push([]):a.g(-1).push(this[i]);return a;},
	ö: function(x){if(!id(x))return this[Math.random()*this.length|0];var b=[];if(isNaN(x))for(var a=this.slice();a.length>0;)b.push(a.splice(Math.random()*a.length|0,1)[0]);else for(var i=+x;i>0;i--)b.push(this[Math.random()*this.length|0]);return b},
	ø: function(x){if(!id(x))return false;if(!(x instanceof Array))x=[x];return this.some(function(a){return x.contains(a)})}
});

df(Number.prototype, {
	a: function(){return Math.abs(this)},
	b: function(x,y){return this<x?x:this>y?y:this},
	c: function(x){x=fb(x,1);return Math.ceil(this/x)*x},
	d: function(){return String.fromCharCode(this)},
	e: function(x){return this*Math.pow(10,x)},
	f: function(x){x=fb(x,1);return Math.floor(this/x)*x},
	g: function(){return this.toString()=="NaN"?"NaN":this<0?-1:this>0?1:0},
	h: function(x){x=fb(x,1);return this.toPrecision(x)},
	i: function(x){return Japt.intervals[Japt.intervals.length]=setInterval(x,this)},
	j: function(){var n=+this;if(n===2)return true;if(n%1||n<2||n%2===0)return false;for(var i=3,s=Math.sqrt(n);i<=s;i+=2)if(n%i===0)return false;return true},
	k: function(){var n=this,r,f=[],x,d=1<n;while(d){r=Math.sqrt(n);x=2;if(n%x){x=3;while(n%x&&((x+=2)<r));}f.push(x=x>r?n:x);d=(x!=n);n/=x;}return f},
	l: function(){var n=Math.trunc(this),x=Math.trunc(this);if(n<1)return 1;while(--n)x*=n;return x},
	m: function(){return[].reduce.call(arguments,function(x,y){return Math.min(x,y)},this)},
	n: function(x){x=fb(x,0);return x-this},
	o: function(x,y,f,s){var q;if(typeof x=="function")f=x,x=undefined;if(typeof x=="string")f=functify(x,y),q=y,x=y=undefined;if(typeof y=="function")f=y,y=undefined;var z=+this;y=y||1;if(!id(x))x=z,z=0;if(s&2)x+=z;if(x<z)_=x,x=z,z=_;if(s&1)x++;var r=[],i=0;if(y>0)for(;z<x;z+=y)r.push(z);else if(y<0)for(;z<x;x+=y)r.push(x);if(typeof f=="function")return r.map(function(a,b,c){return f(a,fb(q,b),c)});return r},
	p: function(x){x=fb(x,2);return Math.pow(this,x)},
	q: function(x){x=fb(x,2);return Math.pow(this,1/x)},
	r: function(x){x=fb(x,1);return Math.round(this/x)*x},
	s: function(x){if(typeof x==="string")x=x.q();if(x instanceof Array)return this.ì(x).q();x=fb(x,10);return this.toString(x)},
	t: function(x){return Japt.intervals[Japt.intervals.length]=setTimeout(x,this)},
	u: function(x){return pm(this,fb(x,2))},
	v: function(x){x=fb(x,2);return this%x===0?1:0},
	w: function(){return[].reduce.call(arguments,function(x,y){return Math.max(x,y)},this)},
	x: function(x){x=fb(x,0);return this.toFixed(x)},
	y: function(){noFunc('N.y')},
	z: function(){noFunc('N.z')},
	à: function(x){var n=Math.trunc(this);x=Math.trunc(fb(x,0));if(x<0||n<0)return 0;if(x===0)return Math.pow(2,n)-1;return Math.round(n.l()/(x.l()*(n-x).l()))},
	á: function(x){var n=Math.trunc(this);x=Math.trunc(fb(x,0));if(x<0||n<0)return 0;if(x===0)return n.l();return n["à"]()*x.l()},
	â: function(x){if(this%1)return[];var n=Math.abs(this);var a=[];for(var i=1;i<Math.sqrt(n);++i)if(n%i===0)a.push(i,n/i);if(i*i===n)a.push(i);a.n();if(x)a.pop();return a},
	ç: function(x){x=fb(x," ")+"";return x.p(+this)},
	ì: function(x){if(typeof x==="string")x=x.q();if(x instanceof Array)return this.ì(x.length).m(function(y){return x[y]});var n=Math.trunc(this);x=Math.floor(fb(x,10));if(x<2)return[];for(var a=[];n!=0;n=Math.trunc(n/x))a.unshift(n%x);return a},
	î: function(x){return" ".p(+this).î(x)},
	ò: function(x,y,f){return this.o(x,y,f,1)},
	ó: function(x,y,f){return this.o(x,y,f,2)},
	ô: function(x,y,f){return this.o(x,y,f,3)},
	õ: function(x,y,f){var q,z,n=+this,r=[],i=0;if(!(1/n))return[];if(typeof x==="function")f=x,x=1;if(typeof x=="string")f=functify(x,y),z=y,x=y=1;x=fb(x,1);y=fb(y,1);if(y===0)return[];if(y<0)y=-y,q=x,x=n,n=q;if(x<n)for(;x<=n;x+=y)r.push(x);else if(x>n)for(;x>=n;x-=y)r.push(x);else r=[x];return typeof f==="function"?r.map(function(a,b,c){return f(a,fb(z,b),c)}):r},
	ö: function(x){if(!id(x))return Math.floor(Math.random()*this);return this.o().ö(x)}
});

// Shorter Date properties. All but k accept an argument: 0 = get, 1 = set, 2 = getUTC, and 3 = setUTC.
function ts(x){return["get","set","getUTC","setUTC"][x||0]}
df(Date, {
	a: function(x,y){return this[ts(x||0)+"Milliseconds"](y||0)},
	b: function(x,y){return this[ts(x||0)+"Seconds"](y||0)},
	c: function(x,y){return this[ts(x||0)+"Minutes"](y||0)},
	d: function(x,y){return this[ts(x||0)+"Hours"](y||0)},
	e: function(x,y){return this[ts(x||0)+"Day"](y||0)},
	f: function(x,y){return this[ts(x||0)+"Date"](y||0)},
	g: function(x,y){return this[ts(x||0)+"Month"](y||0)},
	h: function(x,y){return this[ts(x||0)+"Year"](y||0)},
	i: function(x,y){return this[ts(x||0)+"FullYear"](y||0)},
	j: function(x,y){return this[ts(x||0)+"Time"](y||0)},
	k: function(){return this.getTimezoneOffset()},
	
	s: function(x){return this["to"+["","Date","Time","ISO","GMT","UTC","Locale","LocaleDate","LocaleTime"][x||0]+"String"]()},
	n: function(x){return id(x)?x-this:+this},
	
	l: function(){noFunc('D.l')},
	m: function(){noFunc('D.m')},
	o: function(){noFunc('D.o')},
	p: function(){noFunc('D.p')},
	q: function(){noFunc('D.q')},
	r: function(){noFunc('D.r')},
	t: function(){noFunc('D.t')},
	u: function(){noFunc('D.u')},
	v: function(){noFunc('D.v')},
	w: function(){noFunc('D.w')},
	x: function(){noFunc('D.x')},
	y: function(){noFunc('D.y')},
	z: function(){noFunc('D.z')}
});

// experimental, not finished yet
function bij (num, radix) {
	var result = "";
	num = Math.floor(num);
	radix = fb(radix, 10);
	if (radix % 1 || radix < 2)
		return result;
	
	if (num < 0) result = "-", num = -num - 1;
	
	var c = 0, x = 1;
	while (num >= x) {
		c++;
		num -= x;
		x *= radix;
	}
	
	for (var i = 0; i < c; i++) {
		result = (num % radix) + result;
		num = Math.trunc(num / radix);
	}
	
	return result;
}

df(Function.prototype, {
	a: function(x,y){x=functify(fb(x,function(q){return q}),y);for(var i=0;i<1e8;++i){var j=x(i,fb(y,i));if(this(j))return j;}},
	b: function(x,y){x=functify(fb(x,function(q){return q}),y);for(var i=0;i<1e8;++i){j=x(bij(i,10),fb(y,i));if(this(j))return j;}},
	c: function(x,y){x=functify(fb(x,function(q){return q}),y);for(var i=0;i<1e8;i=-i-(i>-1)){var j=x(i,fb(y,i));if(this(j))return j;}}
});

df(RegExp.prototype, {
	t: function(x){return this.test(x);}
});

df(Object.prototype, {
	ÿ: function(){if(!isnode)alert(this);return this instanceof Number?+this:this instanceof String?""+this:this}
});

// Shorter Date properties
Date.p = Date.parse;

// Shorter Math properties
Math.a = Math.atan2;
Math.g = function(n){var f=Math.sqrt(5),g=.5*(1+f);return Math.round((1/f)*(Math.pow(g,n)-Math.pow(-g,-n)))}; // Fibonacci
Math.r = function(x,y){x=fb(x,1);if(!id(y))y=x,x=0;return Math.random()*(y-x)+x};
Math.q = function(x,y,z){x=fb(x,2);if(!id(y))y=x,x=0;z=fb(z,1);return Math.floor(Math.random()*(y-x)/z)*z+x};
Math.s = Math.sin;
Math.c = Math.cos;
Math.t = Math.tan;
Math.e = Math.exp;
Math.l = Math.log;
Math.m = Math.log2;
Math.n = Math.log10;
Math.h = Math.hypot || function hypot() {
	return Math.sqrt(arguments.reduce(function(a, b) { return a + b * b; }));
};

Math.P = Math.PI;
Math.Q = 1.618033988749894848;
Math.R = Math.SQRT_1_2;
Math.S = Math.SQRT_2;
Math.T = Math.PI * 2;

// String compression
shoco.c = function (str) {
	return Array.prototype.map.call(shoco.compress(str), function (char) {
		return String.fromCharCode(char);
	}).join('');
};

shoco.d = function (str) {
	return shoco.decompress(new Uint8Array(
		( str.constructor === Array ? str[0] : str ).split('').map(function (char) {
			return char.charCodeAt(0);
		})
	));
};

function subparen(code) {
	var level = 0, min = 0;
	for(var i = 0; i < code.length; ++i) {
		if(code[i] === '(')
			++level;
		if(code[i] === ')')
			--level, min = Math.min(min, level);
	}
	if(min < 0) code = '('.repeat(-min) + code, level -= min;
	if(level > 0) code += ')'.repeat(level);
	return code;
}

function fixParens(code) {
	var cade = "", mode = "next", char = "", curr = "", temp = "", level = 0;
	for(var i = 0; i < code.length; ++i) {
		char = code[i];
		switch(mode) {
			case "next":
				if (char === ";") {
					cade += subparen(curr) + char;
					curr = "";
				} else if (char === "[") {
					mode = "array";
					level = 0;
				} else if (char === "{") {
					mode = "brackets";
					level = 0;
				} else {
					curr += char;
				}
				break;
			case "array":
				if (char === "[") {
					++level;
				} else if (char === "]") {
					--level;
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
				if (char === "}") {
					--level;
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

function isSingle(snippet) {
	snippet = snippet.replace(/^[+-~!]*/, "");
	var parens = 0, braces = 0, char;
	for (var i = 0; i < snippet.length; i++) {
		char = snippet[i];
		if (char === "\"") {
			for ( ; ++i < snippet.length - 1; ) {
				char = snippet[i]
				if (char === "\"") break;
				else if (char === "\\") i++;
			}
		}
		else if (char === "{") ++braces;
		else if (char === "}") --braces;
		else if (braces === 0) {
			if (char === "(") ++parens;
			else if (char === ")") --parens;
			else if (parens === 0 && isChar(char, ",+\\-*/÷%&^|<=>?:")) return false;
			if (parens < 0) return false;
		}
	}
	return true;
}

function isParen(snippet) {
	if (!/^\(.*\)$/g.test(snippet))
		return false;
	return isSingle(snippet.slice(1, -1));
}

function deparen(snippet) {
	while (isParen(snippet))
		snippet = snippet.slice(1, -1);
	return snippet;
}

var rp, program;

var Japt = {
	
	stdout: null,
	stderr: null,
	
	clear_output: function() {
		if (isnode) {
			// Not sure how to do this... Would console.log("\033c") work?
		} else {
			try {
				Japt.stdout.value = "";
			} catch (e) {
				alert ("Error: Japt.stdout must be sent to an HTMLElement");
			}
			try {
				Japt.stderr.innerHTML = "";
			} catch (e) {
				alert ("Error: Japt.stderr must be sent to an HTMLElement");
			}
		}
	},
	
	output: function(x) {
		Japt.implicit_output = false;
		if (isnode) {
			process.stdout.write(String(x));
		} else try {
			Japt.stdout.value += x;
		} catch (e) {
			alert ("Error: Japt.stdout must be sent to an HTMLElement");
		}
	},
	
	stop: function() {
		for (var i = 0; i < Japt.intervals.length; i++)
			clearInterval(Japt.intervals[i]);
		Japt.intervals = [];
	},
	
	error: function(msg) {
		if (isnode) {
			process.stderr.write(msg);
		}
		else try {
			Japt.stderr.innerHTML = msg;
		} catch (e) {
			alert ("Error: Japt.stderr must be sent to an HTMLElement");
		}
	},
	
	evalInput: function(input) {
		if (input.constructor === Array) return input;
		var input_mode = "next", current, processed = [], level = 0;
		processed.flags = {};
		if (!input) return processed;
		input = (input + " ").split("");
		for(var index = 0; index < input.length; ++index) {
			char = input[index];
			switch (input_mode) {
				case "next":
					if (/[0-9.-]/.test(char)) {
						input_mode = "number";
						current = char;
					} else if (/["']/.test(char)) {
						input_mode = "string " + char;
						current = "";
					} else if (char === "[") {
						input_mode = "array";
						current = "";
						level = 1;
					}
					break;
				case "flag":
					if (/\S/.test(char)) {
						current += char;
					} else {
						var flag = "", value = true;
						for (var i = 0; i < current.length; i++) {
							if (/[^\de.+-]/.test(current[i]) || (current[i] === "e" && flag === "")) processed.flags[flag = current[i]] = value = true;
							else if (value === true) value = current[i];
							else value += current[i];
							processed.flags[flag] = value;
						}
						processed.flags[flag] = value;
						current = undefined;
						input_mode = "next";
					}
					break;
				case "number":
					if (/[0-9.]/.test(char)) {
						current += char;
					} else if (current === "-" && /\S/.test(char)) {
						input_mode = "flag";
						current = char;
					} else {
						processed.push(+current);
						current = undefined;
						index--;
						input_mode = "next";
					}
					break;
				case "string \"":
					if (char === "\"") {
						processed.push(current);
						current = undefined;
						input_mode = "next";
					} else if (char === "\\" && /'"\\/.test(input[index + 1])) {
						current += input[++index];
					} else {
						current += char;
					}
					break;
				case "string '":
					if (char === "'") {
						processed.push(current);
						current = undefined;
						input_mode = "next";
					} else if (char === "\\" && /'"\\/.test(input[index + 1])) {
						current += input[++index];
					} else {
						current += char;
					}
					break;
				case "array":
					if (char === "[")
						++level;
					if (char === "]")
						--level;
					if (level === 0) {
						processed.push(Japt.evalInput(current));
						current = undefined;
						input_mode = "next";
					} else {
						current += char;
					}
					break;
			}
		}
		return processed;
	},
	
	strings: [],
	use_safe: false,
	is_safe: false,
	implicit_output: true,
	
	run: function(code, input, safe, before, onsuccess, onerror) {
		Japt.clear_output();
		
		input = Japt.evalInput(input);
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
		_K = undefined,
		L = 100,
		M = Math,
		N = input.slice(),
		O = {
			a: function() { if(!isnode) alert.apply(window, arguments); },
			l: function() { console.log.apply(console, arguments); },
			r: clearInterval,
			o: Japt.output,
			p: function(x) { Japt.output(x + "\n"); },
			q: function(x) { Japt.clear_output(); if(id(x)) Japt.output(x); },
			c: shoco.c,
			d: shoco.d,
			v: function(x) { var r = ""; try{ r = eval(Japt.transpile(x)); } catch(e) { Japt.error(e); } return r; },
			x: function(x) { if (Japt.use_safe) throw "O.x() cannot be used in safe mode"; var r = ""; try{ r = eval(x); } catch(e) { Japt.error(e); } return r; }
		},
		P = "",
		Q = "\"",
		R = "\n",
		S = " ",
		T = 0,
		U = 0 in N ? N[0] : 0,
		V = 1 in N ? N[1] : 0,
		W = 2 in N ? N[2] : 0,
		X = 3 in N ? N[3] : 0,
		Y = 4 in N ? N[4] : 0,
		Z = 5 in N ? N[5] : 0;
		
		Japt.use_safe = fb(safe, false), Japt.is_safe = true, Japt.implicit_output = true, Japt.flags = input.flags || {};
		
		code = Japt.transpile(code);
		if (!Japt.is_safe) {
			if (onerror) onerror(new Error("Raw JS cannot be used in safe mode"));
			return;
		}
		if (before) before(code);
		try {
			program = function program(U, V, W, X, Y, Z) {
				if (!program.cache)
					program.cache = {};
				var id = str([U, V, W, X, Y, Z]);
				var cached = program.cache[id];
				if (typeof cached !== "undefined")
					return cached;
				rp = function rp(u, v, w, x, y, z) {
					return program(
						fb(u, U),
						fb(v, V),
						fb(w, W),
						fb(x, X),
						fb(y, Y),
						fb(z, Z)
					);
				};
				return program.cache[id] = eval(code);
			};
			var result;
			
			if (Japt.flags.m || Japt.flags.d || Japt.flags.e || Japt.flags.f || Japt.flags.æ) {
				if (Japt.flags.d) result = false;
				else if (Japt.flags.e) result = true;
				else if (!Japt.flags.æ) result = [];
				U = typeof U === "number" ? U.o() : U.s();
				for (var i = 0; i < U.length; i++) {
					var temp = program(U[i], fb(N[1], i), fb(N[2], U),X,Y,Z);
					if (Japt.flags.æ) {
						if (temp) {
							result = Japt.flags.m ? temp : U[i];
							break;
						}
					}
					else if (Japt.flags.d) {
						if (temp) {
							result = true;
							break;
						}
					}
					else if (Japt.flags.e) {
						if (!temp) {
							result = false;
							break;
						}
					}
					else if (Japt.flags.f) {
						if (temp) {
							result.push(Japt.flags.m ? temp : U[i]);
						}
					}
					else {
						result.push(temp);
					}
				}
				if (!(Japt.flags.æ || Japt.flags.d || Japt.flags.e) && typeof U === "string") {
					result = result.q();
				}
			} else {
				result = program(U,V,W,X,Y,Z);
			}
			
			if (Japt.flags.hasOwnProperty('h')) result = result.g(-1);
			else if (Japt.flags.hasOwnProperty('g')) result = result.g(Japt.flags.g === true ? 0 : Japt.flags.g);
			
			if (Japt.flags.hasOwnProperty('!')) result = !result;
			else if (Japt.flags.hasOwnProperty('¡')) result = !!result;
			
			if (Japt.flags.N) result = +result;
			
			if (Japt.flags.P && result instanceof Array) result = result.join("");
			else if (Japt.flags.Q) result = JSON.stringify(result);
			else if (Japt.flags.R && result instanceof Array) result = result.join("\n");
			else if (Japt.flags.S && result instanceof Array) result = result.join(" ");
			
			if (Japt.flags.x) result = result.x();
			
			if (onsuccess) onsuccess(result);
		} catch (e) {
			if (onerror) onerror(e);
		}
	},
	
	transpile: function(code) {
		Japt.strings = [];
		Japt.intervals = [];
	
		function pretranspile(code) {
			var level = 0,  // Current number of parentheses or curly braces that we're inside
				extrabraces = Array(20).fill(0),
				currstr = "",
				currbraces = "",
				newcode = "",
				pairs = pairs_1_3,  // Version of Unicode shortcuts to use
				i = 0,
				line = 0,
				lines = [],
				strchars = Array(20).fill("");

			for (; i < code.length; ++i) {
				var char = code[i];
				if (level === 0) {
					if (char === "$") {
						if (Japt.use_safe) Japt.is_safe = false;
						newcode += "$";
						for (++i; i < code.length; ++i) {
							newcode += code[i];
							if (code[i] === "$") break;
						}
					}
					else if (char === "\\") {
						newcode += "\"" + Japt.strings.length + "\"";
						Japt.strings.push(regexify2(code[++i] || "\\"));
					}
					else if (isChar(char, "\"`")) {
						level++;
						strchars[level] = char;
						currstr = "\"";
					}
					else if (char === "/") {
						currstr = "/";
						for (var inCharClass = false; ++i < code.length; ) {
							if (code[i] === "/" && !inCharClass) break;
							currstr += code[i];
							if (code[i] === "\\") currstr += code[++i];
							else if (code[i] === "[") inCharClass = true;
							else if (code[i] === "]") inCharClass = false;
						}
						currstr += "/";
						for ( ; ++i < code.length; ) {
							if (!isChar(code[i], "gimsux") || currstr.lastIndexOf(code[i]) > currstr.lastIndexOf("/")) {
								i--;
								break;
							}
							currstr += code[i];
						}
						newcode += "\"" + Japt.strings.length + "\"";
						Japt.strings.push(regexify2(currstr));
					}
					else if (char === "'") {
						if (code[++i] === "\\") {
							Japt.strings.push("\"\\\\\"");
						}
						else if (code[i] === "\n") {
							Japt.strings.push("\"\\n\"");
						}
						else if (code[i] === "\"") {
							Japt.strings.push("\"\\\"\"");
						}
						else {
							Japt.strings.push("\"" + code[i] + "\"");
						}
						newcode += "\"" + (Japt.strings.length - 1) + "\"";
					}
					else if (char === "#") {
						newcode += (code[++i] || "\0").charCodeAt(0);
					}
					else if (char === "{") {
						++extrabraces[0];
						newcode += char;
					}
					else if (char === "}") {
						--extrabraces[0];
						newcode += char;
					}
					else if (pairs.hasOwnProperty(char)) {
						code = code.slice(0, i + 1) + pairs[char] + code.slice(i + 1);
					}
					else if (char === "\n") {
						while (extrabraces[0] > 0) {
							newcode += "}";
							extrabraces[0]--;
						}
						if (newcode) lines.push("UVWXYZABCDEFGHIJKLMNOPQRST"[line] + "=" + subtranspile(newcode) + ";");
						line++;
						newcode = "";
					}
					else if (char === ";") {
						if (newcode) lines.push(newcode + ";");
						newcode = "";
					}
					else {
						newcode += char;
					}
				}
				else if (level === 1) {
					if (char === "\\") {
						currstr += "\\" + code[++i];
					}
					else if (char === strchars[level]) {
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)$/, function(_, a) { return "\"" + shoco.d(a); });
						level--;
						currstr += "\"";
						Japt.strings.push(currstr.match(/"(?:\\.|[^"])*"$/)[0]);
						currstr = currstr.replace(/"(?:\\.|[^"])*"$/, "\"" + (Japt.strings.length - 1) + "\"");
						newcode += "'" + currstr + "'";
					}
					else if (char === "\"") {
						currstr += "\\\"";
					}
					else if (char === "{") {
						currstr += "\"";
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)"$/, function(_, a) { return "\"" + shoco.d(a) + "\""; });
						Japt.strings.push(currstr.match(/"(?:\\.|[^"])*"$/)[0]);
						currstr = currstr.replace(/"(?:\\.|[^"])*"$/, "\"" + (Japt.strings.length - 1) + "\"");
						level++;
						currbraces = "";
					}
					else if (char === "\n") {
						currstr += "\\n";
					}
					else {
						currstr += char;
					}
				}
				else if (level % 2 === 0) {
					if (level === 2 && extrabraces[level] === 0 && char === "}") {
						level--;
						var transpiled = pretranspile(currbraces);
						var transparen = !isSingle(transpiled);
						currstr += "+" + (transparen ? "(" : "") + deparen(transpiled) + (transparen ? ")" : "") + "+\"";
					}
					else {
						currbraces += char;
						if (isChar(char, "\"`")) {
							level++;
							strchars[level] = char;
						}
						else if (isChar(char,"'#")) {
							currbraces += code[++i];
						}
						else if (char === "{") {
							extrabraces[level]++;
						}
						else if (char === "}") {
							if (extrabraces[level] === 0) level--;
							else extrabraces[level]--;
						}
					}
				}
				else {
					currbraces += char;
					if (char === "\\") {
						currbraces += code[++i];
					}
					else if (char === strchars[level]) {
						level--;
					}
					else if (char === "{") {
						level++;
					}
				}
				if (i + 1 === code.length && level > 0) {
					code += level % 2 ? strchars[level] : "}";
				}
			}
			lines.push(subtranspile(newcode));
			return lines.join("");
		}
		
		function subtranspile(code) {
			var level = 0,  // Current number of parentheses or curly braces that we're inside
				i = 0,
				outp = "",  // Temporary output
				extraparen = false;

			for (i = 0; i < code.length; ++i) {
				var char = code[i],
					opMatch = code.slice(i).match(/^(===|!==|==|!=|>>>|>>|<<|&&|\|\||>=|<=|\+(?!\+)|-(?!-)|\.(?!\d)|[*%^&|<>,])(?!=)/),
					nextIsOp = !!opMatch,
					opLength = nextIsOp ? opMatch[0].length : 0;
				if (char === ";" && i === 0)
					outp += "newvars()";
				else if (isChar(char, "`'\"A-Z\\(\\[{") && isChar(outp.slice(-1), "`'\"A-Z0-9\\)\\]}"))
					outp += ",";
				else if (isChar(char, "0-9") && isChar(outp.slice(-1), "`'\"A-Z\\)\\]}"))
					outp += ",";
				else if (char === "." && /\.\d+$/.test(outp))
					outp += ",";
				else if (isChar(outp.slice(-1), "+\\-&|\\^") && isChar(char, " \\)\\]};"))
					code = code.slice(0,i)+'1'+code.slice(i);
				else if (isChar(outp.slice(-1), "*%") && isChar(char, " \\)\\]};"))
					code = code.slice(0,i)+'2'+code.slice(i);
				else if ((outp === "" || outp.slice(-1) === ";") && /[a-zà-ÿ*/%^|&<=>?]/.test(char))
					outp += "U";

				if (char === "\"") {
					var tms = code.slice(i).match(/"(\d+)"/)[0];
					outp += tms;
					i += tms.length - 1;
				}
				else if (isChar(char, "$'")) {
					for(++i; i < code.length; ++i) {
						if (code[i] === char) break;
						outp += code[i];
					}
				}
				else if (isChar(char, "A-Z{")) {
					var letters = "";
					for (; isChar(code[i], "A-Z") && i < code.length; i++) {
						letters += code[i];
					}
					if (code[i] === "{") {
						extraparen = outp === "" || outp.slice(-1) === ";";
						if (extraparen) outp += "(";
						outp += "function(" + letters.split("").join(",") + "){";
						var temp = "";
						for (level = 1, ++i; level > 0 && i < code.length; i++) {
							if (code[i] === "{") {
								++level;
							} else if (code[i] === "}") {
								--level;
							}
							temp += code[i];
						}
						if (temp.slice(-1) !== "}")
							temp += "}";
						else i--;
						var tr = subtranspile(temp.slice(0,-1));

						if (tr.contains(";"))
							tr = tr.slice(0, tr.lastIndexOf(";") + 2) + "return " + tr.slice(tr.lastIndexOf(";") + 2);
						else
							tr = "return " + tr;

						outp += tr + "}";
						if (extraparen) outp += ")";
					}
					else {
						outp += letters.split("").join(",").replace(/M,/g, "M.");
						--i;
					}
				}
				else if (char === " ") {
					outp += ")";
				}
				else if (char === ")") {
					outp += "))";
				}
				else if (isChar(char, "a-zà-öø-ÿ")) {
					if (outp.slice(-2) === "(!") {
						outp = outp.slice(0,-1) + "\"!" + char + "\"";
					} else if (outp.slice(-1) === "(") {
						outp += "\"" + char + "\"";
					} else if (isChar(outp.slice(-1), "0-9")) {
						if (char === "e" && isChar(code[i + 1], "0-9") && outp.slice(-2, -1) !== "e") {
							outp += char;
						} else {
							outp += " ." + char + "(";
						}
					} else if (/([A-Z])(?!\+\+|--)[+\-*÷%^&|<=>!~]+$/.test(outp)) {
						outp += outp.match(/([A-Z])(?!\+\+|--)[+\-*÷%^&|<=>!~]+$/)[1] + "." + char + "(";
					} else {
						outp += "." + char + "(";
					}
				}
				else if (outp.slice(-2) === "(!" && nextIsOp) {
					outp = outp.slice(0,-1) + "\"" + Japt.strings.length + "\"";
					Japt.strings.push("\"!" + code.slice(i, i + opLength) + "\"");
					i += opLength - 1;
				}
				else if (outp.slice(-1) === "(" && nextIsOp) {
					outp += "\"" + Japt.strings.length + "\"";
					Japt.strings.push("\"" + code.slice(i, i + opLength) + "\"");
					i += opLength - 1;
				}
				else {
					outp += char;
				}
			}

			outp = fixParens(outp);

			return outp;
		}
		
		var outp = pretranspile(code);
		
		outp = outp
			.replace(/(\+\+|--)[A-Z]|[A-Z](\+\+|--)/g, function(s) { Japt.strings.push("(" + s + ")"); return "\"" + (Japt.strings.length - 1) + "\""; })
			.replace(/[,;]/g, "$& ")
			.replace(/[}]/g, " $&")
			.replace(/[{?:]|&&|\|\||(?:\*\*|==|<<|>>>?|!=|[+\-*/÷%&|^<=>])=?/g, " $& ")
			.replace(/ +/g, " ")
			.replace(/ ;/g, ";")
			.replace(/÷/g, "/");
		outp = outp.replace(/"(\d+)"/g, function(_, a) { return Japt.strings[+a]; });
		return outp;
	},
	
	eval: function(code) {
		return eval(Japt.transpile(code));
	}
}

if (isnode) module.exports = Japt;
