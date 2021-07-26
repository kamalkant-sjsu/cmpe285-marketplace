// var DOMAIN_URL = "http://localhost/sjsu/personal-website";
var DOMAIN_URL = "https://kama1kant.com";

var companyUrl = ["https://kama1kant.com/company", "https://mivishal.com", "http://deepakvk.com/webfire/dist/company.php", "http://www.radhikacmpe272.ninja"];
$(document).ready(function () {
    greeting();
    appendCompanyUrl();
});

function greeting() {
    if (isUserLoggedin()) {
        $("#greetingTitle").text("Welcome "+localStorage.getItem("name"));
    } else {
        $("#greetingTitle").text("User not Logged in. Please login!");
    }
}

function isUserLoggedin() {
    var uid = localStorage.getItem("uid");
    if (uid) {
        return true;
    } else {
        return false;
    }
}

function appendCompanyUrl(){
    var query = "";
    if (localStorage.hasOwnProperty('uid') && localStorage.hasOwnProperty('name')) {
        query = "?userid=" + localStorage.getItem("uid") + "&username=" + localStorage.getItem("name");
    }
    for (var i = 0; i < companyUrl.length; i++) {
        var id = "#product_"+(i+1);
        console.log(companyUrl[i]);
        $(id).attr("href", companyUrl[i]+query);
    }
}

