import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.smart.component.html',
  styleUrl: './sidebar.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarSmartComponent {

}
