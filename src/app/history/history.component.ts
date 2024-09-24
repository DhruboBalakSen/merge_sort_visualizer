import { Component, OnInit } from '@angular/core';
import { ArrayService } from '../array.service';
import { JsonPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor,JsonPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  arrays :any[] = [];
  constructor(private arrayService: ArrayService) {}
  ngOnInit(): void {
    this.fetchArrays();
  }

  fetchArrays() {
    this.arrayService.getArrays().subscribe(
      (data) => {
        this.arrays = data; // Assign the fetched data to the arrays property
        console.log('Data fetched:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
