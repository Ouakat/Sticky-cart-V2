<template>
  <div class="container-fluid">
    <div class="content-wrapper">
      <div class="item-container">
        <div class="container">
          <div class="card">
            <div class="container-fliud">
              <div class="wrapper row">
                <div class="preview col-md-6">
                  <div class="preview-pic tab-content">
                    <div
                      v-for="(img, index) in product.images"
                      :key="index"
                      class="tab-pane"
                      :class="index == 0 ? 'active' : ''"
                      :id="'pic-'.index"
                    >
                      <img :src="index == 0 ? product.src_initial : img.src" />
                    </div>
                  </div>
                  <ul class="preview-thumbnail nav nav-tabs">
                    <li
                      v-for="(img, index) in product.images"
                      :key="index"
                      :class="index == 0 ? 'active' : ''"
                    >
                      <a :data-target="'#pic-' + index" data-toggle="tab"
                        ><img :src="img.src"
                      /></a>
                    </li>
                  </ul>
                </div>
                <div class="details col-md-6">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <div class="rating">
                    <div class="stars">
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </div>
                    <span class="review-no">41 reviews</span>
                  </div>
                  <p class="product-description">
                    Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
                    cubilia sem sem! Repudiandae et! Massa senectus enim minim
                    sociosqu delectus posuere.
                  </p>

                  <div class="colors">
                    colors:
                    <span
                      v-for="(c, index) in product.colors"
                      :key="index"
                      :class="[
                        'color',
                        c.name,
                        { select: index == product.index_initial },
                      ]"
                      @click="UpdatePrice(index)"
                    ></span>
                    <input type="hidden" v-model="product.index_initial" />
                  </div>

                  <div class="quantity-toggle">
                    <button @click="decrement()" :disabled="validated(product.quantity) ? false : true"><i class="fa fa-minus" aria-hidden="true"></i></button>
                    <input type="text" v-model="product.quantity" />
                    <button @click="increment()"><i class="fa fa-plus" aria-hidden="true"></i></button>
                  </div>

                  <div class="price">
                    <span class="real">${{ price() }}</span
                    ><span class="promo">${{ product.prix_initial * product.quantity}}</span>
                  </div>

                  <div class="action">
                    <button
                      class="add-to-cart btn btn-success btn-bg"
                      @click="addToCart(product)"
                      type="button"
                      style="width: 100%;"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="col-md-12 product-info">
          <ul id="myTab" class="nav nav-tabs nav_tabs">
            <li class="active">
              <a href="#service-one" data-toggle="tab">DESCRIPTION</a>
            </li>
            <li><a href="#service-two" data-toggle="tab">PRODUCT INFO</a></li>
            <li><a href="#service-three" data-toggle="tab">REVIEWS</a></li>
          </ul>
          <div id="myTabContent" class="tab-content">
            <div class="tab-pane fade in active" id="service-one">
              <section class="container product-info">
                The Corsair Gaming Series GS600 power supply is the ideal
                price-performance solution for building or upgrading a Gaming
                PC. A single +12V rail provides up to 48A of reliable,
                continuous power for multi-core gaming PCs with multiple
                graphics cards. The ultra-quiet, dual ball-bearing fan
                automatically adjusts its speed according to temperature, so it
                will never intrude on your music and games. Blue LEDs bathe the
                transparent fan blades in a cool glow. Not feeling blue? You can
                turn off the lighting with the press of a button.

                <h3>Corsair Gaming Series GS600 Features:</h3>
                <li>
                  It supports the latest ATX12V v2.3 standard and is backward
                  compatible with ATX12V 2.2 and ATX12V 2.01 systems
                </li>
                <li>
                  An ultra-quiet 140mm double ball-bearing fan delivers great
                  airflow at an very low noise level by varying fan speed in
                  response to temperature
                </li>
                <li>
                  80Plus certified to deliver 80% efficiency or higher at normal
                  load conditions (20% to 100% load)
                </li>
                <li>
                  0.99 Active Power Factor Correction provides clean and
                  reliable power
                </li>
                <li>
                  Universal AC input from 90~264V — no more hassle of flipping
                  that tiny red switch to select the voltage input!
                </li>
                <li>
                  Extra long fully-sleeved cables support full tower chassis
                </li>
                <li>
                  A three year warranty and lifetime access to Corsair’s
                  legendary technical support and customer service
                </li>
                <li>
                  Over Current/Voltage/Power Protection, Under Voltage
                  Protection and Short Circuit Protection provide complete
                  component safety
                </li>
                <li>Dimensions: 150mm(W) x 86mm(H) x 160mm(L)</li>
                <li>MTBF: 100,000 hours</li>
                <li>
                  Safety Approvals: UL, CUL, CE, CB, FCC Class B, TÜV, CCC,
                  C-tick
                </li>
              </section>
            </div>
            <div class="tab-pane fade" id="service-two">
              <section class="container"></section>
            </div>
            <div class="tab-pane fade" id="service-three"></div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
  <!--cart -->
  <div class="mini-cart-content" :class="class_open_cart()">
    <div class="card-header text-center">
      <h3>Cart</h3>
      <span @click="closeCart()" class="close">X</span>
    </div>
    <ul class="cart-body">
      <div v-if="card_items()">
      <cart 
        v-for="(item) in cartItems"
        :key="item.index_initial"
        :item="item"
      ></cart>
      </div>
       <div class="text-center shopping-cart-vide" v-else>
         <p>Your cart is empty</p>
       </div>
    </ul>
    <div class="cart-footer">
      <div class="shopping-cart-total">
        <h4 class="shop-total">
          Total : <span class="totale">${{ Total }} </span>
        </h4>
      </div>
      <div class="shopping-cart-btn text-center">
        <a
          class=" btn btn-success"
          href="https://marketplace.coopmaroc.com/panier"
          >Continuer to Checkout</a
        >
      </div>
    </div>
  </div>
  <!--end cart-->
</template>

<script>
// @ is an alias to /src
import cart from "@/components/cart.vue";

export default {
  name: "Home",
  components: {
    cart,
  },
  /*data() {
    return {
      
    };
  },*/
  computed: {
    product(){
      return this.$store.getters["prod/product"];
    },
    cartItems(){
      return this.$store.getters["cart/products"];
    },
    Total(){
      return this.$store.getters["cart/total"];
    }
  },
  watch: {
        "product.quantity": function(oldVal, newVal) {
           if(newVal<1 || oldVal<1 || oldVal===0 || !this.validQte(oldVal) || !this.validQte(newVal)){
               this.$store.dispatch('prod/check_qte');
           }else{
             this.$store.dispatch('prod/inc_decr_qte',{qte:this.product.quantity});
           }
          
        }
  },
  methods: {
    UpdatePrice(index){
       this.$store.dispatch('prod/UpdatePrice',{i:index});
    },
    addToCart(){
      this.$store.dispatch('cart/addToCart',{product:this.product});
      this.$store.dispatch('showCart');
    },
    price(){
      if(this.product.price=== this.product.prix_initial){
        this.product.price=this.product.prix_initial - (this.product.prix_initial * (this.product.promotion / 100));
      }
      return this.product.price;
    },
    price_inicial(){
      this.$store.dispatch('prod/price_inicial');
    },
    increment(){
      this.$store.dispatch('prod/increment');
    },
    decrement(){
      this.$store.dispatch('prod/decrement');
    },
    class_open_cart(){
       return  this.$store.getters.isShowCart ? 'cart-visible': "" ;
    },
    closeCart(){
      this.$store.dispatch('closeCart');
    },
    card_items(){
      if(this.cartItems.length ===0){
          return false
      }
      return true;
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
};
</script>
