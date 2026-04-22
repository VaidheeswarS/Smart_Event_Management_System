$(document).ready(function(){

    var data = sessionStorage.getItem("current_value")

    // let para = $("#p")
    // para.html(data);

    var value = JSON.parse(localStorage.getItem(data));
    value.Event_type


    var input = $("input")
    input.eq(0).attr("value",data);
    input.eq(1).attr("value",value.About_Event);
    input.eq(2).attr("value",value.Date_Time);
    input.eq(3).attr("value",value.Location);
    // input.eq(4).attr("value",value.Image)

    let td = $("td")

    let para = $("<p>")
    let old = value.Image
    para.html("old image: "+ old)
    para.css("overflow","hidden")
    td.eq(5).append(para)


    let select = $("#select")
    select.val(value.Event_Type) 


    let form = $("#form")
    form.submit(function(e){

        e.preventDefault();

        

        if (data===input.eq(0).val().trim()){
            value.Event_Type = select.val();    
            value.About_Event = input.eq(1).val();
            value.Date_Time = input.eq(2).val();
            value.Location = input.eq(3).val();
            let a = input.eq(4)
            let b = a[0].files[0]

            if(input.eq(1).val().length<500){

                reader = new FileReader()

                if(b==null){
                    value.Image = old;
                    localStorage.setItem(data, JSON.stringify(value));

                }
                else{
                    reader.onload = function(e){
                        value.Image = e.target.result;
                        localStorage.setItem(data, JSON.stringify(value));
                    }
                    reader.readAsDataURL(b);

                }
                alert("Event Updated.");
                window.history.back()

            }
            else{
                alert("About Event has reached its max limit, please type below 500 letters")

            }
            
            
        }
        else{
            localStorage.removeItem(data);
            let a = input.eq(4)
            let b = a[0].files[0]
            // value.Image = b.name;

            if(input.eq(1).val().length<500){
                
                if(b==null){
                
                    let reader = new FileReader();
                    reader.onload = function(e){

                        let new_data = {
                            "Event_Type":select.val(),
                            "About_Event":input.eq(1).val(),
                            "Date_Time":input.eq(2).val(),
                            "Location":input.eq(3).val(),
                            "Image":old
                        }
                        localStorage.setItem(input.eq(0).val().trim(),JSON.stringify(new_data));

                    } 
                    reader.readAsDataURL(b);
                }
                else{
                    let reader = new FileReader();
                    reader.onload = function(e){

                        let new_data = {
                            "Event_Type":select.val(),
                            "About_Event":input.eq(1).val(),
                            "Date_Time":input.eq(2).val(),
                            "Location":input.eq(3).val(),
                            "Image":e.target.result
                        }
                        localStorage.setItem(input.eq(0).val().trim(),JSON.stringify(new_data));
                    } 
                    reader.readAsDataURL(b);
                }
                window.history.back()

            }
            else{
                alert("About Event has reached its max limit, please type below 500 letters")
            }            

        }
    })

});