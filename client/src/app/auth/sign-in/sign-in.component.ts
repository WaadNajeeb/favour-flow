import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatError, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { PasswordComponent } from "../password/password.component";
@Component({
  selector: 'app-sign-in',
  imports: [MatIcon, MatFormFieldModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, MatError, CommonModule, MatInputModule, PasswordComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

   private fb = inject(FormBuilder);
   signInForm = this.fb.group<SignInForm>({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required]),
    rememberMe: new FormControl<boolean | null>(false)
  });
}


export interface SignInForm {
  email: FormControl<string | null>;
  password:FormControl<string | null>;
  rememberMe: FormControl<boolean | null>;
}
