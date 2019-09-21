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
    	if(window.location.href.indexOf(getUrlVars()) > -1){
    	    	urlparameter = getUrlVars()["username"];
	       }

	    if (urlparameter != "none") {
	    	// check if user already exists 
	    	var usersRef = firebase.database().ref('users');
	    	if (!usersRef.child(urlparameter)) {
	    		console.log("added a new user" +urlparameter);
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
	    		usersRef.child(urlparameter).transaction(function(user) {
	    			user.count++;
	    			counter=user.count;
	    			// find user community 
	    			communityName=user.communityName;

	    		});
	    		// add counter +1 to user community
	    		var communitiesRef = firebase.database().ref('Communities');
	    		
	    			communitiesRef.child(communityName).transaction(function(community) {
		    			community.count++;

	    		});
	    	}
	    }

	    		








