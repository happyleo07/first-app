import { Component, ViewChild } from '@angular/core';



import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';
import { WorkPage } from '../work/work';
import { MeetingPage } from '../meeting/meeting';

import { Platform, Tabs } from 'ionic-angular';
import { BackButtonService } from "../../services/BackButton.service";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WorkPage;
  tab3Root = MeetingPage;
  tab4Root = SettingPage;
  

  @ViewChild('myTabs') tabRef: Tabs;

  tabRoots: Object[];


  constructor(public backButtonService: BackButtonService,
    private platform: Platform) {

      this.tabRoots = [
        {
          root: HomePage,
          tabTitle: '首页',
          tabIcon: 'home'
        },
        {
          root: WorkPage,
          tabTitle: '我的工作',
          tabIcon: 'clipboard'
        }
        ,
        {
          root: MeetingPage,
          tabTitle: '一周会议',
          tabIcon: 'calendar'
        }
        ,
        {
          root: SettingPage,
          tabTitle: '个人',
          tabIcon: 'person'
        }
      ];

      this.platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
        
  }
}
