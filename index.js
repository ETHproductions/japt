for (let textarea of $("textarea")) {
  textarea.oninput = textarea.adjustHeight = function() {
    textarea.style.height = Math.min(textarea.scrollHeight - 4, 120) + "px";
  };
}

function setText(element, text) {
	// element.text(text); // fails if box already contains something
	element.get(0).value = text; // forcefully override current value
	element.get(0).adjustHeight();
}

let alts = {
	"A": "Ȧ", "Ȧ": "Ạ", "Ạ": "A",
	"B": "Ḃ", "Ḃ": "Ḅ", "Ḅ": "B",
	"C": "Ċ", "Ċ":           "C",
	"D": "Ḋ", "Ḋ": "Ḍ", "Ḍ": "D",
	"E": "Ė", "Ė": "Ẹ", "Ẹ": "E",
	"F": "Ḟ", "Ḟ":           "F",
	"G": "Ġ", "Ġ":           "G",
	"H": "Ḣ", "Ḣ": "Ḥ", "Ḥ": "H",
	"I": "İ", "İ": "Ị", "Ị": "I",
	"J":                     "J",
	"K":           "Ḳ", "Ḳ": "K",
	"L": "Ŀ", "Ŀ": "Ḷ", "Ḷ": "L",
	"M": "Ṁ", "Ṁ": "Ṃ", "Ṃ": "M",
	"N": "Ṅ", "Ṅ": "Ṇ", "Ṇ": "N",
	"O": "Ȯ", "Ȯ": "Ọ", "Ọ": "O",
	"P": "Ṗ", "Ṗ":           "P",
	"Q":                     "Q",
	"R": "Ṙ", "Ṙ": "Ṛ", "Ṛ": "R",
	"S": "Ṡ", "Ṡ": "Ṣ", "Ṣ": "S",
	"T": "Ṫ", "Ṫ": "Ṭ", "Ṭ": "T",
	"U":           "Ụ", "Ụ": "U",
	"V":           "Ṿ", "Ṿ": "V",
	"W": "Ẇ", "Ẇ": "Ẉ", "Ẉ": "W",
	"X": "Ẋ", "Ẋ":           "X",
	"Y": "Ẏ", "Ẏ": "Ỵ", "Ỵ": "Y",
	"Z": "Ż", "Ż": "Ẓ", "Ẓ": "Z",
	
	"a": "ȧ", "ȧ": "ạ", "ạ": "a",
	"b": "ḃ", "ḃ": "ḅ", "ḅ": "b",
	"c": "ċ", "ċ":           "c",
	"d": "ḋ", "ḋ": "ḍ", "ḍ": "d",
	"e": "ė", "ė": "ẹ", "ẹ": "e",
	"f": "ḟ", "ḟ":           "f",
	"g": "ġ", "ġ":           "g",
	"h": "ḣ", "ḣ": "ḥ", "ḥ": "h",
	"i": "ı", "ı": "ị", "ị": "i",
	"j":                     "j",
	"k":           "ḳ", "ḳ": "k",
	"l": "ŀ", "ŀ": "ḷ", "ḷ": "l",
	"m": "ṁ", "ṁ": "ṃ", "ṃ": "m",
	"n": "ṅ", "ṅ": "ṇ", "ṇ": "n",
	"o": "ȯ", "ȯ": "ọ", "ọ": "o",
	"p": "ṗ", "ṗ":           "p",
	"q":                     "q",
	"r": "ṙ", "ṙ": "ṛ", "ṛ": "r",
	"s": "ṡ", "ṡ": "ṣ", "ṣ": "s",
	"t": "ṫ", "ṫ": "\t", "\t": "ṭ", "ṭ": "t",
	"u":           "ụ", "ụ": "u",
	"v":           "ṿ", "ṿ": "v",
	"w": "ẇ", "ẇ": "ẉ", "ẉ": "w",
	"x": "ẋ", "ẋ":           "x",
	"y": "ẏ", "ẏ": "ỵ", "ỵ": "y",
	"z": "ż", "ż": "ẓ", "ẓ": "z",
	
	"0": "⁰", "⁰": "₀", "₀": "0",
	"1": "¹", "¹": "₁", "₁": "1",
	"2": "²", "²": "₂", "₂": "2",
	"3": "³", "³": "₃", "₃": "3",
	"4": "⁴", "⁴": "₄", "₄": "4",
	"5": "⁵", "⁵": "₅", "₅": "5",
	"6": "⁶", "⁶": "₆", "₆": "6",
	"7": "⁷", "⁷": "₇", "₇": "7",
	"8": "⁸", "⁸": "₈", "₈": "8",
	"9": "⁹", "⁹": "₉", "₉": "9",
	"+": "⁺", "⁺": "₊", "₊": "+",
	"-": "⁻", "⁻": "₋", "₋": "-",
	"(": "⁽", "⁽": "₍", "₍": "(",
	")": "⁾", "⁾": "₎", "₎": ")",
	"/": "⅟", "⅟": "¼", "¼": "½", "½": "¾", "¾": "/",
	"=": "≈", "≈": "≠", "≠": "≡", "≡": "≢", "≢": "=",
	"<": "≤", "≤": "<",
	">": "≥", "≥": ">",
	"&": "∧", "∧": "&",
	"|": "∨", "∨": "|",
	"?": "¿", "¿": "?",
	
	'"': '“', '“': '”', '”': '„', '„': '‟', '‟': '"',
	"'": "‼", "‼": "…", "…": "'",
	"{": "‹", "‹": "{",
	"}": "›", "›": "}",
	"[": "«", "«": "[",
	"]": "»", "»": "]",
	
	"\n": "¶", "¶": "\n",
}

function tab(string, start = 0, end = string.length, shiftKey = false) {
	let section = string.slice(start, end);
	if (shiftKey === true) {
		for (var i = 0; i < 5; i++)
			section = section.replace(/[^\n -~]/g, function(x){ return tab(x); });
	}
	else {
		section = section.replace(/[^]/g, function(x){ return alts[x] || x; })
	}
	return string.slice(0, start) + section + string.slice(end);
}

// Adapted from https://stackoverflow.com/a/6637396
$(document).delegate('#code', 'keydown', function(e) {
	var keyCode = e.keyCode || e.which;
	if (keyCode === 9) {
		e.preventDefault();
		let start = this.selectionStart,
		    end = this.selectionEnd,
		    val = $(this).val();
		
		if (start === end) {
			$(this).val(tab(val, start - 1, start, e.shiftKey));
		}
		else {
			$(this).val(tab(val, start, end, e.shiftKey));
		}
		
		this.selectionStart = start;
		this.selectionEnd = end;
	}
});
