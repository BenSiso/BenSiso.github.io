setInterval(function (){
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var period = "AM";

	if (hours >= 12){
		period = "PM";
	}

	if ( hours > 12){
		hours = hours - 12;
	}

	if (minutes < 10){
		minutes = "0" + minutes;
	}

	if (seconds < 10){
		seconds = "0" + seconds;
	}

	var clockTime = hours + ":" + minutes ;
	var clock = document.getElementById('clock');

	clock.innerText = clockTime;

}, 1000);

setInterval(function(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '-' + dd + '-' + yyyy;
	var ourDate = document.getElementById('ourdate');

	ourDate.innerText = today;
},1000);
