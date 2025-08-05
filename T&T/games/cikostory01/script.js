let messages = document.getElementById("messages");

// Define the conversation steps with text, image, and delay for each step
const conversation = [
        { text: "Hiii", image: "cat1.jpg", delay: 2000 },
        { text: "You know who I am, sir?", image: "cat2.jpg", delay: 5000 },
        { text: "Watch my next trick!", image: "cat3.jpg", delay: 2000 },
        { text: "💤💤", image: "sleep.jpg", delay: 3000 },
        { text: "HII, i'm awakee!!!", image: "cat4.png", delay: 3500 },
        { text: "", image: "cat5.jpg", delay: 2000 }
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
                goodFoodButton.textContent = "Feed ciko with cat food";
                goodFoodButton.style.marginRight = "10px";

                const badFoodButton = document.createElement("button");
                badFoodButton.textContent = "Feed ciko with bad food";

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
                                                <img src="happy_food.png" alt="Happy Cat" style="width:150px;height:150px;display:block;margin:0 auto;">
                                        </div>
                                        <p style="font-size:1em;color:green;text-align:center;">😻😻</p>
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
                                                <img src="eww.png" alt="Angry Cat" style="width:150px;height:150px;display:block;margin:0 auto;">
                                        </div>
                                        <p style="font-size:1em;color:red;text-align:center;">WHATT IS THATT??🤢        </p>
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
                        button1.textContent = "Ciko";
                        button1.style.marginRight = "10px";
                        
                        const button2 = document.createElement("button");
                        button2.textContent = "Larry's friend";
                        
                        button1.onclick = () => {
                                buttonContainer.remove();
                                messages.style.transition = 'opacity 0.5s';
                                messages.style.opacity = 0;
                                setTimeout(() => {
                                        messages.innerHTML = `
                                                <div style="text-align:center;">
                                                        <img src="happy.jpg" alt="Happy Image" style="width:150px;height:150px;display:block;margin:0 auto;">
                                                </div>
                                                <p style="font-size:1em;color:blue;text-align:center;">YEAYYYYY!!!! Meoowww</p>
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
                                                                <img src="mad.jpg" alt="Mad Image" style="width:150px;height:150px;display:block;margin:0 auto;">
                                                        </div>
                                                        <p style="font-size:1em;color:red;text-align:center;">WHATTT!!!😡😡</p>
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
        else if (currentStep === 3) {
                setTimeout(() => {
                        const buttonContainer = document.createElement("div");
                        buttonContainer.style.textAlign = "center";
                        buttonContainer.style.marginTop = "20px";
                        
                        const danceButton = document.createElement("button");
                        danceButton.textContent = "Not bothering";
                        danceButton.style.marginRight = "10px";
                        
                        const singButton = document.createElement("button");
                        singButton.textContent = "Bothering ciko";
                        
                        danceButton.onclick = () => {
                                buttonContainer.remove();
                                messages.style.transition = 'opacity 0.5s';
                                messages.style.opacity = 0;
                                setTimeout(() => {
                                        messages.innerHTML = `
                                                <div style="text-align:center;">
                                                        <img src="leave.png" alt="Ciko not bothered" style="width:150px;height:150px;display:block;margin:0 auto;">
                                                </div>
                                                <p style="font-size:1em;color:purple;text-align:center;">Why you not care about me??😭😭😢😢 (Ciko went outside)</p>
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
                                                        <img src="bothered.jpg" alt="Ciko bothered" style="width:150px;height:150px;display:block;margin:0 auto;">
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