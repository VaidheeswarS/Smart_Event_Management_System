$(document).ready(function(){


var User = sessionStorage.getItem("user")


let user_data = JSON.parse(localStorage.getItem(User))

// let para = $("p");
// para.eq(0).html(user_data.Password + " " + user_data.User_Type);

let data = $("td");
data.eq(0).html(User);
data.eq(1).html(user_data.Password);
data.eq(2).html(user_data.User_Type);
data.eq(3).html(user_data.Status);  

});