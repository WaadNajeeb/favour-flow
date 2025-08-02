export interface Favour {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'Open' | 'in-progress' | 'completed' | 'cancelled';
  requesterId: string; // User ID of the person who requested the favour
  assigneeId?: string; // User ID of the person assigned to complete the favour
  tags?: string[]; // Optional tags for categorization
  rewards: string[]; // Rewards offered for completing the favour
}
