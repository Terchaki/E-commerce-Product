import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Services
import { ToastrFeedbackService } from '../../shared/services/toastr-feedback.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  submittedForm: boolean = false;
  usernameFocus: boolean = false;
  passwordFocused: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private toastrFeedbackService: ToastrFeedbackService
  ) {
    /**
     * Init forms.
     */
    this.form = this.formBuilder.group(this.validatorsForm());
  }

  /**
   * Validators form:
   */
  validatorsForm() {
    return {
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    };
  }

  /**
   * Controls do formulário.
   */
  get f() {
    return this.form.controls;
  }

  showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Submit Form Login.
   */
  onSubmit() {
    this.submittedForm = true;

    if (this.form.invalid) {
      return;
    } else {
      this.redirectLogin();
      console.log('asdasdasdas')
    }
  }

  redirectLogin() {
    this.route.navigate(['/produtos']);
  }
}
