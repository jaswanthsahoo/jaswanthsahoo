import { Users } from './../users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import * as XLSX from 'xlsx'; // Import XLSX for export functionality
import { UsersService } from '../users.service';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'], // Fix typo here: 'styleUrl' should be 'styleUrls'
})
export class ManagementComponent implements OnInit {
  dataSource: any[] = []; // To store the table data
  registerForm: any;
  Users: any;
  filteredUsers: any[] = []; // This will hold the filtered users for display
  searchQuery: string = ''; // Bind the search input to this property

  // Constructor should be outside of any method
  constructor(private router: Router, private usersService: UsersService) {} // Inject Router in the constructor
  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.Users = users;
      this.filteredUsers = [...this.Users]; // Initialize with all users
    });
  }

  onAddUser(): void {
    console.log('Add User button clicked!');
    this.router.navigate(['/register']); // Navigate to RegisterComponent
  }

  // Method to receive dataSource from table component
  onDataSourceChange(dataSource: any[]): void {
    this.dataSource = dataSource;
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(workbook, 'UserData.xlsx');
  }

  // Search function
  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim(); // Get the search query
    let userresult = JSON.parse(localStorage.getItem('userData'));
    debugger;
    if (query) {
      this.filteredUsers = userresult.filter(
        (user) =>
          user.name.toLowerCase().includes(query) || user.phone.includes(query)
      );
    } else {
      this.filteredUsers = [...userresult]; // Reset to all users when query is empty
    }
    this.dataSource = this.filteredUsers; // Update the table data source
  }
}
