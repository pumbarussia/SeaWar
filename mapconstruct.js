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
var MapCreator  =  function() {
    /*В элементах массива хранится текущее количество кораблей*/
    this.shipId       = [];
    this.shipId[0]    = 0;//id Следующего коробля при вставке.
    this.listShip     = [];//listShip;//Список объектов типа Корабль
    this.limitShip    = [];//список лимита по кораблям
    this.limitShip[1] = 4;
    this.limitShip[2] = 3;
    this.limitShip[3] = 2;
    this.limitShip[4] = 1;
    this.nameMap      = '';// Название карты
    this.table        = '';// Таблица которая выводится на экран
    this.map          = null;
    //this.hoverShip    = new Ship(1);
    /* this.getPrivateShip =function (){
        return hoverShip;
    };*/
    /*создание в памяти массив для хранения карты и кораблей на ней.*/
    //var inMap   =   loadMap(listShip);

};
MapCreator.prototype  =  {
    //hoverShip:Object,
    loadListShipInMap: function(listShip)   {
        this.listShip    =   listShip;
        var MAP_LOAD      =   true;

        try{
            this.map    =   loadShipInMap(this.listShip,this.limitShip);
        }
        catch (e){
            alert ('buka');
            // Карта некорректная
        return !MAP_LOAD;}

        if (this.listShip    !==  null){
            this.nameMap      = 'MyMaps';
            this.shipId[0]    = this.listShip.length;
        }
        else {this.listShip =   [];}
          //console.log(this.limitShip);
        return MAP_LOAD;
    }
    /*Функция расчерчивает начальную пустую таблицу
    * и создает массив под карту*/,
    createTable:function(){
        //var map =   this.map;
        var table   =   '<table>';
        for (var i=0;i<10;i++){
            table   +=   '<tr>';
            for (var j=0;j<10;j++){
                table   +=   '<td id    =   "'+(i*10+j)+'" readyPaste="0" shipId="-1">';//'" value="'+map[i][j]+
                //table   +=   map[i][j];
                table   +=   '</td>';
            }
            table   +=   '</tr>';
        }
        table   +=   '</table>';
        return this.table=table;
    },

    drowTable:function(){
        jQuery('#mapPosition').append(this.table);
        if (this.listShip!==null)
            rectangleAllShip(this.listShip);
    },

    //TODO Реализовать функцию сохранения
    mapSave:function(map,arrayShip){
        var exeptionShipCount   = "Недостаточное количество кораблей :";
        var mapSaveSuccess      = "your map saved with name ";

        function validateForm(listShip){
            var i= 1;
            while ((listShip[i]===0)&&(i<5))
                i++;
            if (i<5){
                echoShipError(exeptionShipCount+i);
                return false;
            }
            return true;
        }


        (function(mapName){
            jQuery('input#Save').bind('click',function (){
               // (function(map,arrayShip){
                    if (validateForm(arrayShip)){
                        //var tt  =   ajaxSaveForm(map);
                        openSaveForm(mapName);
                        console.log(map);
                         //alert(JSON.stringify(map));
                        //echoShipError(mapSaveSuccess+mapName.nameMap);
                    }
              //  })(this.map,this.arrayShip);
            });
             jQuery('input#ok').bind('click',function (){
               // (function(map,arrayShip){
                        echoShipError(mapSaveSuccess+mapName.nameMap);
             });
        }(this));
    }    ,
    /*
    * Добавляем обработчики на hover и onclick*/
    createEventOnAdd:function(){
        //var checkedLeft =   function(rowChecked,colChecked,verifyMap){
         /*проверяет текущую клетку на присутствие в ней корабля*/
         function checkThis(rowChecked,colChecked,verifyMap){
             return ((verifyMap[rowChecked][colChecked] === 0));
         }
         /*Проверяет клетку слева от текущей*/
         function checkedLeft(rowChecked,colChecked,verifyMap){
            return ((colChecked <= 0) || (verifyMap[rowChecked][colChecked - 1] === 0));
         }
        /*Проверяет клетку справа от текущей*/
         function   checkedRight(rowChecked,colChecked,verifyMap){
            return ((colChecked >= 9) || (verifyMap[rowChecked][colChecked + 1] === 0));
         }
         /*Проверяет клетку сверху от текущей*/
         function   checkedUp(rowChecked,colChecked,verifyMap){
             return (( rowChecked<=0) || (verifyMap[rowChecked-1][colChecked] === 0));
         }
        /*Проверяет клетку сниза от текущей*/
         function   checkedDown(rowChecked,colChecked,verifyMap){
            return ((rowChecked  >= 9) || (verifyMap[rowChecked+ 1][colChecked ] === 0));
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
            if (currentCol===-1)
                return true;
            return checkedLeft(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,currentCol,verifyMap);
        }
        /*Проверяет Правую сторону от текущей*/
        function checkedRightSide(rowChecked,colChecked,verifyMap){
            var currentCol  = colChecked  +1;
            if (currentCol===10)
                return true;
            return   checkedRight(rowChecked,colChecked,verifyMap)&&checkedUpDown(rowChecked,currentCol,verifyMap);
        }

        /*Проверяет верхнюю границу от текущей*/
        function checkedUpSide(rowChecked,colChecked,verifyMap){
            var currentRow  = rowChecked  -1;
            if (currentRow===-1)
                return true;
            return checkedUp(rowChecked,colChecked,verifyMap)&&checkedLeftRight(currentRow,colChecked,verifyMap);
        }
        /*Проверяет нижнюю границу от текущей*/
        function checkedDownSide(rowChecked,colChecked,verifyMap){
            var currentRow  = rowChecked  +1;
            if (currentRow===10)
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
        //var idd=this.shipId[0];
        /*
        * Вешаем событие на наведение*/
        jQuery('td').hover(
            /*Мышка наведена на элемент*/
            function(){
                    //Вставка или удаление корабля
                    var killShip      =   getKillShip();
                    if (killShip===0){
                        //выбранный тип корабля
                        var shipVolume      =   getShipDeck();
                        //Вертикальное или горизонтальное расположение
                        var shipDirection   =   getShipDerection();
                        var hoverShip       =  new Ship(shipVolume);
                        hoverShip.polarization     =   shipDirection;
                        hoverShip.stayHover        =    1;
                        //Ид элемента на который наведена мышь
                        var hoverElementId      =   parseInt(jQuery(this).attr("id"));
                        hoverShip.setPosition(hoverElementId);
                        /*Функция проверяет, можно ли выделять клетку(несколько клеток), это зависит от
                        * положения кораблей*/
                        var checkedPasteCapability   =   function(id,volume,verifyMap,hvfunction){
                                                                    var row =   parseInt(id/10);
                                                                    var col =   id-row*10;
                                                                    return hvfunction(row,col,verifyMap);
                                                                     };

                        var fName=null;
                        switch(shipVolume){
                            case 1:
                                    fName   =   gcheckedSectorOne;
                            break;
                            case 2: if (shipDirection===1)
                                        fName   =  gcheckedSectorTwo;
                                    else    fName   =  vcheckedSectorTwo;
                            break;
                            case 3: if (shipDirection===1)
                                        fName   =  gcheckedSectorThree;
                                    else    fName   =  vcheckedSectorThree;
                            break;
                            case 4: if (shipDirection===1)
                                        fName   =  gcheckedSectorFourth;
                                    else    fName   =  vcheckedSectorFourth;
                            break;
                        }
                        if(checkedPasteCapability(hoverElementId,hoverShip.deck,verifyMap,fName)){
                            showShip(hoverShip);
                        }
                    }
            },      //(this.map,shipVolume,hoverElementId),
            /*мышка убрана с элемента*/
            function(){
                    var shipVolume      =   getShipDeck();
                    var shipDirection   =   getShipDerection();
                    var hoverElementId  =   parseInt(jQuery(this).attr("id"));
                    //присутствовало ли наведение
                    var hoverActiv       =   parseInt(jQuery(this).attr("readyPaste"));
                    if (hoverActiv   ===  1){
                        var hoverShip       =  new Ship(shipVolume);
                        hoverShip.polarization     =   shipDirection;
                        hoverShip.setPosition(hoverElementId);
                        clearShowShip(hoverShip);
                    }
            }
        );

        /*
        * Перебираем все поле */
        for (var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                (function(i,j,map,limitShip,listShips,id){
                    //var id  =   0;
                    /*Фунция устанавливает значение в клетку соответствующее типу корабля*/
                    var errorPositionShip   =   'Выберите другую позицию для кораблика';
                    var errorVolumeShip     =   'Вы привысили допустимое количество кораблей данной модели';
                    /*
                    * Проверка клетки, на возможность заполнения ее кораблем*/
                    function cellVerify(i,j){
                         var readyPaste  = parseInt(jQuery('td#'+(i*10+j)).attr('readyPaste'));
                         return (readyPaste  ===  1);
                    }

                    /*и Навешивает событие на каждую  onclick*/
                    jQuery('td#'+(i*10+j)).bind('click',function(){
                        var killShip      =   getKillShip();
                        var hoverShip;
                        if (killShip===0){// вставка
                            var shipDirection   =   getShipDerection();
                            var shipVolume      =   getShipDeck();
                            hoverShip           =  new Ship(shipVolume);
                            hoverShip.setId(id[0]);
                            hoverShip.polarization     =   shipDirection;
                            hoverShip.setPosition(i*10+j);
                            //hoverShip.stayHover =   2;
                            if(cellVerify(i,j)){
                                if (limitShip[hoverShip.deck]>0){
                                    //hoverShip.setId( generateId());
                                    cellFill(map,hoverShip);
                                    limitShip[hoverShip.deck]       -=1;
                                    hoverShip.setDrawed();
                                    listShips[hoverShip.getId()]    =   hoverShip;
                                    id[0]++;
                                }
                                else    echoShipError(errorVolumeShip);
                            }
                            else echoShipError(errorPositionShip);
                        }
                        else if (killShip===1){///удаление
                                var readyPaste  =  parseInt(jQuery('td#'+(i*10+j)).attr('readyPaste'));
                                if  (readyPaste  === 2){
                                    var hoverElementId      =   parseInt(jQuery(this).attr("shipId"));
                                    //console.log(hoverElementId);
                                    deleteFillShip(map,listShips[hoverElementId]);
                                    limitShip[listShips[hoverElementId].deck]+=1;
                                    deleteShip(listShips,hoverElementId);
                                    id[0]--;
                                    resctructIdOnTable(listShips);
                                 }
                        }
                        //console.log(id[0]);
                        //console.log('atata');
                    });
                })(i,j,this.map,this.limitShip,this.listShip,this.shipId );
                
            }
        }
    }
};

function go(){
    var tt  =  new MapCreator();
    tt.loadListShipInMap(null);
    tt.createTable();
    tt.drowTable();
    tt.createEventOnAdd();
    tt.mapSave(tt.map,tt.limitShip);

}

function load(){
    var listShip    =   createListShip(null);
    var MAP_INCORRECT   =   'loading map incorrect';
    var tt  =  new MapCreator();
    if (tt.loadListShipInMap(listShip)){
        
        tt.createTable();
        tt.drowTable();
        tt.createEventOnAdd();
        tt.mapSave(tt.map,tt.limitShip);
    }
    else echoShipError(MAP_INCORRECT);
}