import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./board/board.component";

@NgModule({
    imports: [CommonModule],
    declarations: [BoardComponent],
    exports: [BoardComponent]
})
export class BoardElementModule{}