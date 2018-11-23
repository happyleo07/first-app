import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class DemoService {
    constructor(private httpService: Http){

    }
    // // 网络接口请求
    // getHomeInfo(): Observable<Response> {
    // }
    // 本地json文件请求
    getRequestContact() {
        // return this.httpService.get("assets/json/message.json")
    }
}