export const nonWhitespace = (value: string) => /^\S+$/.test(value)

export const decimals = (digits: number) => (value: number) => Number.isInteger(value * Math.pow(10, digits))
