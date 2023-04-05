import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  Component,
  Injector,
  OnInit,
  Renderer2,
  ElementRef,
  Input,
} from '@angular/core';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dragable',
  templateUrl: './dragable.component.html',
  styleUrls: ['./dragable.component.css'],
})
export class DragableComponent {
  @Input() data: any;
  @Output() newItemEvent = new EventEmitter<any>();

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  handlecheck($event: any) {
    let id = this.data.id;
    let container = this.data.container;

    const obj = {
      id: id,
      container:container,
      ...$event,
    };
    this.newItemEvent.emit(obj);
  }
}
