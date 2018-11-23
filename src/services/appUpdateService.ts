import { AppVersion } from '@ionic-native/app-version';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AppService, AppGlobal } from './appHttpService'

@Injectable()
export class AppUpdateService {

    constructor(private appVersion: AppVersion,
        private fileOpener: FileOpener,
        private fileTransfer: FileTransfer,
        private fileTransferObject: FileTransferObject,
        private file: File,
        private alertCtrl: AlertController,
        private appService: AppService,

    ) {

    }

    //检查是否需要软件更新
    detectionUpgrade(apkUrl, allowChoose) {
        if (allowChoose) {
            this.alertCtrl.create({
                title: '升级提示',
                subTitle: '发现新版本,是否立即升级？',
                buttons: [{
                    text: '取消'
                }, {
                    text: '确定',
                    handler: () => {
                        this.downloadApp(apkUrl);
                    }
                }]
            }).present();
        } else {
            this.downloadApp(apkUrl);
        }
    }

    //与服务器版本比较，不是最新的，返回最新的下载地址
    compariVersion() {
        return this.appService.ObserverHttpGet("/postman/ces/json/compariVersion", {});
    }

    //下载更新APP
    downloadApp(apkUrl) {
        let alert = this.alertCtrl.create({
            title: '下载进度：0%',
            enableBackdropDismiss: false,
            buttons: ['后台下载']
        });

        // const fileTransfer: FileTransferObject = this.fileTransfer.create();
        // const apk = this.file.externalRootDirectory + 'app.apk'; //apk保存的目录  
        // fileTransfer.download(AppGlobal.domain+apkUrl, apk).then(() => {
        //     this.fileOpener.open(apk, 'application/vnd.android.package-archive').then(() => {
        //         console.log('File is opened')
        //     }).catch(e => {
        //         console.log('Error openening file', e)
        // });
        // });
        // fileTransfer.onProgress((event: ProgressEvent) => {
        //     let num = Math.floor(event.loaded / event.total * 100);
        //     if (num === 100) {
        //         alert.dismiss();
        //     } else {
        //         let title = document.getElementsByClassName('alert-title')[0];
        //         title && (title.innerHTML = '下载进度：' + num + '%');
        //     }
        // });
        // console.log("this apkUrl is" + apkUrl);
        const xhr = new XMLHttpRequest();
        const url = AppGlobal.domain + apkUrl;
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.responseType = "blob";
        xhr.addEventListener("loadstart", (ev) => {
            // 开始下载事件：下载进度条的显示
            alert.present();
        });
        xhr.addEventListener("progress", (ev) => {
            // 下载中事件：计算下载进度
            let progress = Math.round(100.0 * ev.loaded / ev.total);
            let title = document.getElementsByClassName('alert-title')[0];
            title && (title.innerHTML = '下载进度：' + progress + '%');
        });
        xhr.addEventListener("load", (ev) => {
            alert.dismiss();
            // 下载完成事件：处理下载文件
            const blob = xhr.response;
            const fileName = 'temp.apk';
            if (blob) {
                let path = this.file.externalDataDirectory;
                this.file.writeFile(path, fileName, blob, {
                    replace: true
                }).then(
                    () => {
                        this.fileOpener.open(
                            path + fileName,
                            'application/vnd.android.package-archive'
                        ).catch((err) => {
                            this.appService.alert('打开apk失败！' + err);
                        })
                    }).catch((err) => {
                        this.appService.alert('失败！');
                    })
            }
        });
        xhr.addEventListener("loadend", (ev) => {
            // 结束下载事件
        });
        xhr.addEventListener("error", (ev) => {
            this.appService.alert('下载apk失败！');
        });
        xhr.addEventListener("abort", (ev) => {
        });
        xhr.send();
    }
}