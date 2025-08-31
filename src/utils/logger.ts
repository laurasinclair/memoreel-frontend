const logLevels = {
    log: "🟢",
    warn: "🟠",
    error: "❌",
};

const getCallerInfo = () => {
    const stack = new Error().stack;
    if (stack) {
        const stackLines = stack.split("\n");
        const callerLine = stackLines[3]; // the caller is typically on the 3rd line of the stack trace
        if (callerLine) {
            const match = callerLine.match(/at\s+(.*)\s+\(/);
            return match ? match[1] : "";
        }
    }
    return "unknown";
};

const logger = Object.fromEntries(
    Object.entries(logLevels).map(([level, icon]) => [
        level,
        (message: any) => {
            if (process.env.NODE_ENV !== "production") {
                const callerInfo = getCallerInfo();
                const callerInfoText = callerInfo ? `[${callerInfo}]` : "";
                console[level](`${icon} ${callerInfoText}`, message);
            }
        },
    ])
);

export default logger;