import { Node } from './../../_shared/node';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  board:Node[][] = [];
  
  constructor() {
    for (let r = 0; r < 15; r++){
      this.board.push(new Array());
      for (let c = 0; c < 30; c++){
        this.board[r].push(new Node(r, c));
      }
    }
  }

  ngOnInit(): void {
  }

  check(row: number, col: number) {
    let node = this.board[row][col];
    node.IsVisited = !node.IsVisited;
  }

}
