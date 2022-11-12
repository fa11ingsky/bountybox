<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="product-filters">
                    <ul>
                        <li :class="filter=='all' ? 'active' : ''" @click="filter='all';pageNumber=1">All</li>
                        <li :class="filter=='pokemon' ? 'active' : ''" @click="filter='pokemon';pageNumber=1">Pokemon</li>
                        <li :class="filter=='mats' ? 'active' : ''" @click="filter='mats';pageNumber=1">Mats</li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-for="chunk in chunks">
            <div class="row product-row" v-if="pageNumber == chunk.pageNumber">
                <div v-for="(data,product) in chunk" class="col-md-4 text-center cart-bottom product-width pokemon">
                    <template v-if="product != 'pageNumber'">
                        <div class="single-product-item">
                            <div v-if="data.stock==1" class="stock-banner">Only 1 left!</div>
                            <div v-if="data.stock==0" class="outofstock-banner">Out of Stock!</div>
                            <div class="product-image">
                                <router-link :to="'/info/'+data.url"><img :src="'img/products/'+data.img" /></router-link>
                            </div>
                            <h3>{{product}}</h3>
                            <p class="product-price"> ${{data.price}} </p>
                            <a v-if="data.stock!=0" class="cart-btn" @click="$root.addToCart(product); add(chunk[product])"><i class="fas fa-shopping-cart"></i>Add to Cart</a>
                            <div v-show="data.added">
                                <h6>Item added to cart</h6>
                            </div>
                            <a v-if="data.stock==0" class="outofstock-btn" >Out of Stock</a>
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
                        <li><a :class="pageNumber==1 ? 'active' : ''" @click="setPageNumber('first')">{{pageNumber>1 ? pageNumber-1 : pageNumber}}</a></li>
                        <li><a :class="(pageNumber!=1 && pageNumber != maxPage+1) ? 'active' : ''" @click="setPageNumber('mid')">{{pageNumber>1 ? pageNumber : pageNumber+1}}</a></li>
                        <li><a @click="setPageNumber('last')">{{pageNumber>1 ? pageNumber+1 : pageNumber+2}}</a></li>
                        <li><a @click="setPageNumber('next')">Next</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Products",
        title: 'Bounty Box: Collectibles and More',
        data() {
            return {
                "pageNumber": 1,
                "items": 0,
                "layout": [3, 2],
                "filter": "all"
            }
        },
        computed: {
            maxPage() {
                return Math.ceil(this.items / (this.layout[0] * this.layout[1]))
            },
            // chunk up inventory into rows of 3, 2 rows per page
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
                for (let product in this.$root.inventory) {
                    if (this.$root.inventory[product].tags.indexOf(this.filter) > -1 || this.filter === 'all') {
                        chunk[product] = this.$root.inventory[product]
                        chunk[product].added = false
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
            },
            add: function (productObj) {
                if (productObj.added) {
                    productObj.added=false
                    setTimeout(()=>{productObj.added=true},300)
                }
                else {
                    productObj.added=true
                }
            }
        }
    }
</script>
