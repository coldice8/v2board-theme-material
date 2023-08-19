import { IUserSubscribe } from "../interface/userInterface";

export const convertTimestampToDateTime = (timestamp: number, includeTime: boolean = true): string => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  let formattedDateTime = `${year}-${month}-${day}`;
  if (includeTime) formattedDateTime += ` ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

export const getTransferPercentage = (data: IUserSubscribe) => {
  return Math.ceil(((data.u + data.d) / data.transfer_enable) * 100);
};

export const formatBytes = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`;
};

export const negatedBooleanValueToNumber = (value: boolean): number => {
  if (value) return 0;
  else return 1;
};

