// Trip Countdown Timer
function addTripCountdown() {
        // Create the countdown section HTML
        const countdownHTML = `
          <section class="countdown-section">
            <h2 id="countdown-title">Next Adventure Countdown</h2>
            <div class="countdown-container">
              <div class="trip-details">
                <h3 id="trip-destination">Paris, France</h3>
                <p id="trip-dates">May 15-22, 2025</p>
                <p id="trip-description">Exploring the City of Light</p>
              </div>
              <div class="countdown-timer">
                <div class="countdown-unit">
                  <span id="countdown-days">0</span>
                  <span class="unit-label" id="days-label">Days</span>
                </div>
                <div class="countdown-unit">
                  <span id="countdown-hours">0</span>
                  <span class="unit-label" id="hours-label">Hours</span>
                </div>
                <div class="countdown-unit">
                  <span id="countdown-minutes">0</span>
                  <span class="unit-label" id="minutes-label">Minutes</span>
                </div>
                <div class="countdown-unit">
                  <span id="countdown-seconds">0</span>
                  <span class="unit-label" id="seconds-label">Seconds</span>
                </div>
              </div>
            </div>
            <button id="set-trip" class="trip-button">Set Custom Trip</button>
            <div id="trip-form" class="trip-form hidden">
              <input type="text" id="custom-destination" placeholder="Enter destination">
              <input type="date" id="custom-date">
              <input type="text" id="custom-description" placeholder="Trip description">
              <button id="save-trip">Save</button>
              <button id="cancel-trip">Cancel</button>
            </div>
          </section>
        `;
        
        // Add the countdown section after the welcome section
        const welcomeSection = document.querySelector('.udvozollek');
        welcomeSection.insertAdjacentHTML('afterend', countdownHTML);
        
        // Add CSS for the countdown section
        const style = document.createElement('style');
        style.textContent = `
          .countdown-section {
            margin: 3rem auto;
            max-width: 800px;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            border-radius: 12px;
            padding: 2rem;
            color: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            text-align: center;
          }
          
          .countdown-section h2 {
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
          }
          
          .countdown-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .trip-details {
            padding: 1rem;
            background-color: rgba(255,255,255,0.2);
            border-radius: 8px;
          }
          
          .trip-details h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }
          
          .countdown-timer {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
          }
          
          .countdown-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 80px;
          }
          
          .countdown-unit span:first-child {
            font-size: 2.5rem;
            font-weight: bold;
            background-color: rgba(255,255,255,0.3);
            border-radius: 8px;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .unit-label {
            margin-top: 0.5rem;
            font-size: 0.9rem;
          }
          
          .trip-button {
            margin-top: 1.5rem;
            background-color: rgba(255,255,255,0.3);
            color: white;
            border: 2px solid white;
            border-radius: 4px;
            padding: 0.5rem 1.5rem;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
          }
          
          .trip-button:hover {
            background-color: rgba(255,255,255,0.5);
          }
          
          .trip-form {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .trip-form input {
            padding: 0.5rem;
            border-radius: 4px;
            border: 1px solid #ddd;
          }
          
          .trip-form button {
            padding: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
          }
          
          #save-trip {
            background-color: #4CAF50;
            color: white;
            border: none;
          }
          
          #cancel-trip {
            background-color: #f44336;
            color: white;
            border: none;
          }
          
          .hidden {
            display: none;
          }
          
          @media (min-width: 768px) {
            .countdown-container {
              flex-direction: row;
              align-items: center;
              justify-content: space-around;
            }
            
            .trip-details {
              text-align: left;
              flex: 1;
            }
            
            .countdown-timer {
              flex: 1;
            }
          }
        `;
        document.head.appendChild(style);
        
        // Trip data - you can replace with your own
        let tripData = {
          destination: 'Paris, France',
          date: '2025-05-15',
          description: 'Exploring the City of Light'
        };
        
        // Load saved trip data if it exists
        const savedTrip = localStorage.getItem('nextTrip');
        if (savedTrip) {
          try {
            tripData = JSON.parse(savedTrip);
            updateTripDisplay();
          } catch (e) {
            console.error('Error loading saved trip data', e);
          }
        }
        
        // Update the trip details in the UI
        function updateTripDisplay() {
          document.getElementById('trip-destination').textContent = tripData.destination;
          
          // Format the date nicely
          const tripDate = new Date(tripData.date);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          document.getElementById('trip-dates').textContent = tripDate.toLocaleDateString(undefined, options);
          
          document.getElementById('trip-description').textContent = tripData.description;
        }
        
        // Update the countdown timer
        function updateCountdown() {
          const now = new Date().getTime();
          const tripDate = new Date(tripData.date).getTime();
          const timeDifference = tripDate - now;
          
          if (timeDifference <= 0) {
            // Trip date has passed
            document.getElementById('countdown-days').textContent = '0';
            document.getElementById('countdown-hours').textContent = '0';
            document.getElementById('countdown-minutes').textContent = '0';
            document.getElementById('countdown-seconds').textContent = '0';
            return;
          }
          
          // Calculate time units
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          
          // Update the display
          document.getElementById('countdown-days').textContent = days;
          document.getElementById('countdown-hours').textContent = hours;
          document.getElementById('countdown-minutes').textContent = minutes;
          document.getElementById('countdown-seconds').textContent = seconds;
        }
        
        // Event listeners for the custom trip form
        document.getElementById('set-trip').addEventListener('click', () => {
          const form = document.getElementById('trip-form');
          form.classList.toggle('hidden');
          
          // Populate form with current values
          document.getElementById('custom-destination').value = tripData.destination;
          document.getElementById('custom-date').value = tripData.date;
          document.getElementById('custom-description').value = tripData.description;
        });
        
        document.getElementById('save-trip').addEventListener('click', () => {
          const destination = document.getElementById('custom-destination').value;
          const date = document.getElementById('custom-date').value;
          const description = document.getElementById('custom-description').value;
          
          // Validate inputs
          if (!destination || !date) {
            alert('Please enter a destination and date');
            return;
          }
          
          // Update trip data
          tripData = {
            destination: destination,
            date: date,
            description: description || 'My next adventure'
          };
          
          // Save to localStorage
          localStorage.setItem('nextTrip', JSON.stringify(tripData));
          
          // Update the display
          updateTripDisplay();
          
          // Hide the form
          document.getElementById('trip-form').classList.add('hidden');
        });
        
        document.getElementById('cancel-trip').addEventListener('click', () => {
          document.getElementById('trip-form').classList.add('hidden');
        });
        
        // Initialize countdown
        updateTripDisplay();
        updateCountdown();
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        
        // Ad