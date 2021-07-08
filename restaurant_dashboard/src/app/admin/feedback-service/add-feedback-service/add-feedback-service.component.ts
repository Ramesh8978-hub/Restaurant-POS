import { FeedbackServicesModel } from './../../../shared/models/feedback-services.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackServicesService } from 'src/app/shared/services/feedback-services.service';

@Component({
  selector: 'app-add-feedback-service',
  templateUrl: './add-feedback-service.component.html',
  styleUrls: ['./add-feedback-service.component.scss'],
})
export class AddFeedbackServiceComponent implements OnInit {
  feedback: any;
  id;
  createdById;
  feedbackServiceForm: FormGroup;

  constructor(private feedbackService: FeedbackServicesService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private simpleDialog: MatDialogRef<AddFeedbackServiceComponent>) {
    simpleDialog.disableClose = true;
  }
 
  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.feedbackServiceForm = new FormGroup({
      createdBy: new FormControl(this.createdById, Validators.required),
      question: new FormControl('', Validators.required)
    });
    this.id = this.feedbackService.getter();
    this.feedbackService
      .getfeedbackServicesDetailsById(this.id)
      .subscribe(data => {
        this.feedback = data;
        this.feedbackServiceForm = this.formBuilder.group({
          question: new FormControl(this.feedback.question, Validators.required),
          status: new FormControl( this.feedback.status, Validators.required),
          updatedBy: new FormControl(this.createdById, Validators.required),
        });
      });
  }

  FeedbackServices() {
    if (!this.id){
      console.log(this.feedbackServiceForm.value);
      this.feedbackService.postfeedbackServices(this.feedbackServiceForm.value).subscribe((data) => {
          if (data) {
            this.snackBar.open('FeedBack Service Added!', 'Success', {
              duration: 2000
            });
            this.feedbackServiceForm.reset();
          }
        },
      (err) => this.errorHandler(err, 'FeedBack Service Added Failed.')
    );
    }else{
      this.feedbackService.putfeedbackServices(this.feedback.id, this.feedbackServiceForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('FeedBack Service Updated!', 'Success', {
            duration: 2000
          });
          this.feedbackServiceForm.reset();
        }
      },
      (err) => this.errorHandler(err, 'FeedBack Service Update Failed.')
    );
    }
  }
  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z-_? ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
