/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 31.05.11
 * Time: 16:20
 * To change this template use File | Settings | File Templates.
 */
//TODO Изучи паттерны БЛЕАТЬ!!!
var ajaxWrap    =   function(nameFunction,parametrs){
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
function getDensity() {
	var request		=	create_Http_Request();
	var the1		=	0;
	var material	=	get_material();
	var url			=	"/sch/ajax_return/server_ans.php?func=6&material=" + escape(material);
	request.open("GET", url, false);
	request.send(null);
	if (request.status	==	200){

		return the1 =	eval('(' + request.responseText + ')');
	}
	else	{
				jQuery("#errorBox p").append(errorAjax);
				throw errorStopSignal;
			}
	//console.log(the1);
	return 0	;//=	eval('(' + request.responseText + ')');
}

}