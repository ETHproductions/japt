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

