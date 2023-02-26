// This javaScript file adds functionality to the 'Hand-Crafted Items' and 'Save for Later' pages.

// Create an empty array that will store comments.
let savedItemsList = [];

/* Create a function that will be called when the 'hand-crafted-items' web page is loaded.
When the page loads, check to see whether it is the first time the user is
loading this page or not. If so, initialise the values we want to store in localStorage. 
If it is not the first time the user loading the page, then we can assume that we already have some information
about NewItems objects stored in localStorage. We use this information in localStorage to add information 
about each saved item we have created in the HTML page. 
This function also looks for 'button' tags in the document. After getting the elements it adds functionality
to each button by calling 'addSavedItem' function when clicked. */
function handCraftLoad() {
    if (localStorage.getItem("isHandCraftInitialized") === null) {
        localStorage.setItem("savedItems", JSON.stringify(savedItemsList));
        localStorage.setItem("isHandCraftInitialized", true);
    } else {
        savedItemsList = JSON.parse(localStorage.getItem("savedItems"));
    }
    let buttons = document.getElementsByTagName('button');
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', addSavedItem);
    }

}

/* Create a function that will be called when the 'save-for-later' web page is loaded.
When the page loads, look for an element containing 'savedForLater' id and strore it in a variable. 
For every items in the savedItemsList, create appropriate elements to display them in the webpage.     
Also add required classes to these elements to set stylings. 
Then append each elements to their parent elements, finally append them to the element containing 'savedForLater' id */
function saveForLaterLoad() {
    savedItemsList = JSON.parse(localStorage.getItem("savedItems"));

    savedItems = document.getElementById('savedForLater');

    for (let i = 0; i < savedItemsList.length; i++) {
        let colElement = document.createElement('div');
        colElement.classList.add('col-lg-2');
        colElement.classList.add('col-md-4');
        colElement.classList.add('each-card');
        
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        
        let imgElement = document.createElement('img');
        imgElement.classList.add('card-img-top');
        imgElement.classList.add('item-img');
        imgElement.src = savedItemsList[i].imgSrc;

        let cardBodyElement = document.createElement('div');
        cardBodyElement.classList.add('card-body');

        let titleElement = document.createElement('h5');
        titleElement.classList.add('card-title');
        titleElement.innerHTML = savedItemsList[i].itemName;

        let textElement = document.createElement('p');
        textElement.classList.add('card-text');
        textElement.classList.add('item-description');
        textElement.innerHTML = savedItemsList[i].itemDescription;
    
        cardBodyElement.appendChild(titleElement);
        cardBodyElement.appendChild(textElement);
        cardElement.appendChild(imgElement);
        cardElement.appendChild(cardBodyElement);
        colElement.appendChild(cardElement);
        savedItems.appendChild(colElement);
    }
}

// Create a constructor to create saved item objects.
function NewItem(imgSrc,itemName, itemDescription) {
    this.imgSrc = imgSrc,
    this.itemName = itemName,
    this.itemDescription = itemDescription
}

/* Create a function that will be called when the user clicks on 'Save for later' button in the 'hand-crafted-items' web page.
In this function new saved item objects will be created using the NewItem constructor. 
The newly created objects will be added to the savedItemsList array and will be stored in localStorage. 
This function also contains an alert which will be displayed when the button is clicked. Then it changes the innerHTML 
as well as the styling of the button and makes the button disable after clicking. */
function addSavedItem () {
    savedItemsList = JSON.parse(localStorage.getItem('savedItems'));
    console.log(this);
    // console.log(this.parentElement);
    let cardId = this.parentElement.parentElement.id;
    // console.log(cardId);

    let x = document.getElementById(cardId);
    // console.log(x);

    let newSavedItem = new NewItem (
        x.children[0].src,
        x.children[1].children[0].innerHTML,
        x.children[1].children[1].innerHTML
    ); 

    // console.log(savedItemsList);
    savedItemsList.push(newSavedItem);
    localStorage.setItem('savedItems', JSON.stringify(savedItemsList));

    alert(`You have ${savedItemsList.length} items in your 'save for later' folder`);

    this.innerHTML='Saved';
    this.classList.remove('btn-outline-dark');
    this.classList.add('btn-dark');
    this.disabled = true;
}

// Functionality for like button.
// Create a function that toggles 'liked' class when like button is clicked.
function liked(x) {
    x.classList.toggle('liked');
}
