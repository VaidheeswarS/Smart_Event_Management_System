$(document).ready(function(){

    var form_data = $("#form");

    form_data.submit(function(e){

        e.preventDefault();

        let input = $(".data")
        let email = input.eq(0).val();
        
        let db_data = JSON.parse(localStorage.getItem(email));

        if (db_data===null){
            alert("User id not registered");
        }
        else{
            // alert(db_data.Password)
            if(db_data.Password===String(input.eq(1).val())){

                if(db_data.User_Type==="Admin"){

                    sessionStorage.setItem("user",email);
                    sessionStorage.setItem("auth", "true");
                    window.location.replace("admin.html");
                }
                else if(db_data.User_Type==="User"){
                    
                    if(db_data.Status==="Deactivated"){
                        alert("Your Id has been Deactivated by Admin.")
                    }
                    else{
                        sessionStorage.setItem("user",email);
                        sessionStorage.setItem("auth", "true")
                        window.location.replace("homepage.html");
                    }
                    
                }
            }
            else{
                alert("Password incorrect");
            }
        }


        
    })
    let eye = $("#eye")
    eye.click(function(){
        let data = $(".data");

        if(data.eq(1).attr("type")=="password"){
            data.eq(1).attr("type","text");
            eye.attr("class","fa-solid fa-eye");
        }
        else if(data.eq(1).attr("type")=="text"){
            data.eq(1).attr("type","password");
            eye.attr("class", "fa-solid fa-eye-slash");

        };
        
    });

    let button = $("button")
    button.click(function(){
        alert("Temporaryly service not available");
    })

    let forget = $("#forget")
    forget.click(function(){
        alert("Temporaryly service not available");

    })


});