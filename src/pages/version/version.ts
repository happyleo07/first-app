import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { AppService } from '../../services/appHttpService';
import { AppVersion } from '@ionic-native/app-version';
import { AppUpdateService} from '../../services/appUpdateService'

/**
 * Generated class for the VersionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-version',
  templateUrl: 'version.html',
})
export class VersionPage {
  version: string = '';
  lataestVersion: string = '';
  isLatest:boolean = true;
  pusNumber:boolean;

  constructor(
      public navCtrl:NavController,
      public navParams: NavParams,
      // private appUpdateService: AppUpdateService,
      // private appservice: AppService,
      // private appVersion: AppVersion,
      // private storage: Storage,
      // private alertCtrl: AlertController
      ){

  }
  ionViewWillEnter() {
    // this.getversion();
    // this.getAppPush();
    // this.appUpdateService.compariVersion().subscribe(res =>{
    //     var data = res.json();
    //     if(data.code == 200) {
    //       this.lataestVersion = data.lataestVersion;
    //     }
    // });
  }



  // 获取最新版本信息
  // getversion(){
  //   // 检测是否需要更新
  //   this.appVersion.getVersionNumber().then((version: string) => {
  //     this.version = version;
  //     this.appUpdateService.compariVersion().subscribe(res => {
  //         var data = res.json();
  //         if (data.code == 200) {
  //             this.lataestVersion = data.lataestVersion;
  //             if (data.lataestVersion != null && data.lataestVersion != version){
  //                 this.isLatest = false;
  //             }
  //         }
  //     })
  //   }).catch(err =>{

  //   });
  // }


  //更新
  // update(){
  //   if (this.isLatest) {
  //     const alert = this.alertCtrl.create({
  //         subTitle: '已是最新版本',
  //         buttons: ['确定']
  //     });
  //     alert.present();
  //   } else{
  //     const confirm = this.alertCtrl.create({
  //       message:'有最新版本,是否更新?',
  //       buttons: [
  //         {
  //           text: '取消',
  //           handler: () =>{
  //             console.log('Disagree clicked');
  //           }
  //         },
  //         {
  //           text: '确定',
  //           handler: () => {
  //             this.appUpdateService.downloadApp("/postman/ces/json/data1");
  //           }
  //         }
  //       ]
  //     });
  //     confirm.present();
  //   }
  // }
}
