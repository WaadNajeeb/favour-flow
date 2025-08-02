import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, NgClass, NgStyle, MatSelectModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent {
topUsers: LeaderboardUser[] = [
    {
      name: 'Sarah Chen',
      username: '@sarahc',
      avatar: 'assets/avatars/sarah.jpg',
      completed: 142,
      score: 98,
      rank: 2,
    },
    {
      name: 'Alex Rodriguez',
      username: '@alexr',
      avatar: 'assets/avatars/alex.jpg',
      completed: 186,
      score: 124,
      rank: 1,
    },
    {
      name: 'Mike Johnson',
      username: '@mikej',
      avatar: 'assets/avatars/mike.jpg',
      completed: 128,
      score: 89,
      rank: 3,
    },
  ];

  fullRankings: LeaderboardUser[] = [
    {
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: 'assets/avatars/emma.jpg',
      completed: 115,
      score: 82,
      streak: '7 days',
      status: 'Active',
    },
    {
      name: 'David Kim',
      username: '@davidk',
      avatar: 'assets/avatars/david.jpg',
      completed: 98,
      score: 76,
      streak: '3 days',
      status: 'Active',
    },
    {
      name: 'Lisa Park',
      username: '@lisap',
      avatar: 'assets/avatars/lisa.jpg',
      completed: 87,
      score: 69,
      streak: '12 days',
      status: 'Active',
    },
    {
      name: 'Tom Brown',
      username: '@tomb',
      avatar: 'assets/avatars/tom.jpg',
      completed: 72,
      score: 58,
      streak: '1 day',
      status: 'Away',
    },
    {
      name: 'Anna Smith',
      username: '@annas',
      avatar: 'assets/avatars/anna.jpg',
      completed: 65,
      score: 52,
      streak: '5 days',
      status: 'Active',
    },
  ];
}


interface LeaderboardUser {
  name: string;
  username: string;
  avatar: string;
  completed: number;
  score: number;
  streak?: string;
  status?: 'Active' | 'Away';
  rank?: number;
}
