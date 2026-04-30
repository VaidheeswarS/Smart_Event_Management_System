 $(document).ready(function(){

    let auth = sessionStorage.getItem("auth");
    if(auth==="" || auth===null || auth===false){
        window.location.replace("index.html");
        return;
    }

    let box = $("#div-2")
    // box.css("bg")


    let addevents = $("#addevents")
    addevents.click(function(){
        box.load("addevents.html", function(){
            add_events();

        });
    });
    let us_view = function(){
        
        box.children().remove();
        let User = sessionStorage.getItem("user")
        let user_data = JSON.parse(localStorage.getItem(User))

        let table = $("<table>")
        let tr1 = $("<tr>")

        let th1 = $("<th>");
        let th2 = $("<th>");
        let th3 = $("<th>");
        let th4 = $("<th>");

        th1.html("User Id")
        th2.html("User Password")
        th3.html("User user_type")
        th4.html("Edit")
        
        tr1.append(th1, th2, th3, th4)
        
        let tr2 = $("<tr>")

        let data1 = $("<td>");
        let data2 = $("<td>");
        let data3 = $("<td>");
        let data4 = $("<td>");

        let inp = $("<input>")
        inp.attr("type","password")
        inp.attr("value",user_data.Password)
        inp.attr("readonly",true)

        data1.html(User);
        // data2.html(user_data.Password);
        data2.append(inp)
        data3.html(user_data.User_Type);
        let tag = $("<button>")
        tag.html("Update")
        data4.html(tag); 

        tr2.append(data1, data2, data3, data4)
        table.append(tr1, tr2)
        box.append(table)

        tag.click(function(e){
           
                let main = $("#main-container")
                main.addClass("blur_bg")
                e.preventDefault()
                let body = $("body")
                let pass_popup = $("<div>")
                let old_p = $("<input>")
                let new_p = $("<input>")
                let confirm_p = $("<input>")
                old_p.attr("placeholder","Enter the old password")
                new_p.attr("placeholder","Enter a New Password")
                confirm_p.attr("placeholder","Confirm New Password")
                let change = $("<button>")
                let cancel = $("<button>")

                change.html("Change Password")
                cancel.html("Cancel")

                pass_popup.append(old_p, new_p, confirm_p, change, cancel)
                body.eq(0).append(pass_popup)

                old_p.css({"padding":"10px",
                    "outline":"none",
                    "border":"1px solid #ccc",
                    "border-radius": "7px",
                    "width":"80%",
                    "background-color":"#e5fafa",
                    
                });
                new_p.css({"padding":"10px",
                    "outline":"none",
                    "border":"1px solid #ccc",
                    "border-radius": "7px",
                    "width":"80%",
                    "background-color":"#e5fafa",
                    
                });
                confirm_p.css({"padding":"10px",
                    "outline":"none",
                    "border":"1px solid #ccc",
                    "border-radius": "7px",
                    "width":"80%",
                    "background-color":"#e5fafa",
                    
                })
                pass_popup.css({"height":"350px",
                    "width":"30%",
                    "position":"absolute",
                    "top":200,
                    "left":450,
                    "background-color":"white",
                    "border-radius":"7px",
                    "display":"flex",
                    "flex-direction":"column",
                    "justify-content":"space-evenly",
                    "align-items": "center",
                    "box-shadow":"1px 1px 5px 0px black",
                    "transition":"0.3s",

                })
                change.click(function(){
                    if(user_data.Password===old_p.val()){
                        if(new_p.val()===confirm_p.val()){
                            user_data.Password = confirm_p.val()
                            localStorage.setItem(User, JSON.stringify(user_data))
                            alert("User Password Updated");
                            pass_popup.remove();
                            main.removeClass("blur_bg")
                            us_view();
                            
                        }
                        else{
                            alert("Both New and Confirm Password are not matching")
                        }
                    }
                    else{
                        alert("Your old password is incorrect");
                    }
                
                        
                });

                cancel.click(function(){
                    pass_popup.remove();
                    main.removeClass("blur_bg")

                });

                change.css({"padding":"5px",
                    "background-color":"rgb(28,154,173)",
                    "color":"white",
                    "width":"50%",
                    "border-radius":"7px",
                    "border":"none",
                    "cursor":"pointer",
                })

                cancel.css({"padding":"5px",
                    "background-color":"rgb(248, 85, 85)",
                    "color":"white",
                    "width":"50%",
                    "border-radius":"7px",
                    "border":"none",
                    "cursor":"pointer",
                })
                        
        });

    }
    let profile = $("#profile")
    profile.click(function(){
        us_view();
    });

    let loadusers = function(){

        box.children().remove()
        let table = $("<table>")
        let row = $("<tr>")
        let h_1 = $("<th>")
        let h_2 = $("<th>")
        let h_3 = $("<th>")
        let h_4 = $("<th>")


        h_1.html("User Id")
        h_2.html("User user_type")
        h_3.html("Status")
        h_4.html("Delete")
        row.append(h_1, h_2, h_3,h_4);
        table.append(row);  
        box.append(table)

        for(let i=0; i<localStorage.length; i=i+1){
        
            if(localStorage.key(i).endsWith(".com")){
                let user = localStorage.key(i)
                let user_data = JSON.parse(localStorage.getItem(user));
                if(user_data.User_Type==="User"){
                    
                    let row = $("<tr>")
                    let data_1 = $("<td>")
                    let data_2 = $("<td>")
                
                    let data_3 = $("<td>")
                    let data_4 = $("<td>")



                    data_1.html(user);
                    data_2.html(user_data.User_Type);
                    let sts = $("<button>")
                    

                    let cur_user = JSON.parse(localStorage.getItem(user))
                    if(cur_user.Status==="Deactivated"){
                        sts.html("Activate")
                        sts.css({"background-color":"green",
                            "color":"white",
                            "cursor":"pointer",
                        });
                    }
                    else if(cur_user.Status==="Activated"){
                        sts.html("Deactivate")
                        sts.css({"background-color":"red",
                            "color":"white",
                            "cursor":"pointer",
                        });
                    }
                    data_3.html(sts)


                    // box.append(table)
                    let del = $("<button>")
                    del.html("Delete")
                    del.css({"background-color":"red",
                        "color":"white",
                        "cursor":"pointer",

                    })
                    data_4.append(del)
                    row.append(data_1, data_2, data_3, data_4);
                    table.append(row);
                    let present = JSON.parse(localStorage.getItem(user))

                    sts.click(function(){
                        // cur_user.Status = "Deactivated";

                        if(present.Status==="Deactivated"){
                            present.Status = "Activated";
                            sts.html("Deactivate")
                            sts.css({"background-color":"red",
                            "color":"white",
                            "cursor":"pointer",
                            });
                            localStorage.setItem(user, JSON.stringify(present));
                            alert("The User Activated by Admin");
                            
                        }
                        else if(present.Status==="Activated"){
                            present.Status = "Deactivated";
                            sts.html("Activate")
                            sts.css({"background-color":"green",
                            "color":"white",
                            "cursor":"pointer",
                            });
                            localStorage.setItem(user, JSON.stringify(present));
                            alert("The User Deactivated by Admin")
                        }
                        
                        // window.location.reload();
                        // loadusers();

                        
                    });
                    var body = $("body")
                    del.click(function(){

                        $("#user_popup").remove();
                        let main_container = $("#main-container")
                        main_container.addClass("blur_bg");
                        let user_popup = $("<div>")
                        user_popup.attr("id", "user_popup")
                        let heading = $("<h3>")
                        let yes = $("<button>")
                        let no = $("<button>")
                        heading.html("Are you sure want to Delete the User")
                        yes.html("Yes")
                        no.html("No")
                        let div_1= $("<div>")
                        let div_2= $("<div>")
                        div_1.append(heading)
                        div_2.append(yes, no)
                        user_popup.append(div_1,div_2)
                        user_popup.css({
                            "position":"absolute",
                            "top":220,
                            "right":400,
                            "height":"200px",
                            "width":"30%",
                            "background-color":"white",
                            "color":"rgb(28,154,173)",
                            "z-index":"1000",
                            "display":"flex",
                            "flex-direction":"column",
                            "Justify-content":"space-evenly",
                            "align-items":"center",
                            "border-radius":"7px",
                        

                        })
                        div_2.css({
                            "display":"flex",
                            "flex-direction":"row",
                            "justify-content":"space-evenly",
                            "width":"100%",
                        })
                        body.eq(0).append(user_popup)

                        yes.css({
                            "width":"20%",
                            "padding":"10px",
                            "background-color":"rgb(248, 85, 85)",
                            "color":"white",
                            "border-radius":"7px",
                            "border":"none",
                            "cursor":"pointer",
                        });
                        no.css({
                            "width":"20%",
                            "padding":"10px",
                            "background-color":"rgb(28,154,173)",
                            "color":"white",
                            "border-radius":"7px",
                            "border":"none",
                            "cursor":"pointer",
                        })
                        yes.click(function(){
                            localStorage.removeItem(user)
                            alert("User is Deleted by Admin")
                            main_container.removeClass("blur_bg")
                            user_popup.remove();
                            loadusers();
                            
                        });

                        no.click(function(){
                            main_container.removeClass("blur_bg")
                            user_popup.remove();
                        });
                        // localStorage.removeItem(user)
                        // alert("User is Deleted by Admin")
                        // loadusers();

                    });

                };
            };
        };

    }
    // user list functionality
    let ulist = $("#us_list")
    ulist.click(function(){

        loadusers();
    });

    // this is logout event
    let out = $("#logout")
    out.click(function(){

        sessionStorage.clear();
        if (sessionStorage.getItem("auth")==null){
            window.location.replace("index.html")
            // window.history.forward()
        }
        
    });

    // add event functionality
    let add_events = function() {
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
                    localStorage.setItem(event_name.val(),JSON.stringify(value));
                    alert("Event added in a list");
                    // form.empty();
                    add_events();
                    // window.history.back();

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
            
        });
    }

    let viewevents = $("#viewevents")
    viewevents.click(function(){
        view()
    });
    
    let view  = function(){

        box.load("viewevents.html", function(){
            let box = $("#div-2")
            let table = $("table")

            var i, ecount;
            ecount=0;
            for(i=0; i<localStorage.length; i=i+1){
                
                let key = localStorage.key(i)
                let value = JSON.parse(localStorage.getItem(key))

                if(key.endsWith(".com")){
                    continue;

                }
                else{
                    ecount = ecount+1;
                    let tr = $("<tr>")
                    let td1 = $("<td>")
                    let td2 = $("<td>")
                    let td3 = $("<td>")
                    let td4 = $("<td>")
                    let td5 = $("<td>")
                    let td6 = $("<td>")
                    let td7 = $("<td>")

                    let up_btn = $("<button>")
                    let d_btn = $("<button>")

                    up_btn.html("Update Event")
                    d_btn.html("Delete Event")

                    td1.html(key);
                    td2.html(value.Event_Type);
                    td3.html(value.About_Event);
                    td4.html(value.Date_Time);
                    td5.html(value.Location)
                    td6.append(up_btn)
                    td7.append(d_btn)
                    tr.append(td1, td2, td3, td4, td5, td6, td7);
                    table.eq(0).append(tr);
                    // let name = $("#name");
                    // let type = $("#etype");
                    // let about = $("#about")
                    // let datetime = $("#datetime");
                    // let location = $("#location");
                    // name.html(key);
                    // type.html(value.Event_Type)
                    // about.html(value.About_Event)
                    // datetime.html(value.Date_Time)
                    // location.html(value.Location)

                    up_btn.click(function(){
                        
                        box.load("update_live.html", function(){
                            // alert(key);
                            var value = JSON.parse(localStorage.getItem(key));
                            value.Event_type
                            // alert(key)
                            var input = $("input")
                            input.eq(0).attr("value",key);
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

                            let form = $("#update_live_form")
                            form.submit(function(e){

                                e.preventDefault();

                                if (key===input.eq(0).val().trim()){
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
                                            localStorage.setItem(key, JSON.stringify(value));

                                        }
                                        else{
                                            reader.onload = function(e){
                                                value.Image = e.target.result;
                                                localStorage.setItem(key, JSON.stringify(value));
                                            }
                                            reader.readAsDataURL(b);

                                        }
                                        alert("Event Updated.");
                                        // window.history.back()
                                        view()
                                    }
                                    else{
                                        alert("About Event has reached its max limit, please type below 500 letters")

                                    }
                                    
                                    
                                }
                                else{
                                    localStorage.removeItem(key);
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
                                        view()

                                    }
                                    else{
                                        alert("About Event has reached its max limit, please type below 500 letters")
                                    }            

                                }
                            });

                        })
                    });
                
                let body = $("body")

                d_btn.click(function(){

                    $("#event_popup").remove();
                    let main_container = $("#main-container")
                    main_container.addClass("blur_bg");
                    let event_popup = $("<div>")
                    event_popup.attr("id", "event_popup")
                    let heading = $("<h3>")
                    let yes = $("<button>")
                    let no = $("<button>")
                    heading.html("Are you sure want to Delete the Event")
                    yes.html("Yes")
                    no.html("No")
                    let div_1= $("<div>")
                    let div_2= $("<div>")
                    div_1.append(heading)
                    div_2.append(yes, no)
                    event_popup.append(div_1,div_2)
                    event_popup.css({
                        "position":"absolute",
                        "top":220,
                        "right":400,
                        "height":"200px",
                        "width":"30%",
                        "background-color":"white",
                        "color":"rgb(28,154,173)",
                        "z-index":"1000",
                        "display":"flex",
                        "flex-direction":"column",
                        "Justify-content":"space-evenly",
                        "align-items":"center",
                        "border-radius":"7px",
                       

                    })
                    div_2.css({
                        "display":"flex",
                        "flex-direction":"row",
                        "justify-content":"space-evenly",
                        
                        "width":"100%",
                    })
                    body.eq(0).append(event_popup)

                    yes.css({
                        "width":"20%",
                        "padding":"10px",
                        "background-color":"rgb(248, 85, 85)",
                        "color":"white",
                        "border-radius":"7px",
                        "border":"none",
                        "cursor":"pointer",
                    });
                    no.css({
                        "width":"20%",
                        "padding":"10px",
                        "background-color":"rgb(28,154,173)",
                        "color":"white",
                        "border-radius":"7px",
                        "border":"none",
                        "cursor":"pointer",
                    })
                    yes.click(function(){
                        localStorage.removeItem(key)
                        alert("Event Deleted");
                        main_container.removeClass("blur_bg")
                        event_popup.remove();
                        view();
                        
                    });

                    no.click(function(){
                        main_container.removeClass("blur_bg")
                        event_popup.remove();
                    });
                });

                }

            }
            if (ecount===0){
                let tr = $("<tr>")
                let tdd = $("<td>")
                tdd.attr("colspan",7)
                tdd.html("No Events Yet")
                tdd.css("text-align", "center")
                tr.append(tdd)
                table.eq(0).append(tr)
            }

        })
    }



});