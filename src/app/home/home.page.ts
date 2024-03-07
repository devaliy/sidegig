import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  images: any[] = [];
  gridImages: any[] = [];

  constructor(private apiService: ApiService, private platform: Platform,private socialSharing: SocialSharing, private navCtrl: NavController) { }

  ngOnInit(): void {
     this.getPics()
     this.getGridPics()
  }

  getPics() {
      this.apiService.get().subscribe({
        next: (data) => {
          this.images = data
          console.log(this.images)
        },
        error: (error) => {
          console.error('Error fetching record:', error)
        }
      });
  }

  getGridPics() {
      this.apiService.getGrid().subscribe({
        next: (data) => {
          this.gridImages = data
        },
        error: (error) => {
          console.error('Error fetching record:', error)
        }
      });
  }

  async shareViaTwitter(imageurl: string, desc: string) {
     try {
       const base64String = await this.apiService.downloadAndConvertImage(imageurl);
        this.socialSharing.shareViaTwitter(desc,  base64String)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });

    } catch (error) {
      console.error('Error downloading and converting image:', error);
      return
     }
  }


  async shareViaFacebook(imageurl: string, desc: string) {
     try {
       const base64String = await this.apiService.downloadAndConvertImage(imageurl);
        this.socialSharing.shareViaFacebook(desc,  base64String)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });

    } catch (error) {
      console.error('Error downloading and converting image:', error);
      return
     }
  }

  async shareViaInstagram(imageurl: string, desc: string) {
     try {
       const base64String = await this.apiService.downloadAndConvertImage(imageurl);
         this.socialSharing.shareViaInstagram(desc,  base64String)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });

    } catch (error) {
      console.error('Error downloading and converting image:', error);
      return
     }
  }

  handleRefresh(event: any) {
    this.navCtrl.pop().then(() => {
    this.navCtrl.navigateForward('/home');
  });
     setTimeout(() => {
        this.getPics()
        this.getGridPics()
        event.target.complete();
    }, 2000);
  }


}
