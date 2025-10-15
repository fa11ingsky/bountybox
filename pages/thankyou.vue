<template>
    <div class="thankyou-page">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been received and is being processed.</p>
        <router-link to="/">Return to Home</router-link>
    </div>
</template>

<script setup>
// No script logic needed for this simple page
</script>

<style scoped>
.thankyou-page a {
    display: inline-block;
    padding: 10px 24px;
    background-color: #b1b1b1;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-family: "Open Sans", sans-serif;
    transition: background 0.2s;
}
.thankyou-page a:hover {
    background-color: #797979;
}
.thankyou-page {
    max-width: 500px;
    margin: 80px auto;
    padding: 32px;
    background: #fff;
    border-radius: 12px;
    text-align: center;
}
.thankyou-page h1 {
    color: #0a0a0a;
    margin-bottom: 16px;
    font-family: "Open Sans", sans-serif;
}
.thankyou-page p {
    margin-bottom: 24px;
    font-size: 1.1rem;
    color: #0a0a0a;
}
.thankyou-page a {
    color: #0a0a0a;
    text-decoration: none;
    font-weight: 500;
    font-family: "Open Sans", sans-serif;
}
</style>