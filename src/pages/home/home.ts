import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpModule,Http,Response} from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  // 接收数据用
  listData: Object;
  list:any[];
  // 依赖注入
  constructor(public navCtrl: NavController, public http: Http) {

    

  }
  
  ionViewDidLoad() { 
    console.log("",this.http);
    /*this.http.request('http://jsonplaceholder.typicode.com/photos')
    .subscribe((res: Response) => {
      this.listData = res.json();
    });*/

      //   this.http.request('http://jsonplaceholder.typicode.com/photos')
      //  .toPromise()
      //  .then(res => { this.listData = res.json(); })
      //  .catch(err => { console.error(err) });
  }
  title:any = "我是首页";

}
