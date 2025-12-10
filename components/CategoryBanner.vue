<template>
    <div :class='["category-pane", {active: openPane}]' >
        <div class="container" >
            <div class="row h-100 justify-content-start align-items-start">
                <div class="col-10 text-left text-dark pt-1 ">
                   <b>Browse by Category</b>
                </div>
                <div class="col text-end">
                    <a @click="toggleSearch"><i class="fas fa-times fa-lg text-dark"></i></a>
                </div>
            </div>
            <div v-for="(category, key) in categories" :key="key">
                <div class="row">
                    <div class="cat col text-left text-dark">
                        <a @click="$emit('setTag',category.name.toLowerCase())">{{ category.name }}</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-left text-dark ">
                        <ul>
                            <li v-for="(subcategories, key) in category.subcategories"><a @click="$emit('setTag',key)"><u class="subcatheading" >{{
                                        key }}</u></a>
                                <ul class="subcat" >
                                    <li v-for="subcategory in subcategories"><a @click="$emit('setTag',subcategory)">{{ subcategory }}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    openPane: {type: Boolean, default: false}
});

const emit = defineEmits(['toggleSearch', 'setTag']);

const categories = {
    pokemon: {
        name: 'Pokemon',
        subcategories: {
            'TCG': ["Mega Evolution", "Mega Evolution - Phantasmal Flames", "Sword and Shield", "Sun and Moon - Team Up", "Sun and Moon - Unified Minds",
                "Sun and Moon - Unbroken Bonds", "Sun and Moon - Cosmic Eclipse"
            ],
            'Accessories': ["Playmats"],
            'Figures': ["Coming Soon!"]
        }
    },
    comics: {
        name: 'Comics',
        subcategories: { 'Superman': [], 'Batman': [], 'Avengers': [] }
    }
}

function toggleSearch() {
    emit('toggleSearch');
}


</script>

<style scoped>
.category-pane {
    height: 500px;
    width: 100%;
    background-color: #f0f0f0;
    font-size: 24px;
    color: #333;
    overflow-y: auto;
    z-index: 9999;   
    position: absolute;
    top: 125px;
    transform: translateX(-100%); /* hidden */
    transition: transform .3s ease;

}

.category-pane.active {
  transform: translateX(0); /* slide in */
}

.subcat {
    font-size: 16px;
    column-count: 4;
}

.subcatheading { 
    font-size: 18px;
}

ul {
    padding-left: 1rem;
}

@media (max-width: 640px) {
    .category-pane {
        height: 240px;
        overflow-y: auto;
        top: 80px;
    }

    .subcat {
        font-size: 11px;
        column-count: 2;
    }

    .subcatheading {
        font-size: 16px;
    }

    .cat {
        font-size: 20px;
    }

}
</style>