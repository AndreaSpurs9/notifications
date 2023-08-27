import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first, from } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  constructor(private http: HttpClient,
    private local: LocalStorageService) {}

  public ngOnInit(): void {
  }

  public sendPush(): void {
    let pushKey = '';
    from(this.local.getPreferences()).subscribe(val => {
      pushKey = val.pushToken;
    });
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "key=" + environment.pushServerKey
    });
    let body = {
      "to": pushKey,
      "notification": {
        "title": "Check this Mobile (title)",
        "body": "Rich Notification testing (body)",
        "mutable_content": true,
        "sound": "Tri-tone"
        }
    };
    this.http.post<any>("https://fcm.googleapis.com/fcm/send", body, {headers: headers}).subscribe(() =>{
      console.log("Sended")
    })
  }
}
