'use strict';

//grab a form
var counter = 0;
var communityName="";

//grab an input
const inputEmail = form.querySelector('#email');
const inputName = form.querySelector('#name');
const inputCommunityInfo = form.querySelector('#message');
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
    function firebasePush(inputEmail,inputName,inputCommunityInfo) {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        //push itself
        
    	var urlparameter = "none";
    	if(window.location.href.indexOf(parameter) > -1){
    	    	urlparameter = getUrlVars()[username];
	       }

	    if (urlparameter != "none") {
	    	// check if user already exists 
	    	var usersRef = firebase.database().ref('users');
	    	if (!usersRef.child(urlparameter)) {
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




    function toggleStar(postRef, uid) {
 	 postRef.transaction(function(post) {
    	if (post) {
    	  if (post.stars && post.stars[uid]) {
     	   post.starCount--;
     	   post.stars[uid] = null;
    	  } else {
      	  post.starCount++;
      	  if (!post.stars) {
       	   post.stars = {};
      	  }
      	 post.stars[uid] = true;
    	  }
    	}
    	return post;
 	 });
	}



//push on form submit
    if (form) {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            firebasePush(inputEmail,inputName,inputCommunityInfo);

            //shows alert if everything went well.
            return alert('Successfully Sent to us, We will send you email soon.');
        })
    }