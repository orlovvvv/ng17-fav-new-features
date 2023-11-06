import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  template: `
    <div class="container">
      <h2>To do</h2>

      <div
        cdkDropList
        #todoList="cdkDropList"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="doneList"
        class="list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of todo; track item) {
        <div class="list-item" cdkDrag>
          {{ item }}
        </div>
        }
      </div>
    </div>

    <div class="container">
      <h2>Done</h2>

      <div
        cdkDropList
        #doneList="cdkDropList"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="todoList"
        class="list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of done; track item) {
        <div class="list-item" cdkDrag>
          {{ item }}
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 400px;
        max-width: 100%;
        margin: 0 20px;
        display: inline-block;
        vertical-align: top;
      }

      .list {
        border: solid 1px #ccc;
        min-height: 60px;
        background: white;
        border-radius: 4px;
        display: block;
        overflow: hidden;
      }

      .list-item {
        padding: 20px 10px;
        border-bottom: solid 1px #ccc;
        box-sizing: border-box;
        cursor: move;
        background: white;
        color: black;
        font-size: 14px;
      }

      .list-item:last-child {
        border: none;
      }

      /* Highlight the list item that is being dragged. */
      .cdk-drag-preview {
        border-radius: 4px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDrag, CdkDropList],
})
export class DragDropComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
