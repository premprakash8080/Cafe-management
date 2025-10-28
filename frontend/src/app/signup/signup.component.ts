import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { SnackbarService } from "../services/snackbar.service";
import { MatDialogRef } from "@angular/material/dialog";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { GlobalConstants } from "../shared/global-constants";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ],
  standalone: false
})
export class SignupComponent implements OnInit {

  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarSerive: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [ null, [ Validators.required, Validators.pattern(GlobalConstants.nameRegex) ] ],
      email: [ null, [ Validators.required, Validators.pattern(GlobalConstants.emailRegex) ] ],
      contactNumber: [ null, [ Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex) ] ],
      password: [ null, [ Validators.required ] ]

    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password,
    }
    console.log('Signup data:', data);
    this.userService.signup(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message || 'Signup successful';
        this.snackbarSerive.openSnackBar(this.responseMessage, "");
        this.router.navigate([ '/' ]);
      },
      error: (error) => {
        this.ngxService.stop();
        console.error('Signup error:', error);
        if (error.error?.message) {
          this.responseMessage = error.error.message;
        } else if (error.message) {
          this.responseMessage = error.message;
        } else {
          this.responseMessage = GlobalConstants.genricError;
        }
        this.snackbarSerive.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    })
  }

}
