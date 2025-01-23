import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarSmartComponent {

}
