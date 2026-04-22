$(document).ready(function(){


    var form = $("form");
    form.eq(0).submit(function(e){

        e.preventDefault()

        var event_name = $("#eventname");
        event_name.val();

        var date_time = $("#datetime")
        date_time.val();

        var event_type = $("#eventype")
        event_type.val();

        var location = $("#loc")
        location.val();

        var image = $("#file")[0].files[0]

        var about_event =  $("#aboutevent")
        about_event.val();

        if(event_name.val()=="" || date_time.val()=="" || event_type.val()=="" || location.val()=="" || about_event.val()=="" || !image){
            alert("All details are required");
            return;
        }
        if(about_event.val().length<500){

            let reader = new FileReader();
            reader.onload = function(e){

               let value = {
                    "Event_Type":event_type.val(),
                    "About_Event":about_event.val(),
                    "Date_Time":date_time.val(),
                    "Location":location.val(),
                    "Image":e.target.result
                };
                console.log("Saved:", value);
                alert("hi")
                localStorage.setItem(event_name.val(),JSON.stringify(value));
                alert("Event added in a list");
                window.history.back();

            }
            if(image){
                reader.readAsDataURL(image);
            } 
            else{
                alert("Please select an image");
            }
        }
        else{
            alert("About Event has reached its max limit, please type below 500 letters")
        }       
        
    })

});