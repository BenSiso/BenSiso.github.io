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
    projectId: "tabfundme-d266e",
    storageBucket: "tabfundme-d266e.appspot.com",
    messagingSenderId: "394403115615",
    
  };


//create a functions to push
    function firebasePush(inputEmail,inputName,inputCommunityInfo) {


        //prevents from braking
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        var rdm = Math.floor(Math.random() * 1000000); 
        //push itself
        var mailsRef = firebase.database().ref('newLeadersRequests/' + rdm).push().set(
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