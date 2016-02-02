

function scale () {
	var h=$(window).height();
	var w=$(window).width();
	if (w>h) {
		var fak = h/480;
		$("#quiz").css("zoom",""+fak)
	}
	else {
		var fak = w/360;
		$("#quiz").css("zoom",""+fak)
	}
}


$( window ).resize(scale);
scale();