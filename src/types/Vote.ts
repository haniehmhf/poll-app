export type Question = {
    title: string,
    options: Option[]
}

export type Option = {
    id: number,
    value: string
}

export type Result = {
    [id: string]: number
}