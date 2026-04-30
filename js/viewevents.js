    $(document).ready(function(){

        let box = $("#div-2")
        let table = $("table")

        var i;
        for(i=0; i<localStorage.length; i=i+1){
            
            let key = localStorage.key(i)
            let value = JSON.parse(localStorage.getItem(key))

            if(key.endsWith(".com")){
                continue;

            }
            else{

                let tr = $("<tr>")
                let td1 = $("<td>")
                let td2 = $("<td>")
                let td3 = $("<td>")
                let td4 = $("<td>")
                let td5 = $("<td>")
                td1.html(key);
                td2.html(value.Event_Type);
                td3.html(value.About_Event);
                td4.html(value.Date_Time);
                td5.html(value.Location)

                tr.append(td1, td2, td3, td4, td5);
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

            }

        }


    });