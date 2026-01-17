// src/features/logger/logger.ts
/**
 * @file Simple logger utility for info, warn, error with enable/disable.
 * This module provides a singleton logger instance that can be used throughout the application.
 * The logger can be enabled or disabled by setting the ENABLE_LOGGER constant.
 * It supports logging at three levels: info, warn, and error.
 * It also allows passing a context object with file and block properties to provide more context to the log messages.
 */

const ENABLE_LOGGER = false;
export type LogLevel = 'info' | 'warn' | 'error';

/**
 * Interface for the logger context.
 * It can be used to provide more context to the log messages.
 */
interface LoggerContext {
    file?: string;
    block?: string;
}

/**
 * The Logger class provides methods for logging at different levels.
 */
class Logger {
    private enabled: boolean;

    /**
     * Creates a new Logger instance.
     */
    constructor() {
        this.enabled = ENABLE_LOGGER;
    }

    /**
     * Formats the logger context into a string.
     * @param context - The logger context.
     * @returns The formatted context string.
     */
    private formatContext(context?: LoggerContext): string {
        if (!context) return '';
        if (context.file && context.block) return `[${context.file}:${context.block}]`;
        if (context.file) return `[${context.file}]`;
        if (context.block) return `[${context.block}]`;
        return '';
    }

    /**
     * Formats the log arguments.
     * @param args - The log arguments.
     * @returns The formatted log arguments.
     */
    private formatArgs(args: unknown[]): [string, ...unknown[]] {
        const now = new Date().toISOString();
        let context: LoggerContext | undefined;
        let msgArgs = args;
        // If last arg is an object with file/block, treat as context
        if (args.length && typeof args[args.length - 1] === 'object' && args[args.length - 1] !== null && ('file' in (args[args.length - 1] as object) || 'block' in (args[args.length - 1] as object))) {
            context = args[args.length - 1] as LoggerContext;
            msgArgs = args.slice(0, -1);
        }
        const ctxStr = this.formatContext(context);
        return [`[${now}]${ctxStr ? ' ' + ctxStr : ''}`, ...msgArgs];
    }

    /**
     * Logs an info message.
     * @param args - The log arguments.
     */
    info(...args: unknown[]) {
        if (this.enabled) {
            console.info('[INFO]', ...this.formatArgs(args));
        }
    }

    /**
     * Logs a warning message.
     * @param args - The log arguments.
     */
    warn(...args: unknown[]) {
        if (this.enabled) {
            console.warn('[WARN]', ...this.formatArgs(args));
        }
    }

    /**
     * Logs an error message.
     * @param args - The log arguments.
     */
    error(...args: unknown[]) {
        if (this.enabled) {
            console.error('[ERROR]', ...this.formatArgs(args));
        }
    }
}


// Singleton instance
const logger = new Logger();
export default logger;

/*
// Usage Example:
// Set REACT_APP_ENABLE_LOGGER=true in your .env file to enable logging
// import logger from './logger';
// logger.info('This is an info message');
// logger.warn('This is a warning', { file: 'myfile.ts', block: 'MyComponent' });
// logger.error('This is an error', new Error('Something went wrong'), { file: 'myfile.ts' });
*/
