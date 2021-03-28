import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // [x: string]: any;
  title = 'StudentDashboard';

  studentDetails: any;

  studentToUpdate = {
    rollNumber: "",
    name:"",
    address:"",
    percentage:""
  }

  constructor(private studentService: StudentService) {
    this.getStudentDetails();
  }

  register(registerForm: NgForm) {    //name of that form that contains all values
    this.studentService.registerStudent(registerForm.value).subscribe(   //will give all the values from that form
      (resp) => {
        console.log(resp);
        registerForm.reset();    //clear() the data in the form
        this.getStudentDetails();
        alert("Successfully Reistered!");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStudentDetails() {
    this.studentService.getStudents().subscribe(
      (resp) => {
        console.log(resp);
        this.studentDetails = resp;  //storing all values in array to display in html page
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteStudent(student: { rollNumber: number; }) {
    var result = confirm("Are you sure want to delete?");
    if (result) {
      this.studentService.deleteStudent(student.rollNumber).subscribe(
        (resp) => {
          console.log(resp);
          this.getStudentDetails();
        },
        (err) => {
          console.log(err);
        }
      );
    }
    //confirm("Are you sure want to delete?");
    
  }

  edit(student: { rollNumber: string; name: string; address: string; percentage: string; }) {
    this.studentToUpdate = student;
  }

  updateStudent(){
    this.studentService.updateStudent(this.studentToUpdate).subscribe(
      (resp) =>{
        console.log(resp);
        confirm("Updated Successfully!");
      },
      (err)=>{
        console.log(err);
      }
    );
  }
}
