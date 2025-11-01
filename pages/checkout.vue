<template>
    <div class="CartContainer container">
        <div class="row spacing"></div>
        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
            <a class="back-btn" href="/" title="Return to shopping"><i class="fas fa-arrow-left"></i> Continue
                Shopping</a>

        </div>

        <div class="cartEntries">
            <div class="Cart-Items" v-for="(data, product) in cart">
                <template v-if="cart[product] > 0">
                    <div class="image-box">
                        <a :href="'/info/' + inventory[product].url"><img
                                :src="'/img/products/' + inventory[product].img" /></a>
                    </div>
                    <div class="about">
                        <h3 class="title">{{ product }}</h3>
                    </div>
                    <div class="counter">
                        <a class="mod-btn fa-solid fa-circle-minus" @click="modItem(product, -1)"></a>
                        <div class="count">{{ cart[product] }}</div>
                        <a class="mod-btn fa-solid fa-circle-plus" @click="modItem(product, 1)"></a>
                    </div>
                    <div class="prices">
                        <div class="amount">${{ inventory[product].price * cart[product] }}</div>
                        <div class="remove" @click="modItem(product, 0)"><u>Remove</u></div>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="cartItems > 0"><i class="fas fa-trash clear-cart" @click="clearCart()"></i></div>
        <br />
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
                <div class="cost col">${{ subtotal }}</div>
            </div>
            <div class="row">
                <div class="total-items items col">{{ cartItems }} items</div>
            </div>
            <div class="row" v-if="promoApplied">
                <div class="col">Discount</div>
                <div class="cost col">{{ discount }}% ({{ promoCode.trim() }})</div>
            </div>
            <div class="row">
                <div class="col">Shipping</div>
                <div class="cost col">${{ shipping }}</div>
            </div>
            <br />
            <div class="row">
                <div class="total col">Total</div>
                <div class="total cost col">AUD ${{ finalTotal }}</div>
            </div>
        </div>
        <hr>
        <div class="checkout">
            <div style="text-align: center; margin-bottom: 16px;">
                <a @click="payWithStripe()" class="stripe-btn">
                    Go to Checkout
                </a>
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
            promoCode: ""
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
        payWithStripe: async function () {
            console.log("Stripe Checkout")
            console.log(this.cart)

            // convert cart to array of items for stripe
            let cartItems = []
            for (let product in this.cart) {
                cartItems.push({ price: this.inventory[product].price, quantity: this.cart[product], name: product })
            }

            // add shipping as an item
            if (this.shipping > 0) {
                cartItems.push({ price: this.shipping, quantity: 1, name: `Shipping (${this.country})` })
            }

            const body = {
                cart: cartItems,
                success_url: window.location.origin + '/thankyou',
                cancel_url: window.location.origin + '/checkout'
            };
            if (this.promoApplied) {
                body.coupon = this.promoCode.trim();
            }
            const res = await fetch('http://localhost:8888/.netlify/functions/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const data = await res.json()
            window.location.href = data.url
        },

        btoa: function (s) {
            return btoa(s)
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.spacing {
    height: 20px;
}

.mod-btn {
    color: black;
}

.stripe-btn {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: #635bff;
    color: #fff;
    padding: 12px 32px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
    transition: background 0.2s;
    border: none;
    letter-spacing: 0.5px;
    text-align: center;
}

.back-btn {
    display: block;
    padding: 6px 12px;
    background-color: #949494;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-family: "Open Sans", sans-serif;
    transition: background 0.2s;
    float: right;
    font-size: 14px;
}

.clear-cart {
    float: right;
    color: rgb(180, 53, 53);
    cursor: pointer;
    margin-right: 70px;
    font-size: 20px;
}


.image-box {
    width: 15%;
    text-align: center;
}


.checkout {
    float: right;
    margin-right: 5%;
    width: 28%;
}

.about {
    height: 100%;
    width: 24%;
}

.title {
    font-size: 16px;
    color: #202020;
}

.Cart-Items {
    margin: auto;
    width: 90%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0 20px 0;
}


.shipping-est {
    padding: 0 10% 0 10%;
}

.prices {
    height: 100%;
    text-align: right;
}

.amount {
    padding-top: 20px;
    font-size: 26px;
    font-weight: 800;
    color: #202020;
}

@media only screen and (max-width: 767px) {
    .clear-cart {
        float: right;
        color: rgb(180, 53, 53);
        cursor: pointer;
        margin-right: 45px;
        font-size: 20px;
    }

    .checkout {
        float: none;
        padding-top: 20px;
        margin: auto;
        width: 50%;
    }

    .CartContainer {
        width: 100%;
    }

    .shipping-est {
        text-align: right;
        padding-right: 20px;
    }

    .deliver-to {
        text-align: left;
    }

    .title {
        font-size: 10px;
    }

}
</style>