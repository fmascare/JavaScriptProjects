var addBtn = document.getElementById("addNote");

var savedNotes = JSON.parse(localStorage.getItem('savedNotes'));

if (savedNotes) {
    savedNotes.forEach(n => {
        addNewNote(n);
    });
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(noteText = '') {
    var note = document.createElement('div');
    if(noteText) {
        var insertMode = 'fas fa-edit';
    }
    else {
        var insertMode = 'fas fa-check';
    }
    note.classList.add("notes");
    note.innerHTML = `<div class="toolbar">
                        <div class="logo">MyNotes</div>
                        <div class="toolbar-icons">
                            <button class="edit"><i class="${insertMode}"></i></button>
                            <button class="delete"><i class="fas fa-trash-alt"></i></button>
                        </div>
                      </div>
                    <div class="main ${noteText ? '' : 'hidden'}"></div>
                    <textarea class="text ${noteText ? 'hidden' : ''}"></textarea>`;
    
    var editBtn = note.querySelector(".edit");
    var deleteBtn = note.querySelector(".delete");
    var insertBtn = note.querySelector(".insert");
    var mainNote = note.querySelector(".main");
    var EditNote = note.querySelector(".text");
    
    EditNote.value = noteText;
    mainNote.innerHTML = marked(noteText);

    editBtn.addEventListener("click", () => {
        if(EditNote.classList.contains("hidden")) {
            editBtn.innerHTML = '<i class="fas fa-check"></i>';
        }
        else {
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        }
        mainNote.classList.toggle("hidden");
        EditNote.classList.toggle("hidden");
    });
    
    deleteBtn.addEventListener("click", () => {
        note.remove();
        
        updateLocalStorage();
    });

    EditNote.addEventListener("input", (e) => {
        var {value} = e.target;
        mainNote.innerHTML = marked(value);
        
        updateLocalStorage();
    });
    
    document.body.appendChild(note);
}

function updateLocalStorage() {
    var textArea = document.querySelectorAll('textArea');
    
    var notesText = [];
    
    textArea.forEach(n => {
        notesText.push(n.value);
    });
    
    localStorage.setItem('savedNotes', JSON.stringify(notesText));
}

window.addEventListener("scroll", function() {
    if(this.pageYOffset > 0) {
        addBtn.classList.add("shorten");
    }
    else {
        addBtn.classList.remove("shorten");
    }
});