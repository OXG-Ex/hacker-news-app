export type NewsModel = {
    "id": number,
    "by": string,
    "descendants": number,
    "kids": number[],
    "score": number,
    "time": number,
    "title": string,
    "type": "story",
    "url": string;
};
