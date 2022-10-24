import{_ as f,c,a as t,F as p,r as y,g as v,v as C,h as g,t as r,b as _,o as l}from"./index.ac335145.js";const $=10,b=10,u={FBSCOPE:$,EBAYSCP:b};const k={data(){return{subtotal:0,country:"Australia",promoCode:""}},computed:{shipping(){return this.country=="Australia"?10:20},promoApplied(){return this.promoCode.trim()in u},discount(){return u[this.promoCode.trim()]||0},discountTotal(){return parseFloat((this.subtotal*(1-this.discount/100)).toFixed(2))},description(){let o="";for(let s in this.$root.cart)o+=this.$root.cart[s]>0?`${s} x${this.$root.cart[s]} ; `:"";return o+=this.promoCode.trim()in u?`${this.promoCode.trim()}; `:"",o+=`shp${this.shipping}; `,o}},methods:{modItem:function(o,s){s==0?this.$root.cart[o]=s:this.$root.cart[o]+s>this.$root.inventory[o].stock||(this.$root.cart[o]+=s),localStorage.cart=JSON.stringify(this.$root.cart),this.refreshCart()},clearCart:function(){this.$root.cart={},localStorage.cart=JSON.stringify(this.$root.cart),this.refreshCart()},initPayPalButton:function(o){paypal.Buttons({style:{shape:"rect",color:"blue",layout:"vertical",label:"checkout"},createOrder:function(s,d){return d.order.create({purchase_units:[{description:o.description,amount:{currency_code:"AUD",value:o.discountTotal+o.shipping}}]})},onApprove:function(s,d){return d.order.capture().then(function(h){console.log("Capture result",h,JSON.stringify(h,null,2));const i=document.getElementById("paypal-button-container");i.innerHTML="",i.innerHTML="<h3>Thank you for your payment!</h3>"})},onError:function(s){console.log(s)}}).render("#paypal-button-container")},refreshCart:function(){this.$root.cart=localStorage.cart?JSON.parse(localStorage.cart):{},this.subtotal=0,this.$root.cartItems=0;for(let o in this.$root.cart)this.subtotal+=this.$root.inventory[o].price*this.$root.cart[o],this.$root.cartItems+=this.$root.cart[o]},btoa:function(o){return btoa(o)}},mounted(){this.refreshCart(),Object.keys(this.$root.cart).length>0&&this.initPayPalButton(this)}},S={class:"CartContainer container"},A={class:"Header"},B=t("h3",{class:"Heading"},"Shopping Cart",-1),I={class:"cartEntries"},O={class:"Cart-Items"},P={class:"image-box"},T=["href"],w=["src"],E={class:"about"},F={class:"title"},N={class:"counter"},D=["onClick"],H={class:"count"},J=["onClick"],M={class:"prices"},U={class:"amount"},V=["onClick"],L=t("u",null,"Remove",-1),j=[L],R=t("hr",null,null,-1),Y={class:"shipping-est row"},x=t("div",{class:"deliver-to col-sm-3"},"Ship to:",-1),q=t("option",null,"Australia",-1),z=t("option",null,"International",-1),G=[q,z],K=t("hr",null,null,-1),Q={class:"shipping-est row"},W=t("hr",null,null,-1),X={class:"checkout"},Z={class:"row"},tt=t("div",{class:"subtotal col"},"Sub-Total",-1),ot={class:"cost col"},st={class:"row"},et={class:"total-items items col"},it={key:0,class:"row"},nt=t("div",{class:"col"},"Discount",-1),rt={class:"cost col"},ct={class:"row"},lt=t("div",{class:"col"},"Shipping",-1),at={class:"cost col"},dt=t("br",null,null,-1),ht={class:"row"},_t=t("div",{class:"total col"},"Total",-1),ut={class:"total cost col"},mt=t("hr",null,null,-1),pt={class:"checkout"},vt={key:0,id:"smart-button-container"},ft=t("div",{style:{"text-align":"center"}},[t("div",{id:"paypal-button-container"})],-1),yt=[ft];function Ct(o,s,d,h,i,n){return l(),c("div",S,[t("div",A,[B,t("h5",{class:"Action",onClick:s[0]||(s[0]=a=>n.clearCart())},"Remove all")]),t("div",I,[(l(!0),c(p,null,y(o.$root.cart,(a,e)=>(l(),c("div",O,[o.$root.cart[e]>0?(l(),c(p,{key:0},[t("div",P,[t("a",{href:"/info/"+o.$root.inventory[e].url},[t("img",{src:"/img/products/"+o.$root.inventory[e].img},null,8,w)],8,T)]),t("div",E,[t("h3",F,r(e),1)]),t("div",N,[t("a",{class:"mod-btn fa-solid fa-circle-plus",onClick:m=>n.modItem(e,1)},null,8,D),t("div",H,r(o.$root.cart[e]),1),t("a",{class:"mod-btn fa-solid fa-circle-minus",onClick:m=>n.modItem(e,-1)},null,8,J)]),t("div",M,[t("div",U,r(o.$root.inventory[e].price*o.$root.cart[e]),1),t("div",{class:"remove",onClick:m=>n.modItem(e,0)},j,8,V)])],64)):_("",!0)]))),256))]),R,t("div",Y,[x,v(t("select",{"onUpdate:modelValue":s[1]||(s[1]=a=>i.country=a),class:"col form-select"},G,512),[[C,i.country]])]),K,t("div",Q,[v(t("input",{class:"form-control","onUpdate:modelValue":s[2]||(s[2]=a=>i.promoCode=a),placeholder:"Promo Code"},null,512),[[g,i.promoCode]])]),W,t("div",X,[t("div",Z,[tt,t("div",ot,"$"+r(i.subtotal),1)]),t("div",st,[t("div",et,r(this.$root.cartItems)+" items",1)]),n.promoApplied?(l(),c("div",it,[nt,t("div",rt,r(n.discount)+"% ("+r(i.promoCode.trim())+")",1)])):_("",!0),t("div",ct,[lt,t("div",at,"$"+r(n.shipping),1)]),dt,t("div",ht,[_t,t("div",ut,"AUD $"+r(n.discountTotal+n.shipping),1)])]),mt,t("div",pt,[Object.keys(o.$root.cart).length>0?(l(),c("div",vt,yt)):_("",!0)])])}const $t=f(k,[["render",Ct]]);export{$t as default};
