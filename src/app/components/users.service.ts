import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject = new BehaviorSubject<Users[]>([]);
  private users$ = this.usersSubject.asObservable();

  // Store the user being edited
  private editUserSubject = new BehaviorSubject<Users | null>(null);

  getUsers(): Observable<Users[]> {
    return this.users$;
  }

  addUser(user: Users): void {
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next([...currentUsers, user]);
  }

  deleteUser(user: Users): Observable<void> {
    const currentUsers = this.getUsersFromStorage(); // Get users from local storage
    const updatedUsers = currentUsers.filter((u) => u.email !== user.email); // Remove user based on unique field (email or other unique identifier)
    localStorage.setItem('userData', JSON.stringify(updatedUsers)); // Update the local storage with filtered users
    this.usersSubject.next(updatedUsers); // Emit the updated user array
    return new Observable((observer) => observer.complete());
  }

  // Utility method to get users from local storage
  private getUsersFromStorage(): Users[] {
    return JSON.parse(localStorage.getItem('userData')) || [];
  }

  // Set user for editing
  setEditUser(user: Users): void {
    this.editUserSubject.next(user);
  }

  // Get user for editing
  getEditUser(): Observable<Users | null> {
    return this.editUserSubject.asObservable();
  }

  // Update user after editing
  updateUser(updatedUser: Users): void {
    const currentUsers = this.usersSubject.getValue();
    const userIndex = currentUsers.findIndex(
      (user) => user.email === updatedUser.email
    );
    currentUsers[userIndex] = updatedUser; // Update user in the array
    this.usersSubject.next([...currentUsers]);
  }
  private data: any;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
