import { Node, State } from './../../_shared/node';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  board: Node[][] = [];
  start_row: number = 7;
  start_col: number = 5;
  end_row: number = 3;
  end_col: number = 15;
  public get State(): typeof State{
    return State;
  }
  
  constructor() {
    for (let r = 0; r < 15; r++){
      this.board.push(new Array());
      for (let c = 0; c < 30; c++){
        this.board[r].push(new Node(r, c));
      }
    }
  }

  ngOnInit(): void {
    this.board[this.start_row][this.start_col].IsStart = true;
    this.board[this.end_row][this.end_col].IsEnd = true;
    this.board[5][11].state = State.visiting;
  }

  //when user click a node, check if user is draging the start/end node OR drag and select a row
  check(row: number, col: number) {
    let node = this.board[row][col];
    
    if (!node.IsStart) {
      node.IsStart = true;
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // takes current row & col to check if it's the target
  dfs(row: number, col: number) {

  
    //base condition
    if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[0].length || this.board[row][col].state === State.visiting || this.board[row][col].state === State.visited) {
       return false;
    }

    if (row === this.end_row && col === this.end_col) {
      return true;
    }

    this.board[row][col].state = State.visiting;
    
    let isFound = this.dfs(row + 1, col) || this.dfs(row - 1, col) || this.dfs(row, col + 1) || this.dfs(row, col - 1);

    if(isFound) {
      this.board[row][col].state = State.visited;
      return true;
    }
    
    return false;
  }

}
