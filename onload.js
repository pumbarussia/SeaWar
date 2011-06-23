/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 28.05.11
 * Time: 22:22
 * To change this template use File | Settings | File Templates.
 */
jQuery(document).ready(function() {
   autentification();
});
function loadDiv(){
    jQuery('body').append('<div id	="main"></div>');
        jQuery('#main').append('<div id =   "leftPanel"></div>');
            jQuery('#leftPanel').append('<input type="button" name = "go" value="go" >');
            jQuery('#leftPanel').append('<input type="button" name = "load" value="load" >');
        jQuery('#main').append('<div id =   "mapPosition"></div>');
        jQuery('#main').append('<div id =   "rightPanel"></div>');
            jQuery('#rightPanel').append('<input type="radio" name="ship" value="1" >1<br    />');
            jQuery('#rightPanel').append('<input type="radio" name="ship" value="2" >2<br    />');
            jQuery('#rightPanel').append('<input type="radio" name="ship" value="3" >3<br    />');
            jQuery('#rightPanel').append('<input type="radio" name="ship" value="4" >4<br    />');
            jQuery('#rightPanel').append('<br    />');
            jQuery('#rightPanel').append('<input type="radio" name="shipDirection" value="1" >Горизонтальное<br    />');
            jQuery('#rightPanel').append('<input type="radio" name="shipDirection" value="2" >Вертикальное<br    />');

            jQuery('#rightPanel').append('<input type="button" id = "ok" value="ok">');
            jQuery('#rightPanel').append('<input type="button" id = "Save" value="Save">');

    jQuery('body').append('<div id="messageWin"></div>');

    jQuery('input[name=ship][value=1]').attr('checked','checked');
    jQuery('input[name=shipDirection][value=1]').attr('checked','checked');
    jQuery('input[name = go]').bind('click',go);
    jQuery('input[name = load]').bind('click',load);
    jQuery('input[type = button]').button();
}