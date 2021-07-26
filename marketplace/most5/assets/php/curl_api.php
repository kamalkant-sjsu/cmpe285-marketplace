<?php
if(isset($_POST['url'])){
    $service_url = $_POST['url'];
    $curl = curl_init($service_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    $curl_response = curl_exec($curl);
    curl_close($curl);
    echo $curl_response;
}
?>