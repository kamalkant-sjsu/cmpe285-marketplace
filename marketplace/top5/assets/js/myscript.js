var DOMAIN_URL = "http://localhost/sjsu/personal-website";
// var DOMAIN_URL = "https://kama1kant.com";
var productArr = [];
var allProductArr = [];
var productId = 0
var companyUrl = ["https://kama1kant.com/company", "https://mivishal.com", "http://deepakvk.com/webfire/dist/company.php", "http://www.radhikacmpe272.ninja/"];
var urlArr = ["https://kama1kant.com/company/marketplace/top5/assets/php/most_visited.php", "https://mivishal.com/api-most-visited.php", "http://deepakvk.com/webfire/dist/displayVisits.php", "http://www.radhikacmpe272.ninja/displayVisit.php"];

$(document).ready(function () {
    $(".company").empty();
    buildProductArr(0);
});


function buildProductArr(productId){
    if (productId < urlArr.length){
        callProductsAPI(urlArr[productId]);
    }
}


function callProductsAPI(url) {
    var params = { 'url': url };
    $.ajax({
        url: DOMAIN_URL + "/company/marketplace/top5/assets/php/curl_api.php",
        type: 'POST',
        data: params,
        dataType: 'text',
        success: function (data) {
            console.log(data);
            data = JSON.parse(data);
            productArr.push(data);

            productId += 1;
            if (productId < urlArr.length) {
                buildProductArr(productId);
            } else{
                showproducts();
                showTop5();
            }
            
        },
        error: function (request, error) {
            console.log(error);
        }
    });
}

function showproducts(){
    var query = "";
    if (localStorage.hasOwnProperty('uid') && localStorage.hasOwnProperty('name')) {
        query = "?userid="+localStorage.getItem("uid") + "&username=" + localStorage.getItem("name");
    }
    for (var i = 0; i < productArr.length;i++){
        var html = '<ul>';
        console.log(productArr[i]);
        for (var j = 0; j < productArr[i].length; j++) {
            var a = '<a href="' + productArr[i][j]["service_link"] + query + '">' + productArr[i][j]["service_name"] + '</a>';
            html += '<li>' + a + '</li>';
        }
        html += '</ul>';

        var id = "#company_" + (i + 1);
        $(id).append('<h2> <a href="' + companyUrl[i] + query + '"> Company ' + (i + 1) + '</a></h2>');
        $(id).append("<p>Five most visited products</p>");
        $(id).append(html);
    }
}

function getTop5Overall(){
    for (var i = 0; i < productArr.length; i++) {
        for (var j = 0; j < productArr[i].length; j++) {
            allProductArr.push(productArr[i][j]);
        }
    }
    sortProducts();
}


function sortProducts(){
    allProductArr.sort(function (a, b) {
        return parseInt(b["view_count"]) - parseInt(a["view_count"]);
    });
}

function showTop5() {
    getTop5Overall();
    var top5Arr = allProductArr.slice(0,6);
    var query = "";
    if(localStorage.hasOwnProperty('uid') && localStorage.hasOwnProperty('name')) {
        query = "?userid=" + localStorage.getItem("uid") + "&username=" + localStorage.getItem("name");
    }
    var id = "#top_5";
    $(id).append("<h2>Five most visited products across Marketplace</h2>");
    var html = '<ul>';
    for(var i = 0; i < top5Arr.length; i++) {
        
        console.log(top5Arr[i]);
        var a = '<a href="' + top5Arr[i]["service_link"] + query + '">' + top5Arr[i]["service_name"] + '</a>';
        html += '<li>' + a + '</li>';
    }
    html += '</ul>';
    $(id).append(html);
}