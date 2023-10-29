import{a as y,b as g,e as f,o as r,f as a,h as t,F as v,r as C,w as p,v as b,i as k,t as l,j as _}from"./entry.1bce08a9.js";const S=10,B=10,u={FBSCOPE:S,EBAYSCP:B};const T={setup(){const s=g();let o=f();return{inventory:s,cart:o}},head(){return{title:"Bounty Box: Collectibles and More - Checkout"}},data(){return{country:"Australia",promoCode:"",loading:!0}},computed:{cartItems(){return Object.keys(this.cart).length},shipping(){return this.country=="Australia"?10:20},promoApplied(){return this.promoCode.trim()in u},discount(){return u[this.promoCode.trim()]||0},discountTotal(){return parseFloat((this.subtotal*(1-this.discount/100)).toFixed(2))},finalTotal(){return this.cartItems>0?this.discountTotal+this.shipping:0},subtotal(){let s=0;for(let o in this.cart)s+=this.inventory[o].price*this.cart[o];return s},description(){let s="";for(let o in this.cart)s+=this.cart[o]>0?`${o} x${this.cart[o]} ; `:"";return s+=this.promoCode.trim()in u?`${this.promoCode.trim()}; `:"",s+=`shp${this.shipping}; `,s}},methods:{modItem:function(s,o){o==0?(this.cart[s]=o,delete this.cart[s]):this.cart[s]+o>this.inventory[s].stock||(this.cart[s]+=o),localStorage.cart=JSON.stringify(this.cart)},clearCart:function(){this.cart={},localStorage.cart=JSON.stringify(this.cart)},initPayPalButton:function(s){paypal.Buttons({style:{shape:"rect",color:"blue",layout:"vertical",label:"checkout"},createOrder:function(o,h){return h.order.create({purchase_units:[{description:s.description,amount:{currency_code:"AUD",value:s.discountTotal+s.shipping}}]})},onApprove:function(o,h){return h.order.capture().then(function(e){console.log("Capture result",e,JSON.stringify(e,null,2));const c=document.getElementById("paypal-button-container");c.innerHTML="",c.innerHTML="<h3>Thank you for your payment!</h3>"})},onError:function(o){console.log(o)}}).render("#paypal-button-container")},btoa:function(s){return btoa(s)}},mounted(){setTimeout(()=>{this.loading=!this.loading,Object.keys(this.cart).length>0&&this.initPayPalButton(this)},1e3)}},A={class:"CartContainer container"},I={class:"Header"},x=t("h3",{class:"Heading"},"Shopping Cart",-1),P={class:"cartEntries"},w={class:"Cart-Items"},O={class:"image-box"},E=["href"],F=["src"],M={class:"about"},N={class:"title"},D={class:"counter"},H=["onClick"],L={class:"count"},U=["onClick"],V={class:"prices"},j={class:"amount"},J=["onClick"],R=t("u",null,"Remove",-1),Y=[R],q=t("hr",null,null,-1),z={class:"shipping-est row"},G=t("div",{class:"deliver-to col-sm-3"},"Ship to:",-1),K=t("option",null,"Australia",-1),Q=t("option",null,"International",-1),W=[K,Q],X=t("hr",null,null,-1),Z={class:"shipping-est row"},$=t("hr",null,null,-1),tt={class:"checkout"},ot={class:"row"},st=t("div",{class:"subtotal col"},"Sub-Total",-1),et={class:"cost col"},it={class:"row"},nt={class:"total-items items col"},ct={key:0,class:"row"},lt=t("div",{class:"col"},"Discount",-1),rt={class:"cost col"},at={class:"row"},dt=t("div",{class:"col"},"Shipping",-1),ht={class:"cost col"},_t=t("br",null,null,-1),ut={class:"row"},mt=t("div",{class:"total col"},"Total",-1),vt={class:"total cost col"},pt=t("hr",null,null,-1),yt={class:"checkout"},gt={key:0,class:"total"},ft=t("div",{id:"smart-button-container"},[t("div",{style:{"text-align":"center"}},[t("div",{id:"paypal-button-container"})])],-1);function Ct(s,o,h,e,c,i){return r(),a("div",A,[t("div",I,[x,t("h5",{class:"Action",onClick:o[0]||(o[0]=d=>i.clearCart())},"Remove all")]),t("div",P,[(r(!0),a(v,null,C(e.cart,(d,n)=>(r(),a("div",w,[e.cart[n]>0?(r(),a(v,{key:0},[t("div",O,[t("a",{href:"/info/"+e.inventory[n].url},[t("img",{src:"/img/products/"+e.inventory[n].img},null,8,F)],8,E)]),t("div",M,[t("h3",N,l(n),1)]),t("div",D,[t("a",{class:"mod-btn fa-solid fa-circle-plus",onClick:m=>i.modItem(n,1)},null,8,H),t("div",L,l(e.cart[n]),1),t("a",{class:"mod-btn fa-solid fa-circle-minus",onClick:m=>i.modItem(n,-1)},null,8,U)]),t("div",V,[t("div",j,l(e.inventory[n].price*e.cart[n]),1),t("div",{class:"remove",onClick:m=>i.modItem(n,0)},Y,8,J)])],64)):_("",!0)]))),256))]),q,t("div",z,[G,p(t("select",{"onUpdate:modelValue":o[1]||(o[1]=d=>c.country=d),class:"col form-select"},W,512),[[b,c.country]])]),X,t("div",Z,[p(t("input",{class:"form-control","onUpdate:modelValue":o[2]||(o[2]=d=>c.promoCode=d),placeholder:"Promo Code"},null,512),[[k,c.promoCode]])]),$,t("div",tt,[t("div",ot,[st,t("div",et,"$"+l(i.subtotal),1)]),t("div",it,[t("div",nt,l(i.cartItems)+" items",1)]),i.promoApplied?(r(),a("div",ct,[lt,t("div",rt,l(i.discount)+"% ("+l(c.promoCode.trim())+")",1)])):_("",!0),t("div",at,[dt,t("div",ht,"$"+l(i.shipping),1)]),_t,t("div",ut,[mt,t("div",vt,"AUD $"+l(i.finalTotal),1)])]),pt,t("div",yt,[c.loading?(r(),a("div",gt,"Loading Payment Options...")):_("",!0),ft])])}const kt=y(T,[["render",Ct]]);export{kt as default};
