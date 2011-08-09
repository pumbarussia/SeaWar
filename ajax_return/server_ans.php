<?php
include_once ('/home/melprom/colourparkway.ru/docs/sch/script/config.php');
include_once ('/home/melprom/colourparkway.ru/docs/sch/script/qa_base.php');
function mysql_fetch_all($res) {
		   while($row	=	mysql_fetch_row($res)) {
		       $return[]	=	$row[0];
		   }
		   return $return;
}

function mysql_fetch_on2($res) {
		   while($row	=	mysql_fetch_row($res)) {

		       $return[]	=	array($row[0],$row[1]);
		   }
		   return $return;
}
function mysql_fetch_all_operation_on_3($res) {
		   while($row	=	mysql_fetch_row($res)) {

		       $return[]	=	array($row[0],$row[1],$row[2]);
		   }
		   return $return;
}

$funk =	(int)$_POST['func'];
//по значению funk выбираем какую функцию запустить
$qa_obj=1;//qadb::qa_create();

switch($funk){
	case 0:	saveMap($qa_obj);
		break;

	case 1:	getListMap($qa_obj);
		break;

	case 2:	getMap($qa_obj);		
		break;

		
} // switch

//$qa_obj->close_db();
//Получает из базы количество продукции которое можно уместить на а3 и приложению
function saveMap($qa_obj){
		try {
			$map 		=	$_POST['map'];
			$userID 	=	$_POST['userID'];
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}
		$sructMap['map']	=	$map;
		$sructMap['userID']	=	$userID;
		$qa_obj->insert_in_db('maps',$sructMap);
		//$res		=	$qa_obj->select_in_db('product','number_on_a3','id ='.$id);
		//$product	=	mysql_fetch_all($res);
		echo $id[0][0];
}
function getListMap($qa_obj){
		try {
			$id		=	$_POST['userId'];
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}	
		$res		=	$qa_obj->select_in_db('maps','mapName','mapId','userId ='.$userId);
		$product	=	mysql_fetch_on2($res);
		echo json_encode($product);
}
function getMap($qa_obj)		
		try {
			$userId		=	$_POST['userId'];
			$mapId		=	$_POST['mapId'];
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}	
		$res		=	$qa_obj->select_in_db('maps','map','userId ='.$userId.' AND mapId='.$mapId);
		$product	=	mysql_fetch_all($res);
		echo json_encode($product);
}
//-----------------------------------------------Maps end---------------------------------------------------------------

?>