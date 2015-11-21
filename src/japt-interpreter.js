var code, input, timeout;
var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;
function noFunc(x){alert("No such function: "+x)}
var defFuncs = {
  a: "alert(",
  b: "break;",
  c: "continue;",
  d: "",
  e: "",
  f: "for(",
  g: "for(",
  h: "",
  i: "if(",
  j: "else if(",
  k: "else",
  l: "console.log(",
  m: "",
  n: "",
  o: "output(",
  p: "",
  q: "",
  r: "",
  s: "switch(",
  t: "typeof(",
  u: "while(!",
  v: "evalJapt(",
  w: "while("};

String.prototype.repeat = String.prototype.repeat||function(x){if(x<0)return'';for(var y='',i=x|0;i--;)y+=this;return y}
String.prototype.a = function(){return this.split('');}
String.prototype.b = function(x){return this.indexOf(x)}
String.prototype.c = function(x){return this.charCodeAt(x)}
String.prototype.d = function(x){
  if(arguments.length<2){return(typeof x=="object"?x[0]:x).match(/[\S\s]{1,2}/g).reduce(function(o,f){return o.split(f[0]).join(f[1])},this)}
  else{return[].reduce.call(arguments,function(o,f,i,a){return i%2?o:o.replace(RegExp(f,'g'),a[i+1]);},this)}}
String.prototype.e = function(x,y,z){var t=this.replace(x instanceof RegExp?x:RegExp(x,z||"g"),y||"");return t===this?this:t.e(x,y,z)} // "Recursive" replaces
String.prototype.f = function(){noFunc('Sf')}
String.prototype.g = function(x){return this.charAt(x)}
String.prototype.h = function(x,y){return this.substring(0,x)+y+this.substring(x+y.length)}
String.prototype.i = function(x,y){return this.substring(0,x)+y+this.substring(x)}
String.prototype.j = function(x,y){if(typeof(y)==="undefined")y=1;return this.substring(0,x)+this.substring(x+y)}
String.prototype.k = function(x,y){return this.replace(RegExp(x,y),"")}
String.prototype.l = function(){return this.length}
String.prototype.m = function(x,y){return this.split(y||'').map(x).join(y||'')}
String.prototype.n = function(x){return parseInt(this,x||10)}
String.prototype.o = function(x){return this.replace(new RegExp('[^'+x+']','gi'),"")} // Removes all but specified characters. Similar to TeaScript's O function
String.prototype.p = function(x){return this.repeat(x)}
String.prototype.q = function(x){return this.split(x)}
String.prototype.r = function(x,y,z){return this.replace(RegExp(x,(z||"")+"g"),y)}
String.prototype.s = function(x,y){if(typeof(y)==="undefined")y=this.length;if(y<0)y+=this.length;return this.substring(x,y)}
String.prototype.t = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.substr(x,y)}
String.prototype.u = function(){return this.toUpperCase()}
String.prototype.v = function(){return this.toLowerCase()}
String.prototype.w = function(){return this.split('').reverse().join('')}
String.prototype.x = function(){noFunc('Sx')}
String.prototype.y = function(){noFunc('Sy')}
String.prototype.z = function(){noFunc('Sz')}

Array.prototype.a = function(){return this.join('');}
Array.prototype.b = function(x){return this.indexOf(x)}
Array.prototype.c = function(x){return this.lastIndexOf(x)}
Array.prototype.d = function(x){return this.some(x)}
Array.prototype.e = function(x){return this.every(x)}
Array.prototype.f = function(x){return this.filter(x)}
Array.prototype.g = function(x){return this[x]}
Array.prototype.h = function(x,y){this[x]=y;return this}
Array.prototype.i = function(x,y){this.splice(x,0,y);return this}
Array.prototype.j = function(x,y){if(typeof(y)==="undefined")y=1;return this.splice(x,y)}
Array.prototype.k = function(x){this.splice(this.indexOf(x),1);return this}
Array.prototype.l = function(){return this.length}
Array.prototype.m = function(x){return this.map(x)}
Array.prototype.n = function(x){return this.sort(x)}
Array.prototype.o = function(){return this.pop()}
Array.prototype.p = function(x){return this.push(x)}
Array.prototype.q = function(x){return this.join(x)}
Array.prototype.r = function(x,y){return this.reduce(x,y)}
Array.prototype.s = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.slice(x,y)}
Array.prototype.t = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.slice(x,x+y)}
Array.prototype.u = function(x){return this.unshift(x)}
Array.prototype.v = function(){return this.shift()}
Array.prototype.w = function(){return this.reverse()}
Array.prototype.x = function(){noFunc('Sx')}
Array.prototype.y = function(){noFunc('Sy')}
Array.prototype.z = function(){noFunc('Sz')}

Number.prototype.a = function(){return Math.abs(this)}
Number.prototype.b = function(x,y){return this<x?x:this>y?y:this}
Number.prototype.c = function(){return Math.ceil(this)}
Number.prototype.d = function(){return String.fromCharCode(this)}
Number.prototype.e = function(x){return this*Math.pow(10,x)}
Number.prototype.f = function(x){return this|0}
Number.prototype.g = function(x){return this.toString()=="NaN"?"NaN":this<0?-1:this>0?1:0}
Number.prototype.h = function(){noFunc('Nh')}
Number.prototype.i = function(){noFunc('Ni')}
Number.prototype.j = function(){noFunc('Nj')}
Number.prototype.k = function(){noFunc('Nk')}
Number.prototype.l = function(x){return Math.factorial(this);}
Number.prototype.m = function(x){return Math.min(this,x)}
Number.prototype.n = function(){return-this}
Number.prototype.o = function(x,y){
  var z=this;
  if(typeof(y)==="undefined")y=1;
  if(typeof(x)==="undefined")x=z,z=0;
  if(x<z)_=x,x=z,z=_;
  var r=[], i=0;
  if(y>0)
    for(;z<x;z+=y)
      r.push(z);
  else if(y<0)
    for(;z<x;x+=y)
      r.push(x);
  return r;
}
Number.prototype.p = function(x){return Math.pow(this,x)}
Number.prototype.q = function(){return Math.sqrt(this)}
Number.prototype.r = function(){return Math.round(this)}
Number.prototype.s = function(x){if(typeof(x)==="undefined")x=10;return this.toString(x)}
Number.prototype.t = function(){noFunc('Nt')}
Number.prototype.u = function(){return this%2===1?1:0}
Number.prototype.v = function(){return this%2===0?1:0}
Number.prototype.w = function(x){return Math.max(this,x)}
Number.prototype.x = function(){noFunc('Nx')}
Number.prototype.y = function(){noFunc('Ny')}
Number.prototype.z = function(){noFunc('Nz')}

// Shorter Math Properties
Math.t = Math.atan2;
Math.f = Math.factorial;
Math.g = function g (n) { return n <= 1 ? n : Math.g(n-1) + Math.g(n-2); };
Math.r = Math.random;
Math.p = function(n,p) {var r,f=[],x,d=1<n; // Prime Factorization, if 2nd arg is trusey, will return if num is prime.
  while(d){r=Math.sqrt(n);x=2;if(n%x){x=3;while(n%x&&((x += 2) < r));}f.push(x=x>r?n:x);d=(x!=n);n/=x;}return p?f.length==1:f;}
Math.P = Math.PI;
// String compression
shoco.c = function (str) { return Array.prototype.map.call(shoco.compress(str), function (char) { return String.fromCharCode(char) }).join('') };

shoco.d = function (str) { return shoco.decompress(new Uint8Array( ( str.constructor == Array ? str[0] : str ).split('').map(function (char) {
        return char.charCodeAt(0)})))};

void(0);

function clear_output() {
  document.getElementById("output").value = "";
  document.getElementById("stderr").innerHTML = "";
}

function stop() {
  running = false;
  document.getElementById("run").disabled = false;
  document.getElementById("stop").disabled = true;
  document.getElementById("clear").disabled = false;
  document.getElementById("timeout").disabled = false;
}

function interrupt() {
  error(ERROR_INTERRUPT);
}

function error(msg) {
  document.getElementById("stderr").innerHTML = msg;
  stop();
}

function evalInput(input) {
  var input_mode = "next", current, processed = [], level = 0;
  (input+" ").split("").forEach(function(char){
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
        if (/[0-9.-]/.test(char)) {
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
        } else {
          current += char;
        }
        break;
      case "string '":
        if (char == "'") {
          processed.push(current);
          current = undefined;
          input_mode = "next";
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
  });
  return processed;
}

// Call this function with a second argument. If second arg is trusey
function shorthand (code) {
  // 0xA1 (161) is the first printable non-ASCII, so we'll start from there
  var pairs = {
    // Using \u<hex> to avoid encoding incompatibilities
    // Feel free to change these
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
    "\u00AB": "&&!"   // « - 171
  }, i = 0, l = "", n = "";

  for (var i = 0; i < code.length; i++) {
    if (['"',"'"].indexOf(code[i]) > -1) { // Quote
      n += l = code[i++];
      while (!(code[i] == l && code[i - 1] != "\\") && i < code.length) n += code[i++]; n += code[i];
    } else {
      if ( Object.keys(pairs).indexOf(code[i]) > -1 ) {
        n += pairs[ code[i] ];
      } else {
        n += code[i];
      }
    }
  }

  return n;
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
    K = .5,
    L = 100,
    M = Math,
    N = evalInput(input),
    O = shoco,
    P = "",
    Q = "\"",
    R = "\n",
    S = " ",
    T = 0,
    U = N[0],
    V = N[1],
    W = N[2],
    X = N[3],
    Y = N[4],
    Z = N[5];
  
  evalJapt(code);

  document.getElementById("run").disabled = false;
  document.getElementById("stop").disabled = true;
  document.getElementById("clear").disabled = false;
  document.getElementById("input").disabled = false;
  document.getElementById("timeout").disabled = false;
}

function subparen(code) {
  var level = 0, min = 0;
  for(var i in code) {
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
  var cade = "", mode = "next", char = "", curr = "", array = "", level = 0;
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
        } else {
          curr += char;
        }
        break;
      case "array":
        if (char == "[") {
          level++;
        } else if (char == "]") {
          level--;
          if (level < 0) {
            curr += "[" + fixParens(array) + "]";
            array = "";
            mode = "next";
          }
        } else {
          array += char;
        }
        break;
    }
  }
  cade += subparen(curr);
  return cade;
}

function evalJapt(code) {
  var codes = [], strings = [], i = 0, j = 0;

  code = code
    .replace(/"[^"]*("|.$)/g,function(x){strings[i]=x+(x.slice(-1)=="\""?"":"\"");return"\""+i+++"\""})
    .replace(/`[^`]*(`|.$)/g,function(x){if(x.slice(-1)=="`")console.log("Aha!",x),x=x.slice(0,-1);strings[i]="\""+shoco.d(x.slice(1))+"\"";return"\""+i+++"\""})
    .replace(/\$([^\$]*)\$/g,function(x,y){codes[i]=y;return"$"+i+++"$"})
    .replace(/'./g,function(x){strings[i]=x+"'";return"\""+i+++"\""})
    .replace(/#./g,function(x){return x.charCodeAt(1)})
    .replace(/\)/g,"))")
    .replace(/ /g,")")
    .replace(/@/g,"(X,Y,Z)=>")
    .replace(/(.)([a-w])/g,function(x,y,z){return y+(/[0-9]/.test(y)?' .':'.')+z+'('});
  code = shorthand(code);
  code = fixParens(code);
  code = code
    .replace(/\$(\d+)\$/g,function(_,x){return codes[x]})
    .replace(/(\??)"(\d+)"/g,function(_,y,x){return y+strings[x].replace(/([^\\]):/,function(x,z){return y=="?"?z+"\":\"":x}).replace(/([^\\]){([^}]+)}/g,"$1\"+($2)+\"")});

  alert("JS code: "+code);
  try {
    var result=eval(code);
    alert("Result: "+result);
    document.getElementById("output").value = result;
  } catch (e) {
    alert(e);
  }
}
