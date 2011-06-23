<?php

/**
 *
 *
 */

class qadb{

	 private static $execute;
	 protected $dbh;
	 protected $error_db;
	 protected $message_error;
	 protected $last_query='';
	 protected $count_query=0;
// 0 if not connect
	//singleton
    public static function qa_create(){

		if (self::$execute===null) {
                    self::$execute=new qadb;

                }
		return self::$execute;
 	}
	function echo_mess(){
             echo $this->message_error;
            // echo $this->error_db;
	}

	function get_dbh(){
             return $this->dbh;
	}
     function hello(){
             echo 'hello';
    }
		/**
	 * Constructor
	 * @access protected
	 */
    function  __construct() {


            $link = mysql_connect(hostname,userb ,password);
            if (!$link) {
				$this->message_error=''.mysql_error();
				$this->error_db=0;
				return false;
			}
			else {
                    $this->dbh=$link;
                    $this->select_db(baseb);
                    return $link;

                }
    }
	//	connect_db
	function  mysql_affected(){
	return  mysql_affected_rows();}
     function connect_db($hostname,$username,$password){
     	$link = @mysql_connect($hostname,$username,$password);

		if (!$link) {
			$this->message_error=''.mysql_error();
			$this->error_db=0;
			return false;
		}
		else
     		return $this->dbh=$link;
     }
	//close db
     function close_db(){
     	return @mysql_close($this->dbh);
     }

     function select_db($base){
        if (!@mysql_select_db($base,$this->dbh)) {
			$this->message_error=''.mysql_error();
			$this->error_db=1;
			return false;
        } else{@mysql_query("SET NAMES '".def_char."'");
			  return true;}

     }
	 function echo_error() {

		echo 	 $this->message_error.' '.$this->error_db;
	 }
     function easy_query($query){
    // echo $query.'<br/>';
    // $query=mysql_real_escape_string($query);
       // echo $query;
        //$query=mysql_real_escape_string($query);
     	$this->last_query=$query;
     	++$this->count_query;
        //echo $query;
     	if (!$result=@mysql_query($query,$this->dbh)) {
			$this->message_error=''.mysql_error();
			$this->error_db=mysql_errno();
			//$this->echo_error();
			return   false;
			}
		else return $result;
     }
	

     function select_in_db($table,$data_arr,$condition=''){
	      if ($condition<>'') {
	         $condition=' WHERE '.$condition;
	      }
	      $my_value='';
	      if (!is_array($data_arr)) {
			if ($data_arr<>''){
				$my_value=$data_arr;
			}
			else
			$my_value='*';
	      } else {
		      foreach($data_arr as $value ){
		              $my_value.=$value.',';
			  }
			$my_value[strlen($my_value)-1]=' ';
	        }

	      $query="SELECT $my_value FROM $table $condition";
	      return $this->easy_query($query);

     }

     function insert_in_db($table,$data_arr){
        $my_key='';
		$my_value='';
		if (is_array($data_arr))
		{
			foreach($data_arr as $key => $value ){
			  $my_key.=$key.',';
			  $my_value.='"'.$value.'"'.',';
			}
			$my_key[strlen($my_key)-1]=' ';
			$my_value[strlen($my_value)-1]=' ';
			$query="INSERT INTO $table ($my_key) VALUES  ($my_value)";
			echo $query;
			return $this->easy_query($query);
		}
		else {
			$this->message_error=''.mysql_error();
			$this->error_db=mysql_errno();
			return   false;
		}
     }

	function newpass(){
            if (function_exists('com_create_guid')){
                return com_create_guid();
            }else{
                mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
                $charid = strtoupper(md5(uniqid(rand(), true)));
                $hyphen = chr(45);// "-"
                $uuid = substr($charid, 0, 8)
                        .substr($charid, 8, 4);
                return $uuid;
                }
    }

	function UPDATE_in_db($table,$data_arr,$condition=''){
        $my_key='';
        $my_value='';
		$end	=	'';	
	    if ($condition<>'') {
		 $condition=' WHERE '.$condition.' ';
	    }
		//echo $condition;
	    if (is_array($data_arr)){
			foreach($data_arr as $key => $value ){
			  //$my_key.=$key.',';
			  $end	=	$key."=".$value.',';
			  //$my_value.='"'.$value.'"'.',';
			}
			$end[strlen($end)-1]=' ';
			//$my_value[strlen($my_value)-1]=' ';
			$query="UPDATE $table SET $end  $condition ";
			//echo $query;
			return $this->easy_query($query);
	    }
	    else {
			$this->message_error=''.mysql_error();
			$this->error_db=mysql_errno();
			return   false;
	    	}
    }

    function delete_in_base($table,$condition=''){
            if ($condition<>'')
	              $condition=' WHERE '.$condition;
	            $query='DELETE FROM '.$table.$condition;
            return $this->easy_query($query);
        }

	 function wpdb(){

	}
}
//$qa_obj=qadb::qa_create();
//mysql_free_result()
?>