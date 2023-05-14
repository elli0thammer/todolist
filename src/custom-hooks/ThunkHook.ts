import {ThunkDispatch} from "redux-thunk";
import {AppRootState} from "../state/store";
import {AnyAction} from "redux";

export type AppDispatchType = ThunkDispatch<AppRootState, any, AnyAction>
