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

  handlevalue(obj: any) {
    // console.log(obj.id);
    const index = this.done.findIndex((value: any) => {
      return value.id == obj.id;
    });

    // const container =
    //   obj.source.dropContainer.element.nativeElement.getBoundingClientRect();
    const newobj = {
      id: obj.id,
      x: obj.dropPoint.x - obj.container.left,
      y: obj.dropPoint.y - obj.container.top,
      container:obj.container
    };

this.done.splice(index, 1, newobj);

console.log(this.done)
    // this.done[index].x = newobj.x;
    // this.done[index].y = newobj.y;
    // console.log(newobj);
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event);
    if (event.container.element !== event.previousContainer.element) {
      const container =
        event.container.element.nativeElement.getBoundingClientRect();

      const itemBounds = event.dropPoint;

      let positionInContainer = {
        id: this.index++,
        x: itemBounds.x - container.left,
        y: itemBounds.y - container.top,
        container:container
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
