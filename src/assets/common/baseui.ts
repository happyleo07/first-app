import {LoadingController, Loading } from 'ionic-angular';

export abstract class BaseUI{
    constructor(){}
    protected showLoading(loadingCtrl:LoadingController,message:string): Loading{
        let loader = loadingCtrl.create({
                content: message,
                dismissOnPageChange: true
        });
        loader.present();
        return loader;
    }
}