import{a as _,b as p,e as h,o as n,h as d,i as t,k as a,t as i,c as m,q as f,u as k,s as l,x as v}from"./entry.4b6f32e4.js";import{a as g}from"./2.cart.d0916183.js";const y={setup(){const c=p();let s=h();return{inventory:c,cart:s}},title(){return`Pokemon TCG: ${this.product} - Buy Now`},mounted(){window.scrollTo(0,0)},methods:{productTags:function(c){return this.inventory[c].tags.join(", ")}},computed:{product(){let c=this.inventory,s=this.$route.params.product||null;return(!s||Object.keys(c).map(r=>c[r].url).indexOf(s)===-1)&&(s=null,window.location.href="/notfound"),Object.keys(c).filter(r=>c[r].url==s)[0]}}},b={class:"single-product mt-150 mb-150"},x={class:"container"},w={class:"row"},C={class:"col-md-5"},T={key:0,class:"stock-banner"},O={key:1,class:"outofstock-banner"},B={class:"single-product-img"},N=["src","alt"],j={class:"col-md-7"},S={class:"single-product-content"},V={class:"single-product-pricing"},q={class:"single-product-form"},A=t("i",{class:"fas fa-shopping-cart"},null,-1),D={key:1,class:"outofstock-btn"},E=t("strong",null,[t("br"),l("Tags: ")],-1);function G(c,s,r,e,I,o){const u=v;return n(),d("div",b,[t("div",x,[t("div",w,[t("div",C,[e.inventory[o.product].stock==1?(n(),d("div",T,"Only 1 left!")):a("",!0),e.inventory[o.product].stock==0?(n(),d("div",O,"Out of Stock!")):a("",!0),t("div",B,[t("img",{src:"/img/products/"+e.inventory[o.product].img,alt:o.product},null,8,N)])]),t("div",j,[t("div",S,[t("h3",null,i(o.product),1),t("p",V,"$"+i(e.inventory[o.product].price),1),t("p",null,i(e.inventory[o.product].description),1),t("div",q,[e.inventory[o.product].stock!=0?(n(),m(u,{key:0,to:"/checkout",class:"cart-btn",onClick:s[0]||(s[0]=P=>k(g)(o.product))},{default:f(()=>[A,l(" Add to Cart")]),_:1})):a("",!0),e.inventory[o.product].stock==0?(n(),d("a",D,"Out of Stock")):a("",!0),t("p",null,[E,l(i(o.productTags(o.product)),1)])])])])])])])}const F=_(y,[["render",G]]);export{F as default};