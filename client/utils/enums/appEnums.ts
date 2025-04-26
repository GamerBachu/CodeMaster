export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export enum AppStatus {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE',
}

export enum NotificationType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}

export enum Language {
    EN = 'en-US',
    FR = 'fr-FR',
}

export enum LocalStorageKeys {
    USER_CONFIG = 'userConfig',
    USER_TOKEN = 'userToken',
    USER_ID = 'userId',
    USER_ROLE = 'userRole',

    USER_NAME = 'userName',
}

export const EnableLogger = true;