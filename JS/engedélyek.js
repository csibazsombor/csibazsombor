let notificationsEnabled = true; // Default value

async function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.error("This browser does not support notifications.");
        notificationsEnabled = false;
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        notificationsEnabled = (permission === "granted");
        console.log("Notifications enabled:", notificationsEnabled);
    } catch (error) {
        console.error("Error requesting notification permission:", error);
        notificationsEnabled = false;
    }
}

// Call it somewhere
requestNotificationPermission();
