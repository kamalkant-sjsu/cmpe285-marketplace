var DOMAIN_URL = "http://localhost/sjsu/personal-website";
// var DOMAIN_URL = "https://kama1kant.com";
var productArr = [];
var allProductArr = [];
var productId = 0
var companyUrl = [["Company_Kamal", "https://kama1kant.com/company"], ["Company_Vishal", "https://mivishal.com"], ["Company_Deepak", "http://deepakvk.com/webfire/dist/company.php"], ["Company_Radhika", "http://www.radhikacmpe272.ninja/"]];

$(document).ready(function () {
    $(".company").empty();
    callProductsAPI();
});


function buildProductArr(productId){
    if (productId < urlArr.length){
        callProductsAPI(urlArr[productId]);
    }
}


function callProductsAPI() {
    var params = { 'url': "https://mivishal.com/api-most-rated.php" };
    $.ajax({
        url: DOMAIN_URL + "/company/marketplace/top5/assets/php/curl_api.php",
        type: 'POST',
        data: params,
        dataType: 'text',
        success: function (data) {
            console.log(data);
            data = JSON.parse(data);
            showproducts(data);
            showTop5(data);            
        },
        error: function (request, error) {
            console.log(error);
        }
    });
}

function showproducts(data){
    var query = "";
    if (localStorage.hasOwnProperty('uid') && localStorage.hasOwnProperty('name')) {
        query = "?userid="+localStorage.getItem("uid") + "&username=" + localStorage.getItem("name");
    }
    for (var i = 0; i < companyUrl.length;i++){
        var html = '<ul>';
        console.log(data[companyUrl[i][0]]);
        var productArr = data[companyUrl[i][0]];
        for (var j = 0; j < productArr.length; j++) {
            var a = '<a href="' + productArr[j]["service_link"] + query + '">' + productArr[j]["service_name"] + '</a>';
            html += '<li>' + a + '</li>';
        }
        html += '</ul>';

        var id = "#company_" + (i + 1);
        $(id).append('<h2> <a href="' + companyUrl[i][1] + query + '"> Company ' + (i + 1) + '</a></h2>');
        $(id).append("<p>Five most rated products</p>");
        $(id).append(html);
    }
}

function showTop5(data) {
    var top5Arr = allProductArr.slice(0,6);
    var query = "";
    if(localStorage.hasOwnProperty('uid') && localStorage.hasOwnProperty('name')) {
        query = "?userid=" + localStorage.getItem("uid") + "&username=" + localStorage.getItem("name");
    }
    var id = "#top_5";
    $(id).append("<h2>Five most visited products across Marketplace</h2>");
    var html = '<ul>';
    var productArr = data["Marketplace"];
    for (var i = 0; i < productArr.length; i++) {
        
        console.log(productArr[i]);
        var a = '<a href="' + productArr[i]["service_link"] + query + '">' + productArr[i]["service_name"] + '</a>';
        html += '<li>' + a + '</li>';
    }
    html += '</ul>';
    $(id).append(html);
}