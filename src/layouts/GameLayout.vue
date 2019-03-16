<template>
    <v-container fluid fill-height>
        <v-layout column
        justify-center
        >
            <v-flex text-xs-center class="h-50">
                <v-layout justify-space-between class="h-100">
                    <v-flex class="d-flex flex-column">
                        <v-subheader class="flex-shrink-0 flex-grow-0">Категории</v-subheader>
                        <v-card class="flex-grow-1 mh-0 d-flex flex-column">
                            <v-text-field v-model="categorySearch" class="px-3 pt-3 flex-shrink-0 flex-grow-0" label="Поиск"></v-text-field>
                            <div class="h-100 d-flex align-items-center" v-if="categories.length === 0">
                                <span>Категорий не найдено</span>
                            </div>
                            <perfect-scrollbar v-if="categories.length !== 0" @ps-y-reach-end="scrollEndCategories" class="d-flex-grow-1 mh-0">
                                <v-list>
                                    <v-list-tile
                                        v-for="item in categories"
                                        :key="item._id"
                                        @click="changeCategory(item)"
                                    >
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </perfect-scrollbar>
                        </v-card>
                    </v-flex>
                    <v-flex md5 class="d-flex flex-column">
                        <v-layout class="flex-grow-1 mh-0" column>
                            <v-flex class="flex-column justify-flex-end align-items-center">
                                <v-card class="circle icon-customer">
                                    <v-img :src="require('../assets/images/customerDefault.png')"/>
                                </v-card>
                            </v-flex>
                            <v-flex class="pt-3 flex-shrink-0 flex-grow-1 d-flex flex-column">
                                <v-subheader class="flex-shrink-0 flex-grow-0">Пожелания клиента</v-subheader>
                                <v-card class="customer-message flex-grow-1 flex justify-center align-items-center mh-0 mx-2 px-2 py-2">
                                    <span>Дайте мне батон</span>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex class="d-flex flex-column">
                        <v-subheader class="flex-shrink-0 flex-grow-0">Корзина</v-subheader>
                        <v-card class="flex-grow-1 mh-0 d-flex flex-column">
                            <div class="h-100 d-flex align-items-center" v-if="cart.length === 0">
                                <span>Корзина пуста</span>
                            </div>
                            <perfect-scrollbar v-if="cart.length !== 0" class="flex-grow-1 mh-0">
                                <v-list>
                                    <v-list-tile
                                        v-for="item in cart"
                                    >
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{item.name}}</v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action @click="deleteFromCart(item)">
                                            <v-btn flat icon color="pink">
                                                <v-icon>clear</v-icon>
                                            </v-btn>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                             </perfect-scrollbar>
                            <v-btn class="w-100 flex-shrink-0 flex-grow-0" color="success">Завершить ход</v-btn>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex class="h-50">
                <v-layout column fill-height>
                    <v-flex class="flex-shrink-0 flex-grow-0">
                        <v-subheader>Список товаров</v-subheader>
                    </v-flex>
                    <v-flex class="mh-0 flex-grow-1">
                        <v-card class="h-100 d-flex flex-column">
                            <v-text-field class="px-3 pt-3 flex-shrink-0 flex-grow-0" v-model="searchProds" label="Поиск"></v-text-field>
                            <div class="px-3 pb-3 d-flex align-items-center text-xs-center">
                                <div v-if="selectedCategory !== null && prods.length === 0"><span>Товаров не найдено</span></div>
                                <div v-if="selectedCategory === null"><span>Сначала выберите категорию</span></div>
                            </div>
                            <perfect-scrollbar v-if="this.selectedCategory !== null && prods.length !== 0" class="flex-grow-1 mh-0" @ps-y-reach-start="scrollStart" @ps-y-reach-end="scrollEnd">
                                <div class="px-3 pb-3">
                                <v-layout row wrap>
                                    <v-flex @click="addToCart(product)" xs2 v-for="product in prods" class="px-1 py-1 product">
                                            {{product.name}}
                                    </v-flex>
                                </v-layout>
                                </div>
                            </perfect-scrollbar>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="showFormStartGame" persistent max-width="400">
            <v-card>
                <v-card-title class="headline">Представьтесь, пожалуйста</v-card-title>
                <v-card-text>Введите никнейм, который будет отображаться в рейтинговой таблице
                    <v-text-field v-model="name" label="Никнейм"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="closeStartModal()">Подтвердить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showScoreBoard" persistent max-width="900">
            <v-card>
                <v-card-title class="headline">Рейтинговая таблица</v-card-title>
                <v-card-text>
                    <v-data-table
                            :rows-per-page-items="[10, 20, {'text':'Все','value':-1}]"
                            v-model="selected"
                            :headers="headers"
                            :items="desserts"
                            :pagination.sync="pagination"
                            rows-per-page-text="Количество игроков на страницу"
                            select-all
                            item-key="name"
                            class="elevation-1"
                    >
                        <template v-slot:headers="props">
                            <tr>
                                <th
                                        v-for="header in props.headers"
                                        :key="header.text"
                                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                        @click="changeSort(header.value)"
                                >
                                    <v-icon small>arrow_upward</v-icon>
                                    {{ header.text }}
                                </th>
                            </tr>
                        </template>
                        <template v-slot:items="props">
                            <tr :active="props.selected" @click="props.selected = !props.selected">
                                <td>{{ props.item.name }}</td>
                                <td class="text-xs-right">{{ props.item.points }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="closeScoreBoard()">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showHistory" persistent max-width="900">
            <v-card>
                <v-card-title class="headline"></v-card-title>
                <v-card-text>
                    <v-layout>
                        <v-flex></v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="closeHistory()">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template> 
<script>
  import {API_ADDRESS, START_GAME, TURN_GAME, STORAGE_TOKEN_KEY, HEADERS, ITEMS} from '../constants/common.js'
  export default {
    name: 'GameLayout',
    data: () => ({
        categories: [
        ],
        prods: [

        ],
        products: [

        ],
        showFormStartGame: false,
        name: null,
        turnInfo: null,
        showScoreBoard: false,
//        showPrevStep: false,
        pagination: {
            sortBy: 'name'
        },
        selected: [],
        catsStart: 0,
        catsMax: 0,
        prodsStart: 0,
        prodsMax: 0,
        flag: false,
        token: null,
        pageSize: 50,
        categorySearch: '',
        searchProds: '',
        showHistory: false,
        selectedCategory: null,
        decodedToken: null,
        cart: [

        ],
        headers: [
            {
                text: 'Никнейм',
                align: 'left',
                value: 'name'
            },
            { text: 'Заработанные очки', value: 'points' }
        ],
        desserts: [
            {
                name: 'Frozen Yogurt',
                points: 159,
            },
            {
                name: 'Ice cream sandwich',
                points: 237
            },
            {
                name: 'Eclair',
                points: 262,
            }
        ]
    }),
    props: {
      
    },
    created() {
        this.refreshJwt(localStorage.getItem(STORAGE_TOKEN_KEY))
        this.getTurnInfo()
//        if (this.jwt === null) {
//
//        } else {
//            let decodedToken = this.$jwtDecode(this.jwt)
//            console.log(decodedToken)
//            this.name = decodedToken.user
//        }

        this.getCategories()
        this.debGetCategories = this.$lodash.debounce(this.getCategories, 500)
        this.debGetProds = this.$lodash.debounce(this.getProducts, 500)
        if (this.name === null) {
            this.showFormStartGame = true
        }
//        for (let i = 0; i < 1000; i++) {
//            this.products.push('Продукт ' + i)
//        }
//        this.prods = this.getPart(this.prodsStart, this.pageSize)
    },
    methods: {
        refreshJwt(jwt) {
            if (jwt) {
                this.jwt = jwt
                localStorage.setItem(STORAGE_TOKEN_KEY, jwt)
                this.decodedToken = this.$jwtDecode(jwt)
                if (this.decodedToken) {
                    this.name = this.decodedToken.user
                    this.$emit('updated-jwt', this.decodedToken)
                }
            }
        },
        startGame(username) {
            return this.$axios.post(
                API_ADDRESS + START_GAME,
                {username: username}
            ).then(res => {
              return this.makeTurn(res.data.token, [])
            })
        },
        makeTurn (token, products) {
            console.log('TOKEN', token)
            return this.$axios.post(
                API_ADDRESS + TURN_GAME,
                {
                    token: token,
                    products: products
                }
            )
        },
        getTurnInfo() {
            if (this.decodedToken) {
                this.$axios.get(
                    API_ADDRESS + TURN_GAME,
                    {
                        token: this.jwt
                    }
                ).then(res => {
                    this.turnInfo = res.data.consumer.data
                })
            }
        },
        scrollStart() {
          console.log('start')
//            return false
//          if (this.prodsStart === 0 || this.flag) {
//              return false
//          }
//          let newStart = Math.min(this.prodsStart - this.pageSize, 0)
////            let addProds = this.getPart(newStart, this.pageSize)
//            let addProds = this.getPart(0, this.pageSize)
//          this.prods = addProds.concat(this.prods)
//            this.flag = true
//          this.prodsStart = this.newStart
//            if (this.prods.length >= 200) {
//                this.prods = this.prods.slice(this.prods.length - this.pageSize, this.pageSize)
//            }
        },
        scrollEndCategories() {
            console.log('end')
            if (this.catsStart + this.categories.length >= this.catsMax) {
                return false
            }
            this.getCategories(this.catsStart + this.categories.length, this.pageSize).then(res => {
                this.categories = this.categories.concat(res.data.data)
            })
//            if (addCats.length === 0) {
//                return false
//            }
//            this.categories = this.categories.concat(addCats)

//          if (this.prods.length >= 200) {
//              this.prods = this.prods.slice(this.pageSize, this.prods.length - this.pageSize)
//              this.prodsStart += this.pageSize
//          }
        },
        scrollEnd() {
          console.log('end')
            if (this.prodsStart + this.prods.length >= this.prodsMax) {
                return false
            }
            this.getProducts(this.prodsStart + this.prods.length, this.pageSize).then(res => {
                this.prods = this.prods.concat(res.data.data)
            })
//          if (this.prods.length >= 200) {
//              this.prods = this.prods.slice(this.pageSize, this.prods.length - this.pageSize)
//              this.prodsStart += this.pageSize
//          }
        },
        closeStartModal() {
            if (this.name) {
                this.startGame(this.name).then(res => {
                    console.log(res)
                    this.refreshJwt(res.data.token)
                    this.showFormStartGame = false
                })
            }
        },
        closeScoreBoard() {
          this.showScoreBoard = false
        },
        toggleAll () {
            if (this.selected.length) this.selected = []
            else this.selected = this.desserts.slice()
        },
        changeSort (column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },
        getPart (from, size) {
            return this.products.splice(from, size)
        },
        openScoreBoard() {
          this.showScoreBoard = true
        },
        getCategories (from = 0, size = this.pageSize) {
            const dataSearch =  {
                "current": from,
                "size": size,
                "filter": { "is_category": true}
            }
            if (this.categorySearch) {
                dataSearch.filter.name = this.categorySearch
            }
            return this.$axios.post(
                API_ADDRESS + ITEMS,
                dataSearch
            ).then(res => {
              console.log(res)
                if (from === 0) {
                    this.categories = res.data.data
                    this.catsStart = 0
                    this.catsMax = res.data.meta.searched
                    console.log(this.categories)
                } else {
                  return res
                }
            })

        },
        getProducts (from = 0, size = this.pageSize) {
            const dataSearch =  {
                "current": from,
                "size": size,
                "filter": { "root_category_id": this.selectedCategory, "is_category": false}
            }
            if (this.searchProds) {
                dataSearch.filter.name = this.searchProds
            }
            return this.$axios.post(
                API_ADDRESS + ITEMS,
                dataSearch
            ).then(res => {
                console.log(res)
                if (from === 0) {
                    this.prods = res.data.data
                    this.prodsStart = 0
                    this.prodsMax = res.data.meta.searched
                    console.log(this.prods)
                } else {
                    return res
                }
            })

        },
        deleteFromCart(item) {
            this.cart.splice(this.cart.findIndex(el => el === item) , 1)
        },
        addToCart (prod) {
            this.cart.push(prod)
        },
        changeCategory(item) {
            this.selectedCategory = item.id
            this.getProducts()
        }
    },
    watch: {
       categorySearch() {
           this.debGetCategories()
       },
       searchProds() {
           this.debGetProds()
       }
    }
  }
</script>
<style>
    .icon-customer {
        width:20vh;
        display:inline-block;
    }
    .w-100 {
        width:calc(100% - 16px);
    }
    .customer-message {
        line-height: 200%;
    }
    .product {
        transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        transition-property: background;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.5, 1);
        transition-delay: 0s;
        cursor:pointer;
    }
    .product:hover {
        background: rgba(0,0,0,0.04);
    }
</style>