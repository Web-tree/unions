import { Component, OnInit } from '@angular/core';
import {ApiKeysPair} from "@webtree/unions-common/lib/api-keys-pair";
import {KeysService} from "../../_services/keys.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  unionId: string = '';
  keys: ApiKeysPair[] = [];

  constructor(
    private keysService: KeysService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(value => this.unionId = value.get('unionId')!)
  }

  createKeys() {
    this.keysService.create(this.unionId)
      .then(keyPair => this.keys.push(keyPair))
  }
}
