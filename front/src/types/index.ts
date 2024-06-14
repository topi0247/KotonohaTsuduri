export interface IUser {
  uuid: string;
  name: string;
  isLogged: boolean;
}

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export interface INotification {
  title?: string;
  message: string;
  type: NotificationType;
  open: boolean;
}
