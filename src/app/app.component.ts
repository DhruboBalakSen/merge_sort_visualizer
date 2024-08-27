import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VisualizerComponent } from './visualizer/visualizer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,VisualizerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'merge_sort_visualizer';
}
