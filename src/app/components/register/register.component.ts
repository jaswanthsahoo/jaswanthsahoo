import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None, // Disable encapsulation for global styles
})
export class RegisterComponent {
  registerForm!: FormGroup;
  location: any;
  toastr: any;
  // usersService: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService, // Check this injection
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    // console.log(this.table);
    let val = this.usersService.getData();

    debugger;
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        fatherName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
        ],
        motherName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
        ],
        dateOfBirth: ['', Validators.required],
        phone: [
          '',
          [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        state: ['', Validators.required],
        address: ['', Validators.required],
        password: ['', [Validators.required, this.customPasswordValidator()]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
    if (val) {
      debugger;
      this.registerForm.setValue(val);
    }
  }

  customPasswordValidator(): Validators {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;

      // Check if password contains at least one letter (uppercase or lowercase)
      const hasLetter = /[a-zA-Z]/.test(password);

      // Check if password contains at least one number (excluding '0')
      const hasNumber = /[1-9]/.test(password);

      // Check if password contains at least one special character
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      // Check if password length is between 6 and 15 characters
      const isValidLength = password?.length >= 6 && password?.length <= 15;

      // Ensure password does not contain '0'
      const doesNotContainZero = !/0/.test(password);

      const isValid =
        hasLetter &&
        hasNumber &&
        hasSpecialChar &&
        isValidLength &&
        doesNotContainZero;

      return !isValid ? { passwordInvalid: true } : null;
    };
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  oncancel(): void {
    this.registerForm.reset();
    this.router.navigate(['/management']); //by using router we can go back
  }
  onsave(): void {
    if (this.registerForm.valid) {
      // const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      let result = [];
      if (localStorage.getItem('userData')) {
        let val = JSON.parse(localStorage.getItem('userData'));
        debugger;
        val?.length &&
          val.filter((vh) => {
            result.push(vh);
          });
      }
      result.push(this.registerForm.value);
      localStorage.setItem('userData', JSON.stringify(result));
      //alert('login Successful!');

      this.usersService.addUser(this.registerForm.value); // Make sure addUser exists
      this.toastrService.success('Form Submitted Successfully!', 'Success!');
      console.log(this.toastrService.success);
      this.router.navigate(['/management']);
    } else {
      this.toastrService.error('Please fill all fields correctly.', 'Error!');
    }
  }
  /** This method is used to save the user */
  saveUser(data: any) {
    try {
    } catch (error) {
      console.log('Error in catch saveUser()' + error.message);
    }
  }
}
