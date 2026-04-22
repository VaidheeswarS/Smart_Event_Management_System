$(document).ready(function(){

    var form = $("form");
    let i;
    let select = $("#select")
    for(i=0; i<localStorage.length; i=i+1){
        
        let key = localStorage.key(i)
                
        if(key.endsWith(".com")){
            continue;
        }
        else{
            var option = $("<option>")
            option.html(key)
            option.attr("value",key)
            select.append(option)
            //    let value = JSON.parse(localStorage.getItem(key))
        }

    }


    form.eq(0).submit(function(e){

        // e.preventDefault()
        let to_update_event = $("#select")
        to_update_event.val();
        
        localStorage.removeItem(to_update_event.val())
        alert("Event removed from list");
        
    })

});
