import { Component, OnInit } from '@angular/core';
import {ApiKeysPair} from '@webtree/unions-common/lib/api-keys-pair';
import {KeysService} from '../../_services/keys.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  unionId = '';
  keys: ApiKeysPair[] = [];

  constructor(
    private keysService: KeysService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(value => {
      this.unionId = value.get('unionId')!;
      this.keysService
        .get(this.unionId)
        .then(keys => {
          this.keys = keys;
        });
    });
  }

  createKeys(): void {
    this.keysService.create(this.unionId)
      .then(keyPair => this.keys.push(keyPair));
  }

  delete(appId: string): void {
    this.keysService.delete(appId).then(() => {
      for (const key of this.keys) {
        if (key.appId === appId) {
          const index = this.keys.indexOf(key);
          this.keys.splice(index, 1);
          break;
        }
      }
    });
  }
}
