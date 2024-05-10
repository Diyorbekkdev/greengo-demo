import { message } from "antd";
export function ErrorHandle(statusCode: number) {
    switch (statusCode) {
      case 400:
        message.error("Bad Request: The server received an invalid request.");
        break;
      case 401:
        message.error(
          "Unauthorized: Authentication is required to access this resource."
        );
        break;
      case 403:
        message.error(
          "Forbidden: You do not have permission to access this resource."
        );
        break;
      case 409:
        message.error("Telefon raqam avval ro'yxatdan o'tilgan!");
        break;
      case 413:
        message.error("Fayl hajmi 5MB dan kichik bo'lishi kerak!");
        break;
      case 500:
        message.error("Internal Server Error: The server encountered an error.");
        break;
      default:
        statusCode && message.error(`${statusCode}`);
    }
  }