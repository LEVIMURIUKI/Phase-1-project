document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const pauseButton = document.getElementById("pauseButton");
    const nextButton = document.getElementById("nextButton");
    const likeButton = document.getElementById("likeButton");
    const themeToggle = document.getElementById("themeToggle");
    const musicPlayer = document.getElementById("musicPlayer");
    const musicInput = document.getElementById("musicInput");
    const commentInput = document.getElementById("commentInput");
    const addCommentButton = document.getElementById("addCommentButton");
    const commentList = document.getElementById("commentList");

    playButton.addEventListener("click", playMusic);
    pauseButton.addEventListener("click", pauseMusic);
    nextButton.addEventListener("click", nextMusic);
    likeButton.addEventListener("click", likeMusic);
    themeToggle.addEventListener("change", toggleTheme);
    addCommentButton.addEventListener("click", addComment);

    
    musicInput.addEventListener("change", () => {
        const file = musicInput.files[0];
        const url = URL.createObjectURL(file);
        musicPlayer.src = url;
    });

    
    loadComments();
});

function playMusic() {
    const musicPlayer = document.getElementById("musicPlayer");
    musicPlayer.play();
}

function pauseMusic() {
    const musicPlayer = document.getElementById("musicPlayer");
    musicPlayer.pause();
}

function nextMusic() {

   
    const musicPlayer = document.getElementById("musicPlayer");
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
}

function likeMusic() {

    
    console.log("Liked the current music track");
}

function toggleTheme() {
    const toggleSwitch = document.getElementById("toggleSwitch");
    const toggleLabel = document.getElementById("toggleLabel");

    if (toggleSwitch.checked) {
        document.body.classList.add("dark-mode");
        toggleLabel.textContent = "Light Mode";
    } else {
        document.body.classList.remove("dark-mode");
        toggleLabel.textContent = "Dark Mode";
    }
}

function addComment() {
    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    const commentItem = document.createElement("li");
    commentItem.textContent = commentText;

   
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        commentItem.remove();
        deleteComment(commentText); 
    });

    
    commentItem.appendChild(deleteButton);

    commentList.appendChild(commentItem);

    
    saveComment(commentText);

    commentInput.value = "";
}

function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(comment => {
        const commentItem = document.createElement("li");
        commentItem.textContent = comment;

        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            commentItem.remove();
            deleteComment(comment); 
        });

        commentItem.appendChild(deleteButton);

        commentList.appendChild(commentItem);
    });
}

function deleteComment(comment) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments = comments.filter(c => c !== comment);
    localStorage.setItem("comments", JSON.stringify(comments));
}
