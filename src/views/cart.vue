<template>
  <!-- Cart-->
    <li class="single-shopping-cart">
        <div class="shopping-cart-img">
            <a href="#"><img :src="product.src_initial" :alt="product.name"></a>
        </div>
        <div class="shopping-cart-title">
            <h4><a href="#">{{product.name}}</a></h4> 
            <div class="quantity-toggle">
                <button @click="decrement" :disabled="validated(product.quantity) ? false : true"><i class="fa fa-minus" aria-hidden="true"></i></button>
                <input type="text" v-model="product.quantity">
                <button @click="increment"><i class="fa fa-plus" aria-hidden="true"></i></button>
                <div class="price-cart">
                    <span class="real">${{product.price-20}}</span><span class="promo">${{product.price}}</span>
                </div>
            </div>

        </div>
    </li>
  <!--end cart-->
</template>

<script>
export default {
//inject: ['increment_cart','decrement_cart'],
 props: {
     item:Object
 },
 data() {
         return {
            product: this.item
         }
      },
 watch: {
        "item.quantity": function(oldVal, newVal) {
           if(newVal<1 || oldVal<1 || oldVal===0 || !this.validQte(oldVal) || !this.validQte(newVal)){
               this.$store.dispatch('cart/check_qte',{index:this.item.index_initial});
           }else{
             this.$store.dispatch('cart/inc_decr_qte',{index:this.item.index_initial,qte:this.item.quantity});
           }
        }
  },
 methods: {
     increment() {
     // this.increment_cart(this.item.index_initial);
      this.$store.dispatch('cart/increment_cart',{index:this.item.index_initial});
    },
    decrement() {
      //this.decrement_cart(this.item.index_initial);
      this.$store.dispatch('cart/decrement_cart',{index:this.item.index_initial});
    },
     validQte: function (qte) {
      var re = /^\d+$/;
      return re.test(qte);
    },
    validated: function(qte){
        if(qte === 1){
           return false;
        }
        return true;
    }
 }
}
</script>