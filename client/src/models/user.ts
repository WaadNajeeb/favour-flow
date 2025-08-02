// src/app/models/user.model.ts
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
