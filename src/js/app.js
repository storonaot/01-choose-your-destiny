document.addEventListener('DOMContentLoaded', start);

function start (){
    showResultTaskOne()
    showResultTaskTwo()
    showResultTaskThree()
    showResultTaskFour()
    showResultTaskFive()
}


function getAllUsers(elements) {
    var users = [];

    for (var i = 0; i < elements.length; i++){
        if (users.indexOf(elements[i].user_id) === -1){
            users.push(elements[i].user_id)
        }
    }
    return users;
}


function filterOnlyTypical(elements){
    var typical = 0;

    for (var i = 0; i < elements.length; i++){
        if (elements[i].recommended === 0 && elements[i].typical !== 0){
            typical ++;
        }
    }
    return typical;
}

function filterOnlyRecommended(elements){
    var recommended = 0;

    for (var i = 0; i < elements.length; i++){
        if (elements[i].recommended !== 0 && elements[i].typical === 0){
            recommended ++;
        }
    }
    return recommended;
}


function showResultTaskOne(){
    var total_sum = 0;
    var total_orders = ordersList.length;
    var total_recommended = 0;
    var total_typical = 0;
    var total_customers = getAllUsers(ordersList);
    var total_without_recommended = filterOnlyTypical(ordersList);
    var total_without_typical = filterOnlyRecommended(ordersList);

    for (var i = 0; i < ordersList.length; i++){
        total_sum += ordersList[i].total;
        total_recommended += ordersList[i].recommended;
        total_typical += ordersList[i].typical;
    }

    document.getElementById("total-sum").innerText = total_sum + " руб.";
    document.getElementById("total-orders").innerText = total_orders + " шт.";
    document.getElementById("total-recommended").innerText = total_recommended + " руб.";
    document.getElementById("total-typical").innerText = total_typical + " руб.";
    document.getElementById("total-customers").innerText = total_customers.length + " чел.";
    document.getElementById("total-without-recommended").innerText = total_without_recommended + " шт.";
    document.getElementById("total-without-typical").innerText = total_without_typical + " шт.";
}


function filterByDate(from, to){
    var filtered = [];
    var fromI = from.valueOf() / 1000;
    var toI = to.valueOf() / 1000;

    for (var i = 0; i < ordersList.length; i++){
        if (ordersList[i].timestamp >= fromI && ordersList[i].timestamp <= toI){
            filtered.push(ordersList[i]);
        }
    }
    return filtered;
}


function showResultTaskTwo(){
    var srart = new Date (2015, 5, 26, 0, 0, 0);
    var end = new Date (2015, 5, 28, 23, 59, 59);
    var list = filterByDate (srart, end);
    var period_sum = 0;
    var period_customers = getAllUsers(list);
    var period_recommended = null;

    for (var i = 0; i < list.length; i++){
        period_sum += list[i].total;
        period_recommended += list[i].recommended;
    }

    document.getElementById("period-sum").innerHTML = period_sum + " руб.";
    document.getElementById("period-total").innerHTML = list.length + " шт.";
    document.getElementById("period-customers").innerHTML = period_customers.length + " чел.";
    document.getElementById("period-recommended").innerHTML = period_recommended + " руб.";
}


function showResultTaskThree(){
    var list = ordersList.sort(function(a,b) {
        if (a.total > b.total) {
            return -1;
        }
        if (a.total < b.total) {
            return 1;
        }
    }).slice(0,5);


    var myHTML = "";
    var template = "<tr><td>#date#</td><td>#number_order#</td><td>#user#</td><td>#total#</td><td>#typical#</td><td>#recommended#</td></tr>";
    var temporaryString = "";
    var date = null;


    for (var i = 0; i < list.length; i++){

        date = new Date(list[i].timestamp * 1000);
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);

        temporaryString = template;
        temporaryString = temporaryString.replace("#date#", day + '.' + month + '.' + date.getFullYear());
        temporaryString = temporaryString.replace("#number_order#", list[i].id);
        temporaryString = temporaryString.replace("#user#", list[i].user_id);
        temporaryString = temporaryString.replace("#total#", list[i].total + " руб.");
        temporaryString = temporaryString.replace("#typical#", list[i].typical + " руб.");
        temporaryString = temporaryString.replace("#recommended#", list[i].recommended + " руб.");

        myHTML += temporaryString;
    }

    var myTableElement = document.getElementById('top-orders');
	var myTableBody = myTableElement.getElementsByTagName('tbody')[0];
	myTableBody.innerHTML = myHTML;
}


function filteredByUsers(user, arr){
    var filtered = [];

    for (var i = 0; i < arr.length; i++){
        if(arr[i].user_id == user){
            filtered.push(arr[i]);
        }
    }
    return filtered;
}

function showResultTaskFour(){

    var ordersCount = {};
    for (var i = 0; i < ordersList.length; i++){
        if (typeof(ordersCount[ordersList[i].user_id]) === "undefined"){
            ordersCount["" + ordersList[i].user_id] = 1;
        } else {
            ordersCount["" + ordersList[i].user_id]++;
        }
    }

    var regularUsers = [];
    for (var key in ordersCount){
        if(ordersCount[key] > 10){
            regularUsers.push(key);
        }
    }

    var myHTML = "";
    var template = "<tr><td>#customer#</td><td>#orders#</td></tr>";
    var temporaryString = "";

    var customer = null;
    var orders = null;

    for (var i = 0; i < regularUsers.length; i++){
        customer = regularUsers[i];
        orders = filteredByUsers(customer, ordersList);

        temporaryString = template;
        temporaryString = temporaryString.replace("#customer#", customer);
        temporaryString = temporaryString.replace("#orders#", orders.length + " шт.");

        myHTML += temporaryString;
    }

    var myTableElement = document.getElementById ("count-orders");
    var myTableBody = myTableElement.getElementsByTagName ("tbody")[0];
    myTableBody.innerHTML = myHTML;
}


function showResultTaskFive(){

    document.getElementById("serch-button").addEventListener("click", function(){
        var value = document.getElementById("serch-field").value;
        if (value === ""){
            alert ("Введите в поле ID покупателя");
        } else {
            if (isNaN(value) === true){
                 alert ("Введенное значение должно быть числом");
            } else {
                var orders = filteredByUsers(value, ordersList);
                var date = null;

                var myHTML = "";
                var template = "<tr><td>#date#</td><td>#order#</td><td>#sum#</td><td>#typical#</td><td>#recommended#</td></tr>"
                var temporaryString = "";

                for(var i = 0; i < orders.length; i++){
                    date = new Date (orders[i].timestamp *1000);
                    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);

                    temporaryString = template;

                    temporaryString = temporaryString.replace("#date#", day + "." + month + "." + date.getFullYear() + " г.");
                    temporaryString = temporaryString.replace("#order#", orders[i].id);
                    temporaryString = temporaryString.replace("#sum#", orders[i].total + " руб.");
                    temporaryString = temporaryString.replace("#typical#", orders[i].typical + " руб.");
                    temporaryString = temporaryString.replace("#recommended#", orders[i].recommended + " руб.");

                    myHTML += temporaryString
                }

                var myTableElement = document.getElementById("serch-by-users");
                var myTableBody = myTableElement.getElementsByTagName("tbody")[0];

                myTableBody.innerHTML = myHTML;
            }
        }
    })
}
