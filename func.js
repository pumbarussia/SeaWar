/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 27.06.11
 * Time: 13:09
 * To change this template use File | Settings | File Templates.
 */
/*
* Получить количество палуб, которое задано в конструкторе*/
function getShipDeck(){
    return parseInt(jQuery('input[name=ship]:checked').val());
}
/*
* получить расположение корабля*/
function getShipDerection(){
    return parseInt(jQuery('input[name=shipDirection]:checked').val());
}
function getKillShip(){
    return  parseInt(jQuery('input[name=killShip]:checked').val());
}
/*Функция удаление элеменита(работает с массивом как со списком)
* */
Array.prototype.removed = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
/*
* Изменить ID корабля на карте*/
function restructId(ship){
    var j,k;
    for(j=ship.startPos[0];j<ship.endPos[0]+1;j++){
        for(k=ship.startPos[1];k<ship.endPos[1]+1;k++){
            jQuery('td#'+(j*10+k)).attr('shipId',ship.shipId);
        }
    }
}
/*
* Изменить ID всех Кораблей(после удаления)*/
function resctructIdOnTable(listShip){
        
        for (var i=0, l = listShip.length;i<l;i++){
            restructId(listShip[i]);
        }
}
/*
* Удаление корабля с Id = index, и перераспределение ID */
function deleteShip(shipList,index){
    shipList.removed(index);
    for (var i=0, l= shipList.length;i<l;i++){
        shipList[i].setId(i);
    }
}