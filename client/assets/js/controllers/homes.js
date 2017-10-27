function homesFunc() {

    /*--- Homes ---*/
    var homes = getHomeNames( homesObj );

    function getHomeNames( arrHome ) {
        return arrHome.map(function(item){
            return item.homeName;
        });
    }

    var select = document.querySelector('#count');
    var selectRoom = document.querySelector('#room');

    homes.forEach(function (item) {
        var option = document.createElement('option');

        option.value = item;
        option.innerHTML = item;
        select.appendChild(option);
    });
    var selectLength = select.length;

    /*--- Rooms ---*/

    var rooms = getRoomNames( homesObj );

    function getRoomNames( arrRoom ) {
        return arrRoom.map(function(item){
            return item.rooms;
        });
    }

    /*--- Add home ---*/
    var btnAdd = document.querySelector('.btn-add');
    var inputAdd = document.getElementById('addHomeName');

    btnAdd.addEventListener('click', function () {
        var option = document.createElement('option');

        if ( inputAdd.value === '' || inputAdd.value.replace(/\s/g,'') === '' || inputAdd.value.length < 3 ) {
            inputAdd.classList.add('error');
            btnAdd.classList.add('error');
        }
        else {
            option.text = inputAdd.value;
            select.appendChild(option);

            inputAdd.value = '';
        }
    });

    inputAdd.onkeypress = function () {
        inputAdd.classList.remove('error');
        btnAdd.classList.remove('error');
    };

    /*--- Edit home ---*/
    var inputEdit = document.getElementById('editHomeName');

    select.addEventListener("click", function ( event ) {
        var index = event.target.selectedIndex;
        inputEdit.value = event.target[index].innerHTML;

        /*--- Rooms ---*/
        var children = selectRoom.childNodes;
        while(children.length) {
            selectRoom.removeChild(children[0]);
        }

        if ( selectLength === select.length ) {
            rooms[index].forEach(function (item) {
                var option = document.createElement('option');
                option.value = item.roomName;
                option.innerHTML = item.roomName;
                selectRoom.appendChild(option);
            });
        }
        /*--- ---*/
    });

    var btnEdit = document.querySelector('.btn-edit');

    btnEdit.addEventListener( 'click', function() {
        var textOption = select.options[select.selectedIndex];

        if ( inputEdit.value === '' || inputEdit.value.replace(/\s/g,'') === '' || inputEdit.value.length < 3 ) {
            inputEdit.classList.add('error');
            btnEdit.classList.add('error');
        }
        else {
            textOption.innerHTML = inputEdit.value.trim();
            inputEdit.value = textOption.innerHTML;
        }
    });

    inputEdit.onkeypress = function () {
        inputEdit.classList.remove('error');
        btnEdit.classList.remove('error');
    };


    /*--- Add room ---*/
    var btnAddRoom = document.querySelector('.btn-add-room');
    var inputAddRoom = document.getElementById('addRoomName');

    btnAddRoom.addEventListener('click', function () {
        var option = document.createElement('option');

        if ( inputAddRoom.value === '' || inputAddRoom.value.replace(/\s/g,'') === '' || inputAddRoom.value.length < 3 ) {
            inputAddRoom.classList.add('error');
            btnAddRoom.classList.add('error');
        }
        else {
            option.text = inputAddRoom.value;
            selectRoom.appendChild(option);
            inputAddRoom.value = '';
        }
    });

    inputAddRoom.onkeypress = function () {
        inputAddRoom.classList.remove('error');
        btnAddRoom.classList.remove('error');
    };

    /*--- Edit room ---*/
    var inputEditRoom = document.getElementById('editRoomName');

    selectRoom.addEventListener("click", function ( event ) {
        var index = event.target.selectedIndex;

        inputEditRoom.value = event.target[index].innerHTML;

    });

    var btnEditRoom = document.querySelector('.btn-edit-room');

    btnEditRoom.addEventListener( 'click', function() {
        var textOption = selectRoom.options[selectRoom.selectedIndex];

        if ( inputEditRoom.value === '' || inputEditRoom.value.replace(/\s/g,'') === '' || inputEditRoom.value.length < 3 ) {
            inputEditRoom.classList.add('error');
            btnEditRoom.classList.add('error');
        }
        else {
            textOption.innerHTML = inputEditRoom.value.trim();
            inputEditRoom.value = textOption.innerHTML;
        }
    });

    inputEditRoom.onkeypress = function () {
        inputEditRoom.classList.remove('error');
        btnEditRoom.classList.remove('error');
    };
}