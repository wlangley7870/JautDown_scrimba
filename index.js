//JautDown, super simple shopping list made as part of the scrimba course
//github.com/wlangley7870 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-e1805-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const toggleImgEl = document.getElementById("themeToggle")
const appNameEl = document.getElementById("appName")
const abt = document.getElementById("abt")
const abtClose = document.getElementById("close")
let activeEl = document.activeElement


addButtonEl.addEventListener("click", function() {
    if(inputFieldEl.value) {
    addToDb();
    }
})

appNameEl.addEventListener("click", function(){

   

})




document.addEventListener("keyup", event => {
    if (event.code === "Enter" ) {
        if(document.activeElement === inputFieldEl) {
            if(inputFieldEl.value) {
                addToDb();
            }
        } 
    }
})

toggleImgEl.addEventListener("click", function(){

    toggleAppTheme();
    document.getElementById("themeToggle").src = toggleIcon();
    

})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "<li>Nothing in list....yet. </li>"
    }
})


function addToDb() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl();
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

function toggleAppTheme() {

    let element = document.body;
    
    element.classList.toggle("dark-mode")
}

function toggleIcon() {

    let initialImg = document.getElementById("themeToggle").src;
    let srcTest = initialImg.includes('assets/light.png')
    let newImg = {

        'true':'/assets/night.png',
        'false':'/assets/light.png'}[srcTest]

        return newImg;
    }

