$(document).ready(function(){

    for(let i=0; i<localStorage.length; i=i+1){
        
        if(localStorage.key(i).endsWith(".com")){
            var user = localStorage.key(i)
            let user_data = JSON.parse(localStorage.getItem(user));
            if(user_data.User_Type==="User"){
                let table = $("table")
                var row = $("<tr>")
                let data_1 = $("<td>")
                let data_2 = $("<td>")

                data_1.html(user);
                data_2.html(user_data.User_Type);

                row.append(data_1, data_2);
                table.eq(0).append(row);



            };
        };
    };


});