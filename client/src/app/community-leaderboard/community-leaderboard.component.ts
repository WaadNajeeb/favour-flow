import { DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-community-leaderboard',
  imports: [MatCardModule, MatIconModule, NgClass, MatButtonModule],
  templateUrl: './community-leaderboard.component.html',
  styleUrl: './community-leaderboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityLeaderboardComponent {
  leaderboard = [
    { rank: 1, name: 'Jessica Chen', score: 2450, badgeInfo: 'Top Contributor' },
    { rank: 2, name: 'David Park', score: 2180, badgeInfo: 'Active Helper' },
    { rank: 3, name: 'Maria Rodriguez', score: 1960, badgeInfo: 'Community Builder' },
  ];

}
