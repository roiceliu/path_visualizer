import { Node, State } from './../../_shared/node';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations'; 



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  
  board: Node[][] = [];
  start_row: number = 7;
  start_col: number = 5;
  end_row: number = 9;
  end_col: number = 18;

  public get State(): typeof State{
    return State;
  }
  
  //initiate the board with nodes
  constructor() {
    for (let r = 0; r < 15; r++){
      this.board.push(new Array());
      for (let c = 0; c < 30; c++){
        this.board[r].push(new Node(r, c));
      }
    }
  }

  //register start & end node in board
  ngOnInit(): void {
    this.board[this.start_row][this.start_col].state = State.start;
    this.board[this.end_row][this.end_col].state = State.end;
  }

  //random function for testing -DELETE LATER
  test() {
    let randRow = Math.floor(Math.random() * 15);
    let randCol = Math.floor(Math.random() * 30);
    this.board[randRow][randCol].state = State.visited;
  }


  //when user click a node, check if user is draging the start/end node OR drag and select a row
  check(row: number, col: number) {
    let node = this.board[row][col];
    
    if (!(node.state === State.start)) {
      node.state = State.start;
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

  /**
   * 1. ajax rerender state of node
   * 2. how to use setTimer to simulate animation 
   *  
   */

  // DFS algorithm
  dfs(row: number, col: number) {
    //base condition
    if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[0].length || this.board[row][col].state === State.visited || this.board[row][col].state === State.visiting ) {
      return false;
   }
  

    if (row === this.end_row && col === this.end_col) {
      return true;
    }
    this.board[row][col].state = State.visiting;

    
    let isFound = this.dfs(row + 1, col) || this.dfs(row - 1, col) || this.dfs(row, col + 1) || this.dfs(row, col - 1);

    if (isFound) {
      this.board[row][col].state = State.visited;
      setTimeout(function () {  
      }, 10);
      return true;
    }

    return false;
  }

}
