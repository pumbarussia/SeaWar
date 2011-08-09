/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 01.06.11
 * Time: 14:26
 * To change this template use File | Settings | File Templates.
 */
function autentification(){
    var access  =   false;
    jQuery('body').html('<div id ="sModal"></div>');
    //jQuery('#sModal').append('login');
    jQuery('#sModal').append('<input style = "margin-left: 120px;display:inline;" size="15" type="text" id="name" value="name" /><br/>');
    jQuery('#sModal').append('<input size="15" type="text" id="password" value="password" />');
    jQuery('input#name').bind('click',function(){jQuery('input#name').attr('value','')});
    jQuery('input#password').bind('click',function(){jQuery('input#password').attr('value','')});

    jQuery('#sModal').dialog({ title: 'Вход' ,
        //TODO Реализовать ajax запрос на получения прав доступа к контенту
         buttons: { "Войти" :   function() {
                                             jQuery(this).dialog("close");loadDiv();  },
             
                    "Отмена":   function() { jQuery(this).dialog("close"); } },
         beforeClose: function() {jQuery('body').html('');},
         closeOnEscape: false,
         draggable:     false,
         resizable:     false
    });
    jQuery('#sModal').dialog("open");
    return access;

}