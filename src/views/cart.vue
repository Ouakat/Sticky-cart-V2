<template>
  <!-- Cart-->
    <li class="single-shopping-cart">
        <div class="shopping-cart-img">
            <a href="#"><img :src="item.src_initial" :alt="item.name"></a>
        </div>
        <div class="shopping-cart-title">
            <h4><a href="#">{{item.name}}</a></h4> 
            <div class="quantity-toggle">
                <button @click="decrement">&mdash;</button>
                <input type="text" :value="item.quantity">
                <button @click="increment">&#xff0b;</button>
                <div class="price-cart">
                    <span class="real">${{item.price-20}}</span><span class="promo">${{item.price}}</span>
                </div>
            </div>

        </div>
    </li>
  <!--end cart-->
</template>

<script>
export default {
inject: ['increment_cart','decrement_cart'],
 props: {
     item:Object
 },

 methods: {
     increment() {
      this.increment_cart(this.item.index_initial);
    },
    decrement() {
      this.decrement_cart(this.item.index_initial);
    },
 }
}
</script>