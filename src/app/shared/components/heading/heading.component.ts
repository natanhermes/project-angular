import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  standalone: false,
  templateUrl: './heading.component.html',
})
export class HeadingComponent {
  @Input() title: string = '';
  @Input() subtitle?: string = '';
  @Input() classContainer?: string = '';
  @Input() classTitle?: string = '';
  @Input() classSubtitle?: string = '';
}
