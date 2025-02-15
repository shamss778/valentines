import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-floating-hearts',
  templateUrl: './floating-hearts.component.html',
  styleUrls: ['./floating-hearts.component.css']
})
export class FloatingHeartsComponent implements OnInit {
  // Arrays to hold the two types of hearts
  clickHearts: { x: number; y: number }[] = [];
  autoHearts: { x: number; y: number }[] = [];

  ngOnInit() {
    this.createAutoFloatingHearts();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Check if the click is outside the card
    if (!(event.target as HTMLElement).closest('.card')) {
      this.createClickHeart(event.clientX, event.clientY);
    }
  }

  // Create a heart where the user clicks
  createClickHeart(x: number, y: number) {
    this.clickHearts.push({ x, y });
    setTimeout(() => {
      // Remove heart after animation ends
      this.clickHearts.shift();
    }, 3000);
  }

  // Continuously create hearts that float on their own
  createAutoFloatingHearts() {
    setInterval(() => {
      const x = Math.random() * window.innerWidth; // Random horizontal position
      const y = window.innerHeight; // Start at the bottom of the viewport
      this.autoHearts.push({ x, y });

      setTimeout(() => {
        // Remove heart after animation ends
        this.autoHearts.shift();
      }, 3000);
    }, 100); // Spawn a new heart every 800ms
  }
}
