var code, input, timeout, safe_unicode = false; // When safe_unicode is true, shorthand() won't be called so unicode characters can be used safely
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
String.prototype.d = function(){noFunc('Sd')}
String.prototype.e = function(){noFunc('Se')}
String.prototype.f = function(){noFunc('Sf')}
String.prototype.g = function(x){return this.charAt(x)}
String.prototype.h = function(x,y){return this.substring(0,x)+y+this.substring(x+y.length)}
String.prototype.i = function(x,y){return this.substring(0,x)+y+this.substring(x)}
String.prototype.j = function(x,y){if(typeof(y)==="undefined")y=1;return this.substring(0,x)+this.substring(x+y)}
String.prototype.k = function(x){return this.replace(RegExp(x),"")}
String.prototype.l = function(){return this.length}
String.prototype.m = function(x){return this.split('').map(x).join('')}
String.prototype.n = function(x){return parseInt(this,x||10)}
String.prototype.o = function(){noFunc('So')}
String.prototype.p = function(x){return this.repeat(x)}
String.prototype.q = function(x){return this.split(x)}
String.prototype.r = function(x,y){return this.replace(RegExp(x,"g"),y)}
String.prototype.s = function(x,y){if(typeof(y)==="undefined")y=this.length;if(y<0)y+=this.length;return this.substring(x,y)}
String.prototype.t = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.substr(x,y)}
String.prototype.u = function(){return this.toUpperCase()}
String.prototype.v = function(){return this.toLowerCase()}
String.prototype.w = function(){return this.split('').reverse().join('')}
  
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
Array.prototype.r = function(x){return this.reduce(x)}
Array.prototype.s = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.slice(x,y)}
Array.prototype.t = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.slice(x,x+y)}
Array.prototype.u = function(){noFunc('Au')}
Array.prototype.v = function(){noFunc('Av')}
Array.prototype.w = function(){return this.reverse()}

Number.prototype.a = function(){noFunc('Na')}
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
Number.prototype.l = function(){noFunc('Nl')}
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

// Shorter Math Properties
Math.r = Math.random;
Math.P = Math.PI;

void(0); // Completely optional

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

function shorthand (code) {
    // 0xA1 (161) is the first printable non-ASCII, so we'll start from there
    var pairs = {
        // Using \u<hex> to avoid encoding incompatibilities
        // Feel free to change these
        "\u00A1": "Um@", // ¡ - 161
        "\u00A2": "Us2", // ¢ - 162
    };
    
    return Object.keys(pairs).reduce(function (code, char) {
        return code.replace(new RegExp(char, 'g'), pairs[ char ]);
    }, code);
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
    O = undefined,
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
    
    if (!safe_unicode) code = shorthand(code) || "";
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
      .replace(/\$([^\$]*)\$/g,function(x,y){codes[i]=y;return"$"+i+++"$"})
      .replace(/'./g,function(x){strings[i]=x+"'";return"\""+i+++"\""})
      .replace(/#./g,function(x){return x.charCodeAt(1)})
      .replace(/\)/g,"))")
      .replace(/ /g,")")
      .replace(/@/g,"(X,Y,Z)=>")
      .replace(/(.)([a-w])/g,function(x,y,z){return y+(/[0-9]/.test(y)?' .':'.')+z+'('});
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