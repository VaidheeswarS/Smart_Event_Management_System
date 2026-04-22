$(document).ready(function(){

let yes_button = $("#yes");

let User = sessionStorage.getItem("user")

yes_button.click(function(){


    localStorage.removeItem(User)
    window.location.href = "login.html";
    alert("user account removed");



})

let no_button = $("#no");

no_button.click(function(){

    window.history.back();

})


});