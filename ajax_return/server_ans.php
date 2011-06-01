<?php
include_once ('/home/melprom/colourparkway.ru/docs/sch/script/config.php');
include_once ('/home/melprom/colourparkway.ru/docs/sch/script/qa_base.php');
function mysql_fetch_all($res) {
		   while($row	=	mysql_fetch_row($res)) {
		       $return[]	=	$row[0];
		   }
		   return $return;
}

function mysql_fetch_all_operation($res) {
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
//�� �������� funk �������� ����� ������� ���������
$qa_obj=1;//qadb::qa_create();

switch($funk){
	case 0:	page_on_a3($qa_obj);
		break;

	case 1:	price_materials($qa_obj);
		break;

	case 2: product_operation($qa_obj);
		break;

	case 3: get_operation($qa_obj);
		break;

	case 4: get_material($qa_obj);
		break;

	case 5:	get_material_all($qa_obj);
		break;
	
	case 6:	get_density($qa_obj);
		break;
		
	case 7:	get_additional_price($qa_obj);
		break;	
	
	case 8:	get_discount_percent($qa_obj);
		break;
		
	case 11: saveCostOperation($qa_obj);
		break;
		
	case 12: saveCostMaterial($qa_obj);
		break;
	case 13: getList($qa_obj);
		break;
	case 14:	pricePaperCostAllTables($qa_obj);
		break;
	case 15:	savePaperCost($qa_obj);
		break;
		
} // switch

//$qa_obj->close_db();
//�������� �� ���� ���������� ��������� ������� ����� �������� �� �3 � ����������
function page_on_a3($qa_obj){
		try {
		$id 		=	json_decode($_POST['map']);
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}
		//$res		=	$qa_obj->select_in_db('product','number_on_a3','id ='.$id);
		//$product	=	mysql_fetch_all($res);
		echo $id[0][0];
}
// �������� �� ���� ���� ����� �3 � ����������� �� ��������� � ��������� ������
function price_materials($qa_obj){
		try	{
		$material	=	intval ($_GET['material']);
		$density	=	intval ($_GET['density']);
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}
		$res		=	$qa_obj->select_in_db('price_materials','price','id_materials ='.$material.' AND id_density='.$density);
		$product	=	mysql_fetch_all($res);
		echo $product[0];
}



//�������� �� ���� ������ ���������� ������, ������� �� ���������� ��� ������� ���� ������.
//���������� � ������� JSON

function get_density($qa_obj){
		try	{
		$material	=	intval ($_GET['material']);
		//$density	=	intval ($_GET['density']);
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}
		$res		=	$qa_obj->select_in_db('price_materials','id_density','id_materials ='.$material.' AND price="0"');
		$product	=	mysql_fetch_all($res);
		echo json_encode($product);
}


// ������� �������� id ��������, �� ���� �������� ����������� �������� ��� ������� ���� ��������
//���������� � ������� JSON � ����������
//���������� ����� � ����� ������� : 	��������, ���������, ���������� ����������, ����� �������� � ����
function product_operation($qa_obj){
	try	{
		$id 		=	intval ($_GET['id']);
		//$laminat	=	intval ($_GET['laminat']);
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}

		$res				=	$qa_obj->select_in_db('product_operation','operation, retry','id_product ='.$id);
		$list_oper_retry	=	mysql_fetch_all_operation($res);
		for ($i=0;$i<count($list_oper_retry);$i++)
			{
			$res			=	$qa_obj->select_in_db('operation_list',' operation, price ','id ='.$list_oper_retry[$i][0]);
			$operation		=	mysql_fetch_all_operation($res);
			$exit_array[]	=	array ($operation[0][0],$operation[0][1],$list_oper_retry[$i][1],$list_oper_retry[$i][0]);
			}

		//���������� ����� � ����� ������� : 	��������, ���������, ���������� ����������, ����� �������� � ����
		echo json_encode($exit_array);
}
//��������� ������ ���� ��������, �������������� �� �������� ��������, � �������� �� � ������� json
function get_operation($qa_obj){

			$res		=	$qa_obj->select_in_db('operation_list ORDER BY operation',' operation, price, id ');
			$operation	=	mysql_fetch_all_operation_on_3($res);

		//���������� ����� � ����� ������� : 	��������, ���������, ���������� ����������, ����� �������� � ����
		echo json_encode($operation);
}
//�������� ������ ����������, � ����������� �� ���������� ��������, �������� � ������� JSON
function get_material($qa_obj){
		try	{
		$id 		=	intval ($_GET['id']);
	//	$laminat	=	intval ($_GET['laminat']);
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}

		$res						=	$qa_obj->select_in_db('math_on_product','id_materials','id_product ='.$id);
		$list_material_on_product	=	mysql_fetch_all($res);
		for ($i=0;$i<count($list_material_on_product);$i++)
			{
			$res			=	$qa_obj->select_in_db('math',' math, price ','id ='.$list_material_on_product[$i]);
			$material		=	mysql_fetch_all_operation($res);
			$exit_array[]	=	array ($material[0][0],$material[0][1],$list_material_on_product[$i]);
			}
	/*	if ($laminat!= -1) {
			$exit_array[]	=	array ('�������������' ,	6.32,8, 	);
		}*/
		//���������� ����� � ����� ������� : 	��������, ���������, ���������� ����������, ����� �������� � ����
		echo json_encode($exit_array);
}

//��������� ������ ���� ����������, �������������� �� �������� ���������, � �������� �� � ������� json
function get_material_all($qa_obj){

			$res		=	$qa_obj->select_in_db('math ORDER BY math',' math, price,id ');
			$material	=	mysql_fetch_all_operation_on_3($res);
		//���������� ����� � ����� ������� : 	��������, ���������, ���������� ����������, ����� �������� � ����
		echo json_encode($material);
}


/*					7	function				*/
// �������� � ������ �������, � ����������� �� ���������� ��������
function get_additional_price($qa_obj){
		try	{
			$product	=	intval ($_GET['id']);
		
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}
		$res		=	$qa_obj->select_in_db('additional_price','procent ','id ='.$product);
		$return	=	mysql_fetch_all($res);
		echo $return[0];
}
/*					8 function					*/
//�������� � ������ ������, � ����������� �� ���������� ��������� � ������ ������
function	get_discount_percent($qa_obj){
		try	{
			$product	=	intval ($_GET['id']);
			$number		=	intval ($_GET['number']);
			
		}
		catch (Exception $e) {
			echo 'error';
			return 0;
		}
		$res		=	$qa_obj->select_in_db('discount','discount,number ','id_product ='.$product.' AND '.$number.'>number ORDER BY number DESC LIMIT 1');
		//$res->echo_mess();
		$return	=	mysql_fetch_all($res);
		echo $return[0];


}
/*					11 function
��������� ����� ���� ������.
� ������ ����� ���������� 0 ����� -1

*/
function saveCostOperation($qa_obj){
	try	{
			$product	=	intval ($_GET['id']);
			//if ($product	==	-1)
			$number		=	floatval ($_GET['cost']);
			$data_arr	=	array("price" => $number);	
		}
		catch (Exception $e) {
			echo '-1';
			return 0;
		}
		$res		=	$qa_obj->UPDATE_in_db('operation_list',$data_arr,' id ='.$product);
		//echo $qa_obj->mysql_affected();
		//echo $qa_obj->mysql_affected();
		if ($res &&	($qa_obj->mysql_affected()>0) )
			echo "0";
		else if ($res &&	($qa_obj->mysql_affected()	==	0) )
				echo "2";
			else 	echo "1";


}

function saveCostMaterial($qa_obj){
	try	{
			$product	=	intval ($_GET['id']);
			//if ($product	==	-1)
			$number		=	floatval ($_GET['cost']);
			$data_arr	=	array("price" => $number);	
		}
		catch (Exception $e) {
			echo '-1';
			return 0;
		}
		$res		=	$qa_obj->UPDATE_in_db('math',$data_arr,' id ='.$product);
		//echo $qa_obj->mysql_affected();
		//echo $qa_obj->mysql_affected();
		if ($res &&	($qa_obj->mysql_affected()>0) )
			echo "0";
		else if ($res &&	($qa_obj->mysql_affected()	==	0) )
				echo "2";
			else 	echo "1";


}
/*							13 �������)))
������� ��������� ������ ���� ������� ��� ����������, � ����������� �� ���������� Id
*/
function getList($qa_obj){
			$type		=	intval ($_GET['id']);
			if ($type	==	1)
				$array	=	array('materials',' material, id ');
			else 
				$array	=	array('density',' density, id ');
			$res		=	$qa_obj->select_in_db($array[0],$array[1]);
			$material	=	mysql_fetch_all_operation($res);
		//���������� ����� � ����� ������� : 	��������, ���������, ���������� ����������, ����� �������� � ����
		echo json_encode($material);
	}
//-------------------------14 �������
// �������� �� ���� ���� ����� �3 � ����������� �� ��������� � ��������� ������
function pricePaperCostAllTables($qa_obj){
		
		$res		=	$qa_obj->select_in_db('price_materials','id_materials,id_density, price','');
		$product	=	mysql_fetch_all_operation_on_3($res);
		echo json_encode($product);
}	
//-----------------------15 �������
function	savePaperCost($qa_obj){
	
	try	{
			$idTypePaper=intval ($_GET['idTypePaper']);
			//"+idTypePaper+"&idDesity="+idDesity+"&cost="+paperCost
			$idDesity	=	intval ($_GET['idDesity']);
			//if ($product	==	-1)
			$number		=	floatval ($_GET['cost']);
			$data_arr	=	array("price" => $number);	
		}
		catch (Exception $e) {
			echo '-1';
			return 0;
		}
		//id_materials	id_density	price
		$res		=	$qa_obj->UPDATE_in_db('price_materials',$data_arr,' id_materials ='.$idTypePaper.' AND id_density='.$idDesity );
		//echo $qa_obj->mysql_affected();
		//echo $qa_obj->mysql_affected();
		if ($res &&	($qa_obj->mysql_affected()>0) )
			echo "0";
		else if ($res &&	($qa_obj->mysql_affected()	==	0) )
				echo "2";
			else 	echo "1";


}
?>