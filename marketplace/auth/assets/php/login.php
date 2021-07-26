<?php
session_start();
// require_once $_SERVER['DOCUMENT_ROOT']."/sjsu/personal-website/company/assets/php/db_config.php";
require_once $_SERVER['DOCUMENT_ROOT']."/company/assets/php/db_config.php";


if(isset($_POST['email']) && isset($_POST['password'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    $conn = dbInitialize();

    $response = login($conn, $email, $password);
    echo json_encode($response);
}

function dbInitialize() {
    $database = new Database();
    $db = $database->dbConnection();
    $conn = $db;
    return $conn;
}

function login($conn, $email, $password) {
        try {
            $stmt = $conn->prepare("SELECT * FROM marketplace_users WHERE email=:email");
            $stmt->bindparam(":email", $email);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if($stmt->rowCount() >= 1) {
                if($row['password'] == $password) {
                    $response["success"] = true;
                    $response["error_code"] = 200;
                    $response["message"] = "User is now Logged in";

                    $data["name"] = $row['full_name'];
                    $data["email"] = $row['email'];
                    $data["uid"] = $row["uid"];
                    $response["data"] = json_encode($data);
                } else {
                    $response["success"] = false;
                    $response["error_code"] = 401;
                    $response["message"] = "Password did not match";
                }
            }
            else {
                $response["success"] = false;
                $response["error_code"] = 407;
                $response["message"] = "User not Registered";
            }
        } catch(PDOException $ex) {
            $response["success"] = false;
            $response["error_code"] = 400;
            $response["message"] = $ex->getMessage();
        }
        return $response;
}
?>