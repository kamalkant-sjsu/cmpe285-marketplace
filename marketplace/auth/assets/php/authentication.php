<?php
    $userList = ["Harry", "Frodo", "Rick", "Seldon"];

    if(isset($_POST['id']) && isset($_POST['password'])){
        $id = $_POST['id'];
        $password = $_POST['password'];
        $access = FALSE;

        if($id == "admin"  && $password == "admin"){
            $access = TRUE;
        } else {
            $access = FALSE;
        }
        $response = array();
        $response["access"] = $access;
        if($access == TRUE){
            $response["userList"] = $userList;
        }
        echo json_encode($response);
    }
?>