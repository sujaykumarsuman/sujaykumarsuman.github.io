$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    $('.dropdown-trigger').dropdown();
});

// Initialize Firebase
// var config = {
//     apiKey: "#api-key",
//     authDomain: "projectId.firebaseapp.com",
//     databaseURL: "https://projectId.firebaseio.com",
//     projectId: "#projectId",
//     storageBucket: "projectId.appspot.com",
//     messagingSenderId: "senderId"
// };
// firebase.initializeApp(config);

// let msgRef = firebase.database().ref('messages');

// function getVal(id){
//     return document.getElementById(id).value;
// }

// document.getElementById("submit").addEventListener('click', function (evt) {
//     evt.preventDefault();

//     let name = getVal('name');
//     let email = getVal('email');
//     let msg = getVal('msg');
//     alert("Thank You for reaching out! I'll respond as soon as possible. 😊");
//     saveMsg(name, email, msg);
// });

// // Save Message
// function saveMsg(name, email, msg) {
//     let newMsgRef = msgRef.push();

//     newMsgRef.set({
//         name: name,
//         email: email,
//         message: msg
//     });
// }


// Random Words
var things = ['coding','knitting','blogging','blogging','blogging','blogging','blogging','designing','planning','writing','writing','writing','writing','writing','writing','writing','programming','programming','programming','programming','programming','concluding','programming','thinking','scripting','scripting','scripting','scripting','scripting','sewing','sketching','ruminating','deliberating','pondering','contemplating','abstracting','abstracting','abstracting','abstracting','abstracting','abstracting','optimising','optimising','optimising','optimising','optimising','optimising','refactoring','refactoring','refactoring','objectifying','simplifying','decoupling','debugging','debugging','debugging','debugging','debugging','debugging','configuring','streamlining','searching','tweaking','editing'];
var junk = ['#','@','%','*','&amp;','&lt;','&gt;','_','=','+','[',']','|','-','!','?','X'];
function randomInt(min, max)
{
    return Math.round(min + (Math.random() * (max-min)));
}
function tick()
{
    var txt = things[randomInt(0, things.length-1)];
    var chars = txt.split('');
    var glitch = randomInt(0, 3);
    for (var i = 0; i < glitch; i++)
    {
        chars[randomInt(0, chars.length-1)] = junk[randomInt(0, junk.length-1)];
    }
    txt = chars.join('');
    document.getElementById("ing").innerHTML=txt;
    window.setTimeout(tick, randomInt(16,400));
}
if(document.getElementById('ing') != null) tick();
