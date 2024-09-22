import { CommonModule } from '@angular/common';
import { Component, Directive, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrayService } from '../array.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
})
export class VisualizerComponent implements OnInit {
  array: number[] = [];
  data: any[] = [];
  unsorted_array: number[] = [];
  sorted_array: number[] = [];
  delay: number = 100;
  arraySize: number = 20;
  timer: number = 0;

  constructor(private arrayService: ArrayService, private router: Router) {}

  ngOnInit(): void {
    this.resetArray();
  }

  resetArray(): void {
    this.delay = 100;
    this.timer = 0;
    this.array = [];
    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(Math.floor(Math.random() * 100));
      // this.unsorted_array.push(Math.floor(Math.random() * 100));
    }
    this.unsorted_array = this.array.slice();
  }

  async mergeSort(arr: number[], l: number, r: number): Promise<void> {
    if (l >= r) {
      return;
    }
    const m = l + Math.floor((r - l) / 2);
    await this.mergeSort(arr, l, m);
    await this.mergeSort(arr, m + 1, r);
    await this.merge(arr, l, m, r);
  }

  async merge(arr: number[], l: number, m: number, r: number): Promise<void> {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
      L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      await this.delayFunction();
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      await this.delayFunction();
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      await this.delayFunction();
    }
  }

  async delayFunction(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  async startSorting(): Promise<void> {
    let startTime = performance.now();
    await this.mergeSort(this.array, 0, this.array.length - 1);
    let endTime = performance.now();
    this.timer = (endTime - startTime) / 1000;
    this.sorted_array = this.array;
    this.saveData();
  }

  updateArraySize(size: number): void {
    if (size > 60) {
      alert('Array Size should be 60 or less than 60');
      this.arraySize = 60;
    } else {
      this.arraySize = size;
    }

    this.resetArray();
  }

  updateDelay(value: number): void {
    this.delay = value;
  }

  saveData() {
    const data = {
      unsorted_array: this.unsorted_array,
      sorted_array: this.sorted_array,
      delay: this.delay,
      time_taken: this.timer,
    };

    this.arrayService.saveArray(data).subscribe(
      (response) => {
        console.log('Data saved:', response);
        // this.fetchArrays(); // Fetch updated data after saving
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }

  showHistory(): void {
    this.router.navigate(['/history']);
  }
}
