/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 22.06.11
 * Time: 12:41
 * To change this template use File | Settings | File Templates.
 */

/*Exeption type
* limit ship on map overflow*/
function exceptionValueShip(){
    //
}
/*Загружает список кораблей в карту, просталяет количество кораблей определенного типа*/
function loadShipInMap(listShip,shipLimit){
    var SHIP_ON_MAP   =   10;

    var MAP_ROW       =   10;
    var MAP_COL       =   10;
    var map           = new Array(MAP_ROW);
    var i,j,k;

    for ( i =0;i<MAP_ROW;i++){
        map[i] =   new Array(MAP_COL);
        for  (j=0;j<MAP_COL;j++){
            map[i][j]  =   0;
        }
    }
    if (listShip!==null){
        var arrLength     =   listShip.length;
        if (arrLength<=SHIP_ON_MAP){
            for (i=0;i<arrLength;i++){
                for(j=listShip[i].startPos[0];j<=listShip[i].endPos[0];j++){
                    for(k=listShip[i].startPos[1];k<=listShip[i].endPos[1];k++){
                        map[j][k]  =   listShip[i].deck;
                    }
                }
            shipLimit[listShip[i].deck]--;
            }
        }
        else  throw exceptionValueShip;
    }
        //One deck
    return  map;
}

/*Функция вычисления столбца с строчки по ID
* */
function calculateRowCol(id){
    var obj =   new Object();
    obj['row']    =   parseInt(id/10);
    obj['col']    =   id-obj['row']*10;
    return obj;
}

/*function generateId(){
    var today		=	new Date();
	today   		=	''+today.getTime();
	var rand_num	=	Math.random();
	return  hex_md5(today)+rand_num.toFixed(6)*1000000;
}*/
//Класс корабль
var Ship    =   function(deck) {
    this.shipId         =   0;//generateId();
    this.deck           =   deck;// количество палуб
    this.startPos       =   [0,0];
    this.endPos         =   [0,0];
    this.polarization   =   1;//1 -gorisontal; 2 - vertical
    //this.drawed         =   false;// Нарисован корабль или нет
    this.stayHover      =   2; //для чего используется объект корабль, 0 удаление, 1 наведение, 2 вставка
};
Ship.prototype={
    /*idDrapwed:function(){
        return this.drawed;
    },*/
    /*setDrawed:function(){
        this.drawed =   true;
    },*/
    setId:function(id){
        this.shipId =   id;
    },

    getId:function(){
      return this.shipId;
    },

    setPosition:function(id){
        var obj =   calculateRowCol(id);
        var additionalId;

        if (this.polarization   ===  1)
            additionalId  =   1;
        else
            additionalId  =   10;

        var newId = calculateRowCol(id + additionalId * (this.deck - 1));
        this.startPos[0]    =   obj['row'];
        this.startPos[1]    =   obj['col'];
        this.endPos[0]      =   newId['row'];
        this.endPos[1]      =   newId['col'];

    }
};
//пример для отладки загрузки
/*function createShip(listship,deck){
    var tempship =   new Ship(deck);
    listship[tempship.shipId]   =   tempship;
    return listship;
}*/
function createListShip(list){
        var listShip =   new Array (10);
        
        listShip[0]  =   new Ship(1);
        listShip[1]  =   new Ship(1);
        listShip[2]  =   new Ship(1);
        listShip[3]  =   new Ship(1);

        listShip[4]  =   new Ship(2);
        listShip[5]  =   new Ship(2);
        listShip[6]  =   new Ship(2);

        listShip[7]  =   new Ship(3);
        listShip[8]  =   new Ship(3);

        listShip[9]  =   new Ship(4);
        if (list===null){
            for (var i=0;i<10;i++){
                listShip[i].setId(i);
            }
            listShip[0].startPos =   [0,0];
            
            listShip[0].endPos   =   [0,0];
            listShip[1].startPos =   [3,0];
            listShip[1].endPos   =   [3,0];

            listShip[2].startPos =   [5,0];
            listShip[2].endPos   =   [5,0];
            listShip[3].startPos =   [7,0];
            listShip[3].endPos   =   [7,0];
            //two deck
            listShip[4].startPos =   [0,2];
            listShip[4].endPos   =   [0,3];
            listShip[4].polarization=1;

            listShip[5].startPos =   [3,2];
            listShip[5].endPos   =   [3,3];
            listShip[5].polarization=1;

            listShip[6].startPos =   [5,2];
            listShip[6].endPos   =   [5,3];
            listShip[6].polarization=1;
            // three deck
            listShip[7].startPos =   [0,5];
            listShip[7].endPos   =   [0,7];
            listShip[7].polarization=1;
            listShip[8].startPos =   [3,5];
            listShip[8].endPos   =   [3,7];
            listShip[8].polarization=1;
            //four deck
            listShip[9].startPos =   [6,9];
            listShip[9].endPos   =   [9,9];
            listShip[9].polarization=2;

        }
    //alert(JSON.stringify(listShip));
    return listShip;
}
/*var listOfShips =   function (){
    this.countShip  =   0;
    this.listShip   =   [];
};
listOfShips.prototype   =   {
    addShip:function(ship){
        this.listShip   =   this.listShip.push(ship);
        this.countShip++;

    },
    remove:function (id){
        if ((id<this.countShip)&&(id>=0)){
            this.listShip.removed(id);
            this.countShip--;
        }
        else return -1;
    }
};*/