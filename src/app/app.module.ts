import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { SettingPage } from '../pages/setting/setting';
import { WorkPage } from '../pages//work/work';
import { MeetingPage } from '../pages/meeting/meeting';
import { VersionPage } from '../pages/version/version';
import { IonicStorageModule } from '@ionic/storage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackButtonService } from '../services/BackButton.service'
import { AppService } from '../services/appHttpService';
import { DemoService } from '../services/demo.service';
import { AuthService } from '../services/auth.service';
import { AppUpdateService } from '../services/appUpdateService'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SettingPage,
    WorkPage,
    MeetingPage,
    VersionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SettingPage,
    WorkPage,
    MeetingPage,
    VersionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DemoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackButtonService,
    AppService,
    AuthService,
    AppUpdateService
  ]
})
export class AppModule {}
