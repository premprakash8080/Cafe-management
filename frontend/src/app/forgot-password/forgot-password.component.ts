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
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: true,
})
export class ForgotPasswordComponent {

  forgotPasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxSerive:NgxUiLoaderService,
    private snaclbarService:SnackbarService
    
  ) { }


  ngOnInit(): void {
    this.forgotPasswordForm =this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
    })
  }

  handleSubmit(){
    this.ngxSerive.start();
    var formData=this.forgotPasswordForm.value;
    var data={
      email:formData.email
    }
    console.log('Forgot password data:', data);
    this.userService.forgotPassword(data).subscribe({
      next: (response:any)=>{
        this.ngxSerive.stop();
        this.responseMessage=response?.message || 'Password reset email sent';
        this.dialogRef.close();
        this.snaclbarService.openSnackBar(this.responseMessage,"");
      },
      error: (error)=>{
        this.ngxSerive.stop();
        console.error('Forgot password error:', error);
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }else if(error.message){
          this.responseMessage=error.message;
        }else{
          this.responseMessage=GlobalConstants.genricError;
        }
        this.snaclbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      }
    })
  }


}
