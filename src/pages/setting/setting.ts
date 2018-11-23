import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login'
import { VersionPage } from '../version/version'
import { App, NavController, AlertController, NavParams } from 'ionic-angular';
import { AppService } from "../../services/appHttpService";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  pusNumber: boolean;
  constructor(
    public navCtrl: NavController,
    private app: App,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    public appService: AppService,
    public storage: Storage, 
    // public loginPage: LoginPage, 
    // public app: App,
    ) {
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingPage');
    // this.getAppPush();
  }
  logout() {
    this.alertCtrl.create({
      title: '退出登录',
      message: '确认退出么?',
      buttons: [
        {
          text: '确认',
          role: '取消',
          handler: () => {
            this.storage.get("user").then((value) => {
            });
            this.storage.remove("user");
            this.storage.remove("userLoginInfo");
            this.logoutApp();
            this.app.getRootNav().setRoot(LoginPage)
          }
        },
        {
          text: '取消',
          handler: () => {

          }
        }
      ]
    }).present();
  }
  // 登出
  logoutApp() {
    this.appService.ObserverHttpGet("/postman/ces/json/data1", null)
      .subscribe((res: Response) => {
        let data = res.json();
      }, error => {
      }
      );
  }
  // 检查版本
  checkversion(){
    this.app.getRootNav().push(VersionPage); 
  }

   //获取推送开关
  // getAppPush(){
  //   this.appService.ObserverHttpGet("/postman/ces/json/data1", null)
  //   .subscribe(
  //     (res) =>{
  //         this.pusNumber = res.json();
  //     }
  //   )
  // }
  //保存推送开关
  // savePush() {
  //   this.appService.ObserverHttpGetAdd('/postman/ces/json/data1', this.pusNumber)
  //     .subscribe(
  //       (res) => {
  //       }
  //     )
  // }
}
