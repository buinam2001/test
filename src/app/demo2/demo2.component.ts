import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css'],
})
export class Demo2Component implements OnInit {
  ngOnInit(): void {}
  name!: string;

  @ViewChild('canvas') canvas!: any;

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');

    // input data
    // mảng các chuỗi base64
    const inputData = [
      ' data:image/png;base64,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',
    ];

    // create image object
    const img = new Image();

    // load first image
    img.onload = () => {
      // set the canvas size to the image dimension
      canvasEl.width = img.width;
      canvasEl.height = img.height;

      // draw image on canvas
      ctx?.drawImage(img, 0, 0);

      // loop through the remaining images
      for (let i = 1; i < inputData.length; i++) {
        const imgData = inputData[i];

        // create new image object
        const newImg = new Image();

        // load image
        newImg.onload = () => {
          // draw image on canvas
          ctx?.drawImage(newImg, 0, 0);
        };
        newImg.src = imgData;
      }
    };
    img.src = inputData[0];
  }

  handlevalue(input: any) {
    // console.log(input.offsetLeft);
    // console.log(input.offsetTop);
  }

  handleclick(value:any,container:any) {



    const rect = value.getBoundingClientRect();

    const position = {
      x: rect.left - container.offsetLeft,
      y: rect.top - container.offsetTop
    };


    console.log(position);
    // console.log(value);
    // console.log(container);

    // var ctx = this.canvas.nativeElement.getContext('2d');
    // ctx.fillText(this.name, 20, 100);
    // console.log(this.canvas.nativeElement.toDataURL('image/png'));
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
