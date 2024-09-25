import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from '../components/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'fatherName',
    'motherName',
    'dateOfBirth',
    'phone',
    'email',
    'country',
    'state',
    'address',
    'action',
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Emit the dataSource to the parent component
  @Output() dataSourceChange = new EventEmitter<any[]>();
  users: any;

  constructor(
    private router: Router,
    private userService: UsersService,
    private toastr: ToastrService
  ) {}
  searchQuery: any;
  ngOnInit(): void {
    this.loadUsers();
  }
  result = [];
  loadUsers() {
    // Ensure we're in a browser environment where localStorage is available
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedUsers = localStorage.getItem('userData');
      if (storedUsers) {
        this.result = JSON.parse(storedUsers);
        this.dataSource.data = this.result;
        this.dataSourceChange.emit(this.dataSource.data);
      }
    } else {
      console.warn('localStorage is not available.');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEdit(user: any): void {
    console.log('Editing user:', user);
    this.userService.setData(user);
    this.router.navigate(['/register']);
  }

  onDelete(user: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.userService.deleteUser(user).subscribe(() => {
        this.toastr.info('User deleted');
        this.loadUsers(); // Reload users after deletion
      });
      this.loadUsers();
    }
  }
  // Search function
  onSearch(): void {
    let filteredUsers;
    const query = this.searchQuery.toLowerCase().trim(); // Get the search query
    debugger;
    if (query) {
      filteredUsers = this.result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) || user.phone.includes(query)
      );
    } else {
      filteredUsers = [...this.result]; // Reset to all users when query is empty
    }
    this.dataSource = filteredUsers; // Update the table data source
  }
}
