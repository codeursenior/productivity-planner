import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HomeBannerDumbComponent } from './home-banner/home-banner.dumb.component';
import { HomepageFeatureCardListDumbComponent } from './homepage-feature-card-list/homepage-feature-card-list.dumb.component';

@Component({
  imports: [HomeBannerDumbComponent, HomepageFeatureCardListDumbComponent],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  featureCardList = signal([
    {
      name: 'Planifier sa semaine',
      icon: 'calendar-heart-fill',
      description: 'Visibilité sur les 7 prochains jours',
    },
    {
      name: 'Atteindre ses objectifs',
      icon: 'trophy-fill',
      description: 'Priorisation des tâches',
    },
    {
      name: 'Analyser sa productivité',
      icon: 'bar-chart-line-fill',
      description: 'Visualiser le travail accomplis',
    },
  ]);

  onBannerClicked() {
    console.log('Banner clicked');
  }
}
