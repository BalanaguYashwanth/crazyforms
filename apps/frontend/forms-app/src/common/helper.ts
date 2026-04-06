import { ethers } from "ethers";
import { ChatProps, MessageProps } from "./types";

export const shortAddress = (number: number, text: string) => {
    return text.slice(0, number)+'...' + text.slice(-(number))
}

export function generateRandomAddress() {
    const randomBytes = ethers.randomBytes(20); // Generates 20 random bytes
    const address = ethers.getAddress(ethers.hexlify(randomBytes));
    return address;
}

export const getInitialChat = (data: ChatProps[]) => {
    return {
        id:0,
        user: 'here is the given form responses data =>' + JSON.stringify(data) + '\n read this given form responses data \n',
        agent: "sure read it"
    }
}

export const restructureChatsAsPerLLMInput = (chats: ChatProps[]): MessageProps[] => {
    const messages: MessageProps[] = [];
    for (let i = 0; i < chats.length; i++) {
        const user = chats[i].user;
        const agent = chats[i].agent;
        if (user) {
            messages.push({ role: "user" as const, content: user });
        }
        if (agent) {
            messages.push({ role: "system" as const, content: agent });
        }
    }
    return messages;
};
