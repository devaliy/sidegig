import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Share } from '@capacitor/share';
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

  constructor(private apiService: ApiService, private platform: Platform, private socialSharing: SocialSharing, private navCtrl: NavController) { }

  ngOnInit(): void {
     this.getPics()
    this.getGridPics()
  }

  async share(link: string, desc: string) {
    await Share.share({
      title: "Image title",
      text: desc,
      url: link,
      dialogTitle: 'Share with buddies',
    });
  }

  getPics() {
      this.apiService.get().subscribe({
        next: (data) => {
          this.images = data
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

   async shareToTwitter(imageUrl: string, desc: string) {
    const shareOptions = {
      title: 'Share via Twitter',
      text: desc,
      url: `twitter://post?message=${encodeURIComponent(desc)}&url=${encodeURIComponent(imageUrl)}`,
      dialogTitle: 'Share via Twitter'
    };

    // Check if Twitter is available
    const available = await Share.canShare();

    if (available) {
      // Share the image to Twitter
      await Share.share(shareOptions);
    } else {
      // Twitter not available, handle accordingly (open Twitter website or display error)
      console.error('Twitter not available');
    }
   }

  shareViaTwitter(link: string, desc: string) {
     console.log(link)
    this.socialSharing.shareViaTwitter(desc, link)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }

  shareViaFacebook(link: string, desc: string) {
    console.log(link)
    this.socialSharing.shareViaFacebook(desc, link)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }

  shareViaInstagram(link: string, desc: string) {
    console.log(link)
    this.socialSharing.shareViaInstagram(desc, link)
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
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
