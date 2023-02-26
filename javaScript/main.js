// This javaScript file adds functionality to the comment section.

// Create an empty array that will store comments.
let commentList = [];

/* Create a function that will be called when the web page is loaded.
When the page loads, check to see whether it is the first time the user is
loading this page or not. If so, initialise the values we want to store in localStorage. 
If it is not the first time the user loading the page, then we can assume that we already have some information
about comment objects stored in localStorage. We use this information in localStorage to add information 
about each comment object we have created in the HTML page. */
function commentsLoad() {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        localStorage.setItem("comments", JSON.stringify(commentList));
        localStorage.setItem("hasCodeRunBefore", true);
    } else {
        commentList = JSON.parse(localStorage.getItem("comments"));

        let comments = document.getElementById('comments');
        // console.log(comments);
        // console.log(commentList);
        
        // For every comments in the comentList, create appropriate elements to display them in the webpage. 
        // Also add required classes to these elements to set stylings.
        for (let i = 0; i < commentList.length; i++) {
            let commentDiv = document.createElement('div');
            commentDiv.classList.add('commented-section');

            let userName = document.createElement('p');
            userName.innerHTML = commentList[i].name;
            userName.classList.add('user-name');


            let commentText = document.createElement('p');
            commentText.innerHTML = commentList[i].comment;
            commentText.classList.add('comment-text');
            
            commentDiv.appendChild(userName);
            commentDiv.appendChild(commentText);
            comments.appendChild(commentDiv);
        }   
  }
}

// Create a constructor to create comment objects.
function Comment (name, comment) {
    this.name = name,
    this.comment = comment
}

/* Create a function that will be called when the user clicks on 'Post' button in the comment section.
In this function new comment objects will be created using the Comment constructor. 
The newly created objects will be added to the commentList array and will be stored in localStorage. */
function addComment() {
    console.log('adding comment');
    commentList = JSON.parse(localStorage.getItem('comments'));

    let newComment = new Comment(
        document.getElementById('name').value,
        document.getElementById('comment-input').value
    );
    // console.log(newComment);
    commentList.push(newComment);
    localStorage.setItem('comments', JSON.stringify(commentList)); 
}
