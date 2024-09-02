import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroductionComponent {

  constructor(private router: Router) {}

  navigateToVisualizer(): void {
    this.router.navigate(['/visualizer']);
  }
}
