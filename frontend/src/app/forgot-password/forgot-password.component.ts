import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
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
    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.ngxSerive.stop();
      this.responseMessage=response?.message;
      this.dialogRef.close();
      this.snaclbarService.openSnackBar(this.responseMessage,"");
    },(error)=>{
      this.ngxSerive.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genricError;
      }
      this.snaclbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    }
  
  )}


}
