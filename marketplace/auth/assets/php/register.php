<?php
session_start();
// require_once $_SERVER['DOCUMENT_ROOT']."/sjsu/personal-website/company/assets/php/db_config.php";
require_once $_SERVER['DOCUMENT_ROOT']."/company/assets/php/db_config.php";

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $conn = dbInitialize();

    $response = register($conn, $name, $email, $password);
    register_analytics($conn, $response["uid"]);
    echo json_encode($response);
}

function dbInitialize() {
    $database = new Database();
    $db = $database->dbConnection();
    $conn = $db;
    return $conn;
}

function register($conn, $name, $email, $password) {
    try {
        $uid = getUniqueUserId($email);
        $stmt = $conn->prepare("INSERT INTO marketplace_users(full_name, email, password, uid) VALUES(:name, :email, :password, :uid)");
        $stmt->bindparam(":name", $name);
        $stmt->bindparam(":email", $email);
        $stmt->bindparam(":password", $password);
        $stmt->bindparam(":uid", $uid);
        $stmt->execute();

        $response = array();
        $response["success"] = true;
        $response["uid"] = $uid;
        $response["message"] = "User Registered";
    }
    catch(PDOException $ex) {
        $response["success"] = false;
        $response["message"] = $ex->getMessage();
    }
    return $response;
}

function register_analytics($conn, $uid) {
    $analytics = json_encode(array("product_1"=>0, "product_2"=>0, "product_3"=>0, "product_4"=>0));
    try {
        $stmt = $conn->prepare("INSERT INTO analytics(uid, product_analytics) VALUES(:uid, :analytics)");
        $stmt->bindparam(":uid", $uid);
        $stmt->bindparam(":analytics", $analytics);
        $stmt->execute();

        $response = array();
        $response["success"] = true;
        $response["message"] = "User Registered";
    }
    catch(PDOException $ex) {
        $response["success"] = false;
        $response["message"] = $ex->getMessage();
    }
    return $response;
}

 function getUniqueUserId($email) {
        $uId = uniqid($email, true);
        $uuId= md5($uId);
        return $uuId;
    }

?>