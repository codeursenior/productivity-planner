import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-home-banner',
  imports: [],
  templateUrl: './home-banner.dumb.component.html',
  styleUrl: './home-banner.dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'text-white d-flex flex-column justify-content-center align-items-center text-center',
  },
})
export class HomeBannerDumbComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly button = input.required<string>();
  readonly clicked = output<void>();
}
