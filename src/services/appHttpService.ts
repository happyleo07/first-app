//本地请求方式
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class AppGlobal {
    //缓存key的配置
    static cache: any = {
        slides: "_dress_slides",
        categories: "_dress_categories",
        products: "_dress_products"
    }
    //接口基地址    //测试环境
    // static domain = "http://220.248.107.115:2239";
    //正式环境
    // static domain = "http://180.153.158.250:3306";
    // static domain = "http://180.168.156.212:2931";
    static domain = "http://localhost:3000/postman";
    //static domain = "http://localhost:8080"


    //测试
    // static picture = "http://220.248.107.115:2239/wisdomgroup/manager/getIcon/";
    //正式
    // static picture = "http://180.153.158.250:3306/wisdomgroup/manager/getIcon/";
    static picture = "http://180.168.156.212:2931/wisdomgroup/manager/getIcon/";

    //通知公告图片参数
    static pictureNotice = "http://180.168.156.212:2931";

    //接口地址
    static API: any = {
        getCategories: '/api/ionic3/getCategories',
        getLogin: '/app/loginpost',
        getDetails: '/api/ionic3/details'
    };
}

@Injectable()
export class AppService {
    constructor(public http: Http,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController, ) {
    }

    // 对参数进行编码
    encode(params, flag) {
        var str = '';
        if (params) {
            if (flag == 'get') { //get   /a/b
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        var value = params[key];
                        str += value + '/';
                    }
                }
                str = '/' + str.substring(0, str.length - 1);
            }
            if (flag == 'post') { //post  a=b&c=d
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        var value = params[key];
                        str += key + '=' + value + '&';
                    }
                }
                str = str.substring(0, str.length - 1);
            }
        }
        return str;
    }

    //get请求
    ObserverHttpGet(url, params): Observable<any> {
        return this.http.get(url + this.encode(params, "get"))   //本地
    }

    //get请求
    ObserverHttpGetData(url, params): Observable<any> {
        return this.http.get(url, params)   //本地
    }

    //get请求
    ObserverHttpGetAdd(url, params): Observable<any> {
        return this.http.get(url + params)   //本地
    }

    //get请求带？的
    ObserverHttpGetOption(url, params): Observable<any> {
        return this.http.get(url, { params: params });   //本地
    }

    //delete
    ObserverHttpDetelete(url, params): Observable<any> {
        return this.http.delete(url + this.encode(params, "get"))   //本地
    }

    //delete
    ObserverHttpDeteleteOption(url, params): Observable<any> {
        return this.http.delete(url + params); //本地
    }

    //delete
    ObserverHttpDeteleteData(url, params, data): Observable<any> {
        return this.http.delete(url + params, {
            params: this.encode(data, 'post'),
            headers: new Headers({
                // "Accept": "application/json",
                "Content-Type": "application/json"
                // 'Content-Type':'application/x-www-form-urlencoded,charset=UTF-8'
            })
        })   //本地
    }

    ObserverHttpPostData(url, params) {
        return this.http.post(url, params, {      //本地
            headers: new Headers({
                // "Accept": "application/json",
                "Content-Type": "application/json"
                // 'Content-Type':'application/x-www-form-urlencoded,charset=UTF-8'
            })
        })
    }


    ObserverHttpPostAdd(url, params) {
        return this.http.post(url + params, {      //本地
            headers: new Headers({
                // "Accept": "application/json",
                "Content-Type": "application/json"
                // 'Content-Type':'application/x-www-form-urlencoded,charset=UTF-8'
            })
        })
    }

    ObserverHttpPostOption(url, data) {
        return this.http.post(url, null, {
            params: data,
            headers: new Headers({
                // "Accept": "application/json",
                // "Content-Type": "application/json"
                'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8'
            })
        });

    }

    ObserverHttpPostBody(url, data) {
        return this.http.post(url, data, {
            headers: new Headers({
                // "Accept": "application/json",
                // "Content-Type": "application/json"
                'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8'
            })
        });

    }

    ObserverHttpPostForm(url, params) {
        return this.http.post(url, null, {      //本地
            params: params,
            headers: new Headers({
                // "Accept": "application/json",
                // "Content-Type": "application/json"
                'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8'
            })
        })
    }

    //post请求
    ObserverHttpPost(url, params) {
        return this.http.post(url, null, {      //本地
            params: this.encode(params, 'post'),
            headers: new Headers({
                // "Accept": "application/json",
                //"Content-Type": "application/json,charset=UTF-8"
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            })
        })
    }

    //post请求
    ObserverHttpNoForm(url, params) {
        return this.http.post(url, null, {
            params: params,
            headers: new Headers({
                // "Accept": "application/json",
                // "Content-Type": "application/json"
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            })
        })

    }

    //post请求
    ObserverHttpForm(url, params, body) {
        return this.http.post(url + params, null, {
            params: body,
            headers: new Headers({
                // "Accept": "application/json",
                // "Content-Type": "application/json"
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            })
        })

    }
    // post请求 params+body
    ObserverHttpPostParamsBody(url, params, data) {
        return this.http.post(url + params, data, {      //app
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
    }

    //put请求
    ObserverHttpPut(url, params, data) {
        return this.http.put(url + params, data, {      //本地
            headers: new Headers({
                // "Accept": "application/json",
                "Content-Type": "application/json"
                // 'Content-Type':'application/x-www-form-urlencoded,charset=UTF-8'
            })
        })
    }

    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：404)';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
            console.error(msg + '，请检查路径是否正确');
        }
        if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
            console.error(msg + '，请检查路径是否正确');
        }
        console.log(error);
        if (msg != '') {
            this.toast(msg);
        }
    }

    toast(message, callback?) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    }

    //position:top, bottom and middle
    popToastView(message: string, position: string, duration: number) {
        this.toastCtrl.create({
            message: message,
            position: position,
            duration: duration,
            //showCloseButton:true,
            //closeButtonText:"关闭"
        }).present();
    }

    alert(message, callback?) {
        if (callback) {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ['取消', {
                    text: "确定",
                    handler: data => {
                        callback();
                    }
                }]
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert.present();
        }
    }

}


// //app请求方式
//
// import {LoadingController, AlertController, ToastController} from 'ionic-angular';
// import {Injectable} from '@angular/core';
// import {Http, Headers} from '@angular/http';
// import {Observable} from "rxjs";
//
// @Injectable()
// export class AppGlobal {
//     //缓存key的配置
//     static cache: any = {
//         slides: "_dress_slides",
//         categories: "_dress_categories",
//         products: "_dress_products"
//     }
//     //接口基地址    //测试环境
//     // static domain = "http://220.248.107.115:2239";
//     //正式环境
//     // static domain = "http://180.153.158.250:3306";
//     static domain = "http://180.168.156.212:2931";
//     //static domain = "http://localhost:8080"
//
//
//     //测试
//     // static picture = "http://220.248.107.115:2239/wisdomgroup/manager/getIcon/";
//     //正式
//     // static picture = "http://180.153.158.250:3306/wisdomgroup/manager/getIcon/";
//     static picture = "http://180.168.156.212:2931/wisdomgroup/manager/getIcon/";
//
//     //通知公告图片参数
//     static pictureNotice = "http://180.168.156.212:2931";
//
//     //接口地址
//     static API: any = {
//         getCategories: '/api/ionic3/getCategories',
//         getLogin: '/app/loginpost',
//         getDetails: '/api/ionic3/details'
//     };
// }
//
// @Injectable()
// export class AppService {
//     constructor(public http: Http,
//                 public loadingCtrl: LoadingController,
//                 private alertCtrl: AlertController,
//                 private toastCtrl: ToastController,) {
//     }
//
//     // 对参数进行编码
//     encode(params, flag) {
//         var str = '';
//         if (params) {
//             if (flag == 'get') { //get   /a/b
//                 for (var key in params) {
//                     if (params.hasOwnProperty(key)) {
//                         var value = params[key];
//                         str += value + '/';
//                     }
//                 }
//                 str = '/' + str.substring(0, str.length - 1);
//             }
//             if (flag == 'post') { //post  a=b&c=d
//                 for (var key in params) {
//                     if (params.hasOwnProperty(key)) {
//                         var value = params[key];
//                         str += key + '=' + value + '&';
//                     }
//                 }
//                 str = str.substring(0, str.length - 1);
//             }
//         }
//         return str;
//     }
//
//     //get请求
//     ObserverHttpGet(url, params): Observable<any> {
//         return this.http.get(AppGlobal.domain + url + this.encode(params, "get"))    //app
//     }
//
//
// //get请求
// ObserverHttpGetData(url, params): Observable<any> {
//     return this.http.get(AppGlobal.domain +url, params)   //本地
// }
//
//     //get请求
//     ObserverHttpGetAdd(url, params): Observable<any> {
//         return this.http.get(AppGlobal.domain + url + params)    //app
//     }
//
//     //get请求带？的
//     ObserverHttpGetOption(url, params): Observable<any> {
//         return this.http.get(AppGlobal.domain + url, {params: params});    //app
//     }
//
//     //delete
//     ObserverHttpDetelete(url, params): Observable<any> {
//         return this.http.delete(AppGlobal.domain + url + this.encode(params, "get"))    //app
//     }
//
//     //delete
//     ObserverHttpDeteleteOption(url, params): Observable<any> {
//         return this.http.delete(AppGlobal.domain + url + params)    //app
//     }
//
//     //delete
//     ObserverHttpDeteleteData(url, params, data): Observable<any> {
//         return this.http.delete(AppGlobal.domain + url + params, {    //app
//             params: this.encode(data, 'post'),
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         })   //本地
//     }
//
//     ObserverHttpPostData(url, params) {
//         return this.http.post(AppGlobal.domain + url, params, {      //app
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         })
//     }
//
//     ObserverHttpPostAdd(url, params) {
//         return this.http.post(AppGlobal.domain + url + params, {      //app
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         })
//     }
//
//     ObserverHttpPostOption(url, data) {
//         return this.http.post(AppGlobal.domain + url, null, {      //app
//             params: data,
//             headers: new Headers({
//                 'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8'
//             })
//         });
//
//     }
//
//         //post请求
//     ObserverHttpForm(url, params,body) {
//         return this.http.post(AppGlobal.domain+url + params,null,{
//             params:body,
//             headers: new Headers({
//                 // "Accept": "application/json",
//                 // "Content-Type": "application/json"
//                 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
//             })
//         })
//
//     }
//
//     ObserverHttpPostForm(url, params) {
//         return this.http.post(AppGlobal.domain + url, null, {      //app
//             params: params,
//             headers: new Headers({
//                 'Content-Type': 'application/x-www-form-urlencoded,charset=UTF-8'
//             })
//         })
//     }
//
//     //post请求
//     ObserverHttpPost(url, params) {
//         return this.http.post(AppGlobal.domain + url, null, {      //app
//             params: this.encode(params, 'post'),
//             headers: new Headers({
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//             })
//         })
//     }
//
//     //post请求
//     ObserverHttpNoForm(url, params) {
//         return this.http.post(AppGlobal.domain + url, null, {      //app
//             params: params,
//             headers: new Headers({
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//             })
//         })
//
//     }
//
//     //post请求 params+body
//     ObserverHttpPostParamsBody(url, params, data) {
//         return this.http.post(AppGlobal.domain + url + params, data, {      //app
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         })
//     }
//
//     //put请求
//     ObserverHttpPut(url, params, data) {
//         return this.http.put(AppGlobal.domain + url + params, data, {      //app
//             headers: new Headers({
//                 "Content-Type": "application/json"
//             })
//         })
//     }
//
//     private handleError(error: Response | any) {
//         let msg = '';
//         if (error.status == 400) {
//             msg = '请求无效(code：404)';
//             console.log('请检查参数类型是否匹配');
//         }
//         if (error.status == 404) {
//             msg = '请求资源不存在(code：404)';
//             console.error(msg + '，请检查路径是否正确');
//         }
//         if (error.status == 500) {
//             msg = '服务器发生错误(code：500)';
//             console.error(msg + '，请检查路径是否正确');
//         }
//         console.log(error);
//         if (msg != '') {
//             this.toast(msg);
//         }
//     }
//
//     toast(message, callback?) {
//         let toast = this.toastCtrl.create({
//             message: message,
//             duration: 2000,
//             dismissOnPageChange: true,
//         });
//         toast.present();
//         if (callback) {
//             callback();
//         }
//     }
//
//     //position:top, bottom and middle
//     popToastView(message: string, position: string, duration: number) {
//         this.toastCtrl.create({
//             message: message,
//             position: position,
//             duration: duration,
//         }).present();
//     }
//
//     alert(message, callback?) {
//         if (callback) {
//             let alert = this.alertCtrl.create({
//                 title: '提示',
//                 message: message,
//                 buttons: ['取消', {
//                     text: "确定",
//                     handler: data => {
//                         callback();
//                     }
//                 }]
//             });
//             alert.present();
//         } else {
//             let alert = this.alertCtrl.create({
//                 title: '提示',
//                 message: message,
//                 buttons: ["确定"]
//             });
//             alert.present();
//         }
//     }
//
// }
