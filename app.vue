<template>
    <!-- header -->
    <div class="top-header-area" id="sticker">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-sm-12 text-center">
                    <div class="main-menu-wrap">
                        <!-- logo -->
                        <div class="site-logo">
                            <nuxt-link to="/"><img src="/img/armourscope-title.png" alt=""></nuxt-link>
                        </div>
                        <!-- logo -->
                        <!-- menu start -->
                        <nav class="main-menu">
                            <ul>
                                <li>
                                    <div class="header-icons">
                                        <nuxt-link class="shopping-cart" to="/checkout">
                                            <i class="fas fa-lg fa-shopping-cart"></i>
                                            <span class="fas cart-items">{{ cartItems }}</span>
                                        </nuxt-link>
                                        <nuxt-link class="home" to="/">
                                            <i class="fas fa-lg fa-home"></i>
                                        </nuxt-link>
                                        <!--<a class="mobile-hide search-bar-icon" href="#"><i class="fas fa-search"></i></a>-->
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <!--<div class="mobile-menu"></div>-->
                        <!-- menu end -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end header -->
    <!-- breadcrumb-section (title area) -->
    <div class="breadcrumb-section breadcrumb-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2 text-center">
                    <nuxt-link to="/" class="breadcrumb-text">
                        <h1>Bounty Box</h1>
                        <p>an ArmourScope affliate</p>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
    <!-- end breadcrumb section -->
    <!-- products -->
    <div class="view-section mb-150">
        <NuxtPage v-model="cart" />
        <noscript class="nojs">JavaScript is required for this site!</noscript>
        <!--PreLoader-->
        <Transition>
            <div v-if="loading" class="loader">
                <div v-if="loading" class="loader-inner">
                    <div v-if="loading" class="circle"></div>
                </div>
            </div>
        </Transition>
    </div>
    <!-- end products -->
    <!-- footer -->
    <div class="footer-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 text-center">
                    <div class="footer-box about-widget">
                        <h2 class="widget-title">About us</h2>
                        <p>Bounty Box is an ArmourScope affiliate.</p>
                        <p>Registered ABN 40136037247.</p>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <div class="footer-box get-in-touch">
                        <h2 class="widget-title">Get in touch</h2>
                        <p>Canberra, ACT, Australia</p>
                        <p>contact.armourscope@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end footer -->
    <!-- copyright -->
    <div class="copyright">
        <div class="container">
            <div class="row">
                <div class="text-center">
                    <!-- for when we set these up
                     <div class="social-icons">
                        <ul>
                            <li><nuxt-link to="/" target="_blank"><i class="fab fa-facebook-f"></i></nuxt-link></li>
                            <li><nuxt-link to="/" target="_blank"><i class="fab fa-twitter"></i></nuxt-link></li>
                            <li><nuxt-link to="/" target="_blank"><i class="fa fa-earth-americas"></i></nuxt-link></li>
                        </ul>
                    </div>
                    -->
                    <div class="text-center">
                        <p>Copyrights &copy; 2022 - <a href="https://www.armourscope.com/">ArmourScope</a>, All Rights
                            Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// CSS
import '~/assets/main.css'
import '~/assets/cart.css'
import '~/assets/responsive.css'

export default {
    setup() {
        const inventory = getInventory()
        let cart = getCart()

        return {
            inventory,
            cart
        }
    },
    computed: {
        cartItems() {
            let items = 0
            for (let product in this.cart) {
                items += this.cart[product]
            }
            return items
        }
    },
    watch: {
        cart: {
            handler(val) {
                localStorage.setItem('cart', JSON.stringify(val))
            }, deep: true
        }
    },
    head() {
        return {
            title: 'Bounty Box: Collectibles and More',
            link: [{
                rel: "icon",
                href: "/img/favicon.png"
            }],
            meta: [{
                name: "description",
                content: "Now selling Pokemon Trading Card Game (TCG). Buy Singles to complete that collection or refine your competitive deck! Collectibles, art and boutique merchanise for the everyday ethusiast or the avid aficionado. We've got you covered! "
            }],
            script: [
            {
                src: "https://www.googletagmanager.com/gtag/js?id=G-RBKQ6Z3JE4"
            },
            {
                children: `window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); }
                        gtag('js', new Date());
                        console.log('running')
                        gtag('config', 'G-RBKQ6Z3JE4');`
            }]
        }
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.loading = !this.loading
        this.cart = localStorage.cart ? JSON.parse(localStorage.cart) : {}
    }
}
</script>

<style>
.view-section {
    margin-top: 20px;
}
</style>