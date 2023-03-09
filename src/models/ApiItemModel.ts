export type ApiItemModel = {
    id: number,
    by: string, //Author
    descendants: number,
    kids: number[],
    score: number,
    time: number, //Date in Unix format
    title: string,
    type: string,
    url: string,
    text: string;
};
