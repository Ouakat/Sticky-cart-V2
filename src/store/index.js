import { createStore } from 'vuex'

import productModule from './modules/product.js';
import cartModule from './modules/cart.js';
export default createStore({
    state() {
        return {
            ShowCart: false
        };
    },
    mutations: {
        closeCart(state) {
            state.ShowCart = false;
        },
        showCart(state) {
            state.ShowCart = true;
        }
    },
    actions: {
        closeCart(context) {
            context.commit('closeCart');
        },
        showCart(context) {
            context.commit('showCart');
        }
    },
    getters: {
        isShowCart(state) {
            return state.ShowCart;
        }
    },
    modules: {
        prod: productModule,
        cart: cartModule
    }
})