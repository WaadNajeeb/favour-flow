import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { OweFavoursComponent } from "../owe-favours/owe-favours.component";
import { OwedFavoursComponent } from "../owed-favours/owed-favours.component";
import { CompletedFavoursComponent } from "../completed-favours/completed-favours.component";

@Component({
  selector: 'app-user-favours',
  imports: [MatCardModule, MatIconModule, MatTabsModule, MatPaginatorModule, MatButtonModule, CommonModule, OweFavoursComponent, OwedFavoursComponent, CompletedFavoursComponent],
  templateUrl: './user-favours.component.html',
  styleUrl: './user-favours.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFavoursComponent {
 favors = [
    { name: 'Alex Johnson', time: '2 days ago', item: '☕ Coffee' },
    { name: 'Sarah Chen', time: '1 week ago', item: '🍕 Pizza Slice' },
    { name: 'Mike Rodriguez', time: '3 days ago', item: '🍫 Chocolate' },
    { name: 'Emma Wilson', time: '5 days ago', item: '🧁 Cupcake' },
    { name: 'David Kim', time: '1 week ago', item: '🌿 Mint Tea' }
  ];

    onPageChange(event: any) {
    // handle pagination
  }
}
