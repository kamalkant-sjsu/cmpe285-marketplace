// var DOMAIN_URL = "http://localhost/sjsu/personal-website";
var DOMAIN_URL = "https://kama1kant.com";

$(document).ready(function () {
    greeting();

    $("#register").click(function () {
        var name = $("#fullName").val();
        var email = $("#email").val();
        var password = $("#password").val();
        console.log(name + " " + email + " " + password);
        register(name, email, password);
        greeting();
    });

    $("#login").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        console.log(email + " " + password);
        login(email, password);
        greeting();
    });

    $("#logout").click(function () {
        localStorage.clear();
        $("#message").text("** User logged out");
        greeting();
    });

    $(".product_analytics").click(function () {
        console.log($(this).attr('id'));
    });
});

function register(name, email, password){
    var params = { "name": name, "email": email, "password": password };
    console.log(params);
    $.ajax({
        url: DOMAIN_URL + '/company/marketplace/auth/assets/php/register.php',
        type: 'POST',
        data: params,
        dataType: 'text',
        success: function (data) {
            console.log(data);
            data = JSON.parse(data);
            $("#message").text(data.message);
        },
        error: function (request, error) {
            console.log(error);
        }
    });
}

function login(email, password) {
    var params = { "email": email, "password": password };
    console.log(params);
    $.ajax({
        url: DOMAIN_URL + '/company/marketplace/auth/assets/php/login.php',
        type: 'POST',
        data: params,
        dataType: 'text',
        success: function (data) {
            console.log(data);
            var response = JSON.parse(data);
            $("#message").text("** "+response.message);
            var data = JSON.parse(response.data);
            console.log(data.uid);
            localStorage.setItem("uid", data.uid);
            localStorage.setItem("name", data.name);
            greeting();
        },
        error: function (request, error) {
            console.log(error);
        }
    });
}


function greeting() {
    var uid = localStorage.getItem("uid");
    if(uid){
        $("#greeting").text("Welcome "+localStorage.getItem("name"));
        $("#signinInput").hide();
        $("#logout").show();
    } else{
        $("#greeting").text("User not Logged in");
        $("#signinInput").show();
        $("#logout").hide();
    }
}

