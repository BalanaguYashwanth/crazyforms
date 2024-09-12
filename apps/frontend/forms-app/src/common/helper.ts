import { ethers } from "ethers";

export const shortAddress = (number: number, text: string) => {
    return text.slice(0, number)+'...' + text.slice(-(number))
}

export function generateRandomAddress() {
    const randomBytes = ethers.randomBytes(20); // Generates 20 random bytes
    const address = ethers.getAddress(ethers.hexlify(randomBytes));
    return address;
  }