import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import SelectDrink from '@/views/SelectDrink'
import DrinkDetail from '@/views/DrinkDetail'
import Confirm from '@/views/Confirm'
import FaceRecog from '@/views/FaceRecog'
import FaceRecogS2 from '@/views/FaceRecog_Step2'
import FaceRecogS3 from '@/views/FaceRecog_Step3'
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
      path: '/face',
      name: 'FaceRecog',
      component: FaceRecog
    },
    {
      path: '/face/2',
      name: 'FaceRecog2',
      component: FaceRecogS2
    },
    {
      path: '/face/3',
      name: 'FaceRecog3',
      component: FaceRecogS3
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
