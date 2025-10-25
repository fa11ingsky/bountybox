<template>
    <div class="mb-150">
        <div class="container spacing">
            <div class="row">
                <div class="col-md-5">
                    <!--<div v-if="inventory[product].stock==1" class="stock-banner">Only 1 left!</div>-->
                    <div v-if="inventory[product].stock == 0" class="outofstock-banner">Out of Stock!</div>
                    <div class="single-product-img">
                        <img :src="'/img/products/' + inventory[product].img" :alt="product">
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="single-product-content">
                        <h3>{{ product }}</h3>
                        <p class="single-product-pricing">${{ inventory[product].price }}</p>
                        <p>{{ inventory[product].description }}</p>
                        <div class="single-product-form">
                            <nuxt-link v-if="inventory[product].stock != 0" to="/checkout" class="cart-btn"
                                @click="addToCart(product)"><i class="fas fa-shopping-cart"></i> Add to Cart</nuxt-link>
                            <nuxt-link to="/" class="back-btn">
                                <i class="fas fa-arrow-left"></i> Back
                            </nuxt-link>
                            <a v-if="inventory[product].stock == 0" class="outofstock-btn">Out of Stock</a>
                            <p><strong>Tags: </strong>{{ productTags(product) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        const inventory = getInventory()
        let cart = getCart()
        return {
            inventory,
            cart
        }
    },
    title() {
        return `Pokemon TCG: ${this.product} - Buy Now`
    },
    mounted() {
        window.scrollTo(0, 0)
    },
    methods: {
        productTags: function (product) {
            let tags = this.inventory[product].tags
            return tags.join(", ")
        }
    },
    computed: {
        product() {
            let inv = this.inventory
            let productUrl = this.$route.params.product || null
            if (!productUrl || Object.keys(inv).map(p => inv[p].url).indexOf(productUrl) === -1) {
                productUrl = null
                window.location.href = '/notfound'
            }
            return Object.keys(inv).filter(p => inv[p].url == productUrl)[0]
        }
    }
}
</script>
<style scoped>
.spacing {
    margin-top: 50px;
}

.single-product-img img {
    padding-left: 20px;
    border-radius: 5px;
    max-width: 200px;
}

.single-product-content {
    margin-left: 30px;
}

.single-product-form a.cart-btn {
    margin-bottom: 15px;
}

.single-product-content p {
    font-size: 15px;
    color: #555;
    line-height: 1.8;
}

.single-product-pricing {
    display: block;
    opacity: 0.8;
    margin-bottom: 0px;
    font-size: 25px !important;
    font-weight: 700;
}

.single-product-content h3 {
    color: black;
    font-size: 20px;
    font-weight: 600;
}

.cart-btn {
    display: inline-block;
    padding: 10px 24px;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-family: "Open Sans", sans-serif;
    transition: background 0.2s;
}

.back-btn {
    display: inline-block;
    padding: 10px 24px;
    background-color: #949494;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-family: "Open Sans", sans-serif;
    transition: background 0.2s;
    margin-left: 50px;
}

.outofstock-btn {
    display: inline-block;
    padding: 10px 24px;
    background-color: #b1b1b1;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-family: "Open Sans", sans-serif;
    transition: background 0.2s;
    cursor: not-allowed;
}

@media only screen and (max-width: 767px) {
    .single-product-content {
        margin-left: 0;
        margin-top: 15px;
    }

    .single-product-content h3 {
        font-size: 20px;
        line-height: 1.5;
    }

}

@media only screen and (min-width: 768px) and (max-width: 991px) {
    .single-product-content h3 {
        font-size: 20px;
        font-weight: 500;
        line-height: 1.6;
    }

    .single-product-content {
        margin-left: 15px;
    }

    .single-product-img {
        margin-bottom: 30px;
    }

        .single-product-img img {
            width: 100%;
        }

    .single-project-img img {
        width: 100%;
    }
}
</style>