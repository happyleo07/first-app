import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { TabsPage  } from '../tabs/tabs'
import { NgForm } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/BackButton.service";
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AppService } from "../../services/appHttpService";
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('loginForm') currentForm: NgForm;	//实时表单
  loginForm: NgForm;								//初始表单
  submitted: boolean = false;								//表单是否已经提交
  tipFlag: boolean = false;            // 输入时隐藏输入框以下信息
  user = {
    userid: '',							//登录数据
    username:'',
    mobile: '',
    password: '',
    yznumber:'',
    remember: true
  };
  json:any[];
  tabflag: any;

  //验证码倒计时
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,//总共时间
    disable: true
  }
  constructor(public navCtrl: NavController,
    private backButtonService: BackButtonService,
    private demoSer:DemoService,
    public storage: Storage,
    public http: Http,
    
    private loadingCtrl: LoadingController,
    // public alertCtrl: AlertController,
    

    // 注册app服务 添加 声明  `
    public appService: AppService,
    private platform: Platform,
    public viewCtrl: ViewController) {
    this.platform.ready().then(() => {
    this.backButtonService.registerBackButtonAction(null);
    });
   
    
  }
  ngOnInit() {
  }
  item: number = 0;
  
  // ionViewDidLoad() {
  //   this.demoSer.getRequestContact().subscribe(
  //     (res)=>{
  //       this.json = res.json();
  //       console.log(res.json());
  //     }
  //   )
  //   console.log('ionViewDidLoad LoginPage');
  // }
  
  //输入框获取焦点：隐藏，失去焦点：显示
  getFocus() {
    this.tipFlag = true;
  }

  loseFocus() {
    this.tipFlag = false;
  }


  // 手机验证码登录方法
  login() {
    
    // 验证手机号用户名，密码验证码，是否输入
    if (this.user.mobile == null || this.user.mobile == ''){
      this.appService.popToastView('请输入手机号！','top',2000);
      return;
    }
   
    if (this.user.mobile.length != 11) {
      this.appService.popToastView('手机号码格式不正确，请重填', 'top', 2000);
      return;
    }
    var myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!myreg.test(this.user.mobile)) {
      this.appService.popToastView('手机号码格式不正确，请重填', 'top', 2000);
      return;
    }
    if (this.user.yznumber == null || this.user.yznumber == '') {
      this.appService.popToastView('请输入验证码！', 'top', 2000);
      return;
    }
    if (this.user.yznumber.length !== 6) {
      this.appService.popToastView('验证码不正确！', 'top', 2000);
      return;
    }
    this.appService.ObserverHttpGet("/postman/ces/json/data1", null)
      .subscribe((res: Response) => {
        // loading.dismiss();
        this.submitted = true;
        let data = res.json();
        if (data["errcode"] == '0') {
          //将当前登录用户存进缓存，便于后期逻辑操作
          // this.storage.set('user', data.data);
          // this.user.username = data.data.username;
          // this.storage.set('userLoginInfo', this.user.username);
          // return this.navCtrl.setRoot(TabsPage, { "user": this.user.username });
          let loader = this.loadingCtrl.create({
            content: "正在登录中",
            // duration: 3000
          });
          loader.present();
          setTimeout(() => {
            loader.dismiss();
          }, 2000);
          setTimeout(() => {
            this.navCtrl.push(TabsPage);
          }, 2000);

        }
        if (data["errcode"] == '500') {
          this.appService.popToastView('手机号或验证码有误！', 'top', 2000);
          console.log(data.errmsg);
          return;

        }
  });

}
// 用户名密码登录方法
  login_2(){
    if (this.user.username == null || this.user.username == '') {
      this.appService.popToastView('请输入用户名！', 'top', 2000);
      return;
    }
    if (this.user.password == null || this.user.password == '') {
      this.appService.popToastView('请输入密码！', 'top', 2000);
      return;
    }
    // if (this.user.username != 'cuizhe') {
    //   this.appService.popToastView('请输入正确用户名！', 'top', 2000);
    //   return false;
    // }
   
    //   if (this.user.password != '0000') {
    //     this.appService.popToastView('请输入正确的密码！', 'top', 2000);
    //     return false;
    //   }
    
    this.appService.ObserverHttpGet("/postman/ces/json/data1", null)
      .subscribe((res: Response) => {
        // loading.dismiss();
        this.submitted = true;
        let data = res.json();
        if (data["errcode"] == '0') {
          let loader = this.loadingCtrl.create({
            content: "正在登录中",
            // duration: 3000
          });
          loader.present();
          setTimeout(() => {
            loader.dismiss();
          },2000);
          //将当前登录用户存进缓存，便于后期逻辑操作
          // this.storage.set('user', data.data);
          // this.user.username = data.data.username;
          // this.storage.set('userLoginInfo', this.user.username);
          // return this.navCtrl.setRoot(TabsPage, { "user": this.user.username });
          setTimeout(() => {
            this.navCtrl.push(TabsPage); 
          }, 2000);
        }
        if (data["errcode"] == '500') {
          this.appService.popToastView('用户名或密码有误！', 'top', 2000);
          return;

        }
      });   
    // this.navCtrl.push(TabsPage); 
  }

    //  this.navCtrl.push(TabsPage);  //跳转 首页
   
  //忘记密码
  getCode(){
    // 验证手机号用户名，密码验证码，是否输入
    if (this.user.mobile == null || this.user.mobile == '') {
      this.appService.popToastView('请输入手机号！', 'top', 2000);
      return;
    }

    if (this.user.mobile.length != 11) {
      this.appService.popToastView('手机号码格式不正确，请重填', 'top', 2000);
      return;
    }
    var myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!myreg.test(this.user.mobile)) {
      this.appService.popToastView('手机号码格式不正确，请重填', 'top', 2000);
      return;
    }
    if (this.verifyCode.countdown == 0) {
      this.verifyCode.verifyCodeTips = "获取验证码";
      this.verifyCode.disable = true;
      
    } else {
      this.verifyCode.countdown--;
    }

    // 请求后台验证码
    this.appService.ObserverHttpGet("/postman/ces/json/yzm", null)
      .subscribe((res: Response) => {
        // loading.dismiss();
        this.submitted = true;
        let data = res.json();
        if (data["errcode"] == '0') {
        }
      });
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";
      // this.getCode();
    }, 1000);
  }
  forgetPassword(): void {
    this.appService.alert('若忘记密码，请与人事处联系。');
  }
  // tab切换功能
  OnItemClick(value) {
    this.item = value;
  }
}
