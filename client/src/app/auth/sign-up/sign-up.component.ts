import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PasswordComponent } from "../password/password.component";

@Component({
  selector: 'app-sign-up',
  imports: [MatIcon, MatFormFieldModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, MatError, CommonModule, MatInputModule, PasswordComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  private fb = inject(FormBuilder);
  signUpForm = this.fb.group<SignUpForm>({
    profilePicture: new FormControl<File | null>(null), // File object from the input
    firstName: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required]),
    confirmPassword: new FormControl<string | null>(null, [Validators.required]),
    agreement: new FormControl<boolean | null>(false, [Validators.requiredTrue])
  });

  uploadProfilePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
  }
  profileImageUrl: string | null = null;

  onProfilePictureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}


export interface SignUpForm {
  profilePicture: FormControl<File | null>; // File object from the input
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  agreement: FormControl<boolean | null>;
}
