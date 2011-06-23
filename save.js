/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 22.06.11
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
function saveName(obj,name){
    obj.nameMap =   name;
}
function openSaveForm(obj)
{
    var access  =   false;
    /*jQuery('body').append('<div id ="sForm"></div>');
    //jQuery('#sModal').append('login');
    //jQuery('#sModal').append('<input style = "margin-left: 120px;display:inline;;"size="15" type="text" id="name" value="name" /><br/>');
    jQuery('#sForm').append('<input size="15" type="text" id="name" value="filename" />');
    jQuery('input#name').bind('click',function(){jQuery('input#name').attr('value','')});
    //jQuery('input#password').bind('click',function(){jQuery('input#password').attr('value','')});

    jQuery('#sForm').dialog({ title: 'Сохранить' ,
        //TODO Реализовать ajax запрос на получения прав доступа к контенту
         buttons: { "Сохранить" :   function() {saveName(obj);
                                             jQuery(this).dialog("close");  },

                    "Отмена":   function() { jQuery(this).dialog("close"); } },
         beforeClose: function() {jQuery('#sForm').remove();},
         closeOnEscape: false,
         draggable:     false,
         resizable:     false
    });
    jQuery('#sForm').dialog("open");*/
    var map   =    prompt('Название карты','введите Название карты')
    saveName(obj,map);

    return access;

}