import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-request-card',
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatButtonModule, NgClass],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestCardComponent {
  @Input() user: string = '';
  @Input() timeAgo: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() tags: string[] = [];
  @Input() avatarUrl: string = '';
  @Input() status: 'Open' | 'in-progress' | 'completed' | 'cancelled' = 'Open';


  generateRandomHexColor(): string {
  // Generate a random number between 0 and 16777215 (0xFFFFFF in decimal)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Pad with leading zeros if the hex string is less than 6 characters
  return `#${randomColor.padStart(6, '0')}`;
}
}
