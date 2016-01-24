onmessage = function(e) {
	var data = e.data, value, success = !0;
	alert("data: "+data);
	if(data[0]==="transpile") value = transpile(data[1]);
	else {
		try {value = eval(data[1]);} catch(e) {success = !1; value = e;}
	}
	postMessage([success,value]);
	close();
}
