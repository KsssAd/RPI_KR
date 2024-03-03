import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  windowWidth: number = window.innerWidth;
  isExpanded: boolean = false;
  opened: boolean = false;

  @Output() toggle = new EventEmitter<boolean>();

  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  collapse() {
    this.isExpanded = false;
  }

  onToggleSidebar() {
    this.opened = !this.opened;
    this.toggle.emit(this.opened);
  }
}
