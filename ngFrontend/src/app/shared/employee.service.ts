// import { Injectable } from '@angular/core';
// import { FormGroup, FormControl, Validators } from "@angular/forms";
// // import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { DatePipe } from '@angular/common';


export class EmployeeService {
    fullName="Mubashir Ansari";
    getEmployees() {
        return ("zain")
      }
}

//     constructor() { }
  
//     employeeList: [];
//     //  let list[];
  
//     form: FormGroup = new FormGroup({
//       $key: new FormControl(null),
//       fullName: new FormControl('', Validators.required),
//       email: new FormControl('', Validators.email),
//       mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
//       city: new FormControl(''),
//       gender: new FormControl('1'),
//       department: new FormControl(0),
//       hireDate: new FormControl(''),
//       isPermanent: new FormControl(false)
//     });

// initializeFormGroup() {
//     this.form.setValue({
//       $key: null,
//       fullName: '',
//       email: '',
//       mobile: '',
//       city: '',
//       gender: '1',
//       department: 0,
//       hireDate: '',
//       isPermanent: false
//     });
//   }

// }