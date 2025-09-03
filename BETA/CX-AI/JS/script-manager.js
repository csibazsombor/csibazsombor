function startConversation() {
        // Initialize 
        document.body.classList.add("fade-out");
        setTimeout(() => {
                        document.body.classList.remove("fade-out");
                        window.location.href = "chat.html";
        }, 1500);

setTimeout(() => {
        alert("Conversation started!");
}, 260);

        //Feedback vibration
        navigator.vibrate(8);
        
}

function chatPageLoaded() {
        document.body.classList.add("fade-in");
}



const inputField = document.getElementById("userinput");
const sendbtn = document.getElementById("sendBtn");
let inactivityTimer;

function showSendBtn() {
        sendbtn.style.display = "block";
}
function hideSendBtn() {
        sendbtn.style.display = "none";
}
function resetTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(showSendBtn, 8000);
}

// Start the inactivity timer when a new message arrives
resetTimer();

inputField.addEventListener("keydown", (event) => {
        // If Enter is pressed, show the send button instantly.
        if (event.key === "Enter") {
                navigator.vibrate(10);
                showSendBtn();
                clearTimeout(inactivityTimer);
        } else {
                hideSendBtn();
                resetTimer();
        }
});