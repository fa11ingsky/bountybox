<template>
    <div class="CartContainer container">
        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
            <h5 class="Action" @click="clearCart()">Remove all</h5>
        </div>

        <div class="cartEntries">
            <div class="Cart-Items" v-for="(data,product) in cart">
                <template v-if="cart[product]>0">
                    <div class="image-box">
                        <a :href="'/info/'+inventory[product].url"><img :src="'/img/products/'+inventory[product].img" /></a>
                    </div>
                    <div class="about">
                        <h3 class="title">{{product}}</h3>
                    </div>
                    <div class="counter">
                        <a class="mod-btn fa-solid fa-circle-plus" @click="modItem(product,1)"></a>
                        <div class="count">{{cart[product]}}</div>
                        <a class="mod-btn fa-solid fa-circle-minus" @click="modItem(product,-1)"></a>
                    </div>
                    <div class="prices">
                        <div class="amount">{{inventory[product].price * cart[product]}}</div>
                        <div class="remove" @click="modItem(product,0)"><u>Remove</u></div>
                    </div>
                </template>
            </div>
        </div>
        <hr>
        <div class="shipping-est row">
            <div class="deliver-to col-sm-3">Ship to:</div>
            <select v-model="country" class="col form-select">
                <option>Australia</option>
                <option>International</option>
            </select>
        </div>
        <hr>
        <div class="shipping-est row">
            <input class="form-control" v-model="promoCode" placeholder="Promo Code" />
        </div>
        <hr>
        <div class="checkout">
            <div class="row">
                <div class="subtotal col">Sub-Total</div>
                <div class="cost col">${{subtotal}}</div>
            </div>
            <div class="row">
                <div class="total-items items col">{{cartItems}} items</div>
            </div>
            <div class="row" v-if="promoApplied">
                <div class="col">Discount</div>
                <div class="cost col">{{discount}}% ({{promoCode.trim()}})</div>
            </div>
            <div class="row">
                <div class="col">Shipping</div>
                <div class="cost col">${{shipping}}</div>
            </div>
            <br />
            <div class="row">
                <div class="total col">Total</div>
                <div class="total cost col">AUD ${{finalTotal}}</div>
            </div>
        </div>
        <hr>
        <div class="checkout">
            <div style="text-align: center; margin-bottom: 16px;">
                <a
                    @click="payWithStripe()"
                    style="display: block; width: 100%; max-width: 400px; margin: 0 auto; background: #635bff; color: #fff; padding: 12px 32px; border-radius: 6px; font-size: 16px; font-weight: 600; text-decoration: none; box-shadow: 0 2px 8px rgba(99,91,255,0.15); transition: background 0.2s; border: none; letter-spacing: 0.5px; text-align: center;"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" style="height: 20px; vertical-align: middle; margin-right: 8px;"><g><path fill="#fff" d="M23.5 14.1c0-2.7-2.2-3.7-6.6-4.2-3.2-.4-3.8-.7-3.8-1.5 0-.7.7-1.2 2.3-1.2 2 0 3.2.7 3.5 2.1h4.1c-.2-2.7-2.3-4.4-5.5-4.8V2.5h-3v2.1c-3.2.4-5.1 2.1-5.1 4.4 0 2.7 2.2 3.7 6.6 4.2 3.1.4 3.8.7 3.8 1.5 0 .7-.7 1.2-2.3 1.2-2.1 0-3.5-.7-3.8-2.1H4.5c.2 2.7 2.3 4.4 5.5 4.8v2.1h3v-2.1c3.2-.4 5.1-2.1 5.1-4.4z"></path></g></svg>
                    Pay with Stripe
                </a>
            </div>
            <div v-if="loading" class="total">Loading Payment Options...</div>
            <div id="smart-button-container">
                <div style="text-align: center;">
                    <div id="paypal-button-container"></div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    import promos from "../static/promos.json"

    export default {
        setup() {
            const inventory = getInventory()
            let cart = getCart()
            return {
                inventory,
                cart                
            }
        },
        head() {
            return {
                title: 'Bounty Box: Collectibles and More - Checkout'
            }
        },
        data() {
            return {
                country: "Australia",
                promoCode: "",
                loading:true
            }
        },
        computed: {
            cartItems() {
                return Object.keys(this.cart).length;
            },
            shipping() {
                return this.country == "Australia" ? 10 : 20
            },
            promoApplied() {
                return this.promoCode.trim() in promos;
            },
            discount() {
                return promos[this.promoCode.trim()] || 0
            },
            discountTotal() {
                return parseFloat((this.subtotal * (1 - (this.discount / 100))).toFixed(2))
            },
            finalTotal() {
                return this.cartItems > 0 ? this.discountTotal + this.shipping : 0;
            },
            subtotal() {
                let sub = 0;
                for (let product in this.cart) {
                    sub += this.inventory[product].price * this.cart[product];
                }
                return sub;
            },
            description() {
                let descr = ""
                for (let product in this.cart) {
                    descr += this.cart[product] > 0 ? `${product} x${this.cart[product]} ; ` : ''
                }
                descr += this.promoCode.trim() in promos ? `${this.promoCode.trim()}; ` : ''
                descr += `shp${this.shipping}; `
                return descr
            }
        },
        methods: {
            modItem: function (product, val) {
                if (val == 0) {
                    this.cart[product] = val;
                    delete this.cart[product];
                } else {
                    this.cart[product] + val > this.inventory[product].stock ? '' : this.cart[product] += val
                }
                // Sync cart state with localstorage
                localStorage.cart = JSON.stringify(this.cart)
            },
            clearCart: function () {
                this.cart = {}
                // Sync cart state with localstorage
                localStorage.cart = JSON.stringify(this.cart)
            },

            // Stripe button
            payWithStripe: async function(){
                console.log("Stripe Checkout")
                console.log(this.cart)
                // convert cart to array of items for stripe
                let cartItems = []
                for (let product in this.cart) {
                    cartItems.push({ price: this.inventory[product].price, quantity: this.cart[product], name: product })
                }
                console.log(cartItems)
                const res = await fetch('http://localhost:8888/.netlify/functions/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cart: cartItems, 
                        success_url: window.location.origin + '/thank_you', 
                        cancel_url: window.location.origin + '/checkout' }),
                })
                const data = await res.json()
                window.location.href = data.url
            },

            // paypal button
            initPayPalButton: function (self) {
                paypal.Buttons({
                    style: {
                        shape: 'rect',
                        color: 'blue',
                        layout: 'vertical',
                        label: 'checkout',

                    },

                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [{ "description": self.description, "amount": { "currency_code": "AUD", "value": self.discountTotal + self.shipping } }]
                        });
                    },

                    onApprove: function (data, actions) {
                        return actions.order.capture().then(function (orderData) {

                            // Full available details
                            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                            // Show a success message within this page, e.g.
                            const element = document.getElementById('paypal-button-container');
                            element.innerHTML = '';
                            element.innerHTML = '<h3>Thank you for your payment!</h3>';

                            // Or go to another URL:  actions.redirect('thank_you.html');

                        });
                    },
                    onError: function (err) {
                        console.log(err);
                    }
                }).render('#paypal-button-container');
            },
            btoa: function (s) {
                return btoa(s)
            }
        },
        mounted() {
            setTimeout(() => {
                this.loading = !this.loading
                if (Object.keys(this.cart).length > 0) {
                    this.initPayPalButton(this)
                }
            }, 1000)

        }
    }
</script>

<style>
    .mod-btn {
        color: black;
    }
</style>