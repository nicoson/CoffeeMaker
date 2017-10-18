import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import SelectDrink from '@/views/SelectDrink'
import DrinkDetail from '@/views/DrinkDetail'
import Confirm from '@/views/Confirm'
import Result from '@/views/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SelectDrink
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
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
