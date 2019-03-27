<template>
    <v-container fluid fill-height>
        <v-layout column
                  justify-center
        >
            <v-flex>
                <v-layout>
                    <v-flex class="d-flex" xs4>
                        <v-card v-if="decodedToken"class="infoDisp mr-4 mb-4 px-4 py-4">
                            <v-layout><v-flex><v-icon class="mr-2">verified_user</v-icon><b>Имя пользователя:</b> {{decodedToken.user}}</v-flex><v-flex class="text-right"><v-icon class="mr-2">calendar_today</v-icon><b>День</b>: {{decodedToken.day}}</v-flex></v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs8>
                        <v-stepper v-if="decodedToken" v-model="decodedToken.step" class="mb-4 flex-shrink-0">
                            <v-stepper-header>
                                <v-stepper-step :complete="decodedToken && decodedToken.step > 1" step="1"></v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="decodedToken && decodedToken.step > 2" step="2"></v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="decodedToken && decodedToken.step > 3" step="3"></v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="decodedToken && decodedToken.step > 4" step="4"></v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="decodedToken && decodedToken.step > 5" step="5"></v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="decodedToken && decodedToken.step > 6" step="6"></v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step :complete="decodedToken && decodedToken.step > 7" step="7"></v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step step="8"></v-stepper-step>

                            </v-stepper-header>
                        </v-stepper>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex text-xs-center class="h-50">
                <v-layout justify-space-between class="h-100">
                    <v-flex class="d-flex flex-column flex-shrink-0 pr-4" xs4>
                        <v-toolbar color="amber " class="flex-grow-0 flex-shrink-0">
                            <v-icon>list_all</v-icon>
                            <v-toolbar-title>Категории</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <!--<v-btn icon>-->
                                <!--<v-icon>search</v-icon>-->
                            <!--</v-btn>-->
                        </v-toolbar>

                        <!--<v-subheader class="flex-shrink-0 flex-grow-0">Категории</v-subheader>-->
                        <v-card class="flex-grow-1 mh-0 d-flex flex-column">
                            <v-text-field v-model="categorySearch" class="px-3 pt-3 flex-shrink-0 flex-grow-0"
                                          label="Поиск"></v-text-field>
                            <div class="h-100 d-flex align-items-center" v-if="categories.length === 0">
                                <span>Категорий не найдено</span>
                            </div>
                            <perfect-scrollbar v-if="categories.length !== 0" @ps-y-reach-end="scrollEndCategories"
                                               class="d-flex-grow-1 mh-0">
                                <v-list>
                                    <v-list-tile
                                            v-for="item in categories"
                                            @click="changeCategory(item)"
                                            :class="{selected: selectedCategory === item.id}"
                                    >
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </perfect-scrollbar>
                        </v-card>
                    </v-flex>

                    <v-flex class="d-flex flex-column flex-shrink-0 pr-4" xs4>
                        <v-card
                                class="d-flex justify-space-between flex-column"
                                color="#26c6da"
                                dark
                        >
                            <v-card-title class="flex-grow-0">
                                <span class="title font-weight-light">Товар</span>
                            </v-card-title>

                            <v-card-text class="headline font-weight-bold flex-grow-0">
                                "Дайте мне {{turnInfo && turnInfo[0] ? turnInfo[0].name : ''}}"
                            </v-card-text>

                            <v-card-actions class="flex-grow-0">
                                <v-list-tile class="grow">
                                    <v-list-tile-avatar color="grey darken-3">
                                        <v-img
                                                class="elevation-6"
                                                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                        ></v-img>
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title>Ололоев</v-list-tile-title>
                                    </v-list-tile-content>

                                    <!--<v-layout-->
                                            <!--align-center-->
                                            <!--justify-end-->
                                    <!--&gt;-->
                                        <!--<v-icon class="mr-1">mdi-heart</v-icon>-->
                                        <!--<span class="subheading mr-2">256</span>-->
                                        <!--<span class="mr-1">·</span>-->
                                        <!--<v-icon class="mr-1">mdi-share-variant</v-icon>-->
                                        <!--<span class="subheading">45</span>-->
                                    <!--</v-layout>-->
                                </v-list-tile>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex class="d-flex flex-column flex-shrink-0" xs4>
                        <v-card
                                class=""
                                color="#26c6da"
                                dark
                        >
                            <v-card-title>
                                <v-icon>mdi-twitter</v-icon>
                                <span class="title font-weight-light">Статистика</span>
                            </v-card-title>

                            <v-card-text class="headline font-weight-bold">
                                <span class="stats">Вы занимаете {{scores ? scores.player : ''}}-е место из {{scores ? scores.from : ''}}-х</span>
                                <ve-line
                                        :data="chartData"
                                        class="custom-class"
                                        width="100%"
                                        height="250px">
                                </ve-line>
                            </v-card-text>


                        </v-card>
                    </v-flex>
                    <!--<v-flex class="d-flex flex-column flex-shrink-0"  xs4>-->
                    <!--<v-layout class="flex-grow-1 mh-0" column>-->
                    <!--<v-flex class="flex-column justify-flex-end align-items-center">-->
                    <!--<v-card class="circle icon-customer">-->
                    <!--<v-img :src="require('../assets/images/customerDefault.png')"/>-->
                    <!--</v-card>-->
                    <!--</v-flex>-->
                    <!--<v-flex class="pt-3 flex-shrink-0 flex-grow-1 d-flex flex-column">-->
                    <!--<v-subheader class="flex-shrink-0 flex-grow-0">Пожелания клиента</v-subheader>-->
                    <!--<v-card class="customer-message flex-grow-1 flex justify-center align-items-center mh-0 mx-2 px-2 py-2">-->
                    <!--<span>Дайте мне {{turnInfo && turnInfo[0] ? turnInfo[0].name : ''}}</span>-->
                    <!--</v-card>-->
                    <!--</v-flex>-->
                    <!--</v-layout>-->
                    <!--</v-flex>-->
                    <!--<v-flex class="d-flex flex-column flex-shrink-0"  xs4>-->
                    <!--<v-toolbar color="amber " class="flex-grow-0 flex-shrink-0">-->
                    <!--<v-icon>add_shopping_cart</v-icon>-->
                    <!--<v-toolbar-title>Корзина</v-toolbar-title>-->
                    <!--<v-spacer></v-spacer>-->

                    <!--</v-toolbar>-->
                    <!--<v-card class="flex-grow-1 mh-0 d-flex flex-column">-->
                    <!--<div class="h-100 d-flex align-items-center" v-if="cart.length === 0">-->
                    <!--<span>Корзина пуста</span>-->
                    <!--</div>-->
                    <!--<perfect-scrollbar v-if="cart.length !== 0" class="flex-grow-1 mh-0">-->
                    <!--<v-list>-->
                    <!--<v-list-tile-->
                    <!--v-for="item in cart" :key="item._id"-->
                    <!--&gt;-->
                    <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>{{item.name}}</v-list-tile-title>-->
                    <!--</v-list-tile-content>-->
                    <!--<v-list-tile-action @click="deleteFromCart(item)">-->
                    <!--<v-btn flat icon color="pink">-->
                    <!--<v-icon>clear</v-icon>-->
                    <!--</v-btn>-->
                    <!--</v-list-tile-action>-->
                    <!--</v-list-tile>-->
                    <!--</v-list>-->
                    <!--</perfect-scrollbar>-->
                    <!--<v-btn class="w-100 flex-shrink-0 flex-grow-0" :disabled="cart.length === 0" @click="endTurn()" color="success">Завершить ход</v-btn>-->
                    <!--</v-card>-->
                    <!--</v-flex>-->
                </v-layout>
            </v-flex>
            <v-layout class="h-50 pt-4">
            <v-flex class="pr-4" xs-8>
                <v-layout column fill-height>
                    <!--<v-flex class="flex-shrink-0 flex-grow-0">-->
                    <!--<v-subheader>Список товаров</v-subheader>-->
                    <!--</v-flex>-->
                    <v-toolbar color="amber " class="flex-grow-0 flex-shrink-0">
                        <v-icon>receipt</v-icon>
                        <v-toolbar-title>Товары</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!--<v-btn icon>-->
                            <!--<v-icon>search</v-icon>-->
                        <!--</v-btn>-->
                    </v-toolbar>
                    <v-flex class="mh-0 flex-grow-1">
                        <v-card class="h-100 d-flex flex-column">
                            <v-text-field class="px-3 pt-3 flex-shrink-0 flex-grow-0" v-model="searchProds"
                                          label="Поиск"></v-text-field>
                            <div class="px-3 pb-3 d-flex align-items-center text-xs-center">
                                <div v-if="selectedCategory !== null && prods.length === 0">
                                    <span>Товаров не найдено</span></div>
                                <div v-if="selectedCategory === null"><span>Сначала выберите категорию</span></div>
                            </div>
                            <perfect-scrollbar v-if="this.selectedCategory !== null && prods.length !== 0"
                                               class="flex-grow-1 mh-0" @ps-y-reach-start="scrollStart"
                                               @ps-y-reach-end="scrollEnd">
                                <div class="px-3 pb-3">
                                    <v-layout row wrap>
                                        <v-flex @click="addToCart(product)" xs4 v-for="product in prods"
                                                class="px-1 py-1 product">
                                            {{product.name}}
                                        </v-flex>
                                    </v-layout>
                                </div>
                            </perfect-scrollbar>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex class="d-flex flex-column flex-shrink-0" xs4>
                <v-toolbar color="amber " class="flex-grow-0 flex-shrink-0">
                    <v-icon>add_shopping_cart</v-icon>
                    <v-toolbar-title>Корзина (не более 5-ти товаров)</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card class="flex-grow-1 mh-0 d-flex flex-column text-xs-center">
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
                    <v-btn class="w-100 flex-shrink-0 flex-grow-0" :disabled="cart.length === 0" @click="endTurn()"
                           color="success">Завершить ход
                    </v-btn>
                </v-card>
            </v-flex>
            </v-layout>
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
        <v-dialog v-model="startGuide" persistent max-width="900">
            <v-card>
                <v-card-title class="headline">Правила игры</v-card-title>
                <v-card-text>
                    <p class="guide"><b>Попробуйте на себе роль менеджера по продажам в продуктовом магазине.</b> 
                    Вам предстоит <b>пять</b> рабочих дней по <b>восемь</b> часов. Каждый час к вам будет приходить новый покупатель. Ваша <b>цель</b> – продать дополнительных товаров на наибольшую сумму, обозначающую ваши очки. 
                    </p>
                    <p class="guide">Товар, приобретаемый покупателем, отображается по центру экрана, слева находятся категории, немного ниже товары. Чтобы увидеть список продуктов, сначала необходимо выбрать категорию. Как по категориям, так и по товарам есть возможность поиска.</p>
                    <p class="guide">Вы можете предложить покупателю дополнительно не более пяти товаров. Как только вы определились с окончательным вариантом корзины вы нажимаете кнопку завершить ход, и игра произведет расчет того какие товары были куплены покупателем и отобразит соответствующее количество очков, полученное за продажу товаров.</p>
                    <p class="guide"><i>Ваши противники – рандомный генератор, мат модель и нейронная сеть, желаем удачи.</i></p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="closeGuide()">Закрыть</v-btn>
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
        <v-dialog v-model="endOfGame" persistent max-width="900">
            <v-card>
                <v-card-title class="text-center headline">Ваша рабочая неделя завершена</v-card-title>
                <v-card-text class="">
                    <div class="wrap-res">
                        <v-card class="resImg" elevation="10">
                            <v-img v-if="resOfGame === 1" width="300px"
                                   :src="require('../assets/images/medalGold.png')"/>
                            <v-img v-if="resOfGame === 2" width="300px"
                                   :src="require('../assets/images/medalSilver.png')"/>
                            <v-img v-if="resOfGame === 3" width="300px"
                                   :src="require('../assets/images/medalBronze.png')"/>
                        </v-card>
                    </div>
                    <div class=" congrats text-center infoResult mt-4 py-3">Поздравляем, по итогам рабочей недели вы заняли <b>{{resOfGame}}-ое место из {{scores ? scores.from : ''}}-x</b>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="newGame()">Начать заново</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import {API_ADDRESS, START_GAME, TURN_GAME, STORAGE_TOKEN_KEY, HEADERS, ITEMS} from '../constants/common.js'
    import VeLine from 'v-charts/lib/line.common'
    import {SCORE_GAME} from "../constants/common";
    export default {
        components: {VeLine},
        name: 'GameLayout',
        data: () => ({
            categories: [],
            prods: [],
            products: [],
            showFormStartGame: false,
            name: null,
            show: true,
            turnInfo: null,
            showScoreBoard: false,
            endOfGame: false,
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
            chartData: null,
            cart: [],
            scores: null,
            startGuide: false,
            headers: [
                {
                    text: 'Никнейм',
                    align: 'left',
                    value: 'name'
                },
                {text: 'Заработанные очки', value: 'points'}
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
        props: {},
        created() {
            this.refreshJwt(localStorage.getItem(STORAGE_TOKEN_KEY))
            this.getTurnInfo()
            this.getScore()
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
            closeGuide() {
                this.startGuide = false
            },
            refreshJwt(jwt) {
                if (jwt) {
                    this.token = jwt
                    localStorage.setItem(STORAGE_TOKEN_KEY, jwt)
                    this.decodedToken = this.$jwtDecode(jwt)
                    if (this.decodedToken) {
                        this.name = this.decodedToken.user
                        this.$emit('updated-jwt', this.decodedToken)
                        this.getScore()
                    }
                }
            },
            startGame(username) {
                return this.$axios.post(
                    API_ADDRESS + START_GAME,
                    {username: username}
                ).then(res => {
                    this.refreshJwt(res.data.token)
                    return this.makeTurn(res.data.token, [])
                })
            },
            makeTurn(token, products) {
//            console.log('TOKEN', token)
                return this.$axios.post(
                    API_ADDRESS + TURN_GAME,
                    {
                        token: token,
                        products: products
                    }
                ).then(res => {
//                console.log('Make turn', res)
                    this.refreshJwt(res.data.token)
                    this.turnInfo = res.data.consumer.item
                    return res
                })
            },
            getTurnInfo() {
                if (this.decodedToken) {
                    this.$axios.get(
                        API_ADDRESS + TURN_GAME,
                        {
                            params: {
                                token: this.token
                            }
                        }
                    ).then(res => {
//                    console.log('Turn info', res)
                        this.turnInfo = res.data.consumer.item
                    })
                }
            },
            scrollStart() {
//          console.log('start')
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
//            console.log('end')
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
//          console.log('end')
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
                        this.showFormStartGame = false
                    })
                    this.startGuide = true
                }
            },
            closeScoreBoard() {
                this.showScoreBoard = false
            },
            toggleAll() {
                if (this.selected.length) this.selected = []
                else this.selected = this.desserts.slice()
            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
            getPart(from, size) {
                return this.products.splice(from, size)
            },
            openScoreBoard() {
                this.showScoreBoard = true
            },
            getCategories(from = 0, size = this.pageSize) {
                const dataSearch = {
                    "current": from,
                    "size": size,
                    "filter": {"is_category": true}
                }
                if (this.categorySearch) {
                    dataSearch.filter.name = this.categorySearch
                }
                return this.$axios.post(
                    API_ADDRESS + ITEMS,
                    dataSearch
                ).then(res => {
//              console.log(res)
                    if (from === 0) {
                        this.categories = res.data.data
                        this.catsStart = 0
                        this.catsMax = res.data.meta.searched
//                    console.log(this.categories)
                    } else {
                        return res
                    }
                })

            },
            getProducts(from = 0, size = this.pageSize) {
                const dataSearch = {
                    "current": from,
                    "size": size,
                    "filter": {"category_id": this.selectedCategory, "is_category": false}
                }
                if (this.searchProds) {
                    dataSearch.filter.name = this.searchProds
                }
                return this.$axios.post(
                    API_ADDRESS + ITEMS,
                    dataSearch
                ).then(res => {
//                console.log(res)
                    if (from === 0) {
                        this.prods = res.data.data
                        this.prodsStart = 0
                        this.prodsMax = res.data.meta.searched
//                    console.log(this.prods)
                    } else {
                        return res
                    }
                })

            },
            deleteFromCart(item) {
                this.cart.splice(this.cart.findIndex(el => el === item), 1)
            },
            addToCart(prod) {
                if (this.cart.length < 5) {
                    this.cart.push(prod)
                }
            },
            changeCategory(item) {
                this.selectedCategory = item.id
                this.getProducts()
            },
            endTurn() {
                if (this.cart.length !== 0) {
                    let positions = this.cart.map(el => {
                        return {"_id": el._id}
                    })
//                console.log(positions)
                    this.makeTurn(this.token, positions).then(res => {
//                    console.log('turnResult', res)
                        this.cart = []
                    })
                }
            },
            newGame() {
                this.decodedToken = null
                this.token = null
                this.name = null
                localStorage.removeItem(STORAGE_TOKEN_KEY)
                this.endOfGame = false
                this.showFormStartGame = true
                this.$emit('updated-jwt', this.decodedToken)
            },
            getScore() {
                this.$axios.get(API_ADDRESS + SCORE_GAME,
                    {
                        params: {
                            token: this.token
                        }
                    }).then(res => {
                        console.log(res)
                        let obj = {
                            columns: ["Имя", "Вы", "Рандом", "Мат модель", "Нейр сеть"],
                            rows: [
                            ]
                        }
                        let player = 0
                        let bot1 = 0
                        let bot2 = 0
                        let bot3 = 0
                        let day = 1
                        let step = 1
                        res.data.leaderboard.forEach(el => {
                            console.log(el)
                            if (step > 8) {
                                day++
                                step = 1
                            }
                            obj.rows.push({
                                "Имя": day + '/' + step,
                                "Вы": player + el.scores[this.decodedToken.user],
                                "Рандом": bot1 + el.scores.Oleg_1,
                                "Мат модель": bot2 + el.scores.Oleg_2,
                                "Нейр сеть": bot3 + el.scores.Oleg_3
                            })
                            player += el.scores[this.decodedToken.user]
                            bot1 += el.scores.Oleg_1
                            bot2 += el.scores.Oleg_2
                            bot3 += el.scores.Oleg_3
                            step++
                        })
                        let scores = [player, bot1, bot2, bot3];
                        let sorted = scores.slice().sort(function(a,b){return b-a})
                        let ranks = scores.slice().map(function(v){ return sorted.indexOf(v)+1 });
                        // console.log(ranks);
                        let maxOfArray = Math.max.apply(Math, ranks);
                        this.scores = {player: ranks[0], from: maxOfArray} 
                        console.log(obj)
                        this.chartData = obj
                        console.log()
                })
            },
            tutorial (step) {
                switch (step) {

                }
                
            }
        },
        watch: {
            categorySearch() {
                this.debGetCategories()
            },
            searchProds() {
                this.debGetProds()
            },
            decodedToken() {
                if (this.decodedToken && this.decodedToken.day === 6 && this.decodedToken.step === 1)
//           if (this.decodedToken && this.decodedToken.day === 1 && this.decodedToken.step === 1)
                {
                    this.endOfGame = true
                }
            }
        },
        computed: {
            resOfGame() {
                if (this.scores) {
                    return this.scores.player
                }
            },
        }
    }
</script>
<style>
    .icon-customer {
        width: 20vh;
        display: inline-block;
    }

    .w-100 {
        width: calc(100% - 16px);
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
        cursor: pointer;
    }

    .product:hover {
        background: rgba(0, 0, 0, 0.04);
    }

    .infoResult {

    }

    .resImg {
        border-radius: 100%;
        width: 300px;
        display: inline-block;
    }

    .wrap-res {
        text-align: center;
    }

    .infoDisp {
        font-size: 17px;
    }

    .text-right {
        text-align: right;
    }
    .selected {
      background: #E1BEE7;
        /*color:#ffffff;*/
        /*transition: .1s color;*/

    }
    .congrats {
        font-size:24px;
    }
    .stats {
        font-size:16px;
        font-weight: normal;
    }
    .guide {

    }
</style>