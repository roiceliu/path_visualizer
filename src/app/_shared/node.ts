export class Node{
    row: number;
    col: number;
    IsVisited: boolean;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.IsVisited = false;
    }
}