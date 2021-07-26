<?php
session_start();
// require_once $_SERVER['DOCUMENT_ROOT']."/sjsu/personal-website/company/assets/php/db_config.php";
require_once $_SERVER['DOCUMENT_ROOT']."/company/assets/php/db_config.php";

if(isset($_POST['uid']) && $_POST['product_id']){
    $uid = $_POST['uid'];
    $productId = $_POST['product_id'];
    
    $conn = dbInitialize();

    $analytics = getAnalytics($conn, $uid);
    $analytics = json_decode($analytics, true);
    $analytics[$productId] += 1;
    
    $response = updateAnalytics($conn, $uid, json_encode($analytics));
    echo json_encode($response);
}

function dbInitialize() {
    $database = new Database();
    $db = $database->dbConnection();
    $conn = $db;
    return $conn;
}


function updateAnalytics($conn, $uid, $analytics) {
    try {
        $stmt = $conn->prepare("UPDATE analytics SET product_analytics =:analytics WHERE uid = :uid");
        $stmt->bindparam(":uid", $uid);
        $stmt->bindparam(":analytics", $analytics);
        $stmt->execute();

        $response = array();
        $response["success"] = true;
        $response["message"] = "Analytics updated";
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


function getAnalytics($conn, $uid) {
    try {
        $stmt = $conn->prepare("SELECT * FROM analytics WHERE uid=:uid");
        $stmt->bindparam(":uid", $uid);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($stmt->rowCount() >= 1) {
            return $row['product_analytics'];
        }
        else {
            return NULL;
        }
    } catch(PDOException $ex) {
        return NULL;
    }
}

function getUpdatedAnalytics($productId, $analytics) {
    $analytics[$productId] += 1;
    
}

?>