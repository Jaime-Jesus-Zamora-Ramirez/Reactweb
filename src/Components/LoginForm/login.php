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
$pas = $dataObject->clave;

if ($nueva_consulta = $mysqli->prepare("SELECT usuarios.nombre, usuarios.clave, usuarios.apellidos, usuarios.usuario, usuarios.idTipoUsuario, usuarios.id, tipo_usuario.etiquetaTipoUsuario, tipo_usuario.descripcionTipoUsuario FROM usuarios INNER JOIN tipo_usuario ON usuarios.idTipoUsuario = tipo_usuario.idTipoUsuario WHERE usuarios.usuario = ?")) {
    $nueva_consulta->bind_param('s', $usuario);
    $nueva_consulta->execute();
    $resultado = $nueva_consulta->get_result();

    if ($resultado->num_rows == 1) {
        $datos = $resultado->fetch_assoc();
        $encriptado_db = $datos['clave'];

        if (password_verify($pas, $encriptado_db)) {
            $_SESSION['usuario'] = $datos['usuario'];

            $response = array(
                'conectado' => true,
                'usuario' => $datos['usuario'],
                'nombre' => $datos['nombre'],
                'apellidos' => $datos['apellidos'],
                'id' => $datos['id'],
                'idTipoUsuario' => $datos['idTipoUsuario'],
                'etiquetaTipoUsuario' => $datos['etiquetaTipoUsuario']
            );

            echo json_encode($response);
        } else {
            $errorResponse = array(
                'conectado' => false,
                'error' => 'La clave es incorrecta, vuelva a intentarlo.'
            );

            echo json_encode($errorResponse);
        }
    } else {
        $errorResponse = array(
            'conectado' => false,
            'error' => 'El usuario no existe.'
        );

        echo json_encode($errorResponse);
    }

    $nueva_consulta->close();
} else {
    $errorResponse = array(
        'conectado' => false,
        'error' => 'No se pudo conectar a la base de datos.'
    );

    echo json_encode($errorResponse);
}

$mysqli->close();
?>
