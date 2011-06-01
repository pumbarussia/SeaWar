/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 31.05.11
 * Time: 16:20
 * To change this template use File | Settings | File Templates.
 */
//TODO Изучи паттерны БЛЕАТЬ!!!
//var ajaxWrap    =   function(nameFunction,parametrs){
function create_Http_Request() {
	var request;
	try {
		request = new XMLHttpRequest();
	}
	catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (failed) {
				request = false;
			}
		}
	}

	if (!request)
		alert("Error initializing XMLHttpRequest!");

	return request;
}

/*
Получает ответ в виде списка плотностей бумаги, которые недуступны для данного материала
*/
function ajaxSaveForm(data) {
	var request		=	create_Http_Request();
	var the1		=	0;
	//TODO Приделать куки или еще что
	var url			=	"/SeaWar/ajax_return/server_ans.php";
    var extData     =    JSON.stringify(data);
    var sParametrs  ="func=0&map="+extData;

    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//request.open("GET", url, false);
	request.send(sParametrs);
	if (request.status	==	200){
		 //the1 =
         //alert(the1);
         return the1    =   request.responseText;
	}
	else	{
                alert("12313213");
				jQuery("#errorBox p").append(errorAjax);
				throw errorStopSignal;
			}
	//console.log(the1);
	return 0	;//=	eval('(' + request.responseText + ')');
}

//}