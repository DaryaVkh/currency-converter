import {RootStore} from "../../store/store";
import {useContext} from "react";
import {StoreContext} from "../../index";

export const useStores = (): RootStore => useContext(StoreContext);