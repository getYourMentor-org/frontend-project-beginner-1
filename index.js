import {darkTheme,lightTheme} from "./theme.js"

// set Theme
const toggle=document.querySelector('input[type="checkbox"]')
toggle.addEventListener('change',()=>{
    if(toggle.checked){
        darkTheme()
    }else{
        lightTheme()
    }
})

// new Note
const newButton = document.querySelector(".btn-new")
newButton.addEventListener('click',()=>{
})