import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.smart.component.html',
  styleUrl: './sidebar.smart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarSmartComponent {

}
