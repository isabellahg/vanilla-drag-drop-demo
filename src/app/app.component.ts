import { Component, ElementRef, ViewChild } from "@angular/core";

type DropzoneId = "dropzone1" | "dropzone2";
type DraggedId = "dragged1" | "dragged2";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private draggedElement: DraggedId;

  /**
   * This dragging state is used to allow the
   * dragging only while dragging by the handle.
   */
  dragging = false;

  DROPZONE1: DropzoneId = "dropzone1";
  DROPZONE2: DropzoneId = "dropzone2";

  DRAGGED1: DraggedId = "dragged1";
  DRAGGED2: DraggedId = "dragged2";

  startDragging() {
    this.dragging = true;
  }

  stopDragging() {
    this.dragging = false;
  }

  onDragStart(event: DragEvent, draggedId: DraggedId) {
    if (this.dragging) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", ""); // Required for Firefox
      this.draggedElement = draggedId;
    }
  }

  onDragEnd(event: DragEvent) {
    this.draggedElement = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  onDrop(event: DragEvent, dropzoneId: DropzoneId) {
    event.preventDefault();
    if (this.draggedElement) {
      console.log(`Dropped ${this.draggedElement} in ${dropzoneId}`);
    }
  }
}
