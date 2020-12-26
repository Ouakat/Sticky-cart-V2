export default {
    namespaced: true,
    state() {
        return {
            cartItems: [],
        };
    },
    mutations: {
        addToCart: function(state, payload) {
            // console.log(products.colors[this.product.index_initial].name);
            // Add the item or increase qty
            const products = payload.product;
            let itemInCart = state.cartItems.filter(item => item.index_initial === products.index_initial);
            let isItemInCart = itemInCart.length > 0;
            console.log(products);

            if (isItemInCart === false) {
                state.cartItems.push(JSON.parse(JSON.stringify(products)));
            } else {
                itemInCart[0].quantity += products.quantity;
            }
            console.log(state.cartItems);
            //this.product.quantity = 1;
            // state.$store.state.showCart = true;

        },
        increment_cart: function(state, payload) {
            const index = payload.index;
            var productInCartIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.index_initial === index
            );
            state.cartItems[productInCartIndex].quantity++;
            state.cartItems[productInCartIndex].price =
                state.cartItems[productInCartIndex].prix_initial * state.cartItems[productInCartIndex].quantity;
        },
        decrement_cart: function(state, payload) {
            const index = payload.index;
            var productInCartIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.index_initial === index
            );
            if (state.cartItems[productInCartIndex].quantity === 1) {
                alert("Negative quantity not allowed");
            } else {
                state.cartItems[productInCartIndex].quantity--;
                state.cartItems[productInCartIndex].price =
                    state.cartItems[productInCartIndex].prix_initial * state.cartItems[productInCartIndex].quantity;
            }
        }
    },
    actions: {
        addToCart(context, payload) {
            context.commit('addToCart', payload);
        },
        increment_cart(context, payload) {
            context.commit('increment_cart', payload);
        },
        decrement_cart(context, payload) {
            context.commit('decrement_cart', payload);
        }
    },
    getters: {
        products(state) {
            return state.cartItems;
        },
        total(state) {
            let total = 0;
            state.cartItems.forEach((item) => {
                total += item.prix_initial * item.quantity - 20;
            });
            return total;
        }
    }
};