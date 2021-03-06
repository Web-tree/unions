import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../_services/alert.service';
import {Router} from '@angular/router';
import {UnionsService} from '../../_services/unions.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  private readonly idValidators = Validators.compose([
    Validators.required,
    Validators.pattern('^[A-Za-z0-9]*$'),
  ]);

  form: FormGroup = this.regenerateForm();
  inProgress = false;
  displayName: FormControl = new FormControl('', Validators.required);
  id: FormControl = new FormControl('', this.idValidators);

  constructor(
    private dataService: UnionsService,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.inProgress = true;

    this.dataService.add(this.form.value).then(() => {
      this.alertService.success('Union is added successfully');
      this.router.navigate(['/u/' + this.form.value.id]);
    }).finally(() => this.inProgress = false);
  }

  private regenerateForm(): FormGroup {
    this.form = this.fb.group({
      id: this.id,
      displayName: this.displayName,
    });
    return this.form;
  }
}
