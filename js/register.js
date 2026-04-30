$(document).ready(function(){


// let signup = document.getElementById("signup")

let signup=$("#signup");
var form = $("#form");

form.submit(function(e){


    e.preventDefault();
    var inputs = $(".form-input");
   
    let user_type = $(".radio:checked").val();
    // user_type.val();
    // preventDefault()
   
    let data = JSON.parse(localStorage.getItem(inputs.eq(0).val()));


    if(data===null){
        if (inputs.eq(0).val()=="" || inputs.eq(0).val().trim()===""){
            alert("Email is not valid, enter a valid email");
        }
        else{
            if ((inputs.eq(1).val()!=="" && inputs.eq(1).val().trim()!=="") && (inputs.eq(2).val()!=="" && inputs.eq(2).val().trim()!=="")){
        
                if(inputs.eq(1).val()===inputs.eq(2).val()){
        
                    let value = {
                        "Password": inputs.eq(1).val(),
                        "User_Type": user_type,
                        "Status":"Activated",
                    }
                    localStorage.setItem(inputs.eq(0).val(),JSON.stringify(value));

                    alert("User account created");
                    inputs.eq(0).val()=="";
                    inputs.eq(1).val().trim()==""
                    window.location.href = "index.html";
                }
                else{
                    alert("Passwords are not matching.");

                }
            }
            else{
                alert("Please enter a valid Password, Password should not be empty or spaces");

            }
        }
    }
    else{
        alert("User already registered.");

    }
    

});

    let eye = $("#eye")
    eye.click(function(){
        let data = $(".form-input");

        if(data.eq(2).attr("type")=="password"){
            data.eq(2).attr("type","text");
            eye.attr("class","fa-solid fa-eye");
        }
        else if(data.eq(2).attr("type")=="text"){
            data.eq(2).attr("type","password");
            eye.attr("class", "fa-solid fa-eye-slash");

        };
        
    });


    let button = $("button")
    button.click(function(){
        alert("Temporaryly service not available");
    })

});