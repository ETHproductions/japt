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

// Is-defined: detects whether the variable is defined
function id(x) {
	return typeof x !== "undefined";
}

// Fallback: returns x if x is defined, y otherwise (like ||, but only if x is undefined)
function fb(x, y) {
	return id(x) ? x : y;
}

// Positive modulo (like Python's %)
function pm(x, y) {
	if (y === 0)
		return 0;
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

// Converts a regex string to a regex literal, Japt-style
function regexify2(string) {
	if (string.length === 1) {
		return {
			"\n": /\n/g,
			"*": /.*/g,
			"+": /.+/g,
			"?": /.?/g,
			".": /./g,
			"^": /[^]/g
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
			else if (char === "w")
				regex += inCharClass ? "A-Za-z0-9" : "[A-Za-z0-9]";
			else if (char === "W")
				regex += inCharClass ? "\\W_" : "[^A-Za-z0-9]";
			else if (char === "p")
				regex += inCharClass ? " -~" : "[ -~]";
			else if (char === "P")
				regex += inCharClass ? "\\x00-\\x1f\\x7f-\\uffff" : "[^ -~]";
			else if (char === "q")
				regex += inCharClass ? "\\n -~" : "[\\n -~]";
			else if (char === "Q")
				regex += inCharClass ? "\\x00-\\x09\\x0b-\\x1f\\x7f-\\uffff" : "[^\\n -~]";
			else if (char === "v")
				regex += inCharClass ? "AaEeIiOoUu" : "[AaEeIiOoUu]";
			else if (char === "V")
				regex += inCharClass ? "\\W0-9B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z_" : "[^AaEeIiOoUu]";
			else if (char === "y")
				regex += inCharClass ? "AaEeIiOoUuYy" : "[AaEeIiOoUuYy]";
			else if (char === "Y")
				regex += inCharClass ? "\\W0-9B-DF-HJ-NP-TV-XZb-df-hj-np-tv-xz_" : "[^AaEeIiOoUuYy]";
			else if (char === "c")
				regex += inCharClass ? "B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z" : "[B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z]";
			else if (char === "C")
				regex += inCharClass ? "\\W0-9AaEeIiOoUu_" : "[^B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z]";
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
	while (parens > 0) {
		regex += ")";
		parens -= 1;
	}

	return RegExp(regex, flags);
}

function saferegex(object, flags) {
	if (object instanceof RegExp)
		return object;
	return RegExp(regescape(object), flags);
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

// Converts an operator/method and an argument to a function, Japt-style
function functify2(operator, argument) {
	if (typeof operator === "function")
		return operator;

	var hasArg = id(argument) && argument !== true,
		func = "(function(a, b) { return ",
		isMethod = /^!?[a-zà-öø-ÿ]$/.test(operator);

	if (isMethod) {
		if (operator[0] !== "!")
			func += "a." + operator + (hasArg ? "(" + str(argument) + ")" : argument === true ? "(b)" : "()");
		else
			func += (hasArg ? str(argument) : argument === true ? "b" : "U") + " ." + operator.slice(1) + "(a)";
	}
	else {
		if (operator[0] !== "!" || operator.slice(0, 2) === "!=")
			func += "a" + operator + (hasArg ? str(argument) : "b");
		else
			func += (hasArg ? str(argument) : "b") + operator.slice(1) + "a";
	}
	func += "; })";

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
	return String(s).replace(/[()[\]{}\-+*?^$|\\/.]/g, "\\$&");
}

// Deep-clones an object (note: does not work on arbitrary objects)
function clone(x) {
	if (!id(x))
		return undefined;
	if (x instanceof Array)
		return x.map(clone);
	if (x instanceof Date)
		return new Date(x);
	if (x.constructor === String)
		return String(x);
	if (x.constructor === Number)
		return Number(x);
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
	"\xCA": "l ",   // Ê - 202
	"\xCB": "mDEF{D",// Ë - 203
	"\xCC": "gJ ",  // Ì - 204
	"\xCD": "n2 ",  // Í - 205
	"\xCE": "g ",   // Î - 206
	"\xCF": "XYZ{Y",// Ï - 207
	"\xD0": "$new Date$(", // Ð - 208
	"\xD1": "*2",   // Ñ - 209
	"\xD2": "-~",   // Ò - 210
	"\xD3": "~-",   // Ó - 211
	"\xD4": "w ",   // Ô - 212
	"\xD5": "y ",   // Õ - 213
	"\xD7": "r*1 ", // × - 215
	"\xDF": "$rp$(" // ß - 223
};

var permcache = {};
function perm (arr, len) {
	if (len === 0)
		return [[]];
	if (arr.length < 2)
		return [arr];

	var id = len + ';' + str(arr);
	if (permcache[id])
		return permcache[id];

	var result = [];
	for (var index = 0; index < arr.length; index++)
		if (index === arr.indexOf(arr[index]))
			perm(arr.slice(0, index).concat(arr.slice(index + 1)), len - 1).map(function(b) {
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
		return combcache[id];

	var result = [];
	for (var index = 0; index < arr.length; index++)
		if (index === arr.indexOf(arr[index]))
			comb(arr.slice(index + 1), len - 1).map(function(b) {
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

if (!id(Array.prototype.sortBy)) Array.prototype.sortBy = function(func) {
	if (typeof func === "undefined")
		return this.sort();
	if (typeof func !== "function")
		throw new TypeError("Array.prototype.sortBy expects a function");

	return this.sort(function(a, b) {
		a = func(a);
		b = func(b);
		return (a > b) - (a < b);
	});
};

if (!id(Math.trunc)) Math.trunc = function(n) {
	if (isNaN(n))
		return NaN;
	if (n < 0)
		return Math.ceil(n);
	return Math.floor(n);
};

Math.approx = function(n, precision) {
	precision = fb(precision, 5);
	var y = 1;
	while (Math.abs(n - Math.round(n)) > Math.pow(10, -precision))
		n *= 10, y *= 10;
	return Math.round(n) / y;
};


//////////////// PROTOTYPE METHODS ////////////////

df(String.prototype, {
	a: function (x, y) {
		if (typeof x === "function" || id(y))
			return this.q().a(x, y);
		else if (x instanceof RegExp) {
			var index = -1, match;
			while (match = x.exec(this)) {
				index = match.index;
			}
			return index;
		}
		return this.lastIndexOf(x);
	},
	b: function (x, y) {
		if (typeof x === "function" || id(y))
			return this.q().b(x,y);
		else if (x instanceof RegExp)
			return this.search(x);
		return this.indexOf(x);
	},
	c: function(x, y) {
		x = fb(x, 0);
		if (typeof x === "number")
			return this.charCodeAt(pm(x, this.length));
		x = functify2(x, y);
		return this.m(function(a, b, c) {
			var z = x(a.charCodeAt(0), b, c);
			if (typeof z === "number") z = z.d();
			return z;
		});
	},
	d: function(x) {
		if (arguments.length < 2) {
			return (typeof x === "object" ? x[0] : x)
				.match(/[\S\s]{1,2}/g)
				.reduce(function(o, f) {
					return o.split(f[0]).join(f[1]);
				}, this);
		}
		else {
			var str = clone(this);
			for (var i = 0; i < arguments.length; i++) {
				str = str.replace(saferegex(arguments[i], 'g'), arguments[++i] || "");
			}
			return str;
		}
	},
	e: function(x, y) {
		x = eval(saferegex(x, '').toString().replace(/[a-z]*$/, function (s) {
			return s.replace('g', '');
		}));
		y = fb(y, '');
		var t = clone(this),
			u;
		for (var i = 1e6; i-- && t !== u; ) {
			u = t;
			t = t.replace(x, y || "");
		}
		return t;
	},
	f: function (x) {
		return this.match(saferegex(x), 'g') || [];
	},
	g: function (x, y) {
		x = fb(x, 0);
		if (typeof x === "string" || typeof x === "function") {
			x = functify(x, y);
			return x(this + "", y);
		}
		x = pm(x, this.length);
		return this[x];
	},
	h: function (x, y) {
		var l = this.length;
		if (!id(y)) {
			y = x;
			x = 0;
		}
		if (typeof x !== "number" && typeof y === "number") {
			var tmp = x;
			x = y;
			y = tmp;
		}
		x = pm(x, l);
		return this.substring(0, x) + y + this.substring(x + y.length);
	},
	i: function (x, y) {
		if (!id(y)) {
			y = x;
			x = 0;
		}
		if (typeof x !== "number" && typeof y === "number") {
			var tmp = x;
			x = y;
			y = tmp;
		}
		x = pm(x, this.length + 1);
		return this.substring(0, x) + y + this.substring(x);
	},
	j: function (x, y) {
		y = fb(y, 1);
		return this.substring(0, x) + this.substring(x + y);
	},
	k: function (x, y) {
		if (["<", ">"].contains(x) || typeof x === "function") {
			x = functify2(x, y);
			return this.q().filter(function(a, b, c){
				return !x(a, b, c);
			}).q();
		}
		if (x instanceof RegExp) {
			return this.replace(x, '');
		}
		return this.replace(RegExp('[' + regescape(x) + ']', y ? 'g' : 'gi'), "");
	},
	l: function () {
		return this.length;
	},
	m: function (x, y, z) {
		if (typeof x === "string")
			return this.q(z).m(x,y).q(z);
		return this.q(y).m(x).q(y);
	},
	n: function (x, y) {
		if (typeof x === "string")
			x = x.q();
		if (x instanceof Array) {
			x = x.map(String);
			var z = clone(x).sortBy(function(x) {
				return -x.length;
			}).map(regescape).join("|");

			var result = this.match(RegExp(z, y ? 'gi' : 'g')) || [];
			return result.reduce(function(prev, curr) {
				var i = x.indexOf(curr);
				if (i < 0 && y)
					i = x.findIndex(function(z) {
						return z.v() === curr.v();
					});
				if (i < 0)
					return NaN;
				return prev * x.length + i;
			}, 0);
		}
		x = x || 10;
		if (x === 10)
			return parseFloat(this);
		else
			return parseInt(this, x);
	},
	o: function (x, y) {
		if (["<", ">"].contains(x) || typeof x === "function") {
			x = functify2(x, id(y) ? String(y) : y);
			return this.q().filter(x).q();
		}
		if (x instanceof RegExp) {
			return (this.match(x) || []).q();
		}
		return this.replace(RegExp('[^' + regescape(x) + ']', y ? 'g' : 'gi'), "");
	},
	p: function (x, y) {
		x = fb(x, 2);
		if (isNaN(x))
			return this + [this].m(x, y);
		return this.repeat(x);
	},
	q: function (x) {
		x = fb(x, "");
		return this.split(x);
	},
	r: function (x, y, z) {
		y = fb(y, "");
		return this.replace(saferegex(x, fb(z, 'g')), y);
	},
	s: function (x, y) {
		y = fb(y, this.length);
		if (y < 0)
			y += this.length;
		return this.substring(x, y);
	},
	t: function (x, y) {
		y = fb(y, this.length);
		return this.substr(x, y);
	},
	u: function () {
		return this.toUpperCase();
	},
	v: function () {
		return this.toLowerCase();
	},
	w: function () {
		return this.split('').reverse().join('');
	},
	x: function (x) {
		if (x == 1)
			return this.trimRight();
		if (x == 2)
			return this.trimLeft();
		return this.trim();
	},
	y: function (x, y) {
		var z = this.split("\n").y();
		if (id(x))
			z = z.m(x, y).y();
		return z.join("\n");
	},
	z: function (n) {
		return this.split("\n").z(n).join("\n");
	},
	à: function (x) {
		return this.q().à(x).map(function(y) { return y.q(); });
	},
	á: function (x) {
		return this.q().á(x).map(function(y) { return y.q(); });
	},
	â: function (x) {
		return this.q().â(x).q();
	},
	ã: function (x,y) {
		return this.q().ã(x, y).map(function(a) { return a.q(); });
	},
	ä: function (x, y) {
		x = functify2(x, true);
		return this.q().ã(2, y).map(function(a) { return x(a[0], a[1], a.q()); });
	},
	å: function (x, y) {
		return this.q().å(x, y);
	},
	ç: function (x) {
		x = String(fb(x, ' '));
		return this.replace(/[^]/g, x);
	},
	è: function (x) {
		return (this.f(x) || []).length;
	},
	é: function (x) {
		return this.q().é(x).q();
	},
	ê: function (x) {
		if (typeof x === "string")
			return this == this.w();
		return this + this.slice(0, Math.floor(fb(x, 0)) % 2 ? this.length : -1).w();
	},
	ë: function (x, y) {
		return this.q().ë(x, y).q();
	},
	î: function (x) {
		x = String(fb(x, ' '));
		return this.replace(/[^]/g, function(_, i) {
			return x[i % x.length];
		});
	},
	í: function (x, y) {
		return this.q().í(id(x) ? x.constructor === String ? x.q() : x : undefined, y).map(function(z) {
			return z instanceof Array ? z.q() : String(z);
		}).q();
	},
	ï: function (x, y) {
		if (!id(x))
			x = function(a, b) { return a + b; };
		else {
			if (typeof x === "string" && !/^(?:&&|\|\||\*\*|<<|>>>?|[!=]==?|[+\-*/÷%&|^<=>a-zà-ÿ])$/g.test(x))
				x = x.q();
			if (!id(y))
				y = function(a, b) { return a + b; };
		}
		return this.q().ï(x, y);
	},
	ð: function (x, y) {
		var indices = [], match;
		x = saferegex(x, y ? 'gi' : 'g');
		
		for (var i = 0; i < this.length; i++) {
			x.lastIndex = i;
			match = x.exec(this);
			if (match && match.index === i)
				indices.push(i);
		}
		
		return indices;
	},
	ñ: function (x, y) {
		return this.q().ñ(x, y).q();
	},
	ò: function (x) {
		return this.q().ò(x).map(function(a) { return a.q(); });
	},
	ó: function (x) {
		return this.q().ó(x).map(function(a) { return a.q(); });
	},
	ô: function (x, y) {
		return this.q().ô(x, y).map(function(a) { return a.q(); });
	},
	ö: function (x) {
		if (!id(x))
			return this[Math.random() * this.length | 0];
		return this.q().ö(x).q();
	},
	ø: function (x) {
		if (!id(x))
			return false;
		if (!(x instanceof Array))
			x = [x];
		var s = this;
		return x.some(function(a) { return s.contains(a); });
	},

	pad: function(x, y, a) {
		var s = String(this);
		if (/\n/.test(s))
			return s.q("\n").pad(x, y, a).q("\n");
		if (!id(x))
			return s;
		if (typeof x === "number" && typeof y !== "number") {
			var z = x;
			x = y;
			y = z;
		}
		x = fb(x, ' ');
		if (s.length < y) {
			if (a === 1)
				s = (y - s.length).î(x) + s;
			else if (a === -1)
				s = y.î(x).h(s);
			else
				s = y.î(x).h(s, (y - s.length) / 2);
		}
		return s;
	},
	ù: function (x, y) {
		return this.pad(x, y, 1);
	},
	ú: function (x, y) {
		return this.pad(x, y, -1);
	},
	û: function (x, y) {
		return this.pad(x, y, 0);
	},
});

df(Array.prototype, {
	a: function (x, y) {
		if (id(y))
			x = functify2(x, y);
		if (typeof x === "function")
			return this.map(x).lastIndexOf(true);
		return this.lastIndexOf(x);
	},
	b: function (x, y) {
		if (id(y))
			x = functify2(x, y);
		if (typeof x === "function")
			return this.map(x).indexOf(true);
		return this.indexOf(x);
	},
	c: function (x) {
		if (id(x))
			return this.concat(x);
		var f = [];
		for (var i = 0; i < this.length; i++) {
			if (this[i] instanceof Array) {
				var q = this[i].c();
				for (var j = 0; j < q.length; j++)
					f.push(q[j]);
			}
			else
				f.push(this[i]);
		}
		return f;
	},
	d: function (x, y) {
		x = fb(x, Boolean);
		x = functify2(x, y);
		return this.some(x);
	},
	e: function (x, y) {
		if (x instanceof Array) {
			return this.length === x.length && this.every(function(a, b){ return a == x[b]; });
		}
		else {
			x = fb(x, Boolean);
			x = functify(x, y);
			return this.every(x);
		}
	},
	f: function (x, y) {
		if (x instanceof Array) {
			y = fb(y, 0) % 3;
			if (y === 2)
				return this.filter(function(q) {
					var a = x.contains(q);
					if (a)
						x.splice(x.indexOf(q), 1);
					return a;
				});
			else if (y === 1)
				return this.filter(function(q, i, a) {
					return x.contains(q) && a.indexOf(q) === i;
				});
			else
				return this.filter(function(q) {
					return x.contains(q);
				});
		}
		else {
			x = fb(x, Boolean);
			x = functify(x, y);
			return this.filter(x);
		}
	},
	g: function () {
		var curr = this, x, prev, index;
		for (var i = 0; typeof arguments[i] === "number"; i++) {
			x = pm(arguments[i], curr.length);
            prev = curr;
            index = x;
			curr = curr[x];
		}
		if (arguments[i] instanceof Array) {
			x = arguments[i];
			return x.map(function(j) { return curr.g(j); });
		}
        else if (typeof arguments[i] === "function" || typeof arguments[i] === "string") {
			var y = arguments[i + 1];
			x = functify(arguments[i], y);
			if (i === 0)
				return x(this);
			
			prev[index] = x(curr);
			return this;
		}
		if (i === 0) {
			return curr[0];
		}
		return curr;
	},
	h: function (x, y) {
		if (!id(y)) {
			y = x;
			x = 0;
		}
		if (typeof x !== "number" && typeof y === "number") {
			var z = x;
			x = y;
			y = z;
		}
		x = pm(x, this.length);
		this[x] = y;
		return this;
	},
	i: function (x, y) {
		if (!id(y)) {
			y = x;
			x = 0;
		}
		if (typeof x !== "number" && typeof y === "number") {
			var z = x;
			x = y;
			y = z;
		}
		x = pm(x, this.length + 1);
		this.splice(x, 0, y);
		return this;
	},
	j: function (x, y) {
		y = fb(y, 1);
		this.splice(x, y);
		return this;
	},
	k: function (x, y) {
		if (!id(x) || typeof x === "function" || (typeof x === "string" && id(y))) {
			x = functify2(fb(x, function(z) { return z; }), y);
			return this.filter(function(a, b, c) { return !x(a, b, c); });
		}
		if (x instanceof Array)
			return this.filter(function(a) { return !x.contains(a); });
		
		return this.filter(function(a) { return a !== x; });
	},
	l: function (x, y) {
		if (id(x)) {
			if (typeof x === "number") {
				y = x;
				x = function(a) { return a === y; };
			}
			x = functify2(x, y);
			return this.filter(function(a, b, c) { return x(a.l(), fb(y, b), a); });
		}
		return this.length;
	},
	m: function (x, y) {
		x = functify2(fb(x, function(z) { return z; }), y);
		return this.map(x);
	},
	n: function (x) {
		x = functify2(fb(x, function(x, y) { return (x > y) - (x < y); }), true);
		return this.sort(x);
	},
	o: function (x, y) {
		if (typeof x === "number") {
			for (var a = []; x > 0; --x)
				a.push(this.pop());
			return a;
		}
		else if (typeof x === "string" || typeof x === "function") {
			x = functify2(x, y);
			if (this.length > 0)
				this.push(x(this.pop()));
			return this;
		}
		else
			return this.pop();
	},
	p: function () {
		for (var i = 0; i < arguments.length; ++i)
			this.push(arguments[i]);
		return this;
	},
	q: function (x) {
		return this.join(x || "");
	},
	r: function (x, y) {
		x = functify2(x, true);
		return id(y) ? this.reduce(x, y) : this.reduce(x);
	},
	s: function (x, y) {
		y = fb(y, this.length);
		return this.slice(x, y);
	},
	t: function (x, y) {
		y = fb(y, this.length);
		return this.slice(x, x + y);
	},
	u: function () {
		for (var i = 0; i < arguments.length; ++i)
			this.unshift(arguments[i]);
		return this;
	},
	v: function (x, y) {
		if (typeof x === "number") {
			for (var a = []; x > 0; --x)
				a.push(this.shift());
			return a;
		}
		else if (typeof x === "string" || typeof x === "function") {
			x = functify2(x, y);
			if (this.length > 0)
				this[0] = x(this[0]);
			return this;
		}
		return this.shift();
	},
	w: function () {
		return this.reverse();
	},
	x: function (x, y) {
		x = functify2(fb(x, function(z) { return z; }), y);
		return this.reduce(function(a, b, i, z) {
			b = x(b, i, z);
			return a + (isNaN(+b) ? parseFloat(b) || 0 : +b);
		}, 0);
	},
	y: function (x, y) {
		var z, a;
		if (id(x)) {
			z = this.y();
			a = z.m(function(c) { return c instanceof Array ? c.f(id) : c; }).m(x, y);
			
			if (a.every(function(q) { return q instanceof Array; }))
				return z.m(function(c, i) {
					var j = 0;
					return c.m(function() {
						return a[i][j++];
					});
				}).y();
			else if (a.every(function(q) { return q instanceof String || typeof q === "string"; }))
				return a.y();
			else
				return a;
		}
		var t = "string" === typeof this[0],
			n = t ? this.map(function(t) { return t.split(""); }) : this;
		z = n.reduce(function(p, q){ return Math.max(p, q.length); }, 0);
		a = [];
		for (y = 0; y < z; y++)
			a[y] = t ? Array(n.length).fill(" ") : [];
		for (y = 0; y < n.length; y++)
			for (x = 0; x < n[y].length; x++)
				a[x][y] = n[y][x];
		return t ? a.map(function(r) { return r.join(""); }) : a;
	},
	z: function (n) {
		n = pm(fb(n, 1), 4) || 4;
		var q = this.every(function(x) { return x instanceof Array }),
			a = this.map(function(x) { return q ? x : x instanceof Array ? x.q() : String(x) }),
			l = a.reduce(function(p, x) {
				return Math.max(p, x.length);
			}, 0);
		a = a.map(function(x) {
				while (x.length < l) {
					if (q) x.push(0);
					else   x += " ";
				}
				return x;
			});
		for ( ; n > 0; --n ) {
			var b = [];
			for (var y = 0; y < a.length; y++)
				for (var x = 0; x < a[y].length; x++) {
					b[x] = b[x] || Array(a.length);
					b[x][a.length - y - 1] = a[y][x];
				}
			a = b;
		}
		if (!q)
			a = a.map(function(x) { return x.q(); });
		return a;
	},
	à: function (x) {
		var f = function(y, z, a) {
			if (y.length === 0 && z.length === 0)
				return;
			if (z.length === 0)
				a.push(y);
			else {
				var n = y.slice(0);
				n.push(z[0]);
				f(n, z.slice(1), a);
				f(y, z.slice(1), a);
			}
			return a;
		};
		return f([], this, []).filter(function(z) { return !id(x) || z.length === x; });
	},
	//df(Array,'à',function(x){var a=[[]],s=[];for(var i=0;i<this.length;++i){var l=a.length;for(var j=0;j<l;j++){var b=a[j].concat([this[i]]);if(s.indexOf(str(b))<0)a.push(b),s.push(str(b));}}return a},
	á: function (x) {
		var p = [],
			u = [],
			f = function(z) {
				var c, i;
				for (i = 0; i < z.length; i++) {
					c = z.splice(i, 1)[0];
					u.push(c);
					if (z.length === 0)
						p.push(u.slice());
					f(z);
					z.splice(i, 0, c);
					u.pop();
				}
				return p;
			},
			l;
		return f(this).map(function(z) { return z.slice(0, x || z.length); }).â();
	},
	//à: function(x){x=fb(x,NaN);return comb(this,x)},
	//á: function(x){x=fb(x,1/0);return perm(this,x)},
	â: function (x) {
		var a = [];
		x = this.concat(fb(x, []));
		for (var i = 0; i < x.length; i++)
			if (a.findIndex(function(z) { return str(z) === str(x[i]); }) < 0)
				a.push(x[i]);
		return a;
	},
	ã: function (x, y) {
		x = fb(x, 2);
		var a = [];
		if (id(y)) {
			a[0] = this.slice(0, x - 1);
			a[0].unshift(y);
		}
		for (var i = 0; i <= this.length - x; i++)
			a.push(this.slice(i, i + x));
		return a;
	},
	ä: function (x, y) {
		x = functify2(x, true);
		return this.ã(2, y).map(function(z) { return z.reduce(x); });
	},
	å: function (x, y) {
		x = functify2(x, true);
		var a = [];
		this.reduce(function(q, r, s) {
			var t = x(q, r, s);
			a.push(t);
			return t;
		}, fb(y, typeof this[0] === "number" ? 0 : ""));
		return a;
	},
	æ: function (x, y) {
		x = functify2(fb(x, Boolean), y);
		for (var i = 0; i < this.length; i++)
			if (x(this[i], i))
				return this[i];
	},
	ç: function (x) {
		return this.map(function() { return clone(x); });
	},
	è: function (x, y) {
		return this.f(x, y).length;
	},
	é: function (x) {
		var r = [],
			l = this.length,
			i = l;
		for (x = pm(-fb(x, 1), l); i--; x++)
			r.push(this[x % l]);
		return r;
	},
	ê: function (x) {
		if (typeof x === "string") return str(this) === str(this.slice().w());
		return this.concat(this.slice(0, fb(x, 0) % 2 < 1 ? -1 : this.length).w());
	},
	ë: function (x, y) {
		x = fb(x, 2);
		y = fb(y, 0);
		return this.slice(y).filter(function(a, b) { return b % x === 0; });
	},
	ì: function (x) {
		if (typeof x === "string")
			x = x.q();
		x = fb(x,10);
		return this.reduce(function(a, b) {
			return x instanceof Array ? a * x.length + x.indexOf(b) : a * x + parseFloat(b);
		}, 0);
	},
	í: function (x, y) {
		if (!(x instanceof Array)) {
			if (y instanceof Array) {
				var tmp = y;
				y = x;
				x = tmp;
			}
			else {
				y = x;
				x = [];
				for (var i = 0; i < this.length; i++)
					x[i] = i;
			}
		}
		y = functify2(fb(y, function(a, b) { return [a, b]; }), true);
		return this.map(function(a, b, c) { return y(a, x[b], c); });
	},
	î: function (x) {
		x = fb(x, [0]);
		return this.map(function(_, i) { return x[i % x.length]; });
	},
	ï: function (x, y) {
		if (!(x instanceof Array)) {
			if (y instanceof Array) {
				var tmp = y;
				y = x;
				x = tmp;
			}
			else {
				y = x;
				x = this.slice();
			}
		}
		y = functify2(fb(y, function(a, b) { return [a, b]; }), true);
		var r = [];
		for (var i = 0; i < this.length; i++)
			for (var j = 0; j < x.length; j++)
				r.push(y(this[i], x[j], i * x.length + j));
		return r;
	},
	ð: function (x, y) {
		x = fb(x, Boolean);
		if (x instanceof Array) {
			y = x;
			x = function(a) { return y.contains(a); };
		}
		else
			x = functify2(x, y);
		var a = [];
		for (var i = 0; i < this.length; i++) {
			if (x(this[i], i, this))
				a.push(i);
		}
		return a;
	},
	ñ: function (x, y) {
		x = functify2(fb(x, function (z) { return z; }), y);
		var r = this.map(function(a, i) { return { value: a, key: x(a, i) }; });
		r.sort(function(a, b) {
			return (a.key > b.key) - (a.key < b.key);
		});
		return r.map(function(a) { return a.value; });
	},
	ò: function (x) {
		if (this.length === 0)
			return [];
		x = fb(x, 2);
		var a = [],
			i = 0;
		if (typeof x === "number") {
			if (x > 0)
				for ( ; i < this.length; i += x)
					a.push(this.slice(i, i + x));
			else if (x < 0)
				for (i = this.length; i > 0; i += x)
					a.unshift(this.slice(Math.max(i + x, 0), i));
		}
		else {
			x = functify2(fb(x, function(z) { return z; }));
			a.push([this[0]]);
			for (i = 1; i < this.length; i++) {
				if (x(this[i - 1], this[i], this))
					a.push([]);
				a.g(-1).push(this[i]);
			}
		}
		return a;
	},
	ó: function (x) {
		if (this.length === 0)
			return [];
		x = fb(x, 2);
		var a = [],
			i = 0;
		if (typeof x === "number") {
			for (; i < this.length; i++) {
				a[i % x] = a[i % x] || [];
				a[i % x].push(this[i]);
			}
		}
		else {
			x = functify2(fb(x, function(z) { return z; }));
			a.push([this[0]]);
			for (i = 1; i < this.length; i++) {
				if(!x(this[i - 1], this[i], this))
					a.push([]);
				a.g(-1).push(this[i]);
			}
		}
		return a;
	},
	ô: function (x, y) {
		if (this.length === 0)
			return [];
		x = functify2(fb(x, function(z) { return !z; }), y);
		var a = [],
			i = 0;
		for (a.push([]); i < this.length; i++) {
			if (x(this[i], i, this))
				a.push([]);
			else
				a.g(-1).push(this[i]);
		}
		return a;
	},
	ö: function (x) {
		if (!id(x))
			return this[Math.random() * this.length | 0];
		if (typeof x === "function")
			return this.filter(x).ö();
		var b = [];
		if (isNaN(x))
			for (var a = clone(this); a.length > 0; )
				b.push(a.splice(Math.random() * a.length | 0, 1)[0]);
		else
			for (var i = +x; i > 0; i--)
				b.push(this[Math.random() * this.length | 0]);
		return b;
	},
	ø: function (x) {
		if (!id(x))
			return false;
		if (!(x instanceof Array))
			x = [x];
		return this.some(function(a) { return x.contains(a); });
	},
	pad: function(x, y, a) {
		var q = this.map(function(c) {
			return c instanceof Array ? c : String(c);
		});
		if (!id(x)) {
			x = " ";
		}
		if (!id(y)) {
			if (typeof x === "number") {
				y = x;
				x = " ";
			}
			else {
				y = q.reduce(function(p, c) { return p.w(c.length); }, 0);
			}
		}
		if (typeof x === "number" && typeof y !== "number") {
			var z = x;
			x = y;
			y = z;
		}
		return q.map(function(z) { return z.pad(x, y, a); });
	},
	ù: function(x, y) {
		return this.pad(x, y, 1);
	},
	ú: function(x, y) {
		return this.pad(x, y, -1);
	},
	û: function(x, y) {
		return this.pad(x, y, 0);
	},
	ü: function(x, y) {
		x = functify2(fb(x, function(a) { return a; }), y);
		var a = this.map(function(c, i) { return { key: x(c, fb(y, i), a), value: c }; });
		a = a.ñ(function(c) { return c.key; });
		a = a.ó(function(c, d) { return c.key == d.key; });
		return a.map(function(b) { return b.map(function(c) { return c.value; }); });
	}
});

df(Number.prototype, {
	a: function (x) {
		x = fb(x, 0);
		return Math.abs(this - x);
	},
	b: function (min, max) {
		if (this < min)
			return min;
		if (this > max)
			return max;
		return +this;
	},
	c: function (x) {
		x = fb(x, 1);
		return Math.ceil(this / x) * x;
	},
	d: function (x) {
		x = fb(x, 0);
		return String.fromCodePoint(this + x);
	},
	e: function (x) {
		return this * Math.pow(10, x);
	},
	f: function (x) {
		x = fb(x, 1);
		return Math.floor(this / x) * x;
	},
	g: function (x, y) {
		if (typeof x === "function") {
			x = functify(x, y);
			return x(+this, y);
		}
		else if (typeof x === "string" || x instanceof Array) {
			return x.g(+this);
		}
		else {
			x = fb(x, 0);
			if (isNaN(this) || isNaN(x))
				return NaN;
			if (this < x)
				return -1;
			if (this > x)
				return 1;
			return this - x;
		}
	},
	h: function (x) {
		x = fb(x, 1);
		return this.toPrecision(x);
	},
	i: function (x) {
		if (typeof x !== "function") {
			try {
				x = Function(x);
			} catch (e) {
				x = function () { return Japt.eval(x); };
			}
		}
		return Japt.intervals[Japt.intervals.length] = setInterval(x,this);
	},
	j: function (x) {
		if (id(x))
			return this.y(x) === 1;
		var n = +this;
		if (n === 2)
			return true;
		if (n % 1 !== 0 || n < 2 || n % 2 === 0)
			return false;
		for (var i = 3, s = Math.sqrt(n); i <= s; i += 2)
			if (n % i === 0)
				return false;
		return true;
	},
	k: function () {
		var n = +this,
			f = [];

		for (var r = 2; r <= Math.sqrt(n); r += r % 2 + 1) {
			while (n % r === 0) {
				f.push(r);
				n /= r;
			}
		}
		if (n > 1) // True unless n is divisible by its largest factor more than once
			f.push(n);

		return f;
	},
	l: function () {
		var n = Math.trunc(this),
			x = 1;
		while (n > 0)
			x *= n, n -= 1;
		return x;
	},
	m: function () {
		return Math.min.apply(null, [].slice.call(arguments).concat(+this));
	},
	n: function (x) {
		if (id(x))
			return x - this;
		return -this;
	},
	o: function (x, y, f, s) {
		if (typeof x === "function")
			f = x, x = undefined;
		if (typeof x === "string")
			f = functify2(x, y), x = y = undefined;
		if (typeof y === "function")
			f = y, y = undefined;

		var z = +this, _;
		y = y || 1;
		if (!id(x))
			x = z, z = 0;
		if (s & 2)
			x += z;
		if (x < z)
			_ = x, x = z, z = _;
		if (s & 1)
			x++;

		var r = [],
			i = 0;
		if (y > 0)
			for ( ; z < x; z += y )
				r.push(z);
		else
			for ( ; z < x; x += y )
				r.push(x);

		if (typeof f === "function")
			return r.map(f);
		return r;
	},
	p: function (x) {
		x = fb(x, 2);
		return Math.pow(this, x);
	},
	q: function (x) {
		x = fb(x, 2);
		return Math.pow(this, 1 / x);
	},
	r: function (x) {
		x = fb(x, 1);
		return Math.round(this / x) * x;
	},
	s: function (x, y) {
		if (typeof x === "function"
			|| (typeof x === "string"
				&& (id(y) ? /^!?.$/.test(x) : x.length === 1)
			   ))
			return Number(functify(x, y)(this.s(), y));
		if (typeof x === "string")
			x = x.q();
		if (x instanceof Array)
			return this.ì(x).q();
		x = fb(x, 10);
		return this.toString(x);
	},
	t: function (x) {
		if (typeof x !== "function") {
			try {
				x = Function(x);
			} catch (e) {
				x = function () { return Japt.eval(x); };
			}
		}
		return Japt.intervals[Japt.intervals.length] = setTimeout(x, this);
	},
	u: function (x) {
		return pm(this, fb(x, 2));
	},
	v: function (x) {
		x = fb(x, 2);
		if (x == 0 || this % x === 0)
			return 1;
		return 0;
	},
	w: function () {
		return Math.max.apply(null, [].slice.call(arguments).concat(+this));
	},
	x: function (x) {
		x = fb(x, 0);
		return this.toFixed(x);
	},
	y: function (x) {
		x = fb(x, 2);
		var y = +this, z;
		while (x && y)
			z = x, x = y, y = Math.approx(z % y);
		return x;
	},
	z: function (x) {
		x = fb(x, 2);
		return Math.trunc(this / x);
	},
	à: function (x) {
		var n = Math.trunc(this);
		x = Math.trunc(fb(x, 0));
		if (x < 0 || n < 0)
			return 0;
		if (x === 0)
			return Math.pow(2, n);
		return Math.round(n.l() / (x.l() * (n - x).l()));
	},
	á: function (x) {
		var n = Math.trunc(this);
		x = Math.trunc(fb(x, 0));
		if(x < 0 || n < 0)
			return 0;
		if (x === 0)
			return n.l();
		return Math.pow(2, n) * x.l();
	},
	â: function (x) {
		if (this % 1)
			return [];
		var n = Math.abs(this);
		var a = [];

		for (var i = 1; i < Math.sqrt(n); ++i)
			if(n % i === 0)
				a.push(i, n / i);
		if (i * i === n)
			a.push(i);

		a.n();
		if (x)
			a.pop();
		return a;
	},
	ç: function (x) {
		x = String(fb(x, " "));
		return x.p(+this);
	},
	ì: function (x, y) {
		if (typeof x === "function"
			|| (typeof x === "string"
				&& (id(y) ? /^!?.$/.test(x) : x.length === 1)
			   )) {
			var z = functify(x, y)(this.ì(), y);
			if (z instanceof Array)
				z = z.ì();
			return Number(z);
		}
		if (typeof x === "string")
			x = x.q();
		if (x instanceof Array)
			return this.ì(x.length).m(function(y) { return x[y]; });
		var n = Math.trunc(this), a;
		x = Math.trunc(fb(x, 10));
		if (x > 0) {
			if (x === 1) {
				if (n < 0)
					return (-n).o().ç(-1);
				else
					return n.o().ç(1);
			}
			else {
				for (a = []; n !== 0; n = Math.trunc(n / x))
					a.unshift(n % x);
				return a;
			}
		}
		else if (x < 0) {
			if (x === -1) {
				return (n > 0 ? n * 2 - 1 : -n * 2).o().î([1, 0]);
			}
			else {
				x = -x;
				for (a = []; n != 0; n = Math.trunc(n < 0 ? -(n - x + 1) / x : -n / x))
					a.unshift(pm(n, x));
				return a;
			}
		}
		else
			return [];
	},
	î: function (x) {
		return " ".p(+this).î(x);
	},
	ò: function (x, y, f) {
		return this.o(x, y, f, 1);
	},
	ó: function (x, y, f) {
		return this.o(x, y, f, 2);
	},
	ô: function (x, y, f) {
		return this.o(x, y, f, 3);
	},
	õ: function (x, y, f) {
		var q, z, n=+this, r=[], i=0;
		if(!(1 / n))
			return [];
		if (typeof x === "function")
			f = x, x = 1;
		if (typeof x === "string")
			f = functify2(x, y), x = y = 1;
		x = fb(x, 1);
		y = fb(y, 1);
		if (y === 0)
			return[];
		if (y < 0)
			y = -y, q = x, x = n, n = q;
		if (x < n)
			for ( ; x <= n; x += y )
				r.push(x);
		else if (x > n)
			for ( ; x >= n; x -= y)
				r.push(x);
		else r = [x];
		if (typeof f === "function")
			return r.map(f);
		return r;
	},
	ö: function (x) {
		if(id(x))
			return this.o().ö(x);
		return Math.floor(Math.random() * this);
	}
});

// Shorter Date properties. All but k accept an argument: 0 = get, 1 = set, 2 = getUTC, and 3 = setUTC.
function ts (x) {
	return ["get", "set", "getUTC", "setUTC"].g(x);
}
df(Date, {
	a: function (x, y) { return this[ts(x) + "Milliseconds"](y || 0); },
	b: function (x, y) { return this[ts(x) + "Seconds"](y || 0); },
	c: function (x, y) { return this[ts(x) + "Minutes"](y || 0); },
	d: function (x, y) { return this[ts(x) + "Hours"](y || 0); },
	e: function (x, y) { return this[ts(x) + "Day"](y || 0); },
	f: function (x, y) { return this[ts(x) + "Date"](y || 0); },
	g: function (x, y) { return this[ts(x) + "Month"](y || 0); },
	h: function (x, y) { return this[ts(x) + "Year"](y || 0); },
	i: function (x, y) { return this[ts(x) + "FullYear"](y || 0); },
	j: function (x, y) { return this[ts(x) + "Time"](y || 0); },
	k: function () { return this.getTimezoneOffset(); },

	s: function (x) {
		return this["to" + [
			"",
			"Date",
			"Time",
			"ISO",
			"GMT",
			"UTC",
			"Locale",
			"LocaleDate",
			"LocaleTime"
		][x || 0] + "String"]();
	},
	n: function (x) {
		if (id(x))
			return x - this;
		return +this;
	}
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
	a: function (x, y) {
		x = fb(x, function(q) { return q; });
		var s = 0;
		if (isNaN(x))
			x = functify(x, y);
		else
			s = Number(x), x = function(q) { return q; };
		for(var i = 0; i < 1e8; ++i ) {
			var j = x(i + s, i);
			if (this(j, i))
				return j;
		}
	},
	b: function (x, y) {
		x = fb(x, function(q) { return q; });
		var s = 0;
		if (isNaN(x))
			x = functify(x, y);
		else
			s = Number(x), x = function(q) { return q; };
		for(var i = 0; i < 1e8; ++i) {
			var j = x(bij(i, 10), i);
			if (this(j, i))
				return j;
		}
	},
	c: function (x, y) {
		x = fb(x, function(q) { return q; });
		var s = 0;
		if (isNaN(x))
			x = functify(x, y);
		else
			s = Number(x), x = function(q) { return q; };
		for(var i = 0, index = 0; i < 1e8; ++index, i = i < 0 ? -i : ~i) {
			var j = x(i + s, index);
			if(this(j, index))
				return j;
		}
	},
	f: function (x, y) {
		x = fb(x, function(q) { return q; });
		var s = 0;
		if (isNaN(x))
			x = functify(x, y);
		else
			s = Number(x), x = function(q) { return q; };
		for(var i = 0; i < 1e8; ++i ) {
			var j = x(i + s, i);
			if (!this(j, i))
				return j;
		}
	},
	g: function (n, a) {
		if (n instanceof Array) {
			var tmp = a;
			a = n;
			n = tmp;
		}
		n = fb(n, U);
		a = fb(a, [0, 1]);
		for (var i = a.length; i <= n; ++i) {
			var j = this(fb(a.g(-1), -1), i, clone(a));
			a.push(j);
		}
		return a.g(n);
	},
	h: function (n, a) {
		if (n instanceof Array) {
			var tmp = a;
			a = n;
			n = tmp;
		}
		n = fb(n, U);
		a = fb(a, [0, 1]);
		for (var i = a.length; i <= n; ++i) {
			var j = this(fb(a.g(-1), -1), i, clone(a));
			a.push(j);
		}
		return a.t(0,n);
	}
});

df(RegExp.prototype, {
	t: function (x) {
		return this.test(x);
	}
});

df(Object.prototype, {
	ÿ: function () {
		if (!isnode)
			alert(this);
		if (this instanceof Number)
			return +this;
		if (this instanceof String)
			return "" + this;
		return this;
	}
});

// Shorter Date properties
Date.p = Date.parse;

// Shorter Math properties
Math.a = Math.atan2;

// Fibonacci
Math.g = function (n) {
	var sqrt5 = Math.sqrt(5),
		phi = (1 + sqrt5) / 2;
	return Math.round((Math.pow(phi, n) - Math.pow(-phi, -n)) / sqrt5);
};

Math.r = function (x, y) {
	x = fb(x, 1);
	if (!id(y))
		y = x, x = 0;
	return Math.random() * (y - x) + x;
};

Math.q = function (x, y, z) {
	x = fb(x, 2);
	if (!id(y))
		y = x, x = 0;
	z = fb(z, 1);
	return Math.floor(Math.random() * (y - x) / z) * z + x;
};
Math.s = Math.sin;
Math.c = Math.cos;
Math.t = Math.tan;
Math.e = Math.exp;
Math.l = Math.log;
Math.m = Math.log2;
Math.n = Math.log10;
Math.h = Math.hypot = Math.hypot || function () {
	return Math.sqrt([].reduce.call(arguments, function(a, b) { return a + b * b; }));
};

Math.P = Math.PI;
Math.Q = 1.618033988749894848;
Math.R = Math.SQRT_1_2;
Math.S = Math.SQRT_2;
Math.T = Math.PI * 2;

// String compression
shoco.c = function (str) {
	return Array.prototype.map.call(shoco.compress(str), function (char) {
		return String.fromCodePoint(char);
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
	snippet = snippet.replace(/^[+\-~! ]*/, "");
	var parens = 0, braces = 0, char;
	for (var i = 0; i < snippet.length; i++) {
		char = snippet[i];
		if (char === "\"") {
			for ( ; ++i < snippet.length - 1; ) {
				char = snippet[i];
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

function makeSingle(snippet) {
	snippet = deparen(snippet);
	if(!isSingle(snippet))
		snippet = "(" + snippet + ")";
	return snippet;
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
			var char = input[index];
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
					if (char === '"') {
						current += char;
						for (index++; input[index] !== '"' && index < input.length; index++) {
							current += input[index];
						}
						current += '"';
					} else if (/\S/.test(char)) {
						current += char;
					} else {
						var flag = "", value = true;
						for (var i = 0; i < current.length; i++) {
							if (current[i] === '"') {
								value = "";
								for (i++; current[i] !== '"' && i < current.length; i++) {
									value += current[i];
								}
							}
							else if (/[^\de.+-]/.test(current[i]) || (current[i] === "e" && flag === "")) processed.flags[flag = current[i]] = value = true;
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
			g: function(s, x, y) { if(!/^(?:[a-z]+:)?\/\//.test(s)) s = "https://" + s; if(!isnode) fetch(s).then(function(x) { return x.text() }).then(functify(x, y)); else console.log("O.g() is not yet supported in Node") },
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
					var temp;
					try {
						temp = program(U[i],fb(N[1],i),fb(N[2],U),X,Y,Z);
					} catch (e) {
						if (Japt.flags.hasOwnProperty('E')) {
							result = Japt.flags.E === true ? "" : Japt.flags.E;
							break;
						}
						else throw e;
					}
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
				try {
					result = program(U,V,W,X,Y,Z);
				}
				catch (e) {
					if (Japt.flags.hasOwnProperty('E')) {
						result = Japt.flags.E === true ? "" : Japt.flags.E;
					}
					else throw e;
				}
			}

			if (Japt.flags.hasOwnProperty('h')) result = result.g(-1);
			else if (Japt.flags.hasOwnProperty('g')) result = result.g(Japt.flags.g === true ? 0 : Japt.flags.g);

			if (Japt.flags.P && result instanceof Array) result = result.join("");
			else if (Japt.flags.Q) result = JSON.stringify(result);
			else if (Japt.flags.R && result instanceof Array) result = result.join("\n");
			else if (Japt.flags.S && result instanceof Array) result = result.join(" ");

			if (Japt.flags.x) result = result.x();

			if (Japt.flags.hasOwnProperty('!')) result = !result;
			else if (Japt.flags.hasOwnProperty('¡')) result = !!result;

			if (Japt.flags.N) result = +result;
			
			if (Japt.flags.hasOwnProperty('F') && !result) result = Japt.flags.F === true ? "" : Japt.flags.F;

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
				strchars = Array(20).fill(""),
				internary = false;

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
						internary = newcode.slice(-1) === "?";
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
						currstr += "\\" + (code[++i] || (i--, "\\"));
					}
					else if (char === ":" && internary) {
						internary = false;
						currstr += "\"";
						if (strchars[level] === "`") currstr = currstr.replace(/"(?:\\.|[^"])*"$/, function(a) {
							return JSON.stringify(shoco.d(eval(a)));
						});
						Japt.strings.push(currstr.match(/"(?:\\.|[^"])*"$/)[0]);
						currstr = currstr.replace(/"(?:\\.|[^"])*"$/, "\"" + (Japt.strings.length - 1) + "\"");
						newcode += "'" + currstr + "':";
						currstr = strchars[level];
					}
					else if (char === strchars[level]) {
						currstr += "\"";
						if (strchars[level] === "`") currstr = currstr.replace(/"(?:\\.|[^"])*"$/, function(a) {
							return JSON.stringify(shoco.d(eval(a)));
						});
						level--;
						Japt.strings.push(currstr.match(/"(?:\\.|[^"])*"$/)[0]);
						currstr = currstr.replace(/"(?:\\.|[^"])*"$/, "\"" + (Japt.strings.length - 1) + "\"");
						newcode += "'" + currstr + "'";
					}
					else if (char === "\"") {
						currstr += "\\\"";
					}
					else if (char === "{") {
						currstr += "\"";
						if (strchars[level] === "`") currstr = currstr.replace(/"(?:\\.|[^"])*"$/, function(a) {
							return JSON.stringify(shoco.d(eval(a)));
						});
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
						currstr += "+" + makeSingle(transpiled) + "+\"";
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
						currbraces += (code[++i] || (i--, "\\"));
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
					opMatch = code.slice(i).match(/^(===|!==|==|!=|>>>|>>|<<|&&|\|\||>=|<=|\+(?!\+)|-(?!-)|\.(?!\d)|[*÷%^&|<>,])(?!=)/),
					nextIsOp = !!opMatch,
					opLength = nextIsOp ? opMatch[0].length : 0;
				if ((isChar(char, "`'\"A-Z\\(\\[{~") || (char === "!" && code[i + 1] !== "=")) && isChar(outp.slice(-1), "`'\"A-Z0-9\\)\\]}"))
					outp += ",";
				else if (isChar(char, "0-9") && isChar(outp.slice(-1), "`'\"A-Z\\)\\]}"))
					outp += ",";
				else if (char === "." && /(\.\d+|[`'"A-Z)\]}])$/.test(outp))
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
				else if (char === "$") {
					for (++i; i < code.length; ++i) {
						if (code[i] === "$") break;
						outp += code[i];
					}
				}
				else if (char === "'") {
					var temp = "";
					for (++i; i < code.length; ++i) {
						if (code[i] === "'") break;
						temp += code[i];
					}
					outp += isSingle(temp) ? temp : "(" + temp + ")";
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
				else if (isChar(char, "?")) {
					outp += "?";
					var temp = "";
					for (level = 1, ++i; level > 0 && i < code.length; i++) {
						if (code[i] === "?") {
							++level;
						} else if (code[i] === ":") {
							--level;
						}
						temp += code[i];
					}
					if (temp.slice(-1) !== ":")
						temp += ":";
					else i--;
					
					var tr = subtranspile("(" + temp.slice(0,-1) + ")");

					outp += deparen(tr) + ":";
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
					Japt.strings.push("\"!" + code.slice(i, i + opLength).replace(/÷/g, "/") + "\"");
					i += opLength - 1;
				}
				else if (outp.slice(-1) === "(" && nextIsOp) {
					outp += "\"" + Japt.strings.length + "\"";
					Japt.strings.push("\"" + code.slice(i, i + opLength).replace(/÷/g, "/") + "\"");
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
};

if (isnode) module.exports = Japt;
