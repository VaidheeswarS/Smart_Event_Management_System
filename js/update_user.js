$(document).ready(function(){

var User = sessionStorage.getItem("user")

var user_data = JSON.parse(localStorage.getItem(User))
var inputs = $("input")
inputs.eq(0).attr("value", User)
inputs.eq(1).attr("value", user_data.Password)
inputs.eq(2).attr("value",user_data.User_Type)



let form = $("#form")

form.submit(function(e){

    e.preventDefault()

    user_data.Password = inputs.eq(1).val();
    user_data.User_Type = inputs.eq(2).val();
    // let new_data = {
    //     "Password":inputs.eq(1).val(),
    //     "User_Type":inputs.eq(2).val()

    // }

    localStorage.setItem(User, JSON.stringify(user_data))
    alert("Updated successful");

});


});