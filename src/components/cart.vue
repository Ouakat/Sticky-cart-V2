<template>
  <!-- Cart-->
    <li class="single-shopping-cart">
        <div class="shopping-cart-img">
            <a href="#"><img :src="prod.src_initial" :alt="prod.name"></a>
        </div>
        <div class="shopping-cart-title">
            <h4><a href="#">{{prod.name}}</a></h4> 
            <div class="quantity-toggle">
               <span class="next-input-group">
                 <span class="next-input-group-addon">
                   <button @click="decrement" :disabled="validated(prod.quantity) ? false : true"><i class="fa fa-minus" aria-hidden="true"></i></button>
                 </span>
                  <span class="input-number">
                    <input type="text" v-model="prod.quantity">
                 </span>
                 <span class="next-input-group-addon">
                   <button @click="increment"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </span>
                <div class="price-cart">
                    <span class="real">${{ price() }}</span>
                    <span class="promo">${{prod.prix_initial * prod.quantity}}</span>
                </div>
              </span>
            </div>
            <div class="shopping-cart-delete" @click="deleteCart"><a href="#"><i class="fa fa-times" aria-hidden="true"></i></a></div>
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
            prod: this.item
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
   price(){
     const pricepromo = this.prod.prix_initial - (this.prod.prix_initial * (this.prod.promotion / 100));
      return pricepromo*this.prod.quantity;
    },
    deleteCart(){
       this.$store.dispatch('cart/deleteCart',{product:this.item});
    },
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