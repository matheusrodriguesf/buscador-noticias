export class Response<T> {
    totalElements: number;
    pageable?: {
        page: number,
        size: number,
    };
    content: T[];

    constructor(totalElements: number, pageable: { page: number, size: number }, content: T[]) {
        this.totalElements = totalElements;
        this.pageable = pageable;
        this.content = content;
    }
}