var filterList = null;

document.addEventListener('DOMContentLoaded', function () {
    filterList = JSON.parse(localStorage.getItem('filterList'));
    var btnAddWord = document.getElementById('btnAddWord');
    btnAddWord.addEventListener('click', AddWord);
    var btnStart = document.getElementById('btnStart');
    btnStart.addEventListener('click', StartFilter);
    if (filterList == null) {
        filterList = [];
    } else {
        CreateTable();
    }
});

function AddWord() {
    try {
        var inputBody = document.getElementById('inputBody');
        if (inputBody.value == '' || inputBody.value == null) {
            alert('please input username.');
            return false;
        }
        if (filterList.indexOf(inputBody.value) != -1) {
            alert('this username is exist : ' + inputBody.value);
            return false;
        }
        AddTableItem(inputBody.value);
        filterList.push(inputBody.value);
        inputBody.value = '';
    } catch (error) {
        alert(error);
    }
}

function CreateTable() {
    for (var i = 0; i < filterList.length; i++) {
        AddTableItem(filterList[i]);
    }
}

function AddTableItem(filterWord) {
    var listBody = document.getElementById('filterListBody');

    var tr = document.createElement('tr');
    var tdWord = document.createElement('td');
    var tdDestroy = document.createElement('td');
    var btDestroy = document.createElement('button');
    var iDestroy = document.createElement('i');

    try {
        iDestroy.setAttribute('class', 'fas fa-trash-alt');
        btDestroy.setAttribute('type', 'button');
        btDestroy.setAttribute('class', 'btn btn-danger btn-sm');
        btDestroy.addEventListener('click', DeleteTableItem);
        btDestroy.appendChild(iDestroy);
        tdDestroy.setAttribute('class', 'align-middle col-sm-2');
        tdDestroy.appendChild(btDestroy);
        tdWord.setAttribute('class', 'align-middle col-sm-10');
        tdWord.innerHTML = filterWord;
        tr.setAttribute('class', 'row');
        tr.appendChild(tdWord);
        tr.appendChild(tdDestroy);
        listBody.appendChild(tr);
    } catch (error) {
        alert(error);
    }
}

function StartFilter() {
    localStorage.removeItem('filterList');
    localStorage.setItem('filterList', JSON.stringify(filterList));
    document.getElementById('status').innerHTML = 'Message pinned. You can deactivate by reload page';
    document.getElementById('status').setAttribute("class", "text-danger");
    chrome.tabs.executeScript(null, { code: 'var filterList = ' + JSON.stringify(filterList) }, function () {
        chrome.tabs.executeScript(null, { file: "filter.js" });
    });
}

function DeleteTableItem() {
    try {
        var index = filterList.indexOf($(this).closest('tr').children('td').html());
        if (index != -1) {
            filterList.splice(index, 1);
        } else {
            alert("-1");
        }
        $(this).closest('tr').remove();
    } catch (error) {
        alert(error);
    }
}