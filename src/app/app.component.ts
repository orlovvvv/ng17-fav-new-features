import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent],
  template: ` <app-navigation /> `,
  styles: [],
})
export class AppComponent {
  title = 'Angular 17 with my favourite new features';
}
