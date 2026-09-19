<template>
    <div>
        <FeaturedBanner  :products="inventory" @update-filter="state.filter = $event" />
        <CategoryBanner  @toggleSearch="state.inSearch = !state.inSearch" :openPane="state.inSearch" @setTag="(n) => filterByTag(n)"/>
        <div class="container">
            <div class="row w-200 justify-content-center">
                <div class="col-md-8 d-flex align-items-center">
                    <a><i class="fas fa-bars fa-lg text-dark" @click="state.inSearch=!state.inSearch"></i></a>
                    <input class="nosubmit" type="search" v-model="state.searchFilter" placeholder="Search">
                </div>

                <div class="col-md-12">
                    <div class="product-filters">
                        <ul>
                            <li :class="state.filter == 'all' ? 'active' : ''" @click="filterByTag('all')">All
                            </li>
                            <li :class="state.filter == 'pokemon' ? 'active' : ''" @click="filterByTag('pokemon')">
                                Pokemon
                            </li>
                            <li :class="state.filter == 'mats' ? 'active' : ''" @click="filterByTag('mats')">
                                Mats
                            </li>
                            <li :class="state.filter == 'comics' ? 'active' : ''" @click="filterByTag('comics')">
                                Comics</li>
                        </ul>
                    </div>
                </div>
            </div>
            <template v-for="chunk in chunks">
                <div class="row product-row " v-if="state.pageNumber == chunk.pageNumber">
                    <template v-for="(data, product) in chunk">
                        <template v-if="product != 'pageNumber'">
                            <div class="single-product-item col-3 text-center product-width">
                                <!--<div v-if="data.stock==1" class="stock-banner">Only 1 left!</div>-->
                                <div v-if="data.stock == 0" class="outofstock-banner">Out of Stock!</div>
                                <div class="product-image">
                                    <router-link :to="'/info/' + data.url"><img
                                            :src="`/img/products/${data.img}`" /></router-link>
                                </div>
                                <div class="container" style="height:100%;">
                                    <div class="row product-info">
                                        <h3>{{ product }}</h3>
                                    </div>
                                    <div class="row ">
                                        <p class="product-price"> ${{ data.price }} </p>
                                        <a v-if="data.stock != 0" class="cart-btn" @click="addToCart(product)"><i
                                                class="fas fa-shopping-cart"></i>Add to Cart</a>
                                        <a v-if="data.stock == 0" class="outofstock-btn">Out of Stock</a>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </template>
            <div class="row">
                <div class="col text-center">
                    <div class="pagination-wrap">
                        <ul>
                            <li><a @click="setPageNumber('prev')">Prev</a></li>
                            <li><a :class="state.pageNumber == 1 ? 'active' : ''" @click="setPageNumber('first')">{{
                                state.pageNumber >
                                    1 ?
                                    state.pageNumber - 1 : state.pageNumber }}</a></li>
                            <li><a :class="(state.pageNumber != 1 && state.pageNumber != maxPage + 1) ? 'active' : ''"
                                    @click="setPageNumber('mid')">{{ state.pageNumber > 1 ? state.pageNumber : state.pageNumber + 1 }}</a>
                            </li>
                            <li><a @click="setPageNumber('last')">{{ state.pageNumber > 1 ? state.pageNumber + 1 : state.pageNumber + 2
                                    }}</a>
                            </li>
                            <li><a @click="setPageNumber('next')">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Notification Box -->
        <transition name="fade">
            <div v-if="state.showCartNotification" class="cart-notification">
                Item added to cart
            </div>
        </transition>
    </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';

// Existing Functions from store/inventory.js
const inventory = getInventory();
console.log(inventory)
const cart = getCart();

// Reactive State
const state = reactive({
    pageNumber: 1,
    items: 0,
    layout: [4, 2],
    filter: 'pokemon',
    searchFilter: '',
    showCartNotification: false,
    inSearch: false
});

// Computed Properties
const maxPage = computed(() => {
    return Math.ceil(state.items / (state.layout[0] * state.layout[1]));
});

const chunks = computed(() => {
    let chunks = [];
    let entries = 1;
    let pageNumber = 1;
    let chunk = {};
    let inventoryVal = inventory.value;
    for (let product in inventoryVal) {
        if (inventoryVal[product]?.tags?.indexOf(state.filter) > -1 || state.filter === 'all') {
            if (product.toLowerCase().indexOf(state.searchFilter.toLowerCase()) > -1) {
                chunk[product] = inventoryVal[product];
                if (entries % state.layout[0] == 0) {
                    chunk.pageNumber = pageNumber;
                    chunks.push(chunk);
                    chunk = {};
                    if (chunks.length % state.layout[1] == 0) {
                        pageNumber++;
                    }
                }
                entries += 1;
            }
        }
    }

    state.items = entries;
    chunk.pageNumber = pageNumber;
    chunks.push(chunk);

    return chunks;
});

// Watchers
watch(cart, (newCart) => {
    if (Object.keys(newCart).length > 0) {
        state.showCartNotification = true
        setTimeout(() => {
            state.showCartNotification = false
        }, 2000)
    }
}, { deep: true });

// Methods
function setPageNumber(pos) {
    window.scrollTo(0, 0);
    const options = {
        'prev': state.pageNumber > 1 ? state.pageNumber - 1 : state.pageNumber,
        'first': state.pageNumber > 1 ? state.pageNumber - 1 : state.pageNumber,
        'mid': state.pageNumber > 1 ? state.pageNumber : (state.pageNumber >= maxPage.value ? state.pageNumber : state.pageNumber + 1),
        'last': state.pageNumber > 1 ? (state.pageNumber <= maxPage.value - 1 ? state.pageNumber + 1 : state.pageNumber) : (state.pageNumber >= maxPage.value ? state.pageNumber : state.pageNumber + 2),
        'next': state.pageNumber <= maxPage.value - 1 ? state.pageNumber + 1 : state.pageNumber
    };
    state.pageNumber = options[pos];
}

function filterByTag(tag) {
    state.filter = tag;
    state.pageNumber = 1;
    console.log(`filtering ${tag}`)
}

</script>

<style scoped>


input.nosubmit {
    margin: 10px 0 10px 5px;
    width: 100%;
    border-radius: 10px;
    border: 2px solid black;
    color: #323232;
    background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
}

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

.product-filters {
    margin-bottom: 20px;
}

.product-filters ul {
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
}

.product-filters ul li {
    display: inline-block;
    font-weight: 700;
    font-size: 18px;
    color: #323232;
    cursor: pointer;
    padding: 1px 8px 1px 8px;
    border-radius: 10px;
}

.product-filters ul li.active {
    border: 2px solid #000;
    background-color: #000;
    color: #fff;
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
    max-width: 320px;
}

.product-info {
    height: 120px;
    margin: 0px -20px 0px -20px;
}

a.cart-btn {
    border-radius: 50px;
}

.single-product-item h3 {
    color: black;
    font-size: 16px;
    font-weight: 600;
    padding-top: 10px;
    line-height: 2;
}

.single-product-item {
    -webkit-box-shadow: 0 0 20px #e4e4e4;
    box-shadow: 0 0 20px #e4e4e4;
    padding: 10px 15px 10px 15px;
    border-radius: 5px;
    min-height: 100%;
    line-height: 1;
    margin-bottom: 10px;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;

}


.single-product-item:hover {
    -webkit-box-shadow: none;
    box-shadow: none;
}

p.product-price {
    color: #0b4980;
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
    height: 360px;
    overflow: hidden;
}

a.outofstock-btn {
    background-color: lightslategray;
    font-family: 'Poppins', sans-serif;
    display: inline-block;
    color: #fff;
    padding: 10px 30px;
    border-radius: 50px;
}

.outofstock-banner {
    z-index: 4;
    margin-top: 80px;
    position: absolute;
    background-color: lightslategray;
    font-family: sans-serif;
    color: white;
    font-weight: 700;
    padding: 4px 5px 3px 3px;
    border-radius: 3px;
}

@media only screen and (max-width: 767px) {
    .product-width {
        max-width: 125px;
        max-height: 100%;
    }

    .product-info {
        height: 70px;
    }

    .product-image {
        padding: 3px;
        max-height: 120px;
        overflow: hidden;
    }


    .product-row {
        margin: auto;
        width: 90%;
    }

    .single-product-item h3 {
        color: black;
        font-size: 8px;
        font-weight: 700;
        line-height: 2;
    }

    .single-product-item {
        padding: 10px 4px 10px 4px;
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