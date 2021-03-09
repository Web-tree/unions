import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-apply-token',
  templateUrl: './apply-token.component.html',
  styleUrls: ['./apply-token.component.scss']
})
export class ApplyTokenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string) => {
      const params = new HttpParams({fromString: fragment});
      this.authService.applyToken(params.get('token')!);
    });
  }

}
