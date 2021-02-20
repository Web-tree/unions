import { Component, OnInit } from '@angular/core';
import {UnionsService} from '../../_services/unions.service';
import {ActivatedRoute} from '@angular/router';
import {Union} from '@webtree/unions-common/lib/model/union';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  union: Union = new Union();
  loaded = false;

  constructor(
    private unionsService: UnionsService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(paramsMap => {
        return this.unionsService
          .get(paramsMap.get('unionId')!)
          .then(union => {
            this.union = union;
            this.loaded = true;
          });
      }
    );
  }
}
