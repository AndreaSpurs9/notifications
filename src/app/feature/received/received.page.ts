import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-received',
  templateUrl: 'received.page.html',
  styleUrls: ['received.page.scss'],
})
export class ReceivedPage implements OnInit{

  public notification: any
  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {

  }


}
