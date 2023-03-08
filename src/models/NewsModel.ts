export type NewsModel = {
    id: number,
    by: string, //Author
    descendants: number,
    kids: number[],
    score: number,
    time: number, //Date in Unix format
    title: string,
    type: "story",
    url: string,
    text?: string;
};
