<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru-ru" lang="ru-ru" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

</head>
<body>
<?php

	include_once ('config.php');
	include_once ('qa_base.php');
	$qa_obj=qadb::qa_create();
	//echo $qa_obj->hello();

/*	$product= Array ('Визитки (Угол)','Визитки (Радиус)','Листовая продукция (Станд.формат)','Листовая продукция (неСтанд.формат)',
					'Буклет','Блок (скрепка)','Блок (пружина)','Печать на конвертах (ч/б)','Печать плакатов',
					'Календари карманные','Календари \"Домик\"','Календари настенные перекидные',
					'Календари настенные квартальные');
	$array_el_on_a3 =  Array(		24,		24,
									2,		2,
									2,		2,
									2,		2,
									0,		0,
									18,		2,
									4,		1);

	for ($i=0;$i<count($product);$i++){
		$temp_array=array ('id'=>$i,'product'=> mysql_real_escape_string($product[$i]),
							'number_on_a3' =>intval( $array_el_on_a3[$i]));
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('product',$temp_array);
		$qa_obj->echo_mess();
	}

		$materials=array ('Мелованная матовая',
							'Мелованная глянец',
							'Для цифры КолорКопи',
							'Для цифры КолорКопи Глосс',
							'Самоклеящаяся',
							'Оффсет Zanto',
							'Оффсет Госзнак',
							'Оффсет Импорт',
							'Дизайнерская',
							'Пластик');

		for ($i=0;$i<count($materials);$i++){
		$temp_array=array ('id'=>$i,'material'=> mysql_real_escape_string($materials[$i])
							);
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('materials',$temp_array);
		$qa_obj->echo_mess();
	}

	$density =	array ('80гр',
						'90гр',
						'115гр',
						'120гр',
						'130гр',
						'135гр',
						'150гр',
						'160гр',
						'170гр',
						'200гр',
						'250гр',
						'300гр');

		for ($i=0;$i<count($density);$i++){
		$temp_array=array ('id'=>$i,'density'=> mysql_real_escape_string($density[$i])
							);
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('density',$temp_array);
		$qa_obj->echo_mess();
	}
	$chroma	=	array('1+0',
					'1+1',
					'4+1',
					'4+4');

	for ($i=0;$i<count($chroma);$i++){
		$temp_array=array ('id'=>$i,'chroma'=> mysql_real_escape_string($chroma[$i]));
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('chroma',$temp_array);
		$qa_obj->echo_mess();
	}

		$operation_list = array(		'Форматирование макета',	//0
										'Сканирование',			//1
										'Печать 1+0',			//2    1+0
										'Печать 4+0',			//3
										'Печать 1+1',			//4
										'Печать 4+4',			//5
										'Печать конверты',		//6
										'Печать ризограф',		//7
										'Ламинирование',		//8
										'Обрезка',				//9
										'Обрезка углов',		//10
										'Биговка',				//11
										'Сверление',			//12
										'Резка пружин',			//13
										'Пробивка под пружину',	//14
										'Обжим мет.пружины',	//15
										'Установка пиккало',	//16
										'Комплектация изделия',	//17
										'Сборка буклета',		//18
										'Брошюровка',			//19
										'Комплектация партии',	//20
										'Упаковка партии',		//21
										'Установка металл-бинт',//22
										'Переплет степлером',	//23
										'Печать плотерная',		//24
										'Сборка коробок',		//25
										'Технологическая операция',	//26
										'Сборка модулей'		//27
										);
		$price_operation= array( 				1.2,
												 1.2,
												 0.78,
												 1.36,
												 1.56,
												 2.72,
												 13.42,
												 1.49,
												 6.32,
												 3.16,
												 1.34,
												 47.37,
												 1.34,
												 1.2,
												 36.53,
												 1.34,
												 1.79,
												 1.2,
												 1.2,
												 53.03,
											   	 1.2,
												 1.2,
												 1.34,
												 1.34,
												 1578.96,
												 1.2,
												 1.2,
												 1.2);


		for ($i=0;$i<count($operation_list);$i++){
				$temp_array=array ('id'=>$i,'operation'=> mysql_real_escape_string($operation_list[$i]),
				'price '	=>$price_operation[$i]	);
				//echo $product[$i];
				//var_dump($temp_array);
				echo '<br />';
				$tx=$qa_obj->insert_in_db('operation_list',$temp_array);
				$qa_obj->echo_mess();
		}
*/

/*						//Визитки угол
						$array_operation_in_model	=    Array(	0,
																2,
																9,
																20,
																25,
																21);

						$array_operation_retry	=    Array(
																		1,
																		1,
																		10,//На всю партию
																		1,
																		1,
																		1);
					for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>0,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}

			//Визитки радиус
						//На 100 визиток 1 коробка
						$array_operation_in_model		=   Array(	0,
																		2,
																		9,
																		10,
																		20,
																		25,
																		21
																	);

						$array_operation_retry	=    Array(			1,
																		1,
																		10,
																		-1,
																		1,
																		0.01,
																		1
																		);
					for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>1,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}

			//Листовая продукция (А3)

							$array_operation_in_model		=   Array(	0,
																			2,
																			9,
																			21
																		);

							$array_operation_retry	=    Array(		1,
																			1,
																			1,
																			1
																		);
				for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>2,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}

			//Листовая с ламинацией (А3)
							$array_operation_in_model		=    Array(	0,
																			2,
																			8,
																			9,
																			21

																	);

							$array_operation_retry	=    Array(					1,
																					1,
																					1,
																					1,
																					1

																				);


					for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>3,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}
							//Буклет с биговкой
							$array_operation_in_model	=   Array(		0,
																			2,
																			9,
																			11,
																			21
																		);

							$array_operation_retry	=   		Array(		1,
																				1,
																				1,
																				1,
																				1
																		);

							for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>4,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}




				//Блок (скрепка)

							$array_operation_in_model	=    Array(	0,
																		2,
																		9,
																		19,
																		21
																	);

							$array_operation_retry	=   	 Array(		1,
																				1,
																				1,
																				1,
																				1
																		);
							for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>5,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}
							//Блок (пружина)
							$array_operation_in_model		=    Array(	0,
																			2,
																			9,
																			13,
																			14,
																			15,
																			21
																);

							$array_operation_retry	=    Array(			1,
																			1,
																			1,
																			1,
																			1,
																			1,
																			1
																		);
								for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>6,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}
						//Печать на конвертах
						$array_operation_in_model		=    Array(		0,
																			6,
																			21

																	);

						$array_operation_retry	=    Array(					1,
																				1,
																				1
																			);

						for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>7,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}
							//Печать плакатов
							$array_operation_in_model		=    Array(	0,
																			2,
																			21

																		);

							$array_operation_retry	=    Array(					1,
																					-1,
																					-1
																				);

					for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>8,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}
						//Календари карманные
						$array_operation_in_model		=    Array(		0,
																		2,
																		9,
																		10,
																		21
																	);

						$array_operation_retry	=    Array(			1,
																					1,
																					1,
																					1,
																					1
																			);

					for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>9,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();
		}		//Календари "Домик"
				$array_operation_in_model	=   Array(		0,
																		2,
																		9,
																		11,
																		26,
																		21

																	);

						$array_operation_retry	=    Array(			1,
																		1,
																		1,
																		1,
																		1,
																		1

																);

					for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>10,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();}

						//Календари настенные перекидные
						$array_operation_in_model		=   Array(	0,
																		2,
																		8,
																		9,
																		13,
																		14,
																		15,
																		21
																	);

						$array_operation_retry	=   		 Array(	1,
																				1,
																				1,
																				1,
																				1,
																				1,
																				1,
																				1
																			);


			for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>11,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();}

						//Календари настенные квартальные
				$array_operation_in_model		=    Array(		0,
																			2,
																			8,
																			9,
																			13,
																			27,
																			14,
																			15,
																			16,
																			21
																	);

						$array_operation_retry	=   Array(	1,
																				1,
																				1,
																				1,
																				1,
																				1,
																				1,
																				1,
																				1,
																				1
																			);
							for ($i=0;$i<count($array_operation_in_model);$i++){
							$temp_array=array ('id_product'=>12,'operation'=>$array_operation_in_model[$i],
							'retry'	=>$array_operation_retry[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('product_operation',$temp_array);
							$qa_obj->echo_mess();}*/



/*


				 $array_mel_mat = Array(0,	0.021197,
										0.023192,	0,
										0.025686,	0,
										0.029676,	0,
										0.033666,	0.04015,
										0.055112,	0.066833);


					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>0,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}




				 $array_mel_mat =  Array(0,			0.021197,
												0.023192,	0,
												0.025686,	0,
												0.029676,	0,
												0.033666,	0.04015,
												0.055112,	0.066833);


					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>1,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}

				$array_mel_mat =  Array(	0,			0.027431,
													0,			0.038653,
													0,			0,
													0,			0.049377,
													0,			0,
													0.040648,	0	);
					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>2,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}

				$array_mel_mat=  Array(	0,			0,
															0,			0,
															0,			0.057606,
															0,			0,
															0.072569,	0,
															0.106733,	0);
					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>3,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}
			//Самоклеящаяся

				$array_mel_mat = Array(		0.114713,	0,
													0,			0,
													0,			0,
													0,			0,
													0,			0,
													0,			0);
					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>4,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}
			//Оффсет
				$array_mel_mat =  Array(		0,			0,
													0,			0,
													0,			0,
													0,			0,
													0,			0,
													0.075062,	0);
					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>5,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}

				$array_mel_mat=  Array(	0.011721,	0,
													0,			0,
													0,			0,
													0,			0,
													0,			0,
													0,			0);
					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>6,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}

				$array_mel_mat =Array(	0.014214,	0,
													0,			0,
													0,			0,
													0,			0,
													0,			0,
													0,			0);
					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>7,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}

				$array_mel_mat = Array(	0,			0,
													0,			0,
													0,			0,
													0,			0,
													0,			0,
													0,			0);
					for ($i=0;$i<count($array_mel_mat );$i++){
							$temp_array=array ('id_materials'=>8,'id_density'=>$i,
							'price'	=>$array_mel_mat[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('price_materials',$temp_array);
							$qa_obj->echo_mess();}*/


/*			$array_of_materials =  Array(	'Лам.пленка глянец 30 мкм',		//0
										'Лам.пленка глянец 125 мкм',	//1
										'Лам.пленка матовая 30 мкм',	//2
										'Лам.пленка матовая 125 мкм',	//3
										'Коробки для визиток',			//4
										'Скобы для брошюратора',		//5
										'Пиккало',						//6
										'Бумага для плакатов (610мм)',	//7
										'Скотч',						//8
										'Бумага',						//9
										'Пружина',						//10
										'Конверты (евро)',				//11
										'Конверт' 						//12
										);
			$array_price_of_materials =  Array(	 2.00,
												 11.84,
												 2.32,
												 12.61,
												 0.50,
												 0.50,
												 0.50,
												 20.00,
												 0.05,
												 1,
												 1.53,
												 0.53,
												 0.70);
				for ($i=0;$i<count($array_of_materials );$i++){
							$temp_array=array ('id'=>$i,'math'=>$array_of_materials[$i],
							'price'	=>$array_price_of_materials [$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math',$temp_array);
							$qa_obj->echo_mess();}
*/
/*					$math_on_product =	Array(	9,4);
						for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>0,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}


							$math_on_product	=    Array(	9,4	);


							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>1,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}


						//Листовая продукция (А3)

							$math_on_product	=   Array(	9	);
								for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>2,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}

	//Листовая с ламинацией (А3)
							$math_on_product	=   Array(	9,0	);
								for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>3,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}

		//Буклет с биговкой
							$math_on_product	=   Array(	9);
								for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>4,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}
		//Блок (скрепка)

							$math_on_product	=   Array(9);
								for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>5,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}


							//Блок (пружина)
						$math_on_product		=   Array(	9,10);
							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>6,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}


						//Печать на конвертах
						$math_on_product		=   Array(10);
							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>7,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}


							//Печать плакатов
						$math_on_product		=   Array(7	);
							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>8,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}


						//Календари карманные
						$math_on_product		=  Array(		9,0		);
							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>9,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}

		//Календари "Домик"
						$math_on_product	=    Array(		9,8);
							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>10,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}





						//Календари настенные перекидные
						$math_on_product		=   Array(	9,0	);
							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>11,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}


						//Календари настенные квартальные
						$math_on_product		=    Array(		9,0	);
							for ($i=0;$i<count($math_on_product );$i++){
							$temp_array=array (' id_product '=>12,'id_materials'=>$math_on_product[$i]	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('math_on_product',$temp_array);
							$qa_obj->echo_mess();}
			/*		$array_mat = array (
							'Лам.пленка глянец 30 мкм',
							'Лам.пленка глянец 125 мкм',
							'Лам.пленка матовая 30 мкм',
							'Лам.пленка матовая 125 мкм');


					$array_mat_price = array (	 2.00,
												 11.84,
												 2.32,
												 12.61);
							for ($i=0;$i<count($array_mat );$i++){
							$temp_array=array (' id '=>$i,'lam'=>$array_mat[$i],'price'=>$array_mat_price[$i],	);
							//echo $product[$i];
							//var_dump($temp_array);
							echo '<br />';
							$tx=$qa_obj->insert_in_db('lam',$temp_array);
							$qa_obj->echo_mess();}*/

/**
 *
 *
 * @version $Id$
 * @copyright 2011
 */
 //Загоняем добавочную стоимость
	/*$product= Array ('Визитки (Угол)','Визитки (Радиус)','Листовая продукция (Станд.формат)','Листовая продукция (неСтанд.формат)',
					'Буклет','Блок (скрепка)','Блок (пружина)','Печать на конвертах (ч/б)','Печать плакатов',
					'Календари карманные','Календари \"Домик\"','Календари настенные перекидные',
					'Календари настенные квартальные');

	$procent	=	100;
	for ($i=0;$i<count($product);$i++){
		$temp_array=array ('id'=>$i,'procent'=> $procent);
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('additional_price',$temp_array);
		$qa_obj->echo_mess();
	}*/
	//Загоняем Скидки
	
	$number	= Array (	1,	5,	10,	25,	75,	150,	300,	500,	750,	1000);
	$discount	=	Array (	0,	10,	20,	30,	40,	50,	60,	70,	80,	90);


	$procent	=	100;
	for ($i=0;$i<count($number);$i++){
		$temp_array=array ('id_product'=>11,'number'=> $number[$i],'discount'=>$discount[$i]);
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('discount',$temp_array);
		$qa_obj->echo_mess();
	}

	$number	= Array (1,	5,	10,	15,	25,	50,	75,	100,	150,	250);
	$discount	=	Array (	0,	10,	20,	30,	40,	50,	60,	70,	80,	90);
		for ($i=0;$i<count($number);$i++){
		$temp_array=array ('id_product'=>12,'number'=> $number[$i],'discount'=>$discount[$i]);
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('discount',$temp_array);
		$qa_obj->echo_mess();
	}
	$number	= Array (1,	5,	10,	15,	25,	50,	75,	100,	150,	250);
	$discount	=	Array (	0,	10,	20,	30,	40,	50,	60,	70,	80,	90);
		for ($i=0;$i<count($number);$i++){
		$temp_array=array ('id_product'=>13,'number'=> $number[$i],'discount'=>$discount[$i]);
		//echo $product[$i];
		//var_dump($temp_array);
		echo '<br />';
		$tx=$qa_obj->insert_in_db('discount',$temp_array);
		$qa_obj->echo_mess();
	}
	
	
	
	$qa_obj->close_db();
	$qa_obj=NULL;
?>