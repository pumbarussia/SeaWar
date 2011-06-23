/**
 * Created by JetBrains WebStorm.
 * User: ubuntu_cry
 * Date: 22.06.11
 * Time: 15:21
 * To change this template use File | Settings | File Templates.
 */
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
                arrayLink[2]   =  link +'22.png'+addText;
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
                    switch (ship.deck){
                        case 1: jQuery('td#'+(j*10+k)).css('background-image',links[0]);
                                //jQuery('td#'+(j*10+k)).css('background-color','#333');
                        break;
                        case 2:
                                if (count==0)
                                    jQuery('td#'+(j*10+k)).css('background-image',links[0]);
                                else
                                    jQuery('td#'+(j*10+k)).css('background-image',links[1]);
                                //count++;
                        break;
                        case 3: if (count==0)
                                    jQuery('td#'+(j*10+k)).css('background-image',links[0]);
                                if (count==1)
                                    jQuery('td#'+(j*10+k)).css('background-image',links[1]);
                                if (count==2)
                                    jQuery('td#'+(j*10+k)).css('background-image',links[2]);
                                //count++;
                        break;
                        case 4: if (count==0)
                                jQuery('td#'+(j*10+k)).css('background-image',links[0]);
                                if ((count==1)||(count==2))
                                    jQuery('td#'+(j*10+k)).css('background-image',links[1]);
                                if (count==3)
                                    jQuery('td#'+(j*10+k)).css('background-image',links[2]);
                                //count++;
                        break;

                    }
                    jQuery('td#'+(j*10+k)).attr('readyPaste','1');
                    count++;
                }
            }
    //console.log(links);
}
function rectangleAllShip(shipList){
    var i;

    for (i=0;i<shipList.length;i++){

        //if (!shipList[i].drawed){
            rectangleShip(shipList[i]);
       // }
       // shipList[i].drawed  =   true;
    }
}
