import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { SnackbarService } from "../services/snackbar.service";
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { GlobalConstants } from "../shared/global-constants";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarSerive: SnackbarService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [ null, [ Validators.required, Validators.pattern(GlobalConstants.emailRegex) ] ],
      password: [ null, [ Validators.required ] ]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      localStorage.setItem('token', response.token);
      this.responseMessage = response.message;
      this.snackbarSerive.openSnackBar(this.responseMessage, "");
      this.router.navigate([ '/' ]);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error.message;
      } else {
        this.responseMessage = GlobalConstants.genricError;
      }
      this.snackbarSerive.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
