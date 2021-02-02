import {fromEvent} from "rxjs";
import {map, switchMap, takeUntil} from "rxjs/operators";

const draggableBlock = document.querySelector('.draggable') as HTMLDivElement;

const mouseDownEvent$ = fromEvent<MouseEvent>(draggableBlock, 'mousedown');
const mouseMoveEvent$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseUpEvent$ = fromEvent<MouseEvent>(draggableBlock, 'mouseup');

mouseDownEvent$
  .pipe(
    switchMap(startEvent => {
      return mouseMoveEvent$
        .pipe(
          map(moveEvent => {
            const left = moveEvent.clientX - startEvent.offsetX;
            const top = moveEvent.clientY - startEvent.offsetY;
            return [left, top];
          }),
          takeUntil(mouseUpEvent$)
        )
    }),
  )
  .subscribe(event => {
    const [left, top] = event;
    draggableBlock.style.left = `${left}px`;
    draggableBlock.style.top = `${top}px`;
  });
