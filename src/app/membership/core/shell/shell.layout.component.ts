import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  templateUrl: './shell.layout.component.html',
  styleUrl: './shell.layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellLayoutComponent {

}
