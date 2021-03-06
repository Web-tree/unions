import { Component, OnInit } from '@angular/core';
import {UnionsService} from '../../_services/unions.service';
import {Union} from '@webtree/unions-common/lib/model/union';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {
  unions: Union[] = [];
  displayedColumns: string[] = ['displayName'];
  loaded = false;

  constructor(
    private unionsService: UnionsService
  ) { }

  ngOnInit(): void {
    this.unionsService
      .my()
      .then(unions => {
        this.unions = unions;
        this.loaded = true;
      });
  }

}
