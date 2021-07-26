<?php
class Database
{
    public $conn;
    public function dbConnection() {
        $this->conn = null;
        $server = "localhost";
        $database = "sjsu-272";
        $user = "root";
        $passwords = "";
        // $password = "";
        try {
            $this->conn = new PDO("mysql:host=" . $server . ";dbname=" . $database, $user, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>