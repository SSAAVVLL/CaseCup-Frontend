<template>
    <v-container fluid fill-height>
        <v-layout column
        justify-center
        >
            <v-flex text-xs-center class="h-50">
                <v-layout justify-space-between class="h-100">
                    <v-flex class="d-flex flex-column">
                        <v-subheader class="flex-shrink-0">Категории</v-subheader>
                        <v-card class="flex-grow-1 mh-0 d-flex flex-column">
                            <v-text-field class="px-3 pt-3 flex-shrink-0" label="Поиск"></v-text-field>
                            <perfect-scrollbar class="d-flex-grow-1 mh-0">
                                <v-list>
                                    <v-list-tile
                                        v-for="item in categories"
                                        :key="item.title"
                                        @click=""
                                    >
                                        <v-list-tile-content>
                                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
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
                                <v-dialog v-model="dialog" persistent max-width="400">
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
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex class="d-flex flex-column">
                        <v-subheader class="flex-shrink-0">Корзина</v-subheader>
                        <v-card class="flex-grow-1 mh-0 d-flex flex-column">
                            <perfect-scrollbar class="flex-grow-1 mh-0">
                                <v-list>
                                    <v-list-tile
                                        v-for="item in categories"
                                        :key="item.title"
                                    >
                                        <v-list-tile-content>
                                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                             </perfect-scrollbar>
                            <v-btn class="w-100 flex-shrink-0" color="success">Завершить ход</v-btn>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex class="h-50">
                <v-layout column fill-height>
                    <v-flex class="flex-shrink-0">
                        <v-subheader>Список товаров</v-subheader>
                    </v-flex>
                    <v-flex class="mh-0 flex-grow-1">
                        <v-card class="h-100 d-flex flex-column">
                            <v-text-field class="px-3 pt-3 flex-shrink-0" label="Поиск"></v-text-field>
                            <perfect-scrollbar class="flex-grow-1 mh-0">
                                <div class="px-3 pb-3">
                                <v-layout row wrap>
                                    <v-flex xs2 v-for="i in 150" class="px-1 py-1 product" :key="i">
                                            Товар
                                    </v-flex>
                                </v-layout>
                                </div>
                            </perfect-scrollbar>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
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
        <v-dialog v-model="showPrevStep" persistent max-width="900">
            <v-card>
                <v-card-title class="headline">Рейтинговая таблица</v-card-title>
                <v-card-text>
                    <v-data-table
                            :rows-per-page-items="[10, 20, {'text':'Все','value':-1}]"
                            v-model="selected"
                            :headers="headers"
                            :items="desserts"
                            :pagination.sync="pagination"
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
    </v-container>
</template> 
<script>
  export default {
    name: 'GameLayout',
    data: () => ({
        categories: [
          { title: 'Выпечка' },
          { title: 'Одежда' },
          { title: 'Бытовая химия' },
          { title: 'Сладости' },
          { title: 'Выпечка' },
          { title: 'Одежда' },
          { title: 'Бытовая химия' },
          { title: 'Сладости' }
        ],
        dialog: true,
        name: null,
        token: null,
        showScoreBoard: true,
        showPrevStep: false, 
        pagination: {
            sortBy: 'name'
        },
        selected: [],
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
        if (this.name !== null) {
            this.dialog = false
        }
    },
    methods: {
        closeStartModal() {
            if (this.name) {
                this.dialog = false
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
        }
    }
  }
</script>
<style>
    .icon-customer {
        width:25vh;
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
    }
    .product:hover {
        background: rgba(0,0,0,0.04);
    }
</style>