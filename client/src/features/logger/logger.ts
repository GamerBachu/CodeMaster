import db, { type AppLogModel, type AppLogType } from "../../database";
import { toUTCForDB } from "../../utils/helper/dateUtils";

function isLoggerEnabled(type: AppLogType): boolean {
    const el = document.getElementById(`app-logger-key-${type.toLowerCase()}`);
    return !!el;
}

function addLog(
    type: AppLogType,
    pageName: string = "",
    functionName: string = "",
    lineNumber: string = "",
    message: string = "",
    stackTrace: string = "",
    userId: number = 0,
) {
    if (!isLoggerEnabled(type)) return;
    db.tblAppLog.post({
        id: 0,
        type,
        pageName,
        functionName,
        lineNumber,
        timestamp: toUTCForDB(new Date().toISOString()),
        message,
        stackTrace,
        createdDate: toUTCForDB(new Date().toISOString()),
        createdBy: userId,
    } as AppLogModel);
}

function addException(
    pageName: string = "",
    functionName: string = "",
    ex: Error | unknown,
    userId: number = 0,
) {
    if (!isLoggerEnabled("Error")) return;
    const message = ex instanceof Error ? ex.message : String(ex);
    const stackTrace = ex instanceof Error ? ex.stack || "" : "";
    addLog("Error" as AppLogType, pageName, functionName, "", message, stackTrace, userId);
}

const logger = {
    addError: (
        pageName = "",
        functionName = "",
        lineNumber = "",
        message = "",
        stackTrace = "",
        userId = 0,
    ) =>
        addLog(
            "Error" as AppLogType,
            pageName,
            functionName,
            lineNumber,
            message,
            stackTrace,
            userId,
        ),

    addWarning: (
        pageName = "",
        functionName = "",
        lineNumber = "",
        message = "",
        stackTrace = "",
        userId = 0,
    ) =>
        addLog(
            "Warning" as AppLogType,
            pageName,
            functionName,
            lineNumber,
            message,
            stackTrace,
            userId,
        ),

    addInfo: (
        pageName = "",
        functionName = "",
        lineNumber = "",
        message = "",
        stackTrace = "",
        userId = 0,
    ) =>
        addLog(
            "Info" as AppLogType,
            pageName,
            functionName,
            lineNumber,
            message,
            stackTrace,
            userId,
        ),

    addDebug: (
        pageName = "",
        functionName = "",
        lineNumber = "",
        message = "",
        stackTrace = "",
        userId = 0,
    ) =>
        addLog(
            "Debug" as AppLogType,
            pageName,
            functionName,
            lineNumber,
            message,
            stackTrace,
            userId,
        ),

    addException,
};

export default logger;

//   Error', 'Warning', 'Info', 'Debug'
//  type: status ? status.value : statusList[0].value,
//           pageName: form.pageName,
//           functionName: form.functionName,
//           lineNumber: form.lineNumber,
//           timestamp: form.timestamp,
//           message: form.message,
//           stackTrace: form.stackTrace,
//           createdDate: form.createdDate,
//           createdBy: Number(userId),
