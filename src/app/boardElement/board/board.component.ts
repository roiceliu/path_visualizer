import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Node, State } from './../../_shared/node';




@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  
  board: Node[][] = [];
  start_row: number = 7;
  start_col: number = 5;
  end_row: number = 9;
  end_col: number = 18;
  delay: number = 1;
  private _searchScope: Node[] = [];
  private _shortestPath: Node[] = [];
  private _prevMap:any;
  

  public get State(): typeof State{
    return State;
  }
  
  //initiate the board with nodes
  //ChnangeDetectorRef is to notify angular to update the changes 
  constructor(private ref: ChangeDetectorRef) {
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
    this.delay = 1;
  }

  //random function for testing -DELETE LATER
  test() {
    let randRow = Math.floor(Math.random() * 15);
    let randCol = Math.floor(Math.random() * 30);
    if (this.board[randRow][randCol].state === State.start || this.board[randRow][randCol].state === State.end) this.test();
    else this.board[randRow][randCol].state = State.visiting;
  }

  /**
   * 
   * @Mission 
   *  1. shortest path
   *  2. enable wall
   *  3. djakstra algo
   *  4. drag & drop node 
   */


/**
 * @Feature algorithms to apply onto our board
 * @Status Finished, some test done, not fully tested yet
 * 
 */
  
  RunAlgo(name: string) {
    let found = false;
    this.delay = 1;
    this._prevMap = new Map();
    debugger;
    switch (name) {
      case "bfs":
        found = this.bfs(this.start_row, this.start_col);
        this.findShortestPath();
        break;
      case "dfs":
        found = this.dfs(this.start_row, this.start_col);
    }
    return found;
  }

  private findShortestPath() {
    let r = this.end_row, c = this.end_col;
  
    //mark the path as shortest 
    while (r !== this.start_row || c !== this.start_col) {
      let parent = this._prevMap.get(`${r} ${c}`).split(" ");
      debugger;
      r = parseInt(parent[0]);
      c = parseInt(parent[1]);

      //finished marking the shortest [path]
      if (this.board[r][c].state === State.start) return;
      this.board[r][c].state = State.onShortestPath;
      // setTimeout(() => {
      //   this.board[r][c].state = State.onShortestPath;
      //   this.ref.markForCheck();
      // }, this.delay * 2);
    }
    
  }
  
  //BFS
  private bfs(row: number, col: number) {
    this._prevMap.set(`${row} ${col}`, null);
    let queue:number[][] = [[row, col]];

    while (queue.length) {
      let n = queue.length;
      //break the first part
      for (let i = 0; i < n; i++){
        let coordinate: number[] = queue[0];
        let rr = coordinate[0];
        let cc = coordinate[1];

        //found the end node
        if (rr === this.end_row && cc === this.end_col) {
          return true;
        }

        //take parent out and mark done
        //mark visited or visiting nodes
        this.board[rr][cc].state = (rr === this.start_row && cc === this.start_col) ? State.start : State.visited;


        let x = [1, -1, 0, 0];
        let y = [0, 0, 1, -1];

        for (let j = 0; j < 4; j++){
          let r_new = rr + x[j];
          let c_new = cc + y[j];

          //if this is the end node 
          if (r_new === this.end_row && c_new === this.end_col) {
            // debugger;
            this._prevMap.set(`${r_new} ${c_new}`, `${rr} ${cc}`);
            return true;
          }

          if (this.IsValidForBFS(r_new, c_new)) {
            queue.push([r_new, c_new]);
            this._prevMap.set(`${r_new} ${c_new}`, `${rr} ${cc}`);
            

            //FIXME: asynch work is messing things up on find shortest path,
            //also since bfs is not recursive, the set-timeout is very slow as well
            
            //visualization
            setTimeout(() => {
              this.board[r_new][c_new].state = State.visiting;
              this.ref.markForCheck();
            }, 1);
          }
        }
        queue.shift();
      }

    }
    
    
    return false;
  }

  private IsValidForBFS(row:number, col:number) {
    if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[0].length || this.board[row][col].state === State.visited || this.board[row][col].state === State.visiting || this.board[row][col].state === State.start  ) {
      return false;
    }
    return true;
  }
  
  // DFS 
  private dfs(row: number, col: number) {
    //base case
    if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[0].length || this.board[row][col].state === State.visited || this.board[row][col].state === State.visiting ) {
      return false;
   }
    if (row === this.end_row && col === this.end_col) {

      return true;
    }


    //mark visited or visiting nodes
    this.board[row][col].state = (row === this.start_row && col === this.start_col) ? State.start : State.visiting;
    
    let isFound = this.dfs(row - 1, col) || this.dfs(row + 1, col) || this.dfs(row, col + 1) || this.dfs(row, col - 1);

    if (isFound) {
      //for animation --> it needs to have different delay time
      setTimeout(() => {
          this.board[row][col].state = (row === this.start_row && col === this.start_col) ? State.start : State.visited;

          this.ref.markForCheck();
        }, this.delay * 2);
        
        this.delay += 10;
      
      return true;
    }

    return false;
  }


  /**
 * @Feature : drag and drop start and end node 
 * @Priority : #Low
 */
  // //when user click a node, check if user is draging the start/end node OR drag and select a row
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


}
