import { inject, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  contactForm: any; // Using any temporarily to bypass the persistent unknown type inference issue in this environment

  submitted = false;

  constructor() {
    this.contactForm = this.fb.group({
      name: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      subject: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      message: this.fb.control('', { validators: [Validators.required, Validators.minLength(10)], nonNullable: true }),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.submitted = true;
      this.contactForm.reset();
    }
  }
}
