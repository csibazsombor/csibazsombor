// Web Library Logger - Enhanced Version # 1.2
console.log("Web Library Logger v1.2 loaded");
// =====================================

// Configuration constants
const CONFIG = {
    version: "1.2",
    developers: ["Zsombor"],
    storageKey: "web-lib-logs",
    maxLogEntries: 10,
    logLevels: {
        INFO: "info",
        WARN: "warn", 
        ERROR: "error",
        DEBUG: "debug"
    }
};

// Storage abstraction layer
class StorageManager {
    static isAvailable() {
        try {
            const test = "__storage_test__";
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    static get(key, fallback = []) {
        if (!this.isAvailable()) return fallback;
        
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (error) {
            console.warn(`Storage read error for key "${key}":`, error);
            return fallback;
        }
    }

    static set(key, value) {
        if (!this.isAvailable()) return false;
        
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn(`Storage write error for key "${key}":`, error);
            return false;
        }
    }

    static clear(key) {
        if (!this.isAvailable()) return false;
        
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn(`Storage clear error for key "${key}":`, error);
            return false;
        }
    }
}

// Enhanced logging utility
class LibraryLogger {
    constructor(config = CONFIG) {
        this.config = { ...CONFIG, ...config };
        this.sessionId = this.generateSessionId();
    }

    generateSessionId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    formatTimestamp(date = new Date()) {
        return date.toISOString().replace('T', ' ').slice(0, 19);
    }

    createLogEntry(level, message, metadata = {}) {
        return {
            timestamp: this.formatTimestamp(),
            sessionId: this.sessionId,
            level: level.toUpperCase(),
            message,
            version: this.config.version,
            developers: this.config.developers,
            userAgent: navigator.userAgent.split(' ').slice(-2).join(' '), // Simplified UA
            ...metadata
        };
    }

    log(level = CONFIG.logLevels.INFO, message, options = {}) {
        const { store = true, console: useConsole = true, metadata = {} } = options;
        
        const entry = this.createLogEntry(level, message, metadata);
        const formattedMessage = `[${entry.timestamp}] ${entry.level} | v${entry.version} | ${message}`;
        
        // Console output with appropriate method
        if (useConsole) {
            const consoleMethod = console[level] || console.log;
            consoleMethod(formattedMessage, entry);
        }

        // Storage handling
        if (store) {
            this.storeLog(entry);
        }

        return entry;
    }

    storeLog(entry) {
        const logs = StorageManager.get(this.config.storageKey, []);
        logs.push(entry);
        
        // Maintain log size limit
        if (logs.length > this.config.maxLogEntries) {
            logs.splice(0, logs.length - this.config.maxLogEntries);
        }
        
        StorageManager.set(this.config.storageKey, logs);
    }

    // Convenience methods for different log levels
    info(message, options = {}) {
        return this.log(CONFIG.logLevels.INFO, message, options);
    }

    warn(message, options = {}) {
        return this.log(CONFIG.logLevels.WARN, message, options);
    }

    error(message, options = {}) {
        return this.log(CONFIG.logLevels.ERROR, message, options);
    }

    debug(message, options = {}) {
        return this.log(CONFIG.logLevels.DEBUG, message, options);
    }

    // Enhanced log display with filtering and formatting
    displayLogs(options = {}) {
        const { 
            filter = null, 
            format = 'table', 
            maxEntries = null,
            sessionOnly = false 
        } = options;
        
        let logs = StorageManager.get(this.config.storageKey, []);
        
        // Apply filters
        if (sessionOnly) {
            logs = logs.filter(log => log.sessionId === this.sessionId);
        }
        
        if (filter) {
            logs = logs.filter(log => 
                log.level.toLowerCase().includes(filter.toLowerCase()) ||
                log.message.toLowerCase().includes(filter.toLowerCase())
            );
        }
        
        if (maxEntries) {
            logs = logs.slice(-maxEntries);
        }

        // Display based on format
        switch (format) {
            case 'table':
                console.table(logs.map(log => ({
                    Time: log.timestamp,
                    Level: log.level,
                    Message: log.message,
                    Version: log.version,
                    Session: log.sessionId.slice(-8)
                })));
                break;
            case 'json':
                console.log(JSON.stringify(logs, null, 2));
                break;
            case 'raw':
                logs.forEach(log => console.log(log));
                break;
            default:
                logs.forEach(log => {
                    console.log(`[${log.timestamp}] ${log.level}: ${log.message}`);
                });
        }
        
        return logs;
    }

    // Get statistics about stored logs
    getStats() {
        const logs = StorageManager.get(this.config.storageKey, []);
        const stats = {
            total: logs.length,
            byLevel: {},
            bySessions: {},
            oldestEntry: null,
            newestEntry: null,
            storageAvailable: StorageManager.isAvailable()
        };

        logs.forEach(log => {
            // Count by level
            stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;
            
            // Count by session
            const shortSession = log.sessionId?.slice(-8) || 'unknown';
            stats.bySessions[shortSession] = (stats.bySessions[shortSession] || 0) + 1;
            
            // Track date range
            if (!stats.oldestEntry || log.timestamp < stats.oldestEntry) {
                stats.oldestEntry = log.timestamp;
            }
            if (!stats.newestEntry || log.timestamp > stats.newestEntry) {
                stats.newestEntry = log.timestamp;
            }
        });

        return stats;
    }

    // Clear all stored logs
    clearLogs() {
        const success = StorageManager.clear(this.config.storageKey);
        if (success) {
            console.info("All stored logs cleared successfully");
        } else {
            console.warn("Failed to clear stored logs");
        }
        return success;
    }

    // Initialize library with welcome message
    initialize(customMessage = null) {
        const message = customMessage || 
            `Library initialized | Developers: ${this.config.developers.join(", ")}`;
        
        this.info(message, {
            metadata: {
                initialized: true,
                environment: typeof window !== 'undefined' ? 'browser' : 'node',
                storageSupport: StorageManager.isAvailable()
            }
        });
    }
}

// Create global instance
const logger = new LibraryLogger();

// Legacy compatibility functions
function getCurrentDateTime() {
    return new Date().toISOString();
}

function getStoredLogs() {
    return StorageManager.get(CONFIG.storageKey, []);
}

function logLibraryInfo(options = {}) {
    return logger.initialize(options.message);
}

function displayStoredLogs(options = {}) {
    return logger.displayLogs(options);
}

// Auto-initialize
logger.initialize();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LibraryLogger, logger, CONFIG };
} else if (typeof window !== 'undefined') {
    window.LibraryLogger = LibraryLogger;
    window.webLibLogger = logger;
}

// Usage examples (commented out):
/*
// Basic usage
logger.info("Application started");
logger.warn("Configuration incomplete", { metadata: { config: "missing API key" } });
logger.error("Database connection failed");

// Display logs with filtering
logger.displayLogs({ filter: "error", maxEntries: 5 });

// Get statistics
console.log(logger.getStats());

// Clear logs when needed
// logger.clearLogs();
*/