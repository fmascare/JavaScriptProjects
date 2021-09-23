var showAllBtn = document.getElementById("showAll");
var showActiveBtn = document.getElementById("showActive");
var showCompBtn = document.getElementById("showComplete");
var chevronIcon = document.getElementById("chevronIcon");
var inputText = document.getElementById("userInput");
var list = document.getElementById('list');
var tools = document.querySelector('.tools');

function getAllItems() {
    list.innerHTML = '';
    var savedItems = JSON.parse(localStorage.getItem('savedItems'));
    var savedState = JSON.parse(localStorage.getItem('completeState'));
    if (savedItems && savedItems.length > 0) {
        var i=0;
        savedItems.forEach(item => {
            if(savedState && savedState.length > 0) {
                var state = JSON.parse(localStorage.getItem('completeState'))[i];
                showList(item, state);
                i=i+1;
            }
            else {
                showList(item);
            }
        });
        toggleTools("remove");
        toggleChevronIcon("remove");
    }
    else {
        toggleTools("add");
        toggleChevronIcon("add");
        showAllBtn.classList.add("active");
        showActiveBtn.classList.remove("active");
        showCompBtn.classList.remove("active");
    }
}

function getActiveItems() {
    getAllItems();
    var li = document.querySelectorAll('li');
    li.forEach(item => {
        if(item.classList.contains("completeItem")) {
            item.classList.add("hidden");
        }
    });
    updateListCount(".activeItem");
}

function getCompletedItems() {
    getAllItems();
    var li = document.querySelectorAll('li');
    li.forEach(item => {
        if( ! item.classList.contains("completeItem")) {
            item.classList.add("hidden");
        }
    });
    updateListCount(".completeItem");
}

function toggleTools(action) {
    if (action === 'add') {
        tools.classList.add("hidden");
    }
    else {
        tools.classList.remove("hidden");
    }
}

function toggleChevronIcon(action) {
    if(action === 'add') {
        chevronIcon.classList.add("hidden");
    }
    else {
        chevronIcon.classList.remove("hidden");
    }
}

function showList(item = '', state = '') {
    var newEl = document.createElement('ul');

    newEl.innerHTML = `
                    <li ${state ? 'id="completeItem" class="completeItem"' : 'class="activeItem"'}>${item}<span class="deleteIcon"><i class="fas fa-times"></i></span></li>`;
    
    var markCompBtn = newEl.querySelector("li");
    
    markCompBtn.addEventListener("click", () => {
        if( ! state) {
            newEl.querySelector("li").setAttribute("id", "completeItem");
            newEl.querySelector("li").classList.add("completeItem");
            newEl.querySelector("li").classList.remove("activeItem");
            updateState();
        }
    });

    var deleteBtn = newEl.querySelector(".deleteIcon");
    deleteBtn.addEventListener("click", () => {
        newEl.remove();
        updateLS();
        updateState();
        updateListCount('li');
    });
        
    list.appendChild(newEl);
    updateListCount('li');
}

function updateListCount(varName) {
    var li = document.querySelectorAll(`${varName}`);
    var count = li.length;
    var itemCount = document.querySelector('.itemCount');
    itemCount.innerHTML = `${count} items`;
}

function updateLS() {
    var li = document.querySelectorAll('li');
    var itemsList = [];
    
    li.forEach(i => {
        itemsList.push(i.outerText);
    });
    
    localStorage.setItem('savedItems', JSON.stringify(itemsList));
}

function updateState() {
    var li = document.querySelectorAll('li');
    var stateList = [];
    
    li.forEach(i => {
        if(i.classList.contains("completeItem")) {
            stateList.push(true);
        }
        else {
            stateList.push(false);
        }
    });
    
    localStorage.setItem('completeState', JSON.stringify(stateList));
}

if(inputText) {
    inputText.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            showList(inputText.value);
            updateLS();
            if(tools.classList.contains("hidden")) {
                toggleTools("remove");
            }
            if(chevronIcon.classList.contains("hidden")) {
                toggleChevronIcon("remove");
            }
            inputText.value = '';
        }
    });
}

showAllBtn.addEventListener("click", () => {
    if(! showAllBtn.classList.contains("active")) {
        showAllBtn.classList.add("active");
        getAllItems();
    }
    showActiveBtn.classList.remove("active");
    showCompBtn.classList.remove("active");
});

showActiveBtn.addEventListener("click", () => {
    if(! showActiveBtn.classList.contains("active")) {
        showActiveBtn.classList.add("active");
        getActiveItems();
    }
    showAllBtn.classList.remove("active");
    showCompBtn.classList.remove("active");
});

showCompBtn.addEventListener("click", () => {
    if(! showCompBtn.classList.contains("active")) {
        showCompBtn.classList.add("active");
        getCompletedItems();
    }
    showAllBtn.classList.remove("active");
    showActiveBtn.classList.remove("active");
});

getAllItems();