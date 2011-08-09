/**
 * Created by JetBrains WebStorm.
 * User: spec1al
 * Date: 01.08.11
 * Time: 18:14
 * To change this template use File | Settings | File Templates.
 */


    "1")Выбрали игрока в списке
        "Нажали отправить приглашение"
        (radio button - список активных игроков. Кнопка ОК )
         список активных игроков - Получаем с сервера при открытии страницы, обновляем каждую минуту по таймеру.

        У каждого игрока есть запись в БД
            avaliable - есть ли у игрока неотмеченные приглашения
                (0  -   Свободен для принятия приглашения
                1  -   Занят приглашением/находится в процессе игры)
            IdPartner - Id игрока отправившего приглашение
            decision  - Решение принятое игроком(принять приглашение/отказать)
                0   -   default
                1   -   Игрок принял приглашение
                2   -   Игра началась/в процессе
                3   -   Игра закончилась  / "FOCUS"
                4   -   Отказ, в присоединении к игре
        При отправлении приглашении На определенный id в таблице  игрока, которому отправили приглашение Пишем
        (в случае если он не занят)
            avaliable - Занят
            IdPartner - Id игрока отправившего приглашение
            decision  - 0 (по дефолту)
            "Игрок отправивший приглашение начинает опрашивать флаг decision"
        (Игрок занят)
                Отправляется ответ, о том что игрок занят

    "2")"Если игрок принял приглашение"
            Выставляет в таблицы обоих игроков значения
                avaliable - 1 (Занят)
                IdPartner - Id игрока отправившего приглашение
                decision  - 1 (по дефолту)
        Игрок не принл приглашение
            Игрок отклонивший приглашение выставляет у себя флаг "decision = 4" // отказано в подключении
            Игрок посылающий приглашение прочитав флаг, говорит что он прочитал "Непонятно как реализовывать"

    
    "3")Синхронизируем на начало
        Выставляем у обоих игроков decision =   2 // В процессе игры
        Начинаем считывать "управляющие команды" в канале
        "Управляющие команды"
            startWorkWithMap    -   Игроки приняли приглашение друг друга//
            StartMatch          -    Началась игра
            EndMatch            -   Матч завершен
            breakMatch          -   Матч закончен одной из сторон
            playerSurrender     -   игрок сдался
            firstStep           -   Чей ход первый (0,1)// Рандомом пока

    "4")игроки заполняют или подгружают свои карты

            По готовности, Нажимают "Ок"
            Отправляют в канал сообщение  "StartMatch"

    "5")определяем кто первый ходит 
            Отправляется в канал "firstStep".
    "6")Запускаем старт игры
            отправляем в канал "StartMatch"
    "7")игроки ходят по очереди.
            Общая таблица, с порядком ходов
                и запись которая отвечает за то чей ход
                    Первый кто ходит выставляет туда свой ИД
                        Как только он сходил, записывает туда 0
                        
            
    Кто первый потопил все корабли соперника - победил

    При завершении всем отправляется сообщение о завершении
    В канал отправляет сообщение



    ///
    "Комет сервер"
    РЕализовать на "JAVA", пока непонятно что как.
    //
    Интерпретатор Команд пришедших в канал
<">ЛОГИКА ОБРАБОТКИ СООБЩЕНИЙ<">"
    "Установлено сообщение с сервером"

    Начало цикла

    1) Клиент ждет сообщения от сервера.
        Сервер присылает сообщение :(a) Сообщение чата
                                    б)  Команду на переход в состояние (игры/завершения/ожидания игрока/
                                    в)Хода))
    2) Функция определяет какое сообщение пришло, проводишь верификацию по формату.

            управление
            Ход
            Чат

    3) В случае корректного формата передает в нужную процедуру управление
        Процедура выполняет действие
        Пишет в канал

        Ответ некорректен, запрос серверу на перепосылку сообщения.ё

    End цикла



    @Формат JSON@
/--/ СООБЩЕНИЯ СЕРВЕРА
    //Частные поля -  "Управление."

{   "indifier"      : "<Идентификатор соединения>",     // Генерируется сервером при первом обращении клиента
    "typeMessage"   : "<Тип сообщения>",                //  1- Управление, 2 - Ход, 3 - Чат
    "commandName"   :"<Управляющая команда>",
    "timestamp"     : "<Время отправки сообщения>",     //  в какой момент сообщения отправил сервер
}

 //Частные поля -  "Ход"

{   "indifier"      : "<Идентификатор соединения>",     // Генерируется сервером при первом обращении клиента
    "typeMessage"   : "<Тип сообщения>",                //  1- Управление, 2 - Ход, 3 - Чат
    "pointShot"     :{"X":"<Х кордината>",                ""
                      "У":"<У кордината> "},
    "timestamp"     : "<Время отправки сообщения>",     //  в какой момент сообщения отправил сервер
}

 //Частные поля -  "чат"

{   "indifier"      : "<Идентификатор соединения>",     // Генерируется сервером при первом обращении клиента
    "typeMessage"   : "<Тип сообщения>",                //  1- Управление, 2 - Ход, 3 - Чат
    "textArea"      : "<Сообщение >",                ""
    "timestamp"     : "<Время отправки сообщения>",     //  в какой момент сообщения отправил сервер
}

/--/СОобщения клиента


    //Читает пришедшее сообщение
var error = {   "notCorrectTypeMessage":1,
                "tuesday":2,
                "wednesday":3           };

    function readInputMessage(message){
        /*Функция проверяет корректность пришедшего сообщения
        * @param message - пришедшее от сервера сообщение*/
        function inputMessageCorrect(message){
            switch (message.format)
                case 1://управление
                break;

                case 2: //Ход
                break;
                case 3:// Чат
                break;
                default: return error.notCorrectTypeMessage;
        }//end inputMessageCorrect

        if (inputMessageCorrect(message)){
            
        }
        else{ //попытка запросить сообщение еще раз
            //drop connection
        }
    }
    
(function (){
    var gameIsEnd   =   false;
    while (gameIsEnd){
        


    }
}
    )();
