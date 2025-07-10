import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar-logo',
  standalone: true,
  templateUrl: './navbar-logo.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarLogoComponent {}
