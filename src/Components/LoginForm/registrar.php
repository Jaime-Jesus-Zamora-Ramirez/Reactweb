<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: application/json; charset=utf-8");

include "conectar.php";
$mysqli = conectarDB();

$JSONData = file_get_contents("php://input");
$dataObject = json_decode($JSONData);

session_start();
$mysqli->set_charset('utf8');

$usuario = $dataObject->usuario;
$clave = $dataObject->clave;
$nombre = $dataObject->nombre;
$apellidos = $dataObject->apellidos;
$idTipoUsuario = $dataObject->idTipoUsuario;

// Encriptar la clave
$claveEncriptada = password_hash($clave, PASSWORD_DEFAULT);

if ($nueva_consulta = $mysqli->prepare("INSERT INTO usuarios (usuario, clave, nombre, apellidos, idTipoUsuario) VALUES (?, ?, ?, ?, ?)")) {
    $nueva_consulta->bind_param('ssssi', $usuario, $claveEncriptada, $nombre, $apellidos, $idTipoUsuario);
    $nueva_consulta->execute();

    $response = array(
        'registrado' => true,
        'mensaje' => 'Usuario registrado exitosamente.'
    );

    echo json_encode($response);

    $nueva_consulta->close();
} else {
    $errorResponse = array(
        'registrado' => false,
        'error' => 'No se pudo conectar a la base de datos.'
    );

    echo json_encode($errorResponse);
}

$mysqli->close();
?>
