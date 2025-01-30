import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarLogoComponent } from './navbar-logo/navbar-logo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NavbarLogoComponent, RouterLink],
  templateUrl: './navbar.smart.component.html',
  styleUrl: './navbar.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarSmartComponent {}
