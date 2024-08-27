import { Routes } from '@angular/router';
import { IntroductionComponent } from './intro/intro.component';
import { VisualizerComponent } from './visualizer/visualizer.component';

export const routes: Routes = [
    { path: '', component: IntroductionComponent },
    { path: 'visualizer', component: VisualizerComponent }
  ];
