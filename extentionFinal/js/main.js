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

function chosenCommunity(communityName) {
	  if(window.location.href.indexOf("username") > -1){
    	    	var userid = getUrlVars()["username"];
    	    	var userRef = firebase.database().ref('users/' + userid);
    	    	var userdata = {
    				userid: userid,
   					 count: 1,
   					 community:communityName
 				 };
 				 userRef.update(userdata);
 				var commRefMem = firebase.database().ref('Communities/' + communityName +'/members');
					commRefMem.transaction(function(commMem) {
  					// If users/ada/rank has never been set, currentRank will be `null`.
  						return commMem+1;
				});
				var commRef = firebase.database().ref('Communities/' + communityName +'/count');
					commRef.transaction(function(commCount) {
  					// If users/ada/rank has never been set, currentRank will be `null`.
  					console.log("finish adding comm to user in real db");
 				 	document.getElementById('closeAppendCommunity').click();
  						return commCount+1;
				});
 				 
	   }

}
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
	    	firebase.database().ref().child("users/" + urlparameter + '/community').on("value", function(snapshot) {
			  if (snapshot.exists()) {
     			console.log("exists");
     			usersRef=firebase.database().ref('users/'+ urlparameter);
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

			  }else{
 		  		 console.log("doesn't exist");
 		  		 console.log("no community yet to userid" + urlparameter);
 		  		 var communitiesRef = firebase.database().ref('Communities');
 		  		 communitiesRef.once("value", function(snapshot) {
 				 	 snapshot.forEach(function(child) {
  			    	 	var communitiesList = document.getElementById('communitiesList');
						communitiesList.innerHTML += '<option>'+child.key +'</option>';
 					 });
				  });

	    		 document.getElementById('newuser').click();
 			  }
		});

	    	
		}
	    		





