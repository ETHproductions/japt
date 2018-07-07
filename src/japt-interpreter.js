var A,B,C,D,E,F,G,H,I,J,_K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z; // Japt variables
function noFunc(x){alert("No such function: "+x)} // Runs whenever the program contains a non-existant function call
function id(x){return(typeof x)!=="undefined"} // Detects whether the variable is defined
function fb(x,y){return id(x)?x:y} // Fallback: returns x if x is defined, y otherwise
function pm(x,y){return(x%y+y)%y} // Positive modulo
function df(o,n,f){Object.defineProperty(o.prototype,n,{enumerable:false,configurable:false,writable:true,value:f})}
function regexify(x,y){if(x instanceof RegExp)return x;x+="";y=fb(y,null);var z="",i=0,a=!1;for(;i<x.length;i++)x[i]=="%"?x=x.slice(0,i+1)+"\\"+x.slice(i+1):z+=(x[i]=="\\"?(i++,x[i]=="A"?a?"A-Z":"[A-Z]":x[i]=="a"?a?"a-z":"[a-z]":x[i]=="l"?a?"A-Za-z":"[A-Za-z]":x[i]=="L"?a?"\\W_\\d":"[^A-Za-z]":x[i]=="w"?a?"A-Za-z0-9":"[A-Za-z0-9]":x[i]=="W"?a?"\\W_":"[^A-Za-z0-9]":x[i]=="V"?a?"\\W0-9B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z_":"[^AaEeIiOoUu]":x[i]=="v"?a?"AaEeIiOoUu":"[AaEeIiOoUu]":x[i]=="Y"?a?"\\W0-9B-DF-HJ-NP-TV-XZb-df-hj-np-tv-xz_":"[^AaEeIiOoUuYy]":x[i]=="y"?a?"AaEeIiOoUuYy":"[AaEeIiOoUuYy]":x[i]=="c"?a?"B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z":"[B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z]":x[i]=="C"?a?"\\W0-9AaEeIiOoUu_":"[^B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z]":x[i]=="P"?a?"\\x00-\\x1f\\x7f-\\xuffff":"[^ -~]":x[i]=="p"?a?" -~":"[ -~]":x[i]=="Q"?a?"\\x00-\\x09\\x0b-\\x1f\\x7f-\\xuffff":"[^\\n -~]":x[i]=="q"?a?"\\n -~":"[\\n -~]":"\\"+x[i]):x[i]=="["?(a=!0,"["):x[i]=="]"?(a=!1,"]"):x[i]);return RegExp(z,y===""?"":(y||"").replace(/g/g,"")+"g")}
function functify(x,y){if((typeof x)==="function")return x;var z=id(y),func="f=function(a,b){return ";if(/^!?[a-zà-ÿ]$/.test(x))func+=(x[0]!=="!"?"a."+x+(z?"(b)":"()"):z?"b."+x.slice(1)+"(a)":"");else func+=(x.slice(0,2)=="!="?"a"+x+"b":x[0]!=="!"?"a"+x+"b":"b"+x.slice(1)+"a");func+="}";return eval(func)}
function isChar(str,char){return RegExp('^['+char+']$').test(str);}
function str(x){return x instanceof Array?'['+x.map(str).join()+']':x instanceof String||typeof x==="string"?'"'+x.replace(/"/g,"\\\"")+'"':x+""}
function regescape(s){s=String(s);return s.replace(/[()[\]{}\-+*?^$|\\/.]/g,"\\$&")}
function clone(x){return x instanceof Array?x.slice():x}

var isnode = typeof window === "undefined";
if (isnode) var shoco = require("../dependencies/shoco");
Object.defineProperty(isnode ? global : window, "K", { enumerable: false, configurable: true, get: function() { return fb(_K, new Date()); }, set: function(x) { return _K=x; }});

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
	"\xD7": "r*1 ", // × - 215
	"\xDF": "$rp$(" // ß - 223
};

var pcache = {};
function perm(x,l){if(l===0)return[[]];if(x.length<2)return[x];var id=l+';'+str(x);if(pcache[id])return pcache[id];var a=[];for(var i in x)if(+i===x.indexOf(x[i]))perm([].concat(x.slice(0,i),x.slice(+i+1)),l-1).map(function(b){a.push([x[i]].concat(b))});return pcache[id]=a}
var ccache = {};
function comb(x,l){if(l===0)return[[]];if(x.length<1&&l)return[];var id=l+';'+str(x);if(ccache[id])return ccache[id];var a=[];for(var i=0;i<x.length;++i)if(i===x.indexOf(x[i]))comb(x.slice(i+1),l-1).map(function(b){a.push([x[i]].concat(b))});if(!l)a.push([]);return ccache[id]=a}

String.prototype.repeat = String.prototype.repeat || function(x){x=fb(x,1);if(x<0)return'';return Array(x+1).join(this)};
String.prototype.contains = String.prototype.contains || function(x){return-1<this.indexOf(x)};
Array.prototype.contains = Array.prototype.contains || function(x){return-1<this.indexOf(x)};
Math.trunc = Math.trunc || function(x){return isNaN(x)?NaN:x<0?Math.ceil(x):Math.floor(x)};
Math.approx = function(x,p){p=fb(p,5);for(var y=1;Math.abs(x-Math.round(x))>Math.pow(10,-p);)x*=10,y*=10;return Math.round(x)/y};
df(String,'a',function(x,y){return typeof x=="function"||id(y)?this.q().a(x,y):this.lastIndexOf(x)});
df(String,'b',function(x,y){return typeof x=="function"||id(y)?this.q().b(x,y):this.indexOf(x)});
df(String,'c',function(x,y){x=fb(x,0);if(typeof x==="number")return this.charCodeAt(pm(x,this.length));x=functify(x,y);return this.m(function(a,b,c){var z=x(a.charCodeAt(0),fb(y,b),c);return typeof z==="number"?z.d():z})});
df(String,'d',function(x){
	if(arguments.length<2){return(typeof x=="object"?x[0]:x).match(/[\S\s]{1,2}/g).reduce(function(o,f){return o.split(f[0]).join(f[1])},this)}
	else{return[].reduce.call(arguments,function(o,f,i,a){return i%2?o:o.replace(regexify(f,'g'),a[i+1]);},this)}});
df(String,'e',function(x,y,z){x=eval(regexify(x,fb(z,'')).toString().replace(/[a-z]*$/,function(s){return s.replace('g','')}));var t=this,u;for(var i=1e8;i--&&t!==u;)u=t,t=t.replace(x,y||"");return t});
df(String,'f',function(x,y){return this.match(regexify(x,y))});
df(String,'g',function(x){var l=this.length;x=pm(fb(x,0),l);return this[x]});
df(String,'h',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);return this.substring(0,x)+y+this.substring(x+y.length)});
df(String,'i',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);return this.substring(0,x)+y+this.substring(x)});
df(String,'j',function(x,y){y=fb(y,1);return this.substring(0,x)+this.substring(x+y)});
df(String,'k',function(x,y){if(["<",">"].contains(x)||typeof x==="function"){x=functify(x,y);return this.q().filter(function(a,b,c){return!x(a,fb(y,b),c)}).q()};return this.replace(regexify('['+x+']',y?'g':'gi'),"")});
df(String,'l',function(){return this.length});
df(String,'m',function(x,y,z){if(typeof x==="string")return this.q(z).m(x,y).q(z);return this.q(y).m(x).q(y)});
df(String,'n',function(x,y){if(typeof x==="string")x=x.q();if(x instanceof Array){x=x.map(String);return(this.match(RegExp(clone(x)['\xF1']('l').w().map(regescape).join("|"),y?'gi':'g'))||[]).reduce(function(p,c){var i=x.indexOf(c);if(i<0&&y)i=x.findIndex(function(z){return z.v()==c.v()});if(i<0)return NaN;return p*x.length+i},0)}x=x||10;if(x==10)return parseFloat(this);else return parseInt(this,x)});
df(String,'o',function(x,y){if(["<",">"].contains(x)||typeof x==="function"){x=functify(x,y);return this.q().filter(function(a,b,c){return x(a,fb(y,b),c)}).q()};return this.replace(regexify('[^'+x+']',y?'g':'gi'),"")}); // Removes all but specified characters. Similar to TeaScript's O function
df(String,'p',function(x,y){x=fb(x,2);return typeof x==="number"?this.repeat(x):this+[this].m(x,y)});
df(String,'q',function(x){x=fb(x,"");return this.split(x)});
df(String,'r',function(x,y,z){y=fb(y,"");return this.replace(regexify(x,z),y)});
df(String,'s',function(x,y){y=fb(y,this.length);if(y<0)y+=this.length;return this.substring(x,y)});
df(String,'t',function(x,y){y=fb(y,this.length);return this.substr(x,y)});
df(String,'u',function(){return this.toUpperCase()});
df(String,'v',function(){return this.toLowerCase()});
df(String,'w',function(){return this.split('').reverse().join('')});
df(String,'x',function(x){return x==1?this.trimRight():x==2?this.trimLeft():this.trim()});
df(String,'y',function(x,y){var z=this.split("\n").y();if(id(x))z=z.m(x,y).y();return z.join("\n")});
df(String,'z',function(n){return this.split("\n").z(n).join("\n")});
df(String,'\xE0',function(x){return this.q()['\xE0'](x).map(function(y){return y.q()})});
df(String,'\xE1',function(x){return this.q()['\xE1'](x).map(function(y){return y.q()})});
df(String,'\xE2',function(x){return this.search(x)});
df(String,'\xE3',function(x,y){return this.q()['\xE3'](x,y).map(function(a){return a.q()})});
df(String,'\xE4',function(x,y){x=functify(x);return this.q()['\xE3'](2,y).map(function(a){return x(a[0],a[1],a.q())})});
df(String,'\xE5',function(x,y){return this.q()['\xE5'](x,y)});
df(String,'\xE7',function(x){x=fb(x,' ')+'';return this.replace(/[^]/g,x);});
df(String,'\xE8',function(x){return (this.f(x)||[]).length});
df(String,'\xE9',function(x){return this.q()['\xE9'](x).q()});
df(String,'\xEA',function(x){return typeof x==="string"?this==this.w():this+this.slice(0,Math.floor(fb(x,0))%2?this.length:-1).w()});
df(String,'\xEB',function(x,y){return this.q()['\xEB'](x,y).q()});
df(String,'\xED',function(x,y){return this.q()['\xED'](id(x)?x.constructor===String?x.q():x:undefined,y).map(function(z){return z instanceof Array?z.q():String(z)}).q()});
df(String,'\xEE',function(x){x=fb(x,' ')+'';return this.replace(/[^]/g,function(_,i){return x[i%x.length]});});
df(String,'\xF2',function(x){return this.q()['\xF2'](x).map(function(a){return a.q()})});
df(String,'\xF3',function(x){return this.q()['\xF3'](x).map(function(a){return a.q()})});
df(String,'\xF4',function(x,y){return this.q()['\xF4'](x,y).map(function(a){return a.q()})});
df(String,'\xF6',function(x){if(!id(x))return this[Math.random()*this.length|0];return this.q()['\xF6'](x).q()});
df(String,'\xF8',function(x){if(!id(x))return false;if(!(x instanceof Array))x=[x];var s=this;return x.some(function(a){return s.contains(a)})});
df(String,'pad',function(x,y,a){var s=String(this),z;if(/\n/.test(s))return s.q("\n").pad(x,y,a).q("\n");if(!id(x))return s;if(typeof x==="number"&&typeof y!=="number")z=x,x=y,y=z;x=fb(x,' ');if(s.length<y){if(a===1)s=(y-s.length)['\xEE'](x)+s;else if(a===-1)s=y['\xEE'](x).h(s);else	s=y['\xEE'](x).h(s,(y-s.length)/2)}return s});
df(String,'\xF9',function(x,y){return this.pad(x,y,1)});
df(String,'\xFA',function(x,y){return this.pad(x,y,-1)});
df(String,'\xFB',function(x,y){return this.pad(x,y,0)});

df(Array,'a',function(x,y){if(id(y))x=functify(x,y);return typeof x=="function"?this.map(function(a,b,c){return!!x(a,fb(y,b),c)}).lastIndexOf(true):this.lastIndexOf(x)});
df(Array,'b',function(x,y){if(id(y))x=functify(x,y);return typeof x=="function"?this.map(function(a,b,c){return!!x(a,fb(y,b),c)}).indexOf(true):this.indexOf(x)});
df(Array,'c',function(x){if(id(x))return this.concat(x);var f=[];for(var i of this){if(i instanceof Array)for(var j of i.c())f.push(j);else f.push(i);}return f});
df(Array,'d',function(x,y){x=fb(x,function(y){return!!y});x=functify(x,y);return this.some(function(a,b,c){return x(a,fb(y,b),c)})});
df(Array,'e',function(x,y){if(x instanceof Array){return this.length===x.length&&this.every(function(a,b){return a==x[b]})}else{x=fb(x,function(y){return!!y});x=functify(x,y);return this.every(function(a,b,c){return x(a,fb(y,b),c)})}});
df(Array,'f',function(x,y){if(x instanceof Array){y=fb(y,0)%3;if(y===2)return this.filter(function(q){var a=x.indexOf(q);if(~a)x.splice(a,1);return~a});else if(y===1)return this.filter(function(q,i,a){return~x.indexOf(q)&&a.indexOf(q)===i});else return this.filter(function(q){return~x.indexOf(q)})}x=fb(x,function(y){return!!y});x=functify(x,y);return this.filter(function(a,b,c){return x(a,fb(y,b),c)})});
df(Array,'g',function(x){var l=this.length;x=pm(fb(x,0),l);return this[x]});
df(Array,'h',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);this[x]=y;return this});
df(Array,'i',function(x,y){var l=this.length,z;if(!id(y))y=x,x=0;if(typeof x!=="number"&&typeof y==="number")z=x,x=y,y=z;x=pm(x,l);this.splice(x,0,y);return this});
df(Array,'j',function(x,y){y=fb(y,1);return this.splice(x,y)});
df(Array,'k',function(x,y){if(!id(x)||typeof x==="function"||(typeof x==="string"&&id(y))){x=functify(fb(x,function(z){return z}),y);return this.filter(function(a,b,c){return!x(a,fb(y,b),c)})}if(x instanceof Array)return this.filter(function(a){return!x.contains(a)});this.splice(this.indexOf(x),1);return this});
df(Array,'l',function(){return this.length});
df(Array,'m',function(x,y){x=functify(x,y);return this.map(function(q,r,s){return x(q,fb(y,r),s)})});
df(Array,'n',function(x){x=functify(fb(x,function(x,y){return(x>y)-(x<y)}));return this.sort(x)});
df(Array,'o',function(x){if(id(x)){for(var a=[],x=Math.trunc(x);x>0;--x)a.push(this.pop());return a}else return this.pop()});
df(Array,'p',function(){for(var i of [].slice.call(arguments))this.push(i);return this});
df(Array,'q',function(x){return this.join(x||"")});
df(Array,'r',function(x,y){x=functify(x,0);return id(y)?this.reduce(x,y):this.reduce(x)});
df(Array,'s',function(x,y){y=fb(y,this.length);return this.slice(x,y)});
df(Array,'t',function(x,y){y=fb(y,this.length);return this.slice(x,x+y)});
df(Array,'u',function(){for(var i of [].slice.call(arguments))this.unshift(i);return this});
df(Array,'v',function(){return this.shift()});
df(Array,'w',function(){return this.reverse()});
df(Array,'x',function(x,y){x=functify(fb(x,function(z){return z}),y);return this.reduce(function(a,b,i,z){b=x(b,fb(y,i),z);return a+(isNaN(+b)?parseFloat(b)||0:+b)},0)});
df(Array,'y',function(x,y){if(id(x)){var z=this.y(),a=z.m(function(c){return c instanceof Array?c.f(id):c}).m(x,y);if(a.every(function(q){return typeof q instanceof Array}))z=z.m(function(c,i){var j=0;return c.m(function(){return a[i][j++]})}).y();else if(a.every(function(q){return q instanceof String||typeof q==="string"}))z=a.y();else z=a;return z}var t="string"==typeof this[0],n=t?this.map(function(t){return t.split("")}):this,x,y,z=n.reduce(function(p,q){return Math.max(p,q.length)},0),a=[];for(y=0;y<z;y++)a[y]=t?Array(n.length).fill(" "):[];for(y=0;y<n.length;y++)for(x=0;x<n[y].length;x++)a[x][y]=n[y][x];return t?a.map(function(r){var i=0;return r.join("")}):a});
df(Array,'z',function(n){n=pm(fb(n,1),4)||4;var q=this[0] instanceof Array,l=this.reduce(function(p,x){return Math.max(p,(x instanceof Array?x:String(x)).length)},0),a=this.map(function(x){return x instanceof Array?x.concat(Array(l-x.length).fill(q?0:" ")):" ".p(l).h(x)});for(;n>0;--n){var b=[];for(var y=0;y<a.length;y++)for(var x=0;x<a[y].length;x++)b[x]=b[x]||[],b[x][l-y-1]=a[y][x];a=b}return q?a:a.map(function(x){return x.q()})});
df(Array,'\xE0',function(x){var f=function(y,z,a){if(y.length===0&&z.length===0)return;if(z.length===0){a.push(y)}else{var n=y.slice(0);n.push(z[0]);f(n,z.slice(1),a);f(y,z.slice(1),a)}return a};return f([],this,[]).filter(function(z){return x?z.length===x:1})});
//df(Array,'\xE0',function(x){var a=[[]],s=[];for(var i=0;i<this.length;++i){var l=a.length;for(var j=0;j<l;j++){var b=a[j].concat([this[i]]);if(s.indexOf(str(b))<0)a.push(b),s.push(str(b));}}return a});
df(Array,'\xE1',function(x){var p=[],u=[],f=function(z){var c,i;for(i=0;i<z.length;i++){c=z.splice(i,1)[0];u.push(c);if(z.length===0)p.push(u.slice());f(z);z.splice(i,0,c);u.pop()}return p};var l;return f(this).map(function(z){return z.slice(0,x||z.length)})["\xE2"]()});
//df(Array,'\xE0',function(x){x=fb(x,NaN);return comb(this,x)});
//df(Array,'\xE1',function(x){x=fb(x,1/0);return perm(this,x)});
df(Array,'\xE2',function(x){var a=[];x=this.concat(fb(x,[]));for(var i=0;i<x.length;i++)if(a.indexOf(x[i])<0)a.push(x[i]);return a});
df(Array,'\xE3',function(x,y){x=fb(x,2);var a=[];if(id(y))a[0]=this.slice(0,x-1),a[0].unshift(y);for(var i=0;i<=this.length-x;i++)a.push(this.slice(i,i+x));return a});
df(Array,'\xE4',function(x,y){x=functify(x,0);return this['\xE3'](2,y).map(function(z){return z.reduce(x)})});
df(Array,'\xE5',function(x,y){x=functify(x,0);var a=[];this.reduce(function(q,r,s){var t=x(q,r,s);a.push(t);return t},y||(typeof this[0]=="number"?0:""));return a});
df(Array,'\xE6',function(x,y){x=functify(fb(x,function(q){return!!q}),y);for(var i=0;i<this.length;i++)if(x(this[i],fb(y,i)))return this[i]});
df(Array,'\xE7',function(x){return this.map(function(){return clone(x)})});
df(Array,'\xE8',function(x,y){return this.f(x,y).length});
df(Array,'\xE9',function(x){var r=[],l=this.length,i=l;for(x=pm(-fb(x,1),l);i--;x++)r.push(this[x%l]);return r});
df(Array,'\xEA',function(x){return typeof x==="string"?str(this)===str(this.slice().w()):this.concat(this.slice(0,Math.floor(fb(x,0))%2?this.length:-1).w())});
df(Array,'\xEB',function(x,y){x=fb(x,2);y=fb(y,0);return this.slice(y).filter(function(a,b){return b%x==0})});
df(Array,'\xEC',function(x){if(typeof x==="string")x=x.q();x=fb(x,10);return this.reduce(function(a,b){return x instanceof Array?a*x.length+x.indexOf(b):a*x+parseFloat(b)},0)});
df(Array,'\xED',function(x,y){var i=0,z;if(!(x instanceof Array)){if(y instanceof Array)z=y,y=x,x=z;else for(y=x,x=[];i<this.length;i++)x[i]=i}y=functify(fb(y,function(a,b){return[a,b]}),0);return this.map(function(a,b,c){return y(a,x[b],c)})});
df(Array,'\xEE',function(x){x=fb(x,[0]);return this.map(function(_,i){return x[i%x.length]});});
df(Array,'\xF1',function(x,y){x=functify(fb(x,function(z){return z}),y);return this.sort(function(a,b,i){a=x(a,fb(y,i));b=x(b,fb(y,i));return(a>b)-(a<b)})});
df(Array,'\xF2',function(x){if(this.length===0)return[];x=fb(x,2);var a=[],i=0;if(typeof x==="number"){if(x>0)for(;i<this.length;i+=x)a.push(this.slice(i,i+x));else if(x<0)for(i=this.length;i>0;i+=x)a.unshift(this.slice(Math.max(i+x,0),i));}else{x=functify(fb(x,function(z){return z}),0);for(a.push([this[0]]),i=1;i<this.length;a.g(-1).push(this[i++]))x(this[i-1],this[i],this)&&a.push([])}return a;});
df(Array,'\xF3',function(x){if(this.length===0)return[];x=fb(x,2);var a=[],i=0;if(typeof x==="number"){for(;i<this.length;i++)a[i%x]=a[i%x]||[],a[i%x].push(this[i]);}else{x=functify(fb(x,function(z){return z}),0);for(a.push([this[0]]),i=1;i<this.length;a.g(-1).push(this[i++]))x(this[i-1],this[i],this)||a.push([])}return a;});
df(Array,'\xF4',function(x,y){if(this.length===0)return[];x=functify(fb(x,function(z){return!z}),y);var a=[],i=0;for(a.push([]);i<this.length;i++)x(this[i],fb(y,i),this)?a.push([]):a.g(-1).push(this[i]);return a;});
df(Array,'\xF6',function(x){if(!id(x))return this[Math.random()*this.length|0];if(typeof x==="function")return this.filter(x)['\xF6']();var b=[];if(isNaN(x))for(var a=this.slice();a.length>0;)b.push(a.splice(Math.random()*a.length|0,1)[0]);else for(var i=+x;i>0;i--)b.push(this[Math.random()*this.length|0]);return b});
df(Array,'\xF8',function(x){if(!id(x))return false;if(!(x instanceof Array))x=[x];return this.some(function(a){return x.contains(a)})});
df(Array,'pad',function(x,y,a){var z,q=this.map(function(c){return c instanceof Array?c:String(c)});if(!id(x))x=" ";if(!id(y)){if(typeof x==="number")y=x,x=" ";else y=q.reduce(function(p,c){return p.w(c.length)},0);}if(typeof x==="number"&&typeof y!=="number")z=x,x=y,y=z;return q.map(function(z){return z.pad(x,y,a)})});
df(Array,'\xF9',function(x,y){return this.pad(x,y,1)});
df(Array,'\xFA',function(x,y){return this.pad(x,y,-1)});
df(Array,'\xFB',function(x,y){return this.pad(x,y,0)});

df(Number,'a',function(x){x=fb(x,0);return Math.abs(this-x)});
df(Number,'b',function(x,y){return this<x?x:this>y?y:this});
df(Number,'c',function(x){x=fb(x,1);return Math.ceil(this/x)*x});
df(Number,'d',function(x){x=fb(x,0);return String.fromCodePoint(this+x)});
df(Number,'e',function(x){return this*Math.pow(10,x)});
df(Number,'f',function(x){x=fb(x,1);return Math.floor(this/x)*x});
df(Number,'g',function(){return this.toString()=="NaN"?"NaN":this<0?-1:this>0?1:0});
df(Number,'h',function(x){x=fb(x,1);return this.toPrecision(x)});
df(Number,'i',function(x){return Japt.intervals[Japt.intervals.length]=setInterval(x,this)});
df(Number,'j',function(x){if(id(x))return this.y(x)==1;var n=+this;if(n===2)return true;if(n%1||n<2||n%2===0)return false;for(var i=3,s=Math.sqrt(n);i<=s;i+=2)if(n%i===0)return false;return true});
df(Number,'k',function(){var n=+this,r,f=[],x,d=1<n;while(d){r=Math.sqrt(n);x=2;if(n%x){x=3;while(n%x&&((x+=2)<r));}f.push(x=x>r?n:x);d=(x!=n);n/=x;}return f});
df(Number,'l',function(){var n=Math.trunc(this),x=Math.trunc(this);if(n<1)return 1;while(--n)x*=n;return x});
df(Number,'m',function(){return[].reduce.call(arguments,function(x,y){return Math.min(x,y)},this)});
df(Number,'n',function(x){x=fb(x,0);return x-this});
df(Number,'o',function(x,y,f,s){var q;if(typeof x=="function")f=x,x=undefined;if(typeof x=="string")f=functify(x,y),q=y,x=y=undefined;if(typeof y=="function")f=y,y=undefined;var z=+this;y=y||1;if(!id(x))x=z,z=0;if(s&2)x+=z;if(x<z)_=x,x=z,z=_;if(s&1)x++;var r=[],i=0;if(y>0)for(;z<x;z+=y)r.push(z);else if(y<0)for(;z<x;x+=y)r.push(x);if(typeof f=="function")return r.map(function(a,b,c){return f(a,fb(q,b),c)});return r});
df(Number,'p',function(x){x=fb(x,2);return Math.pow(this,x)});
df(Number,'q',function(x){x=fb(x,2);return Math.pow(this,1/x)});
df(Number,'r',function(x){x=fb(x,1);return Math.round(this/x)*x});
df(Number,'s',function(x,y){if(typeof x==="function"||(typeof x==="string"&&(id(y)?/^!?.$/.test(x):x.length===1)))return Number(functify(x,y)(this.s(),y));if(typeof x==="string")x=x.q();if(x instanceof Array)return this['\xEC'](x).q();x=fb(x,10);return this.toString(x)});
df(Number,'t',function(x){return Japt.intervals[Japt.intervals.length]=setTimeout(x,this)});
df(Number,'u',function(x){return pm(this,fb(x,2))});
df(Number,'v',function(x){x=fb(x,2);return x==0||this%x===0?1:0});
df(Number,'w',function(){return[].reduce.call(arguments,function(x,y){return Math.max(x,y)},this)});
df(Number,'x',function(x){x=fb(x,0);return this.toFixed(x)});
df(Number,'y',function(x){x=fb(x,2);var y=+this,z;while(x&&y)z=x,x=y,y=Math.approx(z%y);return x});
df(Number,'z',function(x){x=fb(x,2);return Math.trunc(this/x)});
df(Number,'\xE0',function(x){var n=Math.trunc(this);x=Math.trunc(fb(x,0));if(x<0||n<0)return 0;if(x===0)return Math.pow(2,n)-1;return Math.round(n.l()/(x.l()*(n-x).l()))});
df(Number,'\xE1',function(x){var n=Math.trunc(this);x=Math.trunc(fb(x,0));if(x<0||n<0)return 0;if(x===0)return n.l();return n["\xE0"]()*x.l()});
df(Number,'\xE2',function(x){if(this%1)return[];var n=Math.abs(this);var a=[];for(var i=1;i<Math.sqrt(n);++i)if(n%i===0)a.push(i,n/i);if(i*i===n)a.push(i);a.n();if(x)a.pop();return a});
df(Number,'\xE7',function(x){x=fb(x," ")+"";return x.p(+this)});
df(Number,'\xEC',function(x,y){if(typeof x==="function"||(typeof x==="string"&&(id(y)?/^!?.$/.test(x):x.length===1))){var z=functify(x,y)(this['\xEC'](),y);if(z instanceof Array)z=z['\xEC']();return Number(z)}if(typeof x==="string")x=x.q();if(x instanceof Array)return this['\xEC'](x.length).m(function(y){return x[y]});var n=Math.trunc(this);x=Math.floor(fb(x,10));if(x===1){if(n<0)return Array(-n).fill(-1);else return Array(n).fill(1)}if(x>0){if(x===1){if(n<0)return(-n).o()['\xE7'](-1);else return n.o()['\xE7'](1);}else{for(var a=[];n!=0;n=Math.trunc(n/x))a.unshift(n%x);return a;}}else if(x<0){if(x===-1){return(n>0?n*2-1:-n*2).o()['\xEE']([1,0]);}else{x=-x;for(var a=[];n!=0;n=Math.trunc(n<0?-(n-x+1)/x:-n/x))a.unshift(pm(n,x));return a;}}else return[];});
df(Number,'\xEE',function(x){return" ".p(+this)['\xEE'](x)});
df(Number,'\xF2',function(x,y,f){return this.o(x,y,f,1)});
df(Number,'\xF3',function(x,y,f){return this.o(x,y,f,2)});
df(Number,'\xF4',function(x,y,f){return this.o(x,y,f,3)});
df(Number,'\xF5',function(x,y,f){var q,z,n=+this,r=[],i=0;if(!(1/n))return[];if(typeof x==="function")f=x,x=1;if(typeof x=="string")f=functify(x,y),z=y,x=y=1;x=fb(x,1);y=fb(y,1);if(y===0)return[];if(y<0)y=-y,q=x,x=n,n=q;if(x<n)for(;x<=n;x+=y)r.push(x);else if(x>n)for(;x>=n;x-=y)r.push(x);else r=[x];return typeof f==="function"?r.map(function(a,b,c){return f(a,fb(z,b),c)}):r});
df(Number,'\xF6',function(x){if(!id(x))return Math.floor(Math.random()*this);return this.o()['\xF6'](x)});

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
df(Date,'n',function(x){return id(x)?x-this:+this});

df(Date,'l',function(){noFunc('D.l')});
df(Date,'m',function(){noFunc('D.m')});
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

function bij(a,b){var s="";a=Math.floor(a);b=fb(b,10);if(b%1||b<2)return s;if(a<0)s="-",a=~a;var c=0,x=1;while(a>=x){c++;a-=x;x*=b;}for(var i=0;i<c;i++){s=(a%b)+s;a=Math.floor(a/b);}return s;}

df(Function,'a',function(x,y){x=fb(x,function(q){return q});var s=0;if(isNaN(x))x=functify(x,y);else s=Number(x),x=function(q){return q};for(var i=0;i<1e8;++i){var j=x(i+s,fb(y,i));if(this(j,i))return j;}});
df(Function,'b',function(x,y){x=fb(x,function(q){return q});var s=0;if(isNaN(x))x=functify(x,y);else s=Number(x),x=function(q){return q};for(var i=0;i<1e8;++i){j=x(bij(i+s,10),fb(y,i));if(this(j,i))return j;}});
df(Function,'c',function(x,y){x=fb(x,function(q){return q});var s=0;if(isNaN(x))x=functify(x,y);else s=Number(x),x=function(q){return q};for(var i=0,I=0;i<1e8;i=-i-(i>-1),I++){var j=x(i+s,fb(y,I));if(this(j,I))return j;}});
df(Function,'g',function(n,a){if(n instanceof Array){var z=a;a=n;n=z}n=fb(n,U);a=fb(a,[0,1]);for(var i=a.length;i<=n;++i)a.push(this(fb(a.g(-1),-1),i,clone(a)));return a.g(n)});

df(Object,'\xFF',function(){if(!isnode)alert(this);return this instanceof Number?+this:this instanceof String?""+this:this});

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
Math.h = Math.hypot || function hypot(){return Math.sqrt(arguments.reduce(function(a,b){return a+b*b}))};

Math.P = Math.PI;
Math.Q = 1.618033988749894848;
Math.R = Math.SQRT_1_2;
Math.S = Math.SQRT_2;
Math.T = Math.PI * 2;

// String compression
shoco.c = function (str) { return Array.prototype.map.call(shoco.compress(str), function (char) { return String.fromCodePoint(char) }).join('') };
shoco.d = function (str) { return shoco.decompress(new Uint8Array( ( str.constructor == Array ? str[0] : str ).split('').map(function (char) {return char.charCodeAt(0)})))};

void(0);

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
			else if (parens === 0 && isChar(char, ",+\\-*/%&^|<=>?:")) return false;
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
					} else if (current == "-" && /\S/.test(char)) {
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
			program = function program(U,V,W,X,Y,Z) {
				if (!program.cache)
					program.cache = {};
				var id = str([U,V,W,X,Y,Z]);
				var cached = program.cache[id];
				if (typeof cached !== "undefined")
					return cached;
				rp = function rp(u,v,w,x,y,z) {
					return program(
						fb(u,U),
						fb(v,V),
						fb(w,W),
						fb(x,X),
						fb(y,Y),
						fb(z,Z)
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
					var temp = program(U[i],fb(N[1],i),fb(N[2],U),X,Y,Z);
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
						if (Japt.use_safe) Japt.is_safe = false;
						newcode += "$" + code[++i] + "$";
					}
					else if (isChar(char, "\"`")) {
						level++;
						internary = newcode.slice(-1) === "?";
						strchars[level] = char;
						currstr = "\"";
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
							Japt.strings.push("\""+code[i]+"\"");
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
						code = code.slice(0,i+1) + pairs[char] + code.slice(i+1);
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
					else if (char === ";" && !newcode) {
						lines.push("newvars();");
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
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)$/,function(_,a){return"\""+shoco.d(a)});
						currstr += "\"";
						Japt.strings.push(currstr.match(/"(?:\\.|[^"])*"$/)[0]);
						currstr = currstr.replace(/"(?:\\.|[^"])*"$/, "\"" + (Japt.strings.length - 1) + "\"");
						newcode += "'" + currstr + "':";
						currstr = strchars[level];
					}
					else if (char === strchars[level]) {
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)$/,function(_,a){return"\""+shoco.d(a)});
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
						if (strchars[level] === "`") currstr = currstr.replace(/"((?:\\.|[^"])*)"$/,function(_,a){return"\""+shoco.d(a)+"\""});
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
					opMatch = code.slice(i).match(/^(===|!==|==|!=|>>>|>>|<<|&&|\|\||>=|<=|\+(?!\+)|-(?!-)|\.(?!\d)|[*%^&|<>,])(?!=)/),
					nextIsOp = !!opMatch,
					opLength = nextIsOp ? opMatch[0].length : 0;
				if (char === ";" && i === 0)
					outp += "newvars()";
				else if (isChar(char, "`'\"A-Z\\(\\[{") && isChar(outp.slice(-1), "`'\"A-Z0-9\\)\\]}"))
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
							tr = tr.slice(0, tr.lastIndexOf(";") + 1) + "return " + tr.slice(tr.lastIndexOf(";") + 1);
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
				else if (isChar(char, "a-zà-ÿ")) {
					if (outp.slice(-2) === "(!") {
						outp = outp.slice(0,-1) + "\"!"+char+"\"";
					} else if (outp.slice(-1) === "(") {
						outp += "\""+char+"\"";
					} else if (isChar(outp.slice(-1), "0-9")) {
						if (char === "e" && isChar(code[i + 1], "0-9") && outp.slice(-2,-1) !== "e") {
							outp += char;
						} else {
							outp += " ." + char + "(";
						}
					} else if (/([A-Z])(?!\+\+|--)[+\-*/%^&|<=>!~]+$/.test(outp)) {
						outp += outp.match(/([A-Z])(?!\+\+|--)[+\-*/%^&|<=>!~]+$/)[1] + "." + char + "(";
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
			.replace(/[{?:]|&&|\|\||(?:\*\*|==|<<|>>>?|!=|[+\-*/%&|^<=>])=?/g, " $& ")
			.replace(/ +/g, " ")
			.replace(/ ;/g, ";");
		outp = outp.replace(/"(\d+)"/g,function(_,a){return Japt.strings[+a]});
		return outp;
	},

	eval: function(code) {
		return eval(Japt.transpile(code));
	}
}

if (isnode) module.exports = Japt;
