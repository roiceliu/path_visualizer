export class Node{
    row: number;
    col: number;
    state: State;

    

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.state = State.clean;
    }
}

export enum State{
    clean, visited, visiting, start, end, wall
}