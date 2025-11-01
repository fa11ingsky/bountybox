<template>
    <!-- header -->
    <div class="top-header-area" id="sticker">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-sm-12 text-center">
                    <div class="main-menu-wrap">
                        <!-- logo -->
                        <!-- <div class="site-logo">
                            <nuxt-link to="/"><img src="/img/armourscope-title3.png" alt=""></nuxt-link>
                        </div> -->
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
    <div class="breadcrumb-section text-center site-logo">
        <nuxt-link to="/" class="breadcrumb-text">
            <img src="/img/armourscope-title3.png" alt="">
        </nuxt-link>
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
                        <p>ArmourScope is an Australian provider of collectible trading cards and merchandise.</p>
                        <p>Registered ABN 40136037247.</p>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <div class="footer-box get-in-touch">
                        <h2 class="widget-title">Get in touch</h2>
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
                        <p>Copyrights &copy; 2025 - <a href="https://www.armourscope.com/">ArmourScope</a>, All Rights
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
            title: 'ArmourScope: Collectibles and More',
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
.top-header-area .header-icons a:hover {
    color: #000;
}

.site-logo a img {
    max-width: 300px;
}

.site-logo {
    text-align: center;
    position: absolute;
    float: left;
    margin-top: -20px;
}

.site-logo img {
    max-width: 150px;
}

.sticky-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999 !important;
}

.header-icons {
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
    /* reduce space between the icon links */
}

.header-icons a {
    margin: -10px;
    padding: 0;
}

/* tighten spacing between the cart icon and its count */
.cart-items {
    position: absolute;
    left: 26px;
    top: 0px;
    padding: 1px 4px;
    border-radius: 50%;
    background-color: red;
    color: white;
}


.sticky-wrapper.is-sticky .top-header-area {
    background-color: #0b4980;
    padding: 15px 0;
}

.top-header-area {
    position: absolute;
    z-index: 999;
    width: 100%;
    padding: 25px 0;
}

.breadcrumb-section {
    width: 100%;
    background-size: cover;
    background-position: center center;
    position: relative;
    z-index: 2;
    background-attachment: fixed; 
    /* background-color: #42a1f5; */
    background-color: #0b4980;      
    padding: 20px 0px 0px 0px;
}

.breadcrumb-section:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: "";
    z-index: -1;
    opacity: 0.8;
}

.footer-area {
    background-color: #0b4980;
    color: #000;
    padding: 40px 0;
}

.copyright {
    background-color: #0b4980;
}

.copyright p {
    margin: 0;
    color: #000;
    opacity: 0.7;
    padding: 5px 0;
    font-size: 15px;
}

.copyright a {
    color: #000;
    font-weight: 700;
}

.copyright a:hover {
    color: #f59d53;
}

h2.widget-title {
    font-size: 30px;
    position: relative;
    padding-bottom: 0px;
    color: #000;
}

h2.widget-title:after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20px;
    height: 2px;
}

/* smaller on phones */
@media only screen and (max-width: 767px) {

    .site-logo img {
        max-width: 120px;
        max-height: 80px;
        margin-right: 45%;
    }   

}

/* very small devices */
@media (max-width: 380px) {
    
}

/* debug outline */
/* * {
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
} */
</style>