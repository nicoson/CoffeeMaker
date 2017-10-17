import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SelectDrink from '@/views/SelectDrink'
import DrinkDetail from '@/views/DrinkDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/selectdrink',
      name: 'SelectDrinks',
      component: SelectDrink
    },
    {
      path: '/drinkdetail',
      name: 'DrinkDetail',
      component: DrinkDetail
    }
  ]
})
