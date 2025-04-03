// Define constants
const LIB_VERSION = "1.2";
const DEVELOPERS = ["Zsombor"];
const STORAGE_KEY = "Web-Lib";
const MAX_LOG_ENTRIES = 10;

// Utility function to get the current date and time in a standardized format
function getCurrentDateTime() {
    return new Date().toISOString(); // Use ISO format for better consistency
}

// Function to retrieve previous logs from localStorage
function getStoredLogs() {
    try {
        const logs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        return Array.isArray(logs) ? logs : [];
    } catch (error) {
        console.warn("Failed to retrieve logs from localStorage:", error);
        return [];
    }
}

// Function to log and optionally store library information
function logLibraryInfo({ store = true } = {}) {
    const dateTime = getCurrentDateTime();
    const logMessage = `[${dateTime}] v${LIB_VERSION} | Developers: ${DEVELOPERS.join(", ")}`;
    
    console.info(logMessage);
    
    if (store) {
        try {
            let logs = getStoredLogs();
            logs.push(logMessage);
            if (logs.length > MAX_LOG_ENTRIES) {
                logs.shift(); // Keep log size manageable
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
        } catch (error) {
            console.warn("Failed to save to localStorage:", error);
        }
    }
    
    return logMessage; // Return log message for potential further use
}

// Function to retrieve and display stored logs
function displayStoredLogs() {
    const logs = getStoredLogs();
    console.table(logs);
}

// Execute logging with storage enabled
logLibraryInfo();
