import { Component, OnInit } from '@angular/core';
import {UnionsService} from '../../_services/unions.service';
import {ActivatedRoute} from '@angular/router';
import {Union} from '@webtree/unions-common/lib/model/union';
import {AuthService} from "../../_services/auth.service";

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
    private authService: AuthService
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
                this.loaded = true;
              });
            } else {
              this.isMine = false;
              this.loaded = true;
            }
          });
      }
    );
  }
}
