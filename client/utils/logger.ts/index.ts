import { EnableLogger } from "../enums/appEnums";

const logger = (message: string, level: 'info' | 'warn' | 'error' = 'info'): void => {
    const timestamp = new Date().toISOString();
    if(EnableLogger)
         console[level](`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
        
};

export default logger;