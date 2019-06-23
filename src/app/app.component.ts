import {Component} from '@angular/core';
import {FormArray, FormArrayName, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    phonePattern = '/\+380[0-9]*';
    order = [];
    // @ts-ignore
    myform: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        categories: new FormArray([new FormControl('', [Validators.required])]),
        phones: new FormArray([new FormControl('+380', [Validators.required,
        Validators.pattern('\\+380[0-9]{9}')])])
    });


    addCategory(e) {
        (this.myform.controls.categories as FormArray).push(new FormControl('', [Validators.required]));
        e.preventDefault();
    }

    addPhone(e) {
        (this.myform.controls.phones as FormArray).push(new FormControl('+380', [Validators.required]));
        e.preventDefault();
    }

    delCategory(i: number, e) {
        (this.myform.controls.categories as FormArray).removeAt(i);
        e.preventDefault();
    }

    delPhone(i: number, e) {
        (this.myform.controls.phones as FormArray).removeAt(i);
        e.preventDefault();
    }

    submit(myform: FormGroup) {
        this.order = myform.value;
    }
}
