export class Node{
    row: number;
    col: number;
    IsStart: boolean;
    IsEnd: boolean;
    state: State;

    

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.state = State.clean;
        this.IsStart = false;
        this.IsEnd = false;
    }
}

export enum State{
    clean, visited, visiting
}