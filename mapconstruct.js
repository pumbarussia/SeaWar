/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 26.05.11
 * Time: 13:44
 * To change this template use File | Settings | File Templates.
 */

/*
* Фунция создает в памяти массив для хранения карты и кораблей на ней.*/
var MapCreator  =  function(inMap) {
    /*создание в памяти массив для хранения карты и кораблей на ней.*/
    this.map =   null;
    if (inMap    ==  null){
        var mapp  = new Array(10);
        (function(){
            var i,j;
            for ( i =0;i<10;i++){
                mapp[i] =   new Array(10);
                for  (j=0;j<10;j++){
                   mapp[i][j]  =   0;
                }
            }
        })();
        this.map    =   mapp;
           //alert(this.map);
    }
    else    this.map =   inMap;

};
MapCreator.prototype  =  {
    createTable:function(){
                var map =   this.map;
               // alert(this.map);
                var table   =   '<table>';
                for (var i=0;i<10;i++){
                    table   +=   '<tr>';
                    for (var j=0;j<10;j++){
                        table   +=   '<td id    =   "'+(i*10+j)+'" value="0" >';
                        table   +=   map[i][j];
                        table   +=   '</td>';
                    }
                    table   +=   '</tr>';

                }
                 table   +=   '</table>';
                jQuery('#mapPosition').append(table);
    },
    createEventOnAdd:function(){
        //var checkedLeft =   function(rowChecked,colChecked,verifyMap){
        /*Проверяет клетку слева от текущей*/
         function checkThis(rowChecked,colChecked,verifyMap){
             return ((verifyMap[rowChecked][colChecked] == 0));
         }
         function checkedLeft(rowChecked,colChecked,verifyMap){
            return ((colChecked <= 0) || (verifyMap[rowChecked][colChecked - 1] == 0));
         }
        //- var checkedRight =   function(rowChecked,colChecked,verifyMap){
        /*Проверяет клетку справа от текущей*/
         function   checkedRight(rowChecked,colChecked,verifyMap){
            return ((colChecked >= 9) || (verifyMap[rowChecked][colChecked + 1] == 0));
         }
         /*Проверяет клетку сверху от текущей*/
         function   checkedUp(rowChecked,colChecked,verifyMap){
             return (( rowChecked<=0) || (verifyMap[rowChecked-1][colChecked] == 0));
         }
        /*Проверяет клетку сниза от текущей*/
         function   checkedDown(rowChecked,colChecked,verifyMap){
            return ((rowChecked  >= 9) || (verifyMap[rowChecked+ 1][colChecked ] == 0));
         }
        /*Проверяет верхнюю и нижнюю клетки от текущей*/
        function checkedUpDown(rowChecked,colChecked,verifyMap){
            return checkedUp(rowChecked,colChecked,verifyMap)&&checkedDown(rowChecked,colChecked,verifyMap);
        }
        /*Проверяет Левую сторону от текущей*/
        function checkedLeftSide(rowChecked,colChecked,verifyMap){
            var currentCol  = colChecked  -1;
            if (currentCol==-1)
                return true;
            return checkedLeft(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,currentCol,verifyMap);
        }
        /*Проверяет Правую сторону от текущей*/
        function checkedRightSide(rowChecked,colChecked,verifyMap){
            var currentCol  = colChecked  +1;
            if (currentCol==10)
                return true;
            return   checkedRight(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,currentCol,verifyMap);
        }
         /*Проверяет сектор для 1 корабля*/
        function checkedSectorOne(rowChecked,colChecked,verifyMap){
             return checkThis(rowChecked,colChecked,verifyMap)&&checkedLeftSide(rowChecked,colChecked,verifyMap)&&checkedRightSide(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,colChecked,verifyMap);
        }
        /*Проверяет сектор для 2 палубного корабля*/
        function checkedSectorTwo(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedLeftSide(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked,colChecked+1,verifyMap)&&checkedRightSide(rowChecked,colChecked+1,verifyMap)&&checkedUpDown(rowChecked,colChecked+1,verifyMap);
             return first&&second;
        }
        /*Проверяет сектор для 2 палубного корабля*/
        function checkedSectorTwo(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedLeftSide(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked,colChecked+1,verifyMap)&&checkedRightSide(rowChecked,colChecked+1,verifyMap)&&checkedUpDown(rowChecked,colChecked+1,verifyMap);
             return first&&second;
        }

        var verifyMap   =   this.map;       
        jQuery('td').hover(

                            /*Мышка наведена на элемент*/
                            function(){

                            var checkedPasteCapability   =   function(id,volume,verifyMap){
                                                                 var row =   parseInt(id/10);
                                                                 var col =   id-row*10;
                                                                 //alert(verifyMap[row][col]+'asdfs');
                                                                 switch (volume){
                                                                     case 1:
                                                                       return checkedSectorOne(row,col,verifyMap);
                                                                     break;
                                                                      case 2:
                                                                       return checkedSectorTwo(row,col,verifyMap);
                                                                     break;
                                                                 }
                                                             };


                            var shipVolume      =   parseInt(jQuery('input[name=ship]:checked').val());
                            var hoverElementId  =   parseInt(jQuery(this).attr("id"));
                            //alert(hoverElementId);
                            //(function(verifyMap,shipVolume,hoverElementId){
                            switch(shipVolume){
                                case 1:
                                       // alert(hoverElementId);
                                       // console.log(verifyMap);
                                        if(checkedPasteCapability(hoverElementId,1,verifyMap)){
                                            jQuery(this).css('background-color','green');
                                        }
                                    break;
                                case 2:  var rowS =   parseInt(hoverElementId/10);
                                         var colS =   hoverElementId-rowS*10;
                                        if(checkedPasteCapability(hoverElementId,2,verifyMap)){
                                            var newId   =   rowS*10+colS+1;
                                            //alert()
                                            jQuery(this).css('background-color','green');
                                            jQuery("#"+newId).css('background-color','green');
                                        }
                                    break;
                            }},      //(this.map,shipVolume,hoverElementId),
                            /*мышка убрана с элемента*/
                            function(){
                                var shipVolume      =   parseInt(jQuery('input[name=ship]:checked').val());
                                var hoverElementId  =   parseInt(jQuery(this).attr("id"));
                                var existElem       =   parseInt(jQuery(this).attr("value"));
                                //alert(existElem);
                                //alert(hoverElementId);
                                //(function(verifyMap,shipVolume,hoverElementId){
                                if (existElem   ===  0){
                                    switch(shipVolume){
                                        case 1:
                                               jQuery(this).css('background-color','red');
                                            break;
                                        case 2:  var rowS       =   parseInt(hoverElementId/10);
                                                 var colS       =   hoverElementId-rowS*10;
                                                 var newId      =   rowS*10+colS+1;

                                                 jQuery(this).css('background-color','red');
                                                 //var newId       =   rowS*10+colS+1;
                                                 var existElem1   =   jQuery("#"+newId).attr("value");
                                                 if (existElem1==0)
                                                    jQuery("#"+newId).css('background-color','red');
                                                //}
                                            break;
                                    }
                                }


                                //jQuery(this).css('background-color','red');



                            });

        for (var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                (function(i,j,map){

                    jQuery('td#'+(i*10+j)).bind('click',function(){
                        var shipVolume      =   parseInt(jQuery('input[name=ship]:checked').val());
                        switch(shipVolume){
                            case 1:
                                    map[i][j]   =   shipVolume;
                                    jQuery('td#'+(i*10+j)).html(map[i][j]);
                                    jQuery('td#'+(i*10+j)).css('background-color','#333');
                                    jQuery('td#'+(i*10+j)).attr('value',shipVolume);
                            break;
                            case 2:
                                    map[i][j]   =   shipVolume ;
                                    map[i][j+1] =   shipVolume ;
                                    
                                    jQuery('td#'+(i*10+j)).html(map[i][j]);
                                    jQuery('td#'+(i*10+j+1)).html(map[i][j+1]);

                                    jQuery('td#'+(i*10+j)).css('background-color','#333');
                                    jQuery('td#'+(i*10+j+1)).css('background-color','#333');
                                    
                                    jQuery('td#'+(i*10+j)).attr('value',shipVolume);
                                    jQuery('td#'+(i*10+j+1)).attr('value',shipVolume);
                            break;
                            
                        }
                       /* map[i][j]=jQuery('input[name=ship]:checked').val();
                        jQuery('td#'+(i*10+j)).html(map[i][j]);
                        jQuery('td#'+(i*10+j)).css('background-color','#333');
                        var shipVolume  =    parseInt(jQuery('input[name=ship]:checked').val());
                        jQuery('td#'+(i*10+j)).attr('value',shipVolume);*/
                    });
                })(i,j,this.map);
            }
        }
    }
};

function go(){
    var tt  =  new MapCreator(null);
    tt.createTable();
    tt.createEventOnAdd();

}