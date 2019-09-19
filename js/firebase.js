'use strict';

//grab a form
const form = document.querySelector('.contactForm');

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



  // Get a reference to the database service
//create a functions to push
    function firebasePush(inputEmail,inputName,inputCommunityInfo) {
         firebase.initializeApp(config);
        
        //push itself
        var mailsRef = firebase.database().ref('newLeadersRequests/').push().set(
            {
                mail: inputEmail.value,
                name: inputName.value,
                message: inputCommunityInfo.value
            }
        );

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