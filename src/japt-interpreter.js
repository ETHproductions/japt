var code, input, timeout;
var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;
function noFunc(x){alert("No such function: "+x)}
var defFuncs = {
    a: "alert(",
    b: "break;",
    c: "continue;",
    d: "",
    e: "",
    f: "",
    g: "",
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
    w: "while(",
    x: "",
    y: "",
    z: ""
};

String.prototype.repeat = String.prototype.repeat||function(x){if(x<0)return'';for(var y='',i=x|0;i--;)y+=this;return y}
String.prototype.a = function(){return this.split('')};
String.prototype.b = function(x){return this.indexOf(x)};
String.prototype.c = function(x){return this.charCodeAt(x)};
String.prototype.d = function(x){
    if(arguments.length<2){return(typeof x=="object"?x[0]:x).match(/[\S\s]{1,2}/g).reduce(function(o,f){return o.split(f[0]).join(f[1])},this)}
    else{return[].reduce.call(arguments,function(o,f,i,a){return i%2?o:o.replace(RegExp(f,'g'),a[i+1]);},this)}};
String.prototype.e = function(x,y,z){x=x instanceof RegExp?x:RegExp(x,z||"g");var t=this,u;for(var i=1e8;i--&&t!==u;)u=t,t=t.replace(x,y||"");return t};
String.prototype.f = function(x,y){return this.match(x instanceof RegExp?x:RegExp(x,y||"g"))};
String.prototype.g = function(x){return this.charAt(x||0)};
String.prototype.h = function(x,y){return this.substring(0,x)+y+this.substring(x+y.length)};
String.prototype.i = function(x,y){return this.substring(0,x)+y+this.substring(x)};
String.prototype.j = function(x,y){if(typeof(y)==="undefined")y=1;return this.substring(0,x)+this.substring(x+y)};
String.prototype.k = function(x,y){return this.replace(RegExp(x,y),"")};
String.prototype.l = function(){return this.length};
String.prototype.m = function(x,y){return this.split(y||'').map(x).join(y||'')};
String.prototype.n = function(x){return parseInt(this,x||10)};
String.prototype.o = function(x){return this.replace(new RegExp('[^'+x+']','gi'),"")}; // Removes all but specified characters. Similar to TeaScript's O function
String.prototype.p = function(x){return this.repeat(x)};
String.prototype.q = function(x){return this.split(x||"")};
String.prototype.r = function(x,y,z){return this.replace(RegExp(x,(z||"")+"g"),y)};
String.prototype.s = function(x,y){if(typeof(y)==="undefined")y=this.length;if(y<0)y+=this.length;return this.substring(x,y)};
String.prototype.t = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.substr(x,y)};
String.prototype.u = function(){return this.toUpperCase()};
String.prototype.v = function(){return this.toLowerCase()};
String.prototype.w = function(){return this.split('').reverse().join('')};
String.prototype.x = function(){noFunc('Sx')};
String.prototype.y = function(){noFunc('Sy')};
String.prototype.z = function(){noFunc('Sz')};

Array.prototype.a = function(){return this.join('')};
Array.prototype.b = function(x){return this.indexOf(x)};
Array.prototype.c = function(x){return this.lastIndexOf(x)};
Array.prototype.d = function(x){return this.some(x)};
Array.prototype.e = function(x){return this.every(x)};
Array.prototype.f = function(x){return this.filter(x)};
Array.prototype.g = function(x){return this[x||0]};
Array.prototype.h = function(x,y){this[x]=y;return this};
Array.prototype.i = function(x,y){this.splice(x,0,y);return this};
Array.prototype.j = function(x,y){if(typeof(y)==="undefined")y=1;return this.splice(x,y)};
Array.prototype.k = function(x){this.splice(this.indexOf(x),1);return this};
Array.prototype.l = function(){return this.length};
Array.prototype.m = function(x){return this.map(x)};
Array.prototype.n = function(x){return this.sort(x)};
Array.prototype.o = function(){return this.pop()};
Array.prototype.p = function(x){return this.push(x)};
Array.prototype.q = function(x){return this.join(x||"")};
Array.prototype.r = function(x,y){return this.reduce(x,y)};
Array.prototype.s = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.slice(x,y)};
Array.prototype.t = function(x,y){if(typeof(y)==="undefined")y=this.length;return this.slice(x,x+y)};
Array.prototype.u = function(x){return this.unshift(x)};
Array.prototype.v = function(){return this.shift()};
Array.prototype.w = function(){return this.reverse()};
Array.prototype.x = function(){return this.reduce(function(a,b){return a+b})};
Array.prototype.y = function(){var t="string"==typeof this[0][0],n=t?this.map(function(t){return t.split("")}):this;return n[0].map(function(r,i){return n.map(function(t){return t[i]})[t?"join":"valueOf"]("")})};
Array.prototype.z = function(n){return n==1?this.y().map(f=function(l){return l.w()}):n==2?this.w().map(f):n==3?this.map(f).y():this.z(1)}; // (clockwise) 1: 90deg, 2: 180deg, 3: -90deg
Array.prototype.à = function(){noFunc('Aà')};
Array.prototype.á = function(){noFunc('Aá')};

Number.prototype.a = function(){return Math.abs(this)};
Number.prototype.b = function(x,y){return this<x?x:this>y?y:this};
Number.prototype.c = function(){return Math.ceil(this)};
Number.prototype.d = function(){return String.fromCharCode(this)};
Number.prototype.e = function(x){return this*Math.pow(10,x)};
Number.prototype.f = function(){return this|0};
Number.prototype.g = function(){return this.toString()=="NaN"?"NaN":this<0?-1:this>0?1:0};
Number.prototype.h = function(){noFunc('Nh')};
Number.prototype.i = function(){noFunc('Ni')};
Number.prototype.j = function(){return this.k().length===1};
Number.prototype.k = function(){var n=this,r,f=[],x,d=1<n;while(d){r=Math.sqrt(n);x=2;if(n%x){x=3;while(n%x&&((x+=2)<r));}f.push(x=x>r?n:x);d=(x!=n);n/=x;}return f};
Number.prototype.l = function(){var n=this|0,x=this|0;while(--n)x*=n;return n};
Number.prototype.m = function(x){return Math.min(this,x)};
Number.prototype.n = function(){return-this};
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
};
Number.prototype.p = function(x){return Math.pow(this,x)};
Number.prototype.q = function(){return Math.sqrt(this)};
Number.prototype.r = function(){return Math.round(this)};
Number.prototype.s = function(x){if(typeof(x)==="undefined")x=10;return this.toString(x)};
Number.prototype.t = function(){noFunc('Nt')};
Number.prototype.u = function(){return this%2===1?1:0};
Number.prototype.v = function(){return this%2===0?1:0};
Number.prototype.w = function(x){return Math.max(this,x)};
Number.prototype.x = function(){noFunc('Nx')};
Number.prototype.y = function(){noFunc('Ny')};
Number.prototype.z = function(){noFunc('Nz')};

// Shorter Date properties. All accept an argument; 0 = get, 1 = set, 2 = getUTC, and 3 = setUTC.
function ts(x){return["get","set","getUTC","setUTC"][x||0]}
Date.prototype.a = function(x,y){return this[ts(x||0)+"Milliseconds"](y||0)};
Date.prototype.b = function(x,y){return this[ts(x||0)+"Seconds"](y||0)};
Date.prototype.c = function(x,y){return this[ts(x||0)+"Minutes"](y||0)};
Date.prototype.d = function(x,y){return this[ts(x||0)+"Hours"](y||0)};
Date.prototype.e = function(x,y){return this[ts(x||0)+"Day"](y||0)};
Date.prototype.f = function(x,y){return this[ts(x||0)+"Date"](y||0)};
Date.prototype.g = function(x,y){return this[ts(x||0)+"Month"](y||0)};
Date.prototype.h = function(x,y){return this[ts(x||0)+"Year"](y||0)};
Date.prototype.i = function(x,y){return this[ts(x||0)+"FullYear"](y||0)};
Date.prototype.j = function(x,y){return this[ts(x||0)+"Time"](y||0)};
Date.prototype.k = function(x,y){return this[ts(x||0)+"TimezoneOffset"](y||0)};

// Ds accepts one argument that controls how the string is formatted. Some formats may not work on some browsers.
Date.prototype.s = function(x){return this["to"+["","Date","Time","ISO","GMT","UTC","Locale","LocaleDate","LocaleTime"][x||0]+"String"]()}

Date.prototype.l = function(){noFunc('Dl')};
Date.prototype.m = function(){noFunc('Dm')};
Date.prototype.n = function(){noFunc('Dn')};
Date.prototype.o = function(){noFunc('Do')};
Date.prototype.p = function(){noFunc('Dp')};
Date.prototype.q = function(){noFunc('Dq')};
Date.prototype.r = function(){noFunc('Dr')};
Date.prototype.t = function(){noFunc('Dt')};
Date.prototype.u = function(){noFunc('Du')};
Date.prototype.v = function(){noFunc('Dv')};
Date.prototype.w = function(){noFunc('Dw')};
Date.prototype.x = function(){noFunc('Dx')};
Date.prototype.y = function(){noFunc('Dy')};
Date.prototype.z = function(){noFunc('Dz')};

// Shorter Math properties
Math.t = Math.atan2;
Math.g = function (n) { var f=Math.sqrt(5), g=.5*(1+f); return (1/f)*(Math.pow(g,n)-Math.pow(-g,-n)) };
Math.r = Math.random;
Math.P = Math.PI;
Math.h = Math.hypot || function hypot () {return Math.sqrt(arguments.reduce(function(a,b){return a+b*b}))};

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
    O = shoco,
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
                if (char == "{") {
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
    var level = 0,      // Current number of parentheses or curly braces that we're inside
        temp = "",
      
        i = 0,
        j = 0,

        strings = [],   // Stores the {...} inside strings
        outp = "";      // Temporary output
        
    var pairs = { 
        // Unicode shortcuts
        // Using \u<hex> to avoid encoding incompatibilities
        "@":      "XYZ{",
        "_":      "Z{Z",
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
//      "\u00AD": "",     //     173 is an unprintable
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
        "\u00D0": "$new Date$(" // Ð - 208
    }

    // Some helpful functions
    function isChar (str, char) { return RegExp('^['+char+']$').test(str); }

    for (i = 0; i < code.length; i++) {
        var char = code[i];
        if (isChar(char, "`\"A-Z0-9\\(\\[{") && isChar(outp.slice(-1), "`\"A-Z0-9\\)\\]}")
            && !(isChar(char,"0-9") && isChar(outp.slice(-1),"0-9"))) {
            outp += ",";
        }
        else if (isChar(outp.slice(-1),"+\\-&|\\^") && isChar(char," \\)\\]};"))
            code = code.slice(0,i)+'1'+code.slice(i);
        else if (isChar(outp.slice(-1),"/*") && isChar(char," \\)\\]};"))
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
            outp += "\"" + str.replace(/([^\\])\{(\d)}/,function(_,x,y){return x+"\"+("+strings[y]+")+\""}) + "\""; // Add this character to the output

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
        else if (pairs.hasOwnProperty(char)) {
            code = code.slice(0,i+1) + pairs[char] + code.slice(i+1);
        }
        else if (isChar(char, "+\\-/*\\^&|") && outp.slice(-1) === "(") {
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
