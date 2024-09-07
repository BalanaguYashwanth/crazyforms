export const shortAddress = (number: number, text: string) => {
    return text.slice(0, number)+'...' + text.slice(-(number))
}