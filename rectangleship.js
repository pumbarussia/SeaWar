/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 22.06.11
 * Time: 15:21
 * To change this template use File | Settings | File Templates.
 */
function getLinkBackground(){
    return 'url("images/back.png")';
}
function getLinkImage(ship){
    var templateText;
    if (ship.polarization==1){
        templateText='g';
    }
    else {templateText='h';}
    //'url("'+link+'")'
    var link   =   'url("images/'+templateText;
    var addText =   '")';
    var arrayLink   =   [];
    switch(ship.deck){
        case 1: arrayLink[0]   =  link +'1.png'+addText;
                break;
        case 2: arrayLink[0]   =  link +'21.png'+addText;
                arrayLink[1]   =  link +'22.png'+addText;
                break;
        case 3: arrayLink[0]   =  link +'21.png'+addText;
                arrayLink[1]   =  link +'3.png'+addText;
                arrayLink[2]   =  link +'22.png'+addText;
                break;
        case 4: arrayLink[0]   =  link +'21.png'+addText;
                arrayLink[1]   =  link +'3.png'+addText;
                arrayLink[2]   =  link +'3.png'+addText;
                arrayLink[3]   =  link +'22.png'+addText;
                break;
    }
    return arrayLink;
}
function rectangleShip(ship){
       var j,k;
       var count    =   0;
       var links    =   getLinkImage(ship);
       for(j=ship.startPos[0];j<ship.endPos[0]+1;j++){
                for(k=ship.startPos[1];k<ship.endPos[1]+1;k++){

                    jQuery('td#'+(j*10+k)).css('background-image',links[count]);

                    jQuery('td#'+(j*10+k)).attr('readyPaste',ship.stayHover);
                    count++;
                }
            }
    //console.log(links);
}
function cellFill(map,ship){
    var j,k;
    var count    =   0;
    var links    =   getLinkImage(ship);
    for(j=ship.startPos[0];j<ship.endPos[0]+1;j++){
        for(k=ship.startPos[1];k<ship.endPos[1]+1;k++){
            map[j][k]   =   ship.deck;
            jQuery('td#'+(j*10+k)).attr('value',ship.deck);
            jQuery('td#'+(j*10+k)).css('background-image',links[count]);
            jQuery('td#'+(j*10+k)).attr('readyPaste',ship.stayHover);
            count++;
        }
    }
}


/*
* вывести все корабли, используется при загрузке карты*/
function rectangleAllShip(shipList){
    var i;

    for (i=0;i<shipList.length;i++){

        //if (!shipList[i].drawed){
            rectangleShip(shipList[i]);
       // }
       // shipList[i].drawed  =   true;
    }
}
/*
* очистить ячейки занимаемую кораблем*/
function clearRectangleShip(ship){
       var j,k;
       var links    =   getLinkBackground(ship);
       for(j=ship.startPos[0];j<ship.endPos[0]+1;j++){
                for(k=ship.startPos[1];k<ship.endPos[1]+1;k++){

                        jQuery('td#'+(j*10+k)).css('background-image',links);
                        jQuery('td#'+(j*10+k)).attr('readyPaste','0');

                }
            }
}
