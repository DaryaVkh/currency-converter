import {AppStore} from "./app-store/app-store";

export class RootStore {
    appStore: AppStore;

    constructor() {
        this.appStore = new AppStore();
    }
}