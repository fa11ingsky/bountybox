import{_ as u,c as n,a as o,b as d,t as i,h as p,w as _,e as l,f as h,o as r}from"./index.fb72e7be.js";const f={data(){return{}},title(){return`Pokemon TCG: ${this.product} - Buy Now`},mounted(){window.scrollTo(0,0)},methods:{productTags:function(t){return this.$root.inventory[t].tags.join(", ")}},computed:{product(){let t=this.$root.inventory,e=this.$route.params.product||null;return(!e||Object.keys(t).map(c=>t[c].url).indexOf(e)===-1)&&(e=null,window.location.href="/notfound"),Object.keys(t).filter(c=>t[c].url==e)[0]}}},k={class:"single-product mt-150 mb-150"},m={class:"container"},v={class:"row"},g={class:"col-md-5"},y={key:0,class:"stock-banner"},b={key:1,class:"outofstock-banner"},w={class:"single-product-img"},C=["src","alt"],T={class:"col-md-7"},O={class:"single-product-content"},$={class:"single-product-pricing"},B={class:"single-product-form"},N=o("i",{class:"fas fa-shopping-cart"},null,-1),j={key:1,class:"outofstock-btn"},S=o("strong",null,[o("br"),l("Tags: ")],-1);function V(t,e,c,P,A,s){const a=h("router-link");return r(),n("div",k,[o("div",m,[o("div",v,[o("div",g,[t.$root.inventory[s.product].stock==1?(r(),n("div",y,"Only 1 left!")):d("",!0),t.$root.inventory[s.product].stock==0?(r(),n("div",b,"Out of Stock!")):d("",!0),o("div",w,[o("img",{src:"/img/products/"+t.$root.inventory[s.product].img,alt:s.product},null,8,C)])]),o("div",T,[o("div",O,[o("h3",null,i(s.product),1),o("p",$,"$"+i(t.$root.inventory[s.product].price),1),o("p",null,i(t.$root.inventory[s.product].description),1),o("div",B,[t.$root.inventory[s.product].stock!=0?(r(),p(a,{key:0,to:"/checkout",class:"cart-btn",onClick:e[0]||(e[0]=D=>t.$root.addToCart(s.product))},{default:_(()=>[N,l(" Add to Cart")]),_:1})):d("",!0),t.$root.inventory[s.product].stock==0?(r(),n("a",j,"Out of Stock")):d("",!0),o("p",null,[S,l(i(s.productTags(s.product)),1)])])])])])])])}const G=u(f,[["render",V]]);export{G as default};
