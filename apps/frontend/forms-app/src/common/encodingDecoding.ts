import base64url from 'base64-url';

export const encodeNumber = (num: number): string => {
  return base64url.encode(num.toString()); // Encodes number to Base64
};

export  const decodeString = (str: string): number => {
  return parseInt(base64url.decode(str), 10); // Decodes Base64 string back to number
};
