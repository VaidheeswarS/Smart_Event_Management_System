$(document).ready(function(){

var user = sessionStorage.getItem("user");
var user_info = JSON.parse(localStorage.getItem(user));
var i, count;
count = 0;
var v = Object.values(user_info)
var k = Object.keys(user_info)
for(i=2; i<Object.keys(user_info).length; i=i+1){

    count = count+1
    var tr = $("<tr>")
    var data0 = $("<td>")
    var data1 = $("<td>")
    var data2 = $("<td>")
    var data3 = $("<td>")
    var data4 = $("<td>")
    data0.html(count)
    data1.html(v[i])

    let event_details = JSON.parse(localStorage.getItem(v[i]))

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
    let key = k[i]
    cancel.click(function(){

        delete user_info[key]
        localStorage.setItem(user,JSON.stringify(user_info))
        alert("Event removed from book list")
        // tr.remove()
        location.reload();


    });

    
}





})