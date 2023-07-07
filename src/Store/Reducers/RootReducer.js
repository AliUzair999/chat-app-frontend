import {combineReducers} from '@reduxjs/toolkit'
import UserData from '../Slices/UserData';
import FavoritesSlice from '../Slices/FavoritesSlice';
import CartSlice from '../Slices/CartSlice';


const RootReducer = combineReducers({
    UserReducer: UserData,
})

export default RootReducer;
