$(document).ready(function(){

    let auth = sessionStorage.getItem("auth");
    if(auth==="" || auth===null || auth===false){
        var body = $("body");
        body.eq(0).empty();
        window.location.replace("index.html");
        return;
    };

    var event_box = $("#event-box");

    let slider = $("<div>").addClass("slider");
    event_box.append(slider);

    var base = function(event_details, key){

        var div1 = $("<div>")
        div1.addClass("card");
        var h2 = $("<h2>");
        var h4 = $("<h4>");
        var p = $("<p>");

        h2.html(key);
        h4.html(event_details.Event_Type);
        p.html(event_details.About_Event);

        div1.append(h2, h4, p);

        div1.css({
            "background-image": `url(${event_details.Image})`,
            "background-repeat": "no-repeat",
            "background-size":"cover",
            "background-position":"center",
            "height":"400px", 
            "min-width":"300px",
            "padding":"15px",
            "margin-right":"10px",
            "color":"black",
            "z-index":1000
        });

        slider.append(div1); //  append to slider (NOT event_box)
        let name = key
        let type = event_details.Event_Type
        let about = event_details.About_Event
        let image =  event_details.Image
        let location = event_details.Location 
        let datetime = event_details.Date_Time

        div1.click(function(){
            var inner_div = $("<div>")
            var inner_h1 = $("<h1>")
            var inner_h3 = $("<h3>")
            var inner_p = $("<p>")
            var inner_p_loc = $("<p>")
            var dt = $("<p>")
            var inner_button = $("<button>")
            var close = $("<button>")


            inner_h1.html(name)
            inner_h3.html(type)
            inner_p.html(about)
            inner_p_loc.html("Location: "+ location)
            dt.html("Date & Timing: "+ datetime)
            var user = sessionStorage.getItem("user")
            var user_info = JSON.parse(localStorage.getItem(user))
                // take user events anme by 13th line get key of events, check with user info data if 
                
            if (Object.values(user_info).includes(name)){
                inner_button.html("Registered");
            }
            else {
                inner_button.html("Register");  
            }
                
            close.html("X")
            inner_div.append(inner_h1, inner_h3, inner_p, inner_p_loc, dt, inner_button, close)

            inner_div.css({
                "background-image":`url(${image})`,
                "background-repeat":"no-repeat",
                "background-position":"center",
                "background-size":"cover",
                "height":"500px",
                "width":"500px",
                "z-index": 1000,
                "position":"absolute",
                "top":160,
                "left":400,
                "padding": "20px"

            });

            inner_p.css("text-align","justify")

            close.css({"position":"absolute",
                "height":30,
                "width":30,
                "top":20,
                "right":20,
                "border-radius":"100%",
                "cursor":"pointer",
                "background-color":"white",
                "color":"#1c9aad",
                "border":"none",
                "border-radius":"7px",
            })

            inner_button.css({
                "margin-left":"210px",
                "margin-top":"125px",
                "padding-top":"10px",
                "padding-bottom":"10px",
                "padding-left":"10px",
                "padding-right":"10px",
                "cursor": "pointer",
                "background-color":"white",
                "color":"#1c9aad",
                "border":"none",
                "border-radius":"7px",
                

            })

            close.click(function(){
                inner_div.css("display","none");
            });

            inner_button.click(function(){
                    
                if(inner_button.text()==="Registered"){
                    alert("You already booked this Event")
                }    
                else{
                    var user_email = sessionStorage.getItem("user");
                    var user_info = JSON.parse(localStorage.getItem(user_email));
                    count = Object.keys(user_info).length;
                    user_info[`event_${count}`] = name;

                    localStorage.setItem(user_email,JSON.stringify(user_info));
                    alert("Event Registered")

                    inner_button.html("Registered");
                }
                   
            })

            var body = $("body");
            body.eq(0).append(inner_div)
        
        })
    } 
            

    var i, count;
    count = 0;

    var navigate = function(filter_value){

        slider.empty();

        for(var i=0; i<localStorage.length; i=i+1){

                if(localStorage.key(i).endsWith(".com")){
                    continue;
                }
                else{
                    var key = localStorage.key(i)
                    var event_details = JSON.parse(localStorage.getItem(key));
                    
                    if (filter_value===event_details.Event_Type || filter_value==="All"){
                        base(event_details, key)

                    }
                    else{
                        continue;
                    }

                }
        }
        startSlider();
        
        }

// slider logic
   let sliderInterval;

    function startSlider(){

        clearInterval(sliderInterval); 

        let cardWidth = $(".card").outerWidth(true);

        sliderInterval = setInterval(function(){

            slider.css({
                "transition": "transform 0.5s linear",
                "transform": `translateX(-${cardWidth}px)`
            });

            setTimeout(function(){
                slider.append(slider.children().first());
                slider.css({
                    "transition": "none",
                    "transform": "translateX(0)"
                });
            }, 500);

        }, 3000);
    }

    var filter = $("#filter");

    filter.change(function(){
        
        event_box.empty(); 

        slider = $("<div>").addClass("slider"); 
        event_box.append(slider);

        var filter_value = filter.val();
        navigate(filter_value);
        
    });

    filter.trigger("change");
    let search = $("#search");

    let suggestion_box = $("<div>")
    suggestion_box.attr("id", "suggestion-box");

    let section = $("section")
    section.eq(0).append(suggestion_box);


    search.on("input", function() {

        let value = search.val().toLowerCase().trim();
        suggestion_box.empty();

        if (value === "") {
            suggestion_box.hide();
            return;
        }

        let found = false;

        for (let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);

            if (key.endsWith(".com")){
                continue;
            } 
            else{
                let event_details = JSON.parse(localStorage.getItem(key));

                let name = key.toLowerCase();
                let type = event_details.Event_Type.toLowerCase();
                let about = event_details.About_Event.toLowerCase();

                let match = false;

                if (name === value || type === value) {
                    match = true; 
                }
                else if (name.startsWith(value) || type.startsWith(value)) {
                    match = true; 
                }
                else if (name.includes(value) || about.includes(value)) {
                    match = true; 
                }

                if (match) {
                    found = true;

                    let item = $("<div>")
                    item.addClass("suggestion-item")
                    item.text(key);

                    item.click(function () {
                        search.val(key);
                        suggestion_box.hide();

                        slider.empty(); 
                        let event_details = JSON.parse(localStorage.getItem(key));
                        base(event_details, key); 
                    });

                    suggestion_box.append(item);
                }
            }
        }

        if (!found) {
            let no_results = $("<div>")
            no_results.addClass("suggestion-item")
            no_results.html("No results")
            suggestion_box.append(no_results);
        }

        suggestion_box.show();
    });

    $("#search-button").click(function () {

        let value = search.val().toLowerCase().trim();

        if (value === "") return;

        slider.empty(); 

        let found = false;

        for (let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);

            if (key.endsWith(".com")) continue;

            let event_details = JSON.parse(localStorage.getItem(key));

            let name = key.toLowerCase();
            let type = event_details.Event_Type.toLowerCase();
            let about = event_details.About_Event.toLowerCase();

            if (
                name.includes(value) ||
                type.includes(value) ||
                about.includes(value)
            ) {
                found = true;
                base(event_details, key); 
            }
        }

        if (!found) {
            alert("No results found");
        }
    });


    $(document).click(function (e) {
    if (!$(e.target).closest("#search, #suggestion-box, #search-button").length) {
        suggestion_box.hide();
    }
});



let out = $("#logout")
    out.click(function(){

        sessionStorage.clear();
        if (sessionStorage.getItem("auth")==null){
            window.location.replace("index.html")
        }
        
    });

    var user_view = function(){
            event_box.load("view_user.html", function(){
            var User = sessionStorage.getItem("user")

            var user_data = JSON.parse(localStorage.getItem(User))
            let data = $("td");
            data.eq(0).html(User);
            let input = $("<input>")
            input.attr("type","password")
            input.attr("value",user_data.Password)
            input.attr("readonly",true)

            data.eq(1).append(input);
            data.eq(2).html(user_data.User_Type);
            data.eq(3).html(user_data.Status);
            let div = $("<div>")
            let update_user_btn = $("<button>")
            let del_user_btn = $("<button>")
            update_user_btn.html("Update")
            del_user_btn.html("Delete")
            div.append(update_user_btn,del_user_btn)
            data.eq(4).append(div)
            
            input.css("outline","none")
            div.css({        
                "width":"100px",
                "display":"flex",
                "flex-direction":"row",
                "justify-content":"space-between",
            })
            // data.eq(0).css({})

            update_user_btn.click(function(e){
                let main = $("#main")
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
                            user_view();
                            
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
            var body = $("body")
            del_user_btn.click(function(e){
                        e.preventDefault()

                        $("#user_popup").remove();
                        let main = $("#main")
                        main.addClass("blur_bg");
                        
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
                            "box-shadow":"1px 1px 5px 0px black"
                        

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
                            localStorage.removeItem(User)
                            alert("User Account is Deleted")
                            main.removeClass("blur_bg")
                            user_popup.remove();
                            window.location.replace("index.html")
                            
                        });

                        no.click(function(){
                            main.removeClass("blur_bg")
                            user_popup.remove();
                        });
                 
                    
            })
            del_user_btn.css({
                    
                        "padding":"5px",
                        "background-color":"rgb(248, 85, 85)",
                        "color":"white",
                        "border-radius":"7px",
                        "border":"none",
                        "cursor":"pointer",
                    });

            update_user_btn.css({
             
                "padding":"5px",
                "background-color":"rgb(28,154,173)",
                "color":"white",
                "border-radius":"7px",
                "border":"none",
                "cursor":"pointer",
                    })


        });
    }
   
    $("#view").click(function(e){

        // e.preventDefault();
        user_view();
        
        
    });

    
    let book = $("#book")
    book.click(function(){
        
        event_box.load("booked_events.html", function(){
            var f, fcount;
            fcount = 0;
            var user = sessionStorage.getItem("user");
            var user_info = JSON.parse(localStorage.getItem(user));
            
            var v = Object.values(user_info)
            var k = Object.keys(user_info)
            if(Object.entries(user_info).length<=3){
                var tr = $("<tr>")
                var data0 = $("<td>")
                let table = $("table")
                data0.attr("colspan", 5);
                data0.html("No results")
                data0.css("text-align", "center")
                tr.append(data0)
                table.eq(0).append(tr)


            }
            else{
                for(f=3; f<Object.keys(user_info).length; f=f+1){

                    fcount = fcount+1
                    var tr = $("<tr>")
                    var data0 = $("<td>")
                    var data1 = $("<td>")
                    var data2 = $("<td>")
                    var data3 = $("<td>")
                    var data4 = $("<td>")
                    data0.html(fcount)
                    data1.html(v[f])

                    let event_details = JSON.parse(localStorage.getItem(v[f]))

                    data2.html(event_details.Date_Time)
                    data3.html(event_details.Location)

                    let cancel = $("<button>")
                    cancel.html("Cancel Event")

                    data4.append(cancel)

                    tr.append(data0, data1, data2, data3, data4)
                    let body = $("body")
                    let table = $("table")
                    table.eq(0).append(tr)
                    // body.eq(0).append(table)
                    let key = k[f]
                    cancel.click(function(){

                        delete user_info[key]
                        localStorage.setItem(user,JSON.stringify(user_info))
                        alert("Event removed from book list")
                        // tr.remove()
                        // location.reload();


                    });

                
                }
            }
    
        });
    });
});
