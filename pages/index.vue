<template>
<div>
    <div class="row">
        <form class="nosubmit">
            <input class="nosubmit" type="search" v-model="searchFilter" placeholder="Search">
        </form>
        <div class="col-md-12">
            <div class="product-filters">
                <ul>
                    <li :class="filter == 'all' ? 'active' : ''" @click="filter = 'all'; pageNumber = 1">All</li>
                    <li :class="filter == 'pokemon' ? 'active' : ''" @click="filter = 'pokemon'; pageNumber = 1">
                        Pokemon
                    </li>
                    <li :class="filter == 'mats' ? 'active' : ''" @click="filter = 'mats'; pageNumber = 1">Mats</li>
                    <li :class="filter == 'comics' ? 'active' : ''" @click="filter = 'comics'; pageNumber = 1">
                        Comics</li>
                </ul>
            </div>
        </div>
    </div>
    <div v-for="chunk in chunks">
        <div class="row product-row" v-if="pageNumber == chunk.pageNumber">
            <div v-for="(data, product) in chunk" class="col-md-4 text-center product-width">
                <template v-if="product != 'pageNumber'">
                    <div class="single-product-item">
                        <!--<div v-if="data.stock==1" class="stock-banner">Only 1 left!</div>-->
                        <div v-if="data.stock == 0" class="outofstock-banner">Out of Stock!</div>
                        <div class="product-image">
                            <router-link :to="'/info/' + data.url"><img
                                    :src="`/img/products/${data.img}`" /></router-link>
                        </div>
                        <h3>{{ product }}</h3>
                        <p class="product-price"> ${{ data.price }} </p>
                        <a v-if="data.stock != 0" class="cart-btn" @click="addToCart(product)"><i
                                class="fas fa-shopping-cart"></i>Add to Cart</a>
                        <a v-if="data.stock == 0" class="outofstock-btn">Out of Stock</a>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 text-center">
            <div class="pagination-wrap">
                <ul>
                    <li><a @click="setPageNumber('prev')">Prev</a></li>
                    <li><a :class="pageNumber == 1 ? 'active' : ''" @click="setPageNumber('first')">{{ pageNumber >
                        1 ?
                        pageNumber - 1 : pageNumber }}</a></li>
                    <li><a :class="(pageNumber != 1 && pageNumber != maxPage + 1) ? 'active' : ''"
                            @click="setPageNumber('mid')">{{ pageNumber > 1 ? pageNumber : pageNumber + 1 }}</a>
                    </li>
                    <li><a @click="setPageNumber('last')">{{ pageNumber > 1 ? pageNumber + 1 : pageNumber + 2 }}</a>
                    </li>
                    <li><a @click="setPageNumber('next')">Next</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Notification Box -->
    <transition name="fade">
        <div v-if="showCartNotification" class="cart-notification">
            Item added to cart
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name: "Products",
    setup() {
        const inventory = getInventory()
        let cart = getCart()

        return {
            inventory,
            cart

        }
    },
    data() {
        return {
            "pageNumber": 1,
            "items": 0,
            "layout": [3, 2],
            "filter": "pokemon",
            "searchFilter": "",
            "showCartNotification": false
        }
    },
    watch: {
        cart: {
            handler(newCart, oldCart) {
                if (Object.keys(newCart).length > 0) {
                    this.showCartNotification = true
                    setTimeout(() => {
                        this.showCartNotification = false
                    }, 2000)
                }


            },
            deep: true
        }
    },
    computed: {
        maxPage() {
            return Math.ceil(this.items / (this.layout[0] * this.layout[1]))
        },
        // chunk up nuxt.inventory into rows of 3, 2 rows per page
        /*
         * Chunks looks like
         *  [
         *      chunk0 -> {
         *          product0 -> 'card name': {price, tags, etc}
         *          productN -> ...
         *          pageNumber -> 1
         *      }
         *      chunkN ->
         *
         *  ]
         *
         */
        chunks() {
            let chunks = []
            let entries = 1
            let pageNumber = 1
            let chunk = {}
            for (let product in this.inventory) {
                if (this.inventory[product].tags.indexOf(this.filter) > -1 || this.filter === 'all') {
                    if (product.toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1) {
                        chunk[product] = this.inventory[product]
                        if (entries % this.layout[0] == 0) {
                            chunk.pageNumber = pageNumber
                            chunks.push(chunk)
                            chunk = {}
                            if (chunks.length % this.layout[1] == 0) {
                                pageNumber++
                            }
                        }
                        entries += 1
                    }
                }
            }
            this.items = entries
            chunk.pageNumber = pageNumber
            chunks.push(chunk)

            return chunks
        }
    },
    methods: {
        setPageNumber: function (pos) {
            window.scrollTo(0, 0)
            const options = {
                'prev': this.pageNumber > 1 ? this.pageNumber - 1 : this.pageNumber,
                'first': this.pageNumber > 1 ? this.pageNumber - 1 : this.pageNumber,
                'mid': this.pageNumber > 1 ? this.pageNumber : (this.pageNumber >= this.maxPage ? this.pageNumber : this.pageNumber + 1),
                'last': this.pageNumber > 1 ? (this.pageNumber <= this.maxPage - 1 ? this.pageNumber + 1 : this.pageNumber) : (this.pageNumber >= this.maxPage ? this.pageNumber : this.pageNumber + 2),
                'next': this.pageNumber <= this.maxPage - 1 ? this.pageNumber + 1 : this.pageNumber
            }
            this.pageNumber = options[pos]
        },
        btoa: function (s) {
            return btoa(s)
        }
    }
}
</script>

<style scoped>
.cart-notification {
    position: fixed;
    right: 32px;
    bottom: 32px;
    background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
    color: #fff;
    padding: 18px 36px;
    border-radius: 16px 4px 16px 4px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 6px 24px rgba(221, 36, 118, 0.25), 0 1.5px 6px rgba(0, 0, 0, 0.10);
    z-index: 9999;
    opacity: 0.98;
    pointer-events: none;
    letter-spacing: 1px;
    animation: pop-in 0.5s cubic-bezier(.68, -0.55, .27, 1.55);
    display: flex;
    align-items: center;
    gap: 12px;
}

.cart-notification::before {
    content: "🎉";
    font-size: 1.7em;
    animation: bounce 1s infinite alternate;
}

@keyframes pop-in {
    0% {
        transform: scale(0.7) translateY(40px);
        opacity: 0;
    }

    80% {
        transform: scale(1.05) translateY(-6px);
        opacity: 1;
    }

    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-8px);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.product-width {
    max-width: 300px;
}

a.cart-btn {
    border-radius: 50px;
}

.single-product-item h3 {
    color: black;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 10px;
    line-height: 2;
}

.single-product-item {
    -webkit-box-shadow: 0 0 20px #e4e4e4;
    box-shadow: 0 0 20px #e4e4e4;
    padding-bottom: 10px;
    padding-top: 10px;
    border-radius: 5px;
    min-height: 100%;
    line-height: 1;
    margin-bottom: 10px;
}

.single-product-item {
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
}

.single-product-item:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
}

p.product-price {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
}

p.product-price span {
    display: block;
    opacity: 0.8;
    font-size: 15px;
    font-weight: 400;
}

.product-image {
    padding: 20px;
}

.product-image img {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 30px;
}

a.outofstock-btn {
    background-color: lightslategray;
    font-family: 'Poppins', sans-serif;
    display: inline-block;
    color: #fff;
    padding: 10px 30px;
    border-radius: 50px;
}


@media only screen and (max-width: 767px) {
    .product-width {
        max-width: 125px;
    }

    .product-image {
        padding: 3px;
        padding-bottom: 0;
    }

    .product-image img {
        margin-bottom: 5px;
    }

    .product-row {
        margin: auto;
        width: 100%;
    }

    .single-product-item h3 {
        color: black;
        font-size: 8px;
        font-weight: 700;
        margin-bottom: 0px;
        margin-left: 2px;
        margin-right: 2px;
        padding-top: 1px;
        line-height: 2;
    }

    p.product-price {
        font-size: 15px;
    }

    a.cart-btn {
        padding: 5px 5px;
        border-radius: 5px;
        font-size: 12px;
    }

    a.outofstock-btn {
        padding: 5px 5px;
        border-radius: 5px;
        font-size: 12px;
    }

}
</style>