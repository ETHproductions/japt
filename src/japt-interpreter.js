var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z; // Japt variables
function noFunc(x){alert("No such function: "+x)} // Runs whenever the program contains a non-existant function call
function id(x){return(typeof x)!=="undefined"} // Detects whether the variable is defined
function fb(x,y){return id(x)?x:y} // Fallback: returns x if x is defined, y otherwise
function pm(x,y){return(x%y+y)%y} // Positive modulo
function df(o,n,f){Object.defineProperty(o.prototype,n,{enumerable:false,configurable:false,writable:true,value:f})}
function regexify(x,y){if(x instanceof RegExp)return x;y=fb(y,null);var z="",i=0,a=!1;for(;i<x.length;i++)x[i]=="%"?x=x.slice(0,i+1)+"\\"+x.slice(i+1):z+=(x[i]=="\\"?(i++,x[i]=="A"?a?"A-Z":"[A-Z]":x[i]=="a"?a?"a-z":"[a-z]":x[i]=="l"?a?"A-Za-z":"[A-Za-z]":x[i]=="V"?a?" -?B-DF-HJ-NP-TV-`b-df-hj-np-tv-\uFFFF":"[^AaEeIiOoUu]":x[i]=="v"?a?"AaEeIiOoUu":"[AaEeIiOoUu]":"\\"+x[i]):x[i]=="["?(a=!0,"["):x[i]=="]"?(a=!1,"]"):x[i]);return RegExp(z,y===""?"":(y||"").replace(/g/g,"")+"g")}
function functify(x,y){if((typeof x)==="function")return x;var z=id(y),func="f=function(a,b){return ";if(/[a-z]/.test(x))func+=(x[0]!=="!"?"a."+x+(z?"(b)":"()"):z?"b."+x.slice(1)+"(a)":"");else func+=(x.slice(0,2)=="!="?"a"+x+"b":x[0]!=="!"?"a"+x+"b":"b"+x.slice(1)+"a");func+="}";return eval(func)}
function isChar(str,char){return RegExp('^['+char+']$').test(str);}
function str(x){return x instanceof Array?x.map(str).join():x instanceof String?'"'+x.replace(/"/g,"\\\"")+'"':x+""}

var pairs_1_3 = { 
	// Unicode shortcuts
	// Using \u<hex> to avoid encoding incompatibilities
	"@":	  "XYZ{",
	"_":	  "Z{Z",
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
	"\xD0": "$new Date$(", // Ð - 208
	"\xDF": "$program$("   // ß - 223
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

String.prototype.repeat = String.prototype.repeat || function(x){x=fb(x,1);if(x<0)return'';return Array(x+1).join(this)};
df(String,'a',function(x){return this.lastIndexOf(x)});
df(String,'b',function(x){return this.indexOf(x)});
df(String,'c',function(x){return this.charCodeAt(x)});
df(String,'d',function(x){
	if(arguments.length<2){return(typeof x=="object"?x[0]:x).match(/[\S\s]{1,2}/g).reduce(function(o,f){return o.split(f[0]).join(f[1])},this)}
	else{return[].reduce.call(arguments,function(o,f,i,a){return i%2?o:o.replace(regexify(f,'g'),a[i+1]);},this)}});
df(String,'e',function(x,y,z){x=regexify(x,z||"g");var t=this,u;for(var i=1e8;i--&&t!==u;)u=t,t=t.replace(x,y||"");return t});
df(String,'f',function(x,y){return this.match(regexify(x,y))});
df(String,'g',function(x){var l=this.length;x=pm(fb(x,0),l);return this[x]});
df(String,'h',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);return this.substring(0,x)+y+this.substring(x+y.length)});
df(String,'i',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);return this.substring(0,x)+y+this.substring(x)});
df(String,'j',function(x,y){y=fb(y,1);return this.substring(0,x)+this.substring(x+y)});
df(String,'k',function(x,y){y=fb(y,"");return this.replace(regexify(x,y),"")});
df(String,'l',function(){return this.length});
df(String,'m',function(x,y){return this.split(y||'').m(x).join(y||'')});
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
df(String,'\xE0',function(x){return this.q()['\xE0'](x).map(function(y){return y.q()})});
df(String,'\xE1',function(x){return this.q()['\xE1'](x).map(function(y){return y.q()})});
df(String,'\xE2',function(x){return this.search(x)});
df(String,'\xE3',function(x,y){return this.q()['\xE3'](x,y).map(function(a){return a.q()})});
df(String,'\xE4',function(x,y){x=functify(x);return this.q()['\xE3'](2,y).map(function(a){return x(a[0],a[1],a.q())})});
df(String,'\xE5',function(x,y){return this.q()['\xE5'](x,y)});
df(String,'\xE8',function(x){return (this.f(x)||[]).length});
df(String,'\xE9',function(x){return this.q()['\xE9'](x).q()});
df(String,'\xEA',function(){return this+this.slice(0,-1).w();});

df(Array,'a',function(x){return(typeof x)=="function"?this.map(function(a,b,c){return!!x(a,b,c)}).lastIndexOf(true):this.lastIndexOf(x)});
df(Array,'b',function(x){return(typeof x)=="function"?this.map(function(a,b,c){return!!x(a,b,c)}).indexOf(true):this.indexOf(x)});
df(Array,'c',function(){var f=[];for(var i of this){if(i instanceof Array)for(var j of i.c())f.push(j);else f.push(i);}return f});
df(Array,'d',function(x){x=fb(x,function(y){return!!y});x=functify(x);return this.some(x)});
df(Array,'e',function(x){x=fb(x,function(y){return!!y});x=functify(x);return this.every(x)});
df(Array,'f',function(x){x=fb(x,function(y){return!!y});x=functify(x);return this.filter(x)});
df(Array,'g',function(x){var l=this.length;x=pm(fb(x,0),l);return this[x]});
df(Array,'h',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);this[x]=y;return this});
df(Array,'i',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);this.splice(x,0,y);return this});
df(Array,'j',function(x,y){y=fb(y,1);return this.splice(x,y)});
df(Array,'k',function(x){this.splice(this.indexOf(x),1);return this});
df(Array,'l',function(){return this.length});
df(Array,'m',function(x,y){x=functify(x,y);return this.map(function(q,r,s){return x(q,fb(y,r),s)})});
df(Array,'n',function(x){return this.sort(x)});
df(Array,'o',function(x){x=x||1;if(x>1){for(var a=[];x--;)a.push(this.pop());return a}else return this.pop()});
df(Array,'p',function(){for(var i of [].slice.call(arguments))this.push(i);return this});
df(Array,'q',function(x){return this.join(x||"")});
df(Array,'r',function(x,y){x=functify(x,y);return this.reduce(function(q,r,s){return x(q,r,s)},y||(typeof this[0]=="number"?0:""))});
df(Array,'s',function(x,y){y=fb(y,this.length);return this.slice(x,y)});
df(Array,'t',function(x,y){y=fb(y,this.length);return this.slice(x,x+y)});
df(Array,'u',function(){for(var i of [].slice.call(arguments))this.unshift(i);return this});
df(Array,'v',function(){return this.shift()});
df(Array,'w',function(){return this.reverse()});
df(Array,'x',function(){return this.reduce(function(a,b){return a+parseFloat(b)},0)});
df(Array,'y',function(){var t="string"==typeof this[0],n=t?this.map(function(t){return t.split("")}):this,x,y,z=n.reduce(function(p,q){return Math.max(p,q.length)},0),a=[];for(y=0;y<z;y++)a[y]=t?Array(n.length).fill(" "):[];for(y=0;y<n.length;y++)for(x=0;x<n[y].length;x++)a[x][y]=n[y][x];return t?a.map(function(r){var i=0;return r.join("")}):a});
df(Array,'z',function(n){if((typeof n)!="number")n=1;n%=4;if(n<0)n+=4;var f=function(l){return l.w()};return n==1?this.y().map(f):n==2?this.w().map(f):n==3?this.map(f).y():this}); // (clockwise) 1: 90deg, 2: 180deg, 3: -90deg
df(Array,'\xE0',function(x){var f=function(y,z,a){if(y.length===0&&z.length===0)return;if(z.length===0){a.push(y)}else{var n=y.slice(0);n.push(z[0]);f(n,z.slice(1),a);f(y,z.slice(1),a)}return a};return f([],this,[]).filter(function(z){return x?z.length===x:1})});
df(Array,'\xE1',function(x){var p=[],u=[],f=function(z){var c,i;for(i=0;i<z.length;i++){c=z.splice(i,1)[0];u.push(c);if(z.length===0)p.push(u.slice());f(z);z.splice(i,0,c);u.pop()}return p};var l;return f(this).map(function(z){return z.slice(0,x||z.length)})["\xE2"]()});
df(Array,'\xE2',function(){var u={},a=[];for(var i of this)if(!u.hasOwnProperty(i))u[i]=1,a.push(i);return a});
df(Array,'\xE3',function(x,y){x=fb(x,2);var a=[];if(id(y))a[0]=this.slice(0,x-1),a[0].unshift(y);for(var i=0;i<=this.length-x;i++)a.push(this.slice(i,i+x));return a});
df(Array,'\xE4',function(x,y){x=functify(x);return this['\xE3'](2,y).map(function(z){return z.reduce(x)})});
df(Array,'\xE5',function(x,y){x=functify(x);var a=[];this.reduce(function(q,r,s){var t=x(q,r,s);a.push(t);return t},y||(typeof this[0]=="number"?0:""));return a});
df(Array,'\xE6',function(x){return this.f(x)[0]});
df(Array,'\xE7',function(x){return this.fill(x)});
df(Array,'\xE8',function(x){return this.f(x).length});
df(Array,'\xE9',function(x){var r=[],l=this.length,i=l;for(x=pm(-fb(x,1),l);i--;x++)r.push(this[x%l]);return r});
df(Array,'\xEA',function(){return this.concat(this.slice(0,-1).w());});

df(Number,'a',function(){return Math.abs(this)});
df(Number,'b',function(x,y){return this<x?x:this>y?y:this});
df(Number,'c',function(x){x=fb(x,1);return Math.ceil(this/x)*x});
df(Number,'d',function(){return String.fromCharCode(this)});
df(Number,'e',function(x){return this*Math.pow(10,x)});
df(Number,'f',function(x){x=fb(x,1);return Math.floor(this/x)*x});
df(Number,'g',function(){return this.toString()=="NaN"?"NaN":this<0?-1:this>0?1:0});
df(Number,'h',function(x){return pm(this,fb(x,2))});
df(Number,'i',function(x){return setInterval(x,this)});
df(Number,'j',function(){return this.k().length===1});
df(Number,'k',function(){var n=this,r,f=[],x,d=1<n;while(d){r=Math.sqrt(n);x=2;if(n%x){x=3;while(n%x&&((x+=2)<r));}f.push(x=x>r?n:x);d=(x!=n);n/=x;}return f});
df(Number,'l',function(){var n=this|0,x=this|0;if(n<1)return 1;while(--n)x*=n;return x});
df(Number,'m',function(){return[].reduce.call(arguments,function(x,y){return Math.min(x,y)},this)});
df(Number,'n',function(){return-this});
df(Number,'o',function(x,y,f){if(typeof x=="function")f=x,x=undefined;if(typeof y=="function")f=y,y=undefined;var z=this;y=y||1;if(!id(x))x=z,z=0;if(x<z)_=x,x=z,z=_;var r=[],i=0;if(y>0)for(;z<x;z+=y)r.push(z);else if(y<0)for(;z<x;x+=y)r.push(x);if(typeof f=="function")return r.map(f);return r});
df(Number,'p',function(x){x=fb(x,2);return Math.pow(this,x)});
df(Number,'q',function(x){x=fb(x,2);return Math.pow(this,1/x)});
df(Number,'r',function(x){x=fb(x,1);return Math.round(this/x)*x});
df(Number,'s',function(x){x=fb(x,10);return this.toString(x)});
df(Number,'t',function(x){return setTimeout(x,this)});
df(Number,'u',function(){return this%2===1?1:0});
df(Number,'v',function(){return this%2===0?1:0});
df(Number,'w',function(){return[].reduce.call(arguments,function(x,y){return Math.max(x,y)},this)});
df(Number,'x',function(){noFunc('N.x')});
df(Number,'y',function(){noFunc('N.y')});
df(Number,'z',function(){noFunc('N.z')});
df(Number,'\xE0',function(x){var n=this|0;x=fb(x,0)|0;if(x<0||n<0)return 0;if(x===0)return Math.pow(2,n)-1;return Math.round(n.l()/(x.l()*(n-x).l()))});
df(Number,'\xE1',function(x){var n=this|0;x=fb(x,0)|0;if(x<0||n<0)return 0;if(x===0)return n.l();return n["\xE0"]()*x.l()});
df(Number,'\xF2',function(x,y,f){if(typeof x=="function"||typeof y=="function")return(this+1).o(x,y,f);x=fb(x,0);y=y||1;return this<x?this.o(x+y,y,f):x.o(this+y,y,f)});
df(Number,'\xF3',function(x,y,f){if(typeof x=="function"||typeof y=="function")return this.o(x,y,f);x=fb(x,0);y=y||1;return this.o(this+x*y,y,f)});
df(Number,'\xF4',function(x,y,f){if(typeof x=="function"||typeof y=="function")return(this+1)['\xF2'](x,y,f);x=fb(x,0);y=y||1;return this['\xF2'](this+x*y,y,f)});

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

df(Date,'l',function(){noFunc('D.l')});
df(Date,'m',function(){noFunc('D.m')});
df(Date,'n',function(){noFunc('D.n')});
df(Date,'o',function(){noFunc('D.o')});
df(Date,'p',function(){noFunc('D.p')});
df(Date,'q',function(){noFunc('D.q')});
df(Date,'r',function(){noFunc('D.r')});
df(Date,'t',function(){noFunc('D.t')});
df(Date,'u',function(){noFunc('D.u')});
df(Date,'v',function(){noFunc('D.v')});
df(Date,'w',function(){noFunc('D.w')});
df(Date,'x',function(){noFunc('D.x')});
df(Date,'y',function(){noFunc('D.y')});
df(Date,'z',function(){noFunc('D.z')});

df(Object,'\xFF',function(){alert(this);return this instanceof Number?+this:this instanceof String?""+this:this});

// Shorter Date properties
Date.p = Date.parse;

// Shorter Math properties
Math.a = Math.atan2;
Math.g = function(n){var f=Math.sqrt(5),g=.5*(1+f);return(1/f)*(Math.pow(g,n)-Math.pow(-g,-n))}; // Fibonacci
Math.r = function(x,y){x=fb(x,1);y=fb(y,0);return Math.random()*x+y};
Math.q = function(x,y,z){x=fb(x,1);y=fb(y,0);z=fb(z,1);return Math.floor(Math.random()*x*z)/z+y};
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

function success(result) {
	output(result);
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
	for(var i = 0; i < code.length; ++i) {
		if(code[i]=='(')
			++level;
		if(code[i]==')')
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
					++level;
				} else if (char == "]") {
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
				if (char == "}") {
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

var Japt = {
	
	stdout: null,
	stderr: null,
	
	clear_output: function() {
		try { Japt.stdout.value = ""; } catch (e) { alert ("Error: Japt.stdout must be sent to an HTMLElement"); }
		try { Japt.stderr.innerHTML = ""; } catch (e) { alert ("Error: Japt.stderr must be sent to an HTMLElement"); }
	},
	
	output: function(x) {
		try { Japt.stdout.value += x; } catch (e) { alert ("Error: Japt.stdout must be sent to an HTMLElement"); }
	},
	
	interrupt: function() {
		Japt.error("Interrupted");
	},
	
	error: function(msg) {
		try { Japt.stderr.innerHTML = msg; } catch (e) { alert ("Error: Japt.stderr must be sent to an HTMLElement"); }
	},
	
	evalInput:function(input) {
		var input_mode = "next", current, processed = [], level = 0;
		input = (input+" ").split("");
		for(var index = 0; index < input.length; ++index) {
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
						++level;
					if (char == "]")
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
	snippets: [],
	use_safe: false,
	is_safe: false,
	
	run: function(code, input, safe, before, onsuccess, onerror) {
		Japt.clear_output();
	
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
		N = Japt.evalInput(input),
		O = {
			a:function(){alert.apply(window,arguments)},
			l:function(){console.log.apply(console,arguments)},
			r:clearInterval,
			o:Japt.output,
			p:function(x){Japt.output(x+"\n")},
			q:Japt.clear_output,
			c:shoco.c,
			d:shoco.d,
			v:function(x){var r="";try{r=eval(Japt.transpile(x))}catch(e){Japt.error(e)}return r},
			x:function(x){if(Japt.use_safe)throw"O.x() cannot be used in safe mode";var r="";try{r=eval(x)}catch(e){Japt.error(e)}return r}
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
		
		Japt.strings = [], Japt.snippets = [], Japt.use_safe = fb(safe,false), Japt.is_safe = true;
		
		code = Japt.transpile(code);
		if (!Japt.is_safe) {
			if (onerror) onerror(new Error("Raw JS cannot be used in safe mode"));
			return;
		}
		if (before) before(code);
		try {
			var program = function program(U,V,W,X,Y,Z) {
				if (!program.cache)
					program.cache = {};
				var id = str(U,V,W,X,Y,Z);
				var cached = program.cache[id];
				if (typeof cached !== "undefined")
					return cached;
				return program.cache[id] = eval(code);
			};
			code = program(U,V,W,X,Y,Z);
			if (onsuccess) onsuccess(code);
		} catch (e) {
			if (onerror) onerror(e);
		}
	},
	
	transpile: function(code) {
		var level = 0,  // Current number of parentheses or curly braces that we're inside
			temp = "",
			extrabraces = Array(20).fill(0),
			currstr = "",
			currbraces = "",
			newcode = "",
			pairs = pairs_1_3,  // Version of Unicode shortcuts to use
			i = 0,
			j = 0,
			outp = "";  // Temporary output
	
		function pretranspile(code) {
			var i = 0, strchars = Array(20).fill(""), polyglot = '"(p|';
			var quickie = function () {
			for (; i < code.length; ++i) {
				var char = code[i];
				if (code.slice(i).indexOf(polyglot) === 0) {
					outp = Japt.transpile((code.slice(i + polyglot.length).match(/(?:\\"|[^"])+/)||[""])[0].replace(/(\\+)"/,function(a,b){return b.length%2?"\\".repeat(b.length/2|0)+"\"":"\\".repeat(b.length/2)}));
					i = code.length;
				}
				else if (level === 0) {
					if (char === "$") {
						if (Japt.use_safe) Japt.is_safe = false;
						Japt.snippets.push("");
						for (++i; i < code.length; ++i) {
							if (code[i] === "$") break;
							Japt.snippets[Japt.snippets.length-1] += code[i]; 
						}
						newcode += "$" + (extrabraces[0] > 0 ? Japt.snippets.pop() : Japt.snippets.length - 1) + "$";
					}
					else if (char === "\\") {
						if (Japt.use_safe) Japt.is_safe = false;
						newcode += "$" + Japt.snippets.length + "$";
						Japt.snippets.push(code[++i]);
					}
					else if (isChar(char, "\"`")) {
						level++;
						strchars[level] = char;
						currstr = "\"";
					}
					else if (char === "'") {
						newcode += "\"" + Japt.strings.length + "\"";
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
							Japt.strings.push("\""+code[i]+"\"");
						}
					}
					else if (char === "#") {
						newcode += code[++i].charCodeAt(0);
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
						code = code.slice(0,i+1) + pairs[char] + code.slice(i+1);
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
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)$/,function(_,a){return"\""+shoco.d(a)});
						level--;
						currstr += "\"";
						newcode += "\"" + Japt.strings.length + "\"";
						Japt.strings.push("("+currstr+")");
					}
					else if (char === "\"") {
						currstr += "\\\"";
					}
					else if (char === "{") {
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)$/,function(_,a){return"\""+shoco.d(a)});
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
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)$/,function(_,a){return"\""+shoco.d(a)});
						level--;
						currstr += "\"+("+Japt.transpile(currbraces)+")+\"";
					}
					else {
						currbraces+=char;
						if (char === "\"") {
							level++;
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
					else if (char === "\"") {
						level--;
					}
					else if (char === "{") {
						level++;
					}
				}
			}
			};
			quickie();
			for (var templevel = level, tempbraces = extrabraces.slice(); level > 0; level--) {
				for (; extrabraces[level] > 0; extrabraces[level]--) {
					code += "}";
				}
				code += (level % 2? strchars[level] : "}");
			}
			level = templevel;
			extrabraces = tempbraces.slice();
			quickie();
			return newcode;
		}
		
		code = pretranspile(code);
		outp = "";
		
		for (i = 0; i < code.length; ++i) {
			var char = code[i];
			if (char === ";" && i === 0)
				outp += "newvars()";
			else if (isChar(char, "A-Z") && outp.slice(-1) === "M")
				outp += ".";
			else if (isChar(char, "`'\"A-Z0-9\\(\\[{") && isChar(outp.slice(-1), "`\"A-Z0-9\\)\\]}")
				&& !(isChar(char, "0-9") && isChar(outp.slice(-1), "0-9")))
				outp += ",";
			else if (isChar(outp.slice(-1), "+\\-&|\\^") && isChar(char, " \\)\\]};"))
				code = code.slice(0,i)+'1'+code.slice(i);
			else if (isChar(outp.slice(-1), "*%") && isChar(char, " \\)\\]};"))
				code = code.slice(0,i)+'2'+code.slice(i);
			
			if (char === "\"") {
				var tms = code.slice(i).match(/"(\d+)"/)[0];
				outp += tms;
				i += tms.length - 1;
			}
			else if (isChar(char, "A-Z{")) {
				var letters = "";
				for (; isChar(code[i], "A-Z") && i < code.length; i++) {
					letters += code[i];
				}
				if (code[i] === "{") {
					outp += "function(" + letters.split("").join(",") + "){";
					temp = "";
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
					var tr = Japt.transpile(temp.slice(0,-1));
					if (tr.lastIndexOf(";") < 0)
						outp += "return " + tr + "}";
					else
						outp += tr.slice(0,tr.lastIndexOf(";")+1) + "return " + tr.slice(tr.lastIndexOf(";")+1) + "}";
				}
				else {
					outp += letters.split("").join(",");
					--i;
				}
			}
			else if (char === " ") {
				outp += ")";
			}
			else if (char === ")") {
				outp += "))";
			}
			else if (isChar(char, "a-z")) {
				if (outp.slice(-2) === "(!") {
					outp = outp.slice(0,-1) + "\"!"+char+"\"";
				} else if (outp.slice(-1) === "(") {
					outp += "\""+char+"\"";
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
			else if (isChar(char, "\\xE0-\\xF6\\xF8-\\xFF")) {
				if (outp.slice(-1) === "(") {
					outp += "function(c){return c[\"\\x" + char.charCodeAt(0).toString(16).toUpperCase() + "\"]()}";
				} else {
					outp += "[\"\\x" + char.charCodeAt(0).toString(16).toUpperCase() + "\"](";
				}
			}
			else if (pairs[char]) {
				code = code.slice(0,i+1) + pairs[char] + code.slice(i+1);
			}
			else if (outp.slice(-2) === "(!" && [">>>","===","!=="].indexOf(code.slice(i,i+3)) > -1) {
				outp = outp.slice(0,-1) + "\"!"+code.slice(i,i+3)+"\"";
				i += 2;
			}
			else if (outp.slice(-1) === "(" && [">>>","===","!=="].indexOf(code.slice(i,i+3)) > -1) {
				outp += "\""+code.slice(i,i+3)+"\"";
				i += 2;
			}
			else if (outp.slice(-2) === "(!" && ["<<",">>","==","!=","<=",">=","||","&&"].indexOf(code.slice(i,i+2)) > -1) {
				outp = outp.slice(0,-1) + "\"!"+code.slice(i,i+2)+"\"";
				++i;
			}
			else if (outp.slice(-1) === "(" && ["<<",">>","==","!=","<=",">=","||","&&"].indexOf(code.slice(i,i+2)) > -1) {
				outp += "\""+code.slice(i,i+2)+"\"";
				++i;
			}
			else if (outp.slice(-2) === "(!" && isChar(char, "+\\-*%\\^&|<>") && !isChar(code[i+1],"+\\-=")) {
				outp = outp.slice(0,-1) + "\"!"+char+"\"";
			}
			else if (outp.slice(-1) === "(" && isChar(char, "+\\-*%\\^&|<>") && !isChar(code[i+1],"+\\-=")) {
				outp += "\""+char+"\"";
			}
			else {
				outp += char;
			}
		}
		
		outp = outp.replace(/\$(\d+)\$/g,function(_,a){return Japt.snippets[+a]});
		outp = fixParens(outp);
		outp = outp.replace(/"(\d+)"/g,function(_,a){return Japt.strings[+a]});
		return outp;
	},
	
	eval: function(code) {
		return eval(Japt.transpile(code));
	}
}
