export type Range = {
    max: number,
    min: number
}

export type NumberEntity = {
    range: Range,
    default: number,
    value: number,
    formula: string
}

export type StringEntity = {
    default: string,
    value: string,
    forumla: string
}