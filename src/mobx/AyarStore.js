import {observable, action} from 'mobx'

class AyarStore{
    @observable user;
    @observable hekim;
    @observable recete = [];

    @action _user(veri) {
        this.user = veri;
    }

    @action _hekim(veri) {
        this.hekim = veri;
    }

    @action _recete(veri) {
        this.recete = veri;
    }
}

export default new AyarStore()
