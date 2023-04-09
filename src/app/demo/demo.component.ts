import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  index = 0;
  done: any = [];

  handlevalue(obj: any, con: any) {
    // console.log(obj.id);
    const index = this.done.findIndex((value: any) => {
      return value.id == obj.id;
    });

    const rect = obj.check.getBoundingClientRect();
    // const rect = value.getBoundingClientRect();
    const position = {
      x: rect.left - con.offsetLeft,
      y: rect.top - con.offsetTop,
    };
    console.log(position);

    // const newobj = {
    //   id: obj.id,
    //   x: obj.dropPoint.x - obj.container.left,
    //   y: obj.dropPoint.y - obj.container.top,
    //   container: obj.container,
    // };

    const newobj = {
      id: obj.id,
      x: position.x - 6,
      y: position.y - 6,
      container: obj.container,
    };

    this.done.splice(index, 1, newobj);

    // this.done[index].x = newobj.x;
    // this.done[index].y = newobj.y;
    // console.log(newobj);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.container.element !== event.previousContainer.element) {
      const container =
        event.container.element.nativeElement.getBoundingClientRect();

      const itemBounds = event.dropPoint;

      let positionInContainer = {
        id: this.index++,
        x: itemBounds.x - container.left,
        y: itemBounds.y - container.top,
        container: container,
      };

      // console.log(positionInContainer);
      // console.log(event);
      this.done.push(positionInContainer);
      // console.log(this.done);
    }

    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex,
    //   );
    // }
  }
}
