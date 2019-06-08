<?

header('Content-type:application/json;charset=utf-8');
$link = new PDO('mysql:host=localhost;dbname=automat', 'root', '');

switch($_GET['get']){
    case 'drinks':
        $sql = "SELECT id, name, price, count, img FROM drinks";
        $res = $link->query($sql);

        $drinks = [];

        while($row = $res->fetch(PDO::FETCH_ASSOC)){
            $drinks[] = $row;
        }

        echo json_encode($drinks, JSON_UNESCAPED_UNICODE);

        break;
}