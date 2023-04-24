import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ApiRestServiceService } from './service/api-rest-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-industria';

  readonly VAPID_PUBLIC_KEY = "BM5vCPcH8UEt3K_Ax2ClC8slDubhJQBOfQC4tBO-R_IqnyGfzlGWq-F-tvYDOx_JaiU348Vil3-NeiIK6bIcNlI";

    constructor(
        private swPush: SwPush,
        private apiRest: ApiRestServiceService) {

          this.subscribeToNotifications();
        }

    subscribeToNotifications():any {

        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        }).then(sub => {
          const token = JSON.parse(JSON.stringify(sub));

          this.apiRest.saveToken(token).subscribe({next: 
            res=>{
              console.log(res)
            },
            error: error=>{
              console.log('ERR',error);
            }
            
          })
        })
        .catch(err => console.error("No se pudo subscribir a las notifiaciones", err));
    }
}
