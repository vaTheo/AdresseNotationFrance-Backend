import { AddressObject } from "./address";

export function getCoordinatesAsString(addressObj: AddressObject): string {
  return addressObj.geometry.coordinates.join(',')
}

export function getFormattedDateYearsAgoAsString(yearsAgo: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearsAgo);

  // Ensuring month and day are in 'MM' and 'DD' format
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}
