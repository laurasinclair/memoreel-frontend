import { LoggerMessageType } from "src/types";

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
            return match ? match[1] : "unknown";
        }
    }
    return "unknown";
};

const logger = Object.fromEntries(
    Object.entries(logLevels).map(([level, icon]) => [
        level,
        (message: LoggerMessageType) => {
            if (process.env.NODE_ENV !== "production") {
                const callerInfo = getCallerInfo();
                console[level](
							`${icon} %c${callerInfo} %c${message}`,
							"color: #ffffff9f; background-color: #ffffff32; padding: 2px 1px 1px 8px !important; margin-right: 6px; border-radius: 3px;",
							"color: initial"
						);
            }
        },
    ])
);

export default logger;