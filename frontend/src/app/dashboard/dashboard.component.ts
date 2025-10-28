import { Component, AfterViewInit } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
    standalone: false
})
export class DashboardComponent implements AfterViewInit {

    responseMessage: any;
    data: any;

    ngAfterViewInit() { }


    constructor(
        private dashboardService: DashboardService,
        private ngxService: NgxUiLoaderService,
        private snackBarService: SnackbarService
    ) {
        this.ngxService.start();
        this.dashboardData();
    }

    dashboardData() {
        this.dashboardService.getDetails().subscribe(
            (response: any) => {
                this.ngxService.stop();
                this.data = response;
            },
            (error: any) => {
                this.ngxService.stop();
                console.log(error);
                if (error.error?.message) {
                    this.responseMessage = error.error?.message;
                } else {
                    this.responseMessage = GlobalConstants.genericError;
                }
                this.snackBarService.openSnackBar(
                    this.responseMessage,
                    GlobalConstants.error
                );
            }
        );
    }


}
