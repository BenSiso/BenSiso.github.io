'use strict';

//grab a form
var counter = 0;
var communityName="";

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
    	if(window.location.href.indexOf("username") > -1){
    	    	urlparameter = getUrlVars()["username"];
	       }

	    if (urlparameter != "none") {
	    	// check if user already exists 
	    	var usersRef = firebase.database().ref('users');
	    	console.log("username parameters" + urlparameter);

	    	if (usersRef.child(urlparameter) == false) {

	    		console.log("added a new user" + urlparameter);
	    		document.getElementById('newuser').click();

	    	// 	firebase.database().ref('users/' + urlparameter).set({
   			// 		 userid: urlparameter,
    		// 		count : 0
 				 // }, function(error) {
   			// 	 if (error) {
    		// 	     alert("error adding user");
  				//   } else {
  		  //  			alert("Successfully new user");	
  				//   }
				  // });
	    	} else {
			 	var counterUserRef = firebase.database().ref('users/' + urlparameter +'/count');
				counterUserRef.transaction(function(currentRank) {
  				// If users/ada/rank has never been set, currentRank will be `null`.
  				return currentRank + 1;
				});

				// get comm name
				getCommunityName(urlparameter).then(function (result) {
   			     console.log("commu name: " +  result);
   			     	var commRef = firebase.database().ref('Communities/' + result +'/count');
					commRef.transaction(function(commCount) {
  					// If users/ada/rank has never been set, currentRank will be `null`.
  						return commCount+1;
					});
   				 });
			}
		}
	    		



function getCommunityName(urlparameter) {
    return new Promise(function (resolve, reject) {
        try {
            var commNameRef = firebase.database().ref('users/' + urlparameter +'/community');
				resolve(commNameRef.on('value', function(commName) {return commName.val(); }));
        } catch (e) {
            reject(e)
        }
    });
}




