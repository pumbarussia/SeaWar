/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 26.05.11
 * Time: 13:44
 * To change this template use File | Settings | File Templates.
 */

                        /*
                        * Вывод ошибок*/
function echoShipError(err){
    jQuery('#messageWin').html(err);
    jQuery('#messageWin').effect("pulsate", { times:2 }, 500);
}
/*
* Фунция создает в памяти массив для хранения карты и кораблей на ней.*/
var MapCreator  =  function(inMap) {

    /*В элементах массива хранится текущее количество кораблей*/
    this.arrayShip = [];
    this.arrayShip[1] = 0;
    this.arrayShip[2] = 0;
    this.arrayShip[3] = 0;
    this.arrayShip[4] = 0;
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
    /*Функция расчерчивает начальную пустую таблицу*/
    createTable:function(){
                var map =   this.map;
                var table   =   '<table>';
                for (var i=0;i<10;i++){
                    table   +=   '<tr>';
                    for (var j=0;j<10;j++){
                        table   +=   '<td id    =   "'+(i*10+j)+'" value="0" readyPaste="0" >';
                        table   +=   map[i][j];
                        table   +=   '</td>';
                    }
                    table   +=   '</tr>';

                }
                 table   +=   '</table>';
                jQuery('#mapPosition').append(table);
    },

    //TODO Реализовать функцию сохранения
    mapSave:function(map,arrayShip){
        var exeptionShipCount   = "Недостаточное количество кораблей :";
        function validateForm(listShip){
            var i= 1;
            while ((listShip[i]==5-i)&&(i<5))
                i++;
            if (i<5){
                echoShipError(exeptionShipCount+i);
                return false;
            }
            return true;
        }
        jQuery('input#ok').bind('click',function (){
           // (function(map,arrayShip){
                if (validateForm(arrayShip)){
                    console.log(map);
                }
          //  })(this.map,this.arrayShip);
        })
    }    ,
    /*
    * Добавляем обработчики на hover и onclick*/
    createEventOnAdd:function(){
        //var checkedLeft =   function(rowChecked,colChecked,verifyMap){
         /*проверяет текущую клетку на присутствие в ней корабля*/
         function checkThis(rowChecked,colChecked,verifyMap){
             return ((verifyMap[rowChecked][colChecked] == 0));
         }
         /*Проверяет клетку слева от текущей*/
         function checkedLeft(rowChecked,colChecked,verifyMap){
            return ((colChecked <= 0) || (verifyMap[rowChecked][colChecked - 1] == 0));
         }
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
        /*Проверяет левую и правую клетки от текущей*/
        function checkedLeftRight(rowChecked,colChecked,verifyMap){
            return checkedLeft(rowChecked,colChecked,verifyMap)&&checkedRight(rowChecked,colChecked,verifyMap);
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

        /*Проверяет верхнюю границу от текущей*/
        function checkedUpSide(rowChecked,colChecked,verifyMap){
            var currentRow  = rowChecked  -1;
            if (currentRow==-1)
                return true;
            return checkedUp(rowChecked,colChecked,verifyMap)&&checkedLeftRight(currentRow,colChecked,verifyMap);
        }
        /*Проверяет нижнюю границу от текущей*/
        function checkedDownSide(rowChecked,colChecked,verifyMap){
            var currentRow  = rowChecked  +1;
            if (currentRow==10)
                return true;
            return   checkedDown(rowChecked,colChecked,verifyMap)&&checkedLeftRight(currentRow,colChecked,verifyMap);
        }
        /*Горизонтальная секция*/
         /*Проверяет сектор для 1 корабля*/
        function gcheckedSectorOne(rowChecked,colChecked,verifyMap){
             return checkThis(rowChecked,colChecked,verifyMap)&&checkedLeftSide(rowChecked,colChecked,verifyMap)&&checkedRightSide(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,colChecked,verifyMap);
        }
        /*Проверяет сектор для 2 палубного корабля*/
        function gcheckedSectorTwo(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedLeftSide(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked,colChecked+1,verifyMap)&&checkedRightSide(rowChecked,colChecked+1,verifyMap)&&checkedUpDown(rowChecked,colChecked+1,verifyMap);
             return first&&second;
        }
        /*Проверяет сектор для 3 палубного корабля*/
        function gcheckedSectorThree(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedLeftSide(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked,colChecked+1,verifyMap)&&checkedUpDown(rowChecked,colChecked+1,verifyMap);
             var third  =    checkThis(rowChecked,colChecked+2,verifyMap)&&checkedRightSide(rowChecked,colChecked+2,verifyMap)&&checkedUpDown(rowChecked,colChecked+2,verifyMap);
             return first&&second&&third;
        }
         /*Проверяет сектор для 4 палубного корабля*/
        function gcheckedSectorFourth(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedLeftSide(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked,colChecked+1,verifyMap)&&checkedUpDown(rowChecked,colChecked+1,verifyMap);
             var third  =    checkThis(rowChecked,colChecked+2,verifyMap)&&checkedUpDown(rowChecked,colChecked+2,verifyMap);
             var fourth =    checkThis(rowChecked,colChecked+3,verifyMap)&&checkedRightSide(rowChecked,colChecked+3,verifyMap)&&checkedUpDown(rowChecked,colChecked+3,verifyMap);
             return first&&second&&third&&fourth;
        }
        /*Вертикальная секция*/
        /*Проверяет сектор для 2 палубного корабля*/
        function vcheckedSectorTwo(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedUpSide(rowChecked,colChecked,verifyMap)&&checkedLeftRight(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked+1,colChecked,verifyMap)&&checkedDownSide(rowChecked+1,colChecked,verifyMap)&&checkedLeftRight(rowChecked+1,colChecked,verifyMap);
             return first&&second;
        }
        /*Проверяет сектор для 3 палубного корабля*/
        function vcheckedSectorThree(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedUpSide(rowChecked,colChecked,verifyMap)&&checkedLeftRight(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked+1,colChecked,verifyMap)&&checkedLeftRight(rowChecked+1,colChecked,verifyMap);
             var third  =    checkThis(rowChecked+2,colChecked,verifyMap)&&checkedDownSide(rowChecked+2,colChecked,verifyMap)&&checkedLeftRight(rowChecked+2,colChecked,verifyMap);
             return first&&second&&third;
        }
        /*Проверяет сектор для 4 палубного корабля*/
        function vcheckedSectorFourth(rowChecked,colChecked,verifyMap){
             var first  =    checkThis(rowChecked,colChecked,verifyMap)&&checkedUpSide(rowChecked,colChecked,verifyMap)&&checkedLeftRight(rowChecked,colChecked,verifyMap);
             var second =    checkThis(rowChecked+1,colChecked,verifyMap)&&checkedLeftRight(rowChecked+1,colChecked,verifyMap);
             var third  =    checkThis(rowChecked+2,colChecked,verifyMap)&&checkedLeftRight(rowChecked+2,colChecked,verifyMap);
             var fourth =    checkThis(rowChecked+3,colChecked,verifyMap)&&checkedDownSide(rowChecked+3,colChecked,verifyMap)&&checkedLeftRight(rowChecked+3,colChecked,verifyMap);
             return first&&second&&third&&fourth;
        }
        var verifyMap   =   this.map;
        /*
        * Вешаем событие на наведение*/
        jQuery('td').hover(

                            /*Мышка наведена на элемент*/
                            function(){
                                //выбранный тип корабля
                                var shipVolume      =   parseInt(jQuery('input[name=ship]:checked').val());
                                //Вертикальное или горизонтальное расположение
                                var shipDirection   =   parseInt(jQuery('input[name=shipDirection]:checked').val());
                                //Ид элемента на который наведена мышь
                                var hoverElementId  =   parseInt(jQuery(this).attr("id"));
                                /*Отображает наведение*/
                                function    hoverCell(id){
                                    jQuery(id).css('background-color','green');
                                    jQuery(id).attr('readyPaste','1');
                                }
                                /*Функция проверяет, можно ли выделять клетку(несколько клеток), это зависит от
                                * положения кораблей*/
                                var checkedPasteCapability   =   function(id,volume,verifyMap,hvfunction){
                                                                     var row =   parseInt(id/10);
                                                                     var col =   id-row*10;
                                                                     //alert(verifyMap[row][col]+'asdfs');
                                                                     
                                                                           return hvfunction(row,col,verifyMap);
                                                                     
                                                                 };


                                //по вертикали или по горизонтали ищем следующую палубу корабля(в случае если палуб больше 1)
                                var additionalId;
                                if (shipDirection   ==  1)
                                    additionalId  =   1;
                                else
                                    additionalId  =   10;
                                //var rowS =   parseInt(hoverElementId/10);
                                //var colS =   hoverElementId-rowS*10;
                                var newId           =   hoverElementId+additionalId;
                                var newIdThree      =   newId+additionalId;
                                var newIdFourth     =   newIdThree+additionalId;
                                var fName=null;
                                switch(shipVolume){
                                    case 1:
                                            if(checkedPasteCapability(hoverElementId,1,verifyMap,gcheckedSectorOne)){
                                                hoverCell(this);
                                                //readyCellToClick(this);
                                            }
                                        break;
                                    case 2:
                                            if (shipDirection==1)
                                                fName   =  gcheckedSectorTwo;
                                            else    fName   =  vcheckedSectorTwo;
                                            if(checkedPasteCapability(hoverElementId,2,verifyMap,fName)){
                                                hoverCell(this);
                                                //readyCellToClick(this);
                                                hoverCell("#"+newId);

                                            }
                                        break;
                                    case 3: if (shipDirection==1)
                                                fName   =  gcheckedSectorThree;
                                            else    fName   =  vcheckedSectorThree;

                                            if(checkedPasteCapability(hoverElementId,3,verifyMap,fName)){
                                                hoverCell(this);
                                                hoverCell("#"+newId);
                                                hoverCell("#"+newIdThree);
                                            }
                                        break;
                                    case 4: if (shipDirection==1)
                                                fName   =  gcheckedSectorFourth;
                                            else    fName   =  vcheckedSectorFourth;
                                            if(checkedPasteCapability(hoverElementId,4,verifyMap,fName)){
                                                hoverCell(this);
                                                hoverCell("#"+newId);
                                                hoverCell("#"+newIdThree);
                                                hoverCell("#"+newIdFourth);
                                            }
                                    break;
                                }},      //(this.map,shipVolume,hoverElementId),
                            /*мышка убрана с элемента*/
                            function(){
                                    var shipVolume      =   parseInt(jQuery('input[name=ship]:checked').val());
                                    var shipDirection   =   parseInt(jQuery('input[name=shipDirection]:checked').val());
                                    var hoverElementId  =   parseInt(jQuery(this).attr("id"));
                                    var existElem       =   parseInt(jQuery(this).attr("value"));
                                    /*Фунция очистки клетки после наведения*/
                                    function clearCell (id){
                                        jQuery(id).css('background-color','red');
                                        jQuery(id).attr('readyPaste','0');
                                    }
                                    var additionalId;
                                    if (shipDirection   ==  1)
                                        additionalId  =   1;
                                    else
                                    additionalId  =   10;
                                    if (existElem   ===  0){
                                        var newId        =   hoverElementId+additionalId;
                                        var existElem1   =   jQuery("#"+newId).attr("value");

                                        switch(shipVolume){
                                            case 1:
                                                     clearCell (this);
                                            break;
                                            case 2:
                                                     clearCell (this);
                                                     if (existElem1==0)
                                                        clearCell ("#"+newId);
                                                    
                                            break;
                                            case 3:  var newIdThree   =   newId+additionalId;
                                                     var existElem2   =   jQuery("#"+newIdThree).attr("value");
                                                     clearCell (this);
                                                     if (existElem1==0){
                                                        clearCell ("#"+newId);
                                                         if (existElem2==0){
                                                             clearCell ("#"+newIdThree);
                                                         }
                                                     }
                                            break;
                                            case 4:  var newIdThree   =   newId+additionalId;
                                                     var newIdFourth  =   newId+2*additionalId;
                                                     var existElem2   =   jQuery("#"+newIdThree).attr("value");
                                                     var existElem3   =   jQuery("#"+newIdFourth).attr("value");
                                                     clearCell (this);
                                                     if (existElem1==0){
                                                         clearCell ("#"+newId);
                                                         if (existElem2==0){
                                                          //   alert("asd1");
                                                            clearCell ("#"+newIdThree);
                                                            if (existElem3==0){
                                                                clearCell ("#"+newIdFourth);
                                                            }
                                                         }
                                                     }
                                            break;
                                        }
                                    }
                            });
        /*
        * Перебираем все поле */
        for (var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                (function(i,j,map,arrayShip){
                    /*Фунция устанавливает значение в клетку соответствующее типу корабля*/
                    var errorPositionShip   =   'Выберите другую позицию для кораблика';
                    var errorVolumeShip     =   'Вы привысили допустимое количество кораблей данной модели';
                    /*
                    * Проверка клетки, на возможность заполнения ее кораблем*/
                    function cellVerify(i,j){
                         var readyPaste  = parseInt(jQuery('td#'+(i*10+j)).attr('readyPaste'));
                         return (readyPaste  ==  1);
                    }

                    /*
                    * Запоминает в массиве клетку корабля
                    * выводит клетку на экран*/
                    function cellFill(i,j,map,shipVolume){
                            map[i][j]   =   shipVolume;
                            jQuery('td#'+(i*10+j)).html(map[i][j]);
                            jQuery('td#'+(i*10+j)).css('background-color','#333');
                            jQuery('td#'+(i*10+j)).attr('value',shipVolume);
                            jQuery('td#'+(i*10+j)).attr('readyPaste',2);
                    }
                    /*и Навешивает событие на каждую  onclick*/
                    jQuery('td#'+(i*10+j)).bind('click',function(){
                        var additionalI;
                        var additionalJ;
                        var shipDirection   =   parseInt(jQuery('input[name=shipDirection]:checked').val());
                        var shipVolume      =   parseInt(jQuery('input[name=ship]:checked').val());
                        if (shipDirection   ==  1){
                                    additionalI  =   0;
                                    additionalJ  =   1;
                        }
                                else{
                                    additionalI  =   1;
                                    additionalJ  =   0;
                        }
                        if(cellVerify(i,j)){
                        switch(shipVolume){
                            case 1:     if (arrayShip[1]<4){
                                            cellFill(i,j,map,shipVolume);
                                            arrayShip[1]+=1;
                                        }
                                        else
                                                echoShipError(errorVolumeShip);
                            break;
                            case 2:     if (arrayShip[2]<3){
                                            cellFill(i,j,map,shipVolume);
                                            cellFill(i+additionalI,j+additionalJ,map,shipVolume);
                                            arrayShip[2]+=1;
                                        }
                                        else
                                                echoShipError(errorVolumeShip);

                            break;
                            case 3:     if (arrayShip[3]<2){
                                            cellFill(i,j,map,shipVolume);
                                            cellFill(i+additionalI,j+additionalJ,map,shipVolume);
                                            cellFill(i+2*additionalI,j+2*additionalJ,map,shipVolume);
                                            arrayShip[3]+=1;
                                        }
                                        else
                                        echoShipError(errorVolumeShip);

                            break;
                            case 4:     if (arrayShip[4]<1){
                                            cellFill(i,j,map,shipVolume);
                                            cellFill(i+additionalI,j+additionalJ,map,shipVolume);
                                            cellFill(i+2*additionalI,j+2*additionalJ,map,shipVolume);
                                            cellFill(i+3*additionalI,j+3*additionalJ,map,shipVolume);
                                            arrayShip[4]+=1;
                                        }
                                        else
                                        echoShipError(errorVolumeShip);
                            break;
                        }}
                            else echoShipError(errorPositionShip);

                    });
                })(i,j,this.map,this.arrayShip);
                
            }
        }
    }
};

function go(){
    var tt  =  new MapCreator(null);
    tt.createTable();
    tt.createEventOnAdd();
    tt.mapSave(tt.map,tt.arrayShip);
    /*jQuery('input#ok').bind('click',function (){
            
            console.log(tt.map);

      });*/
}