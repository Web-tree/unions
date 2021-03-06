import {Component, Inject, OnInit} from '@angular/core';
import {UnionsService} from '../../_services/unions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Union} from '@webtree/unions-common/lib/model/union';
import {AuthService} from '../../_services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  union: Union = new Union();
  loaded = false;
  isMine = false;

  constructor(
    private unionsService: UnionsService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramsMap => {
        return this.unionsService
          .get(paramsMap.get('unionId')!)
          .then(union => {
            this.union = union;
            if (this.authService.isLoggedIn()) {
              this.authService.getUser().then(user => {
                this.isMine = union.owner === user.id;
              });
            } else {
              this.isMine = false;
            }
          }).finally(() => this.loaded = true);
      }
    );
  }

  deleteConfirm(): void {
    this.dialog.open(DeleteUnionConfirmationComponent, {data: this.union});
  }
}

@Component({
  selector: 'app-delete-union-confirmation',
  templateUrl: 'delete-confirmation.html'
})
export class DeleteUnionConfirmationComponent implements OnInit {
  inProgress = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteUnionConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public union: Union,
    private unionsService: UnionsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  deleteUnion(): void {
    this.inProgress = true;
    this.unionsService
      .delete(this.union.id!)
      .then(() => this.router.navigate(['/my']))
      .finally(() => {
        this.dialogRef.close();
        this.inProgress = false;
      });
  }
}
