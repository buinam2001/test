import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  @ViewChild("divBoard") divBoard!: ElementRef;

  topList = [];

  bottomList = [
    { name: "One", top: 0, left: 0 },
    { name: "Two", top: 0, left: 0 },
    { name: "Three", top: 0, left: 0 }
  ];

  drop(event: CdkDragDrop<BoardItem[]>) {
    const itemRect = event.item.element.nativeElement.getBoundingClientRect();
    const top = Math.max(
      0,
      itemRect.top +
        event.distance.y -
        this.divBoard.nativeElement.getBoundingClientRect().top
    );
    const left = Math.max(
      0,
      itemRect.left +
        event.distance.x -
        this.divBoard.nativeElement.getBoundingClientRect().left
    );

    const isWithinSameContainer = event.previousContainer === event.container;

    let toIndex = event.currentIndex;
    if (event.container.sortingDisabled) {
      const arr = event.container.data.sort((a, b) => a.top - b.top);
      const targetIndex = arr.findIndex(item => item.top > top);

      toIndex =
        targetIndex === -1
          ? isWithinSameContainer
            ? arr.length - 1
            : arr.length
          : targetIndex;
    }

    const item = event.previousContainer.data[event.previousIndex];
    item.top = top;
    item.left = left;

    if (isWithinSameContainer) {
      moveItemInArray(event.container.data, event.previousIndex, toIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        toIndex
      );
    }
  }
}

export class BoardItem {
  name: string;
  top: number;
  left: number;

  constructor(name: string, top: number, left: number) {
    this.name = name;
    this.top = top;
    this.left = left;
  }
}
