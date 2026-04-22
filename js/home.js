$(document).ready(function(){

    let event_box = $("#event-box");

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
                "top":200,
                "left":360,
                "padding": "20px"

            });

            inner_p.css("text-align","justify")

            close.css({"position":"absolute",
                "top":20,
                "right":20
            })

            inner_button.css({
                "margin-left":"210px",
                "margin-top":"125px",
                "padding-top":"8px",
                "padding-bottom":"8px",
                "padding-left":"10px",
                "padding-right":"10px",
                "cursor": "pointer"

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

        var filter_value = filter.val();
        navigate(filter_value);
        
    });

    filter.trigger("change");


let search = $("#search");

// creating an search box dropdown below
let suggestion_box = $("<div>")
suggestion_box.attr("id", "suggestion-box");

let section = $("section")
section.eq(0).append(suggestion_box);


    
search.on("input", function() {

    let value = $(this).val().toLowerCase();
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

            let match =
            key.toLowerCase().includes(value) ||
            event_details.Event_Type.toLowerCase().includes(value) ||
            event_details.About_Event.toLowerCase().includes(value);

            // if(value.startswith(key))
            if (match) {
                found = true;

                let item = $("<div>")
                item.addClass("suggestion-item")
                item.text(key);

                item.click(function () {
                    search.val(key);
                    suggestion_box.hide();
                    navigate(event_details.Event_Type);
                });

                suggestion_box.append(item);
            }
        }
        
    }

    if (!found) {
        no_results=$("<div>")
        no_results.attr("class", "suggestion-item")
        no_results.html("No results")
        suggestion_box.append(no_results);
    }

    suggestion_box.show();
});


 $(document).click(function (e) {
        if (!$(e.target).closest("#search, #suggestion-box").length) {
            suggestion_box.hide();
        }
    });
});
