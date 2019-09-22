'use strict';

//grab a form
var counter = 0;
var communityName="";
var localCounter=0;

//grab an input
//config your firebase push
const config = {
    apiKey: "AIzaSyDZVbaOKb2xRhnEctxDbPcl_Em4GvXeBrM",
    authDomain: "tabfundme-d266e.firebaseapp.com",
    databaseURL: "https://tabfundme-d266e.firebaseio.com",
    storageBucket: "tabfundme-d266e.appspot.com"
  };

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


  // Get a reference to the database service
//create a functions to push
  
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        //push itself
        
    	var urlparameter = "none";
    	if(window.location.href.indexOf("c") >-1) {
    		localCounter = getUrlVars()["c"];
    		document.getElementById('newTabCounter').innerHTML = localCounter +' <img src="./heartPink.png" style="width: 25px; height: 25px;margin-left: 15px;"> ';
    	}
    	if(window.location.href.indexOf("username") > -1){
    	    	urlparameter = getUrlVars()["username"];
	       }

	    if (urlparameter != "none") {
	    	// check if user already exists 
	    	var usersRef = firebase.database().ref('users/'+ urlparameter);
	    	console.log("username parameters" + urlparameter);

	    	if (usersRef.child('community').ref() == null) {

	    		console.log("no community yet to userid" + urlparameter);
	    		document.getElementById('newuser').click();
	    	} else {
			 	var counterUserRef = firebase.database().ref('users/' + urlparameter +'/count');
				counterUserRef.transaction(function(currentRank) {
  				// If users/ada/rank has never been set, currentRank will be `null`.
  				return currentRank + 1;
				});

				// get comm name
					var commNameRef = firebase.database().ref('users/' + urlparameter +'/community');
					commNameRef.on('value', function(commName) {
					console.log("commu name: " +  commName.val());
   			     	var commRef = firebase.database().ref('Communities/' + commName.val() +'/count');
					commRef.transaction(function(commCount) {
  					// If users/ada/rank has never been set, currentRank will be `null`.
  						return commCount+1;
					});

				});

				var newtabcountref = firebase.database().ref('users/' + urlparameter +'/count');
				newtabcountref.on('value', function(countNumber) {
					if (localCounter != countNumber.val()) {
						document.getElementById('newTabCounter').innerHTML = countNumber.val() +' <img src="./heartPink.png" style="width: 25px; height: 25px;margin-left: 15px;"> ';
					} 
						
				});

			}
		}
	    		





