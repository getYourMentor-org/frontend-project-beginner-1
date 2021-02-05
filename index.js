let hamburger = document.querySelector('.hamburger')

let mainWrapper = document.querySelector('#main-wrapper')
let leftSideBar = document.querySelector('.left-sidebar')
let listWrapper = document.querySelector('ul')
let addNote = document.querySelector('#new-note')

let textareaEditorWrapper = document.querySelector('.textarea-editor-wrapper')
let textArea = document.querySelector('textarea')
let textAreaContent = document.querySelector('#textarea-content')
let editor = document.querySelector('.editor')

let del = document.querySelector('#del')
let save = document.querySelector('#save')

let heading = '' 
let content = ''
let span = ''
let date = ''

let addNoteClicks = 0;
let curNode = ''

let notes = []

let toggleCount = 0

const getTextSelection = function (editor) {
    const selection = window.getSelection();

    if (selection != null && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        return {
            start: getTextLength(editor, range.startContainer, range.startOffset),
            end: getTextLength(editor, range.endContainer, range.endOffset)
        };
    } else
        return null;
}

const getTextLength = function (parent, node, offset) {
    var textLength = 0;

    if (node.nodeName == '#text')
        textLength += offset;
    else for (var i = 0; i < offset; i++)
        textLength += getNodeTextLength(node.childNodes[i]);

    if (node != parent)
        textLength += getTextLength(parent, node.parentNode, getNodeOffset(node));

    return textLength;
}

const getNodeTextLength = function (node) {
    var textLength = 0;

    if (node.nodeName == 'BR')
        textLength = 1;
    else if (node.nodeName == '#text')
        textLength = node.nodeValue.length;
    else if (node.childNodes != null)
        for (var i = 0; i < node.childNodes.length; i++)
            textLength += getNodeTextLength(node.childNodes[i]);
            
    return textLength;
}

const getNodeOffset = function (node) {
    return node == null ? -1 : 1 + getNodeOffset(node.previousSibling);
}

window.onload = function () {
    hamburger.addEventListener('click',toggleList);
    textArea.addEventListener('keydown',updateTextDown)
    textArea.addEventListener('keyup',updateTextUp)
    editor.addEventListener('keydown',updateEditorDown)
    editor.addEventListener('keyup',updateEditorUp)
    save.addEventListener('click',saveNote)
    del.addEventListener('click',delNote)
    addNote.addEventListener('click',addNewNote)
    listWrapper.addEventListener('click',active)
}

setNotes()
renderNotes()
setQuerySelectors()

function toggleList(){
    toggleCount++;
    leftSideBar.setAttribute("id", toggleCount % 2 === 0 ? "toggle-none-sm" : " ");
    textareaEditorWrapper.setAttribute("id", toggleCount % 2 === 0 ? " ":"toggle-none-sm" );
}

function updateTextDown(e){
    textAreaContent.innerText =  (e.target.value !== '' ) ? 
        e.target.value : '.'
    if(e.key === 'Enter'){
        e.preventDefault()
        editor.focus()
    }
    if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){
        (e.target.selectionEnd === e.target.value.length) && editor.focus() 
    }
}

function updateTextUp(e){
    heading.innerText = e.target.value.length > 36 ? 
    e.target.value.substr(0,35) + '...' : 
    e.target.value.length === 0 ? 
    'Untitled':
    e.target.value
}

function updateEditorDown(e){
    const textSelection = getTextSelection(document.activeElement);
    if(textSelection.start === 0){
        if(e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault()   
            textArea.focus()
        }   
    }
}

function updateEditorUp(e){
    if (e.target.innerText.includes('`')) {
        e.target.innerHTML = e.target.innerHTML.replace('`', "<span style='color:black;'>" + '`' + "</span>");
    }
    span.textContent = content.textContent.length > 72 ? 
    content.textContent.substr(0,71) + '...' : 
    content.textContent = e.target.innerText
    content.textContent
}

function saveNote(){
    const curTime = new Date().toLocaleTimeString()  
    date.innerText = `last edited ${curTime}`
    const getCurNodeDataset = curNode.dataset.num
    const isIndex = num => num.index == getCurNodeDataset 
    const indexOfCurNode = notes.findIndex(isIndex)
    console.log(curNode.children[1].outerHTML)
    if(indexOfCurNode === -1){
        notes.push({
            index: getCurNodeDataset,
            title:curNode.children[0].textContent,
            text:curNode.children[1].innerHTML,
            date: `last edited ${curTime}`
            })  
        notes.sort((a,b)=> a.index - b.index)
    }else{
        notes[indexOfCurNode] = {
            index: getCurNodeDataset,
            title: curNode.children[0].textContent,
            text: curNode.children[1].innerHTML,
            date: `last edited ${curTime}`
        }
    }
    console.log(notes)
    window.localStorage.setItem('notes', JSON.stringify(notes));
}

const addNoteWhenEmpty = document.createElement('button')
addNoteWhenEmpty.className = 'create-note'
addNoteWhenEmpty.innerText = 'click anywhere to create a new note'
addNoteWhenEmpty.addEventListener('click',addNewNote)

function delNote(){
    if(listWrapper.children.length === 1){
        mainWrapper.style.display = 'none'
        hamburger.style.display = 'none'
        document.querySelector('body').appendChild(addNoteWhenEmpty)
    }
    const nextNode =  
        curNode.previousElementSibling? 
            curNode.previousElementSibling.dataset.num:
            (listWrapper.children.length > 1) && curNode.nextElementSibling.dataset.num;

    const indexOfCurNode = Array.from(listWrapper.children).indexOf(curNode)
    notes.splice(indexOfCurNode,1)
    
    if(listWrapper.children.length){
        listWrapper.removeChild(curNode)
    }
    
    window.localStorage.setItem('notes', JSON.stringify(notes));
    setActive(nextNode)
    toggleList()
}

function addNewNote(){
    if(!listWrapper.children.length){
        mainWrapper.style.display = 'grid'
        hamburger.style.display = ''
        document.querySelector('body').removeChild(addNoteWhenEmpty)
    } 
    const li = document.createElement('li') 
    const heading = document.createElement('div')
    const content = document.createElement('div')
    const span = document.createElement('span')
    const date = document.createElement('div')

    heading.className = 'heading'
    heading.innerText = 'Untitled'
    content.className = 'content'
    date.className = 'date'
    date.innerText = 'unsaved'
    li.appendChild(heading)
    li.appendChild(content)
    li.appendChild(span)
    li.appendChild(date)

    addNoteClicks++;
    li.dataset["num"] =  addNoteClicks;
    listWrapper.appendChild(li)
    textArea.value = ''
    editor.innerText = ''
    curNode && curNode.classList.remove("active")
    setActive(addNoteClicks)
    toggleList()
    document.querySelector('.overflow-auto').scrollTo(0,listWrapper.scrollHeight)
}

function active(e){
    curNode.classList.remove("active")
    if(curNode !=  e.target){        
        e.target.closest("li").children[0].innerText  != '' ?
         (textArea.value = e.target.closest("li").children[0].innerText) : 'Untitled'
        editor.innerText = e.target.closest("li").children[1].innerText
    }
    const temp = e.target.closest("li").dataset.num
    setActive(temp)
    toggleList()
}

function setActive(param){
    curNode = document.querySelector(`li[data-num="${param}"]`)
    if(curNode){
    curNode.classList.add('active')
    content = curNode.children[1]
    heading = curNode.children[0]
    span = curNode.children[2]
    date = curNode.children[3]
    }
}

function setNotes(){
    var notesArr = localStorage.getItem("notes");
    notes = JSON.parse(notesArr)
    if (notes === null || notes.length === 0) {
        notes = [
            {
                index: "0",
                title: "Untitled",
                text: "",
                date: "unsaved"
            },
          ];
    }
}

function renderNotes(){
    count = notes.length
    for(let i=0;i<notes.length;i++){
        listWrapper.innerHTML += 
        `
        <li data-num='${i}'>
            <div class='heading'>${notes[i].title}</div>
            <div class='content'>${notes[i].text.substr(0,71)}</div>
            <span class='span'>${notes[i].text}</span>
            <div class='date'>${notes[i].date}</div>
        </li>
        `
    }
    const firstNode = document.querySelector('li')    
    textArea.value = firstNode.children[0].innerText
    editor.innerText =  firstNode.children[1].innerText
    document.querySelector('li').classList.add("active")
    addNoteClicks = listWrapper.children.length
}

function setQuerySelectors(){
    curNode = document.querySelector('li')
    heading = document.querySelector('.heading')
    content = document.querySelector('.content')
    span = document.querySelector('.span')
    date = document.querySelector('.date')
}