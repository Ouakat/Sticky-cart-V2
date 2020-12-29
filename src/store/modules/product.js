export default {
    namespaced: true,
    state() {
        return {
            activeIndex: null,
            product: {
                name: "Mens heavyweight 6.1-Ounce Cotton shirt,100% Cotton,Big And All Sizes",
                price: 35,
                quantity: 1,
                prix_initial: 35,
                promotion: 5,
                index_initial: 0,
                src_initial: "https://i.pinimg.com/originals/bd/ef/cb/bdefcbc72735f64db17f3250b1e64245.png",
                images: [{
                        src: "https://i.pinimg.com/originals/bd/ef/cb/bdefcbc72735f64db17f3250b1e64245.png",
                    },
                    {
                        src: "https://i.pinimg.com/236x/ae/50/d2/ae50d28471fb89ca5a064b08eca09e66.jpg",
                    },
                    {
                        src: "https://i.pinimg.com/236x/98/41/f1/9841f17e6ff52c0d661fc02aa9eedd78--t-shirt-png-transparent.jpg",
                    },
                ],
                colors: [{
                        name: "orange",
                        price: 35,
                        index: 0,
                    },
                    {
                        name: "nor",
                        price: 40,
                        index: 1,
                    },
                    {
                        name: "yelloow",
                        price: 50,
                        index: 2,
                    },
                ],
            }
        };
    },
    mutations: {
        activeIndex(state, payload) {
            state.activeIndex = payload.index;
        },
        UpdatePrice: function(state, payload) {
            //console.log(i);
            const i = payload.i;
            const pricepromo = state.product.colors[i].price - (state.product.colors[i].price * (state.product.promotion / 100));
            state.product.price = pricepromo;
            state.product.src_initial = state.product.images[i].src;
            state.product.prix_initial = state.product.colors[i].price;
            state.product.index_initial = i;
            state.product.quantity = 1;
            console.log(this.cartItems);
        },
        increment(state) {
            state.product.quantity++;
            const pricepromo = state.product.prix_initial - (state.product.prix_initial * (state.product.promotion / 100));
            state.product.price = pricepromo * state.product.quantity;
        },
        decrement(state) {
            state.product.quantity--;
            const pricepromo = state.product.prix_initial - (state.product.prix_initial * (state.product.promotion / 100));
            state.product.price = pricepromo * state.product.quantity;
        },
        inc_decr_qte(state, payload) {
            state.product.quantity = parseInt(payload.qte);
            const pricepromo = state.product.prix_initial - (state.product.prix_initial * (state.product.promotion / 100));
            state.product.price = pricepromo * state.product.quantity;
        },
        check_qte(state) {
            state.product.quantity = 1;
            const pricepromo = state.product.prix_initial - (state.product.prix_initial * (state.product.promotion / 100));
            state.product.price = pricepromo;
        }
    },
    actions: {
        activeIndex(context, payload) {
            context.commit('activeIndex', payload);
        },
        UpdatePrice(context, payload) {
            context.commit('UpdatePrice', payload);
        },
        increment(context, payload) {
            context.commit('increment', payload);
        },
        decrement(context, payload) {
            context.commit('decrement', payload);
        },
        inc_decr_qte(context, payload) {
            context.commit('inc_decr_qte', payload);
        },
        check_qte(context, payload) {
            context.commit('check_qte', payload);
        }
    },
    getters: {
        product(state) {
            return state.product;
        },
        activeIndex(state) {
            return state.activeIndex;
        }
    }
};