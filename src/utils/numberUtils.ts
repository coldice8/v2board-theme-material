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
