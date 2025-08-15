let messages = document.getElementById("messages");

// Define the conversation steps with text, image, and delay for each step
const conversation = [
        { text: "Youu,again?", image: "cat1.jpg", delay: 2000 },
        { text: "You know why i'm here?", image: "cat1.jpg", delay: 5000 },
        { text: "I'm gonna hit you!!", image: "naughty.jpg", delay: 2000 },
        { text: "😼", image: "cat3.jpg", delay: 3000 },
        { text: "nah, i go to gym instead", image: "leave.png", delay: 2000 },
        { text: "The end! I hope you enjoyed it toyeee🫵😏", image: "leave.png", delay: 2000 }
];

// Function to display a message with a simple fade animation
function displayMessage(step) {
        // Start fade-out
        messages.style.transition = 'opacity 0.5s';
        messages.style.opacity = 0;
        
        // Change content after fade-out, then fade back in
        setTimeout(() => {
                messages.innerHTML = `
                        <div style="text-align:center;">
                                <img src="${step.image}" alt="Cat Image" style="width:150px;height:150px;display:block;margin:0 auto;">
                                <p style="font-size:1.2em;">${step.text}</p>
                        </div>
                `;
                messages.style.opacity = 1;
        }, 500);
}

let currentStep = 0;

function runConversation() {
        // End conversation and show feed menu if finished
        if (currentStep >= conversation.length) {
                const feedContainer = document.createElement("div");
                feedContainer.style.textAlign = "center";
                feedContainer.style.marginTop = "20px";

                const goodFoodButton = document.createElement("button");
                goodFoodButton.textContent = "Let ciko go outside";
                goodFoodButton.style.marginRight = "10px";

                const badFoodButton = document.createElement("button");
                badFoodButton.textContent = "Hold ciko back";

                feedContainer.appendChild(goodFoodButton);
                feedContainer.appendChild(badFoodButton);
                messages.appendChild(feedContainer);

                goodFoodButton.onclick = () => {
                        feedContainer.remove();
                        messages.style.transition = 'opacity 0.5s';
                        messages.style.opacity = 0;
                        setTimeout(() => {
                                messages.innerHTML = `
                                        <div style="text-align:center;">
                                        </div>
                                        <p style="font-size:1em;color:green;text-align:center;">Ciko went outside</p>
                                `;
                                messages.style.opacity = 1;
                        }, 500);
                };

                badFoodButton.onclick = () => {
                        feedContainer.remove();
                        messages.style.transition = 'opacity 0.5s';
                        messages.style.opacity = 0;
                        setTimeout(() => {
                                messages.innerHTML = `
                                        <div style="text-align:center;">
                                                <img src="mad.jpg" alt="Angry Cat" style="width:150px;height:150px;display:block;margin:0 auto;">
                                        </div>
                                        <p style="font-size:1em;color:red;text-align:center;">😾😾</p>
                                `;
                                messages.style.opacity = 1;
                        }, 500);
                };
                return;
        }
        
        displayMessage(conversation[currentStep]);

        // Interactive branch for step 1
        if (currentStep === 1) {
                setTimeout(() => {
                        const buttonContainer = document.createElement("div");
                        buttonContainer.style.textAlign = "center";
                        buttonContainer.style.marginTop = "20px";
                        
                        const button1 = document.createElement("button");
                        button1.textContent = "To Ask for food?";
                        button1.style.marginRight = "10px";
                        
                        const button2 = document.createElement("button");
                        button2.textContent = "To bother me..";
                        
                        button1.onclick = () => {
                                buttonContainer.remove();
                                messages.style.transition = 'opacity 0.5s';
                                messages.style.opacity = 0;
                                setTimeout(() => {
                                        messages.innerHTML = `
                                                <div style="text-align:center;">
                                                        <img src="cat2.jpg" alt="Happy Image" style="width:150px;height:150px;display:block;margin:0 auto;">
                                                </div>
                                                <p style="font-size:1em;color:blue;text-align:center;">Nopee</p>
                                        `;
                                        messages.style.opacity = 1;
                                        setTimeout(() => {
                                                currentStep++;
                                                runConversation();
                                        }, 2000);
                                }, 500);
                        };
                        
                        button2.onclick = () => {
                                buttonContainer.remove();
                                const hitHand = document.createElement("img");
                                hitHand.src = "hit_hand.png";
                                hitHand.alt = "Hit Hand";
                                hitHand.style.position = "absolute";
                                hitHand.style.top = "50%";
                                hitHand.style.left = "50%";
                                hitHand.style.transform = "translate(-50%, -50%)";
                                hitHand.style.width = "150px";
                                hitHand.style.height = "150px";
                                hitHand.style.zIndex = "1001";
                                document.body.appendChild(hitHand);
                                
                                const redOverlay = document.createElement("div");
                                redOverlay.style.position = "fixed";
                                redOverlay.style.top = 0;
                                redOverlay.style.left = 0;
                                redOverlay.style.width = "100%";
                                redOverlay.style.height = "100%";
                                redOverlay.style.backgroundColor = "red";
                                redOverlay.style.opacity = 0.8;
                                redOverlay.style.zIndex = "1000";
                                document.body.appendChild(redOverlay);
                                
                                redOverlay.style.transition = "opacity 0.3s";
                                setTimeout(() => {
                                        redOverlay.style.opacity = "0";    
                                }, 100);
                                
                                setTimeout(() => {
                                        document.body.removeChild(redOverlay);
                                        document.body.removeChild(hitHand);
                                        
                                        messages.style.transition = 'opacity 0.5s';
                                        messages.style.opacity = 0;
                                        setTimeout(() => {
                                                messages.innerHTML = `
                                                        <div style="text-align:center;">
                                                                <img src="mm.jpg" alt="Mad Image" style="width:150px;height:150px;display:block;margin:0 auto;">
                                                        </div>
                                                        <p style="font-size:1em;color:red;text-align:center;">Exactly!😏</p>
                                                `;
                                                messages.style.opacity = 1;
                                                setTimeout(() => {
                                                        currentStep++;
                                                        runConversation();
                                                }, 2000);
                                        }, 500);
                                }, 500);
                        };
                        
                        buttonContainer.appendChild(button1);
                        buttonContainer.appendChild(button2);
                        messages.appendChild(buttonContainer);
                }, 600);
        }
        // Interactive branch for step 3 (new branch)
        else if (currentStep === 2) {
                setTimeout(() => {
                        const buttonContainer = document.createElement("div");
                        buttonContainer.style.textAlign = "center";
                        buttonContainer.style.marginTop = "20px";
                        
                        const danceButton = document.createElement("button");
                        danceButton.textContent = "Scold ciko";
                        danceButton.style.marginRight = "10px";
                        
                        const singButton = document.createElement("button");
                        singButton.textContent = "Bothering ciko back";
                        
                        danceButton.onclick = () => {
                                buttonContainer.remove();
                                messages.style.transition = 'opacity 0.5s';
                                messages.style.opacity = 0;
                                setTimeout(() => {
                                        messages.innerHTML = `
                                                <div style="text-align:center;">
                                                        <img src="leave.png" alt="Ciko not bothered" style="width:150px;height:150px;display:block;margin:0 auto;">
                                                </div>
                                                <p style="font-size:1em;color:purple;text-align:center;">...</p>
                                        `;
                                        messages.style.opacity = 1;
                                        setTimeout(() => {
                                                currentStep++;
                                                runConversation();
                                        }, 2000);
                                }, 500);
                        };
                        
                        singButton.onclick = () => {
                                buttonContainer.remove();
                                messages.style.transition = 'opacity 0.5s';
                                messages.style.opacity = 0;
                                setTimeout(() => {
                                        messages.innerHTML = `
                                                <div style="text-align:center;">
                                                        <img src="shock.jpg" alt="Ciko bothered" style="width:150px;height:150px;display:block;margin:0 auto;">
                                                </div>
                                        `;
                                        messages.style.opacity = 1;
                                        setTimeout(() => {
                                                currentStep++;
                                                runConversation();
                                        }, 2000);
                                }, 500);
                        };
                        
                        buttonContainer.appendChild(danceButton);
                        buttonContainer.appendChild(singButton);
                        messages.appendChild(buttonContainer);
                }, 600);
        }
        else {
                setTimeout(() => {
                        currentStep++;
                        runConversation();
                }, conversation[currentStep].delay);
        }
}

// Start the conversation
runConversation();