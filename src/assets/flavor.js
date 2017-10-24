const flavor = [
  {
    name: 'Sugar',
    iconUrl: '/static/imgs/coffeeicons/Sugar@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/SugarS@2x.png',
    subMenu: [],
    replace: null
  },
  {
    name: 'Cream',
    iconUrl: '/static/imgs/coffeeicons/Cream@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/Cream_S@2x.png',
    subMenu: [],
    replace: null
  },
  {
    name: 'Milk',
    iconUrl: '/static/imgs/coffeeicons/Milk@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
    subMenu: [
      {
        name: 'Whole',
        iconUrl: '/static/imgs/coffeeicons/Milk@2x.png',
        bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
        color: 'white'
      },
      {
        name: 'Skim',
        iconUrl: '/static/imgs/coffeeicons/Skim@2x.png',
        bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
        color: '#bbdeff'
      },
      {
        name: 'Soya',
        iconUrl: '/static/imgs/coffeeicons/Soya@2x.png',
        bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
        color: '#f3ce91'
      }
    ],
    replace: null
  },
  {
    name: 'Decaf',
    iconUrl: '/static/imgs/coffeeicons/Decaf@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/Caf_S@2x.png',
    subMenu: [],
    replace: {
      name: 'Caf',
      iconUrl: '/static/imgs/coffeeicons/Caf@2x.png',
      bottomUrl: ''
    }
  },
  {
    name: 'Iced',
    iconUrl: '/static/imgs/coffeeicons/AddIce@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/AddIce@2x.png',
    subMenu: [],
    replace: {
      name: 'Hot',
      iconUrl: '/static/imgs/coffeeicons/hot@2x.png',
      bottomUrl: ''
    }
  },
  {
    name: 'Shot',
    iconUrl: '/static/imgs/coffeeicons/Shot.png',
    bottomUrl: '/static/imgs/coffeeicons/Shot_S@2x.png',
    subMenu: [],
    replace: {
      name: 'Noshot',
      iconUrl: '/static/imgs/coffeeicons/Shot.png',
      bottomUrl: ''
    }
  }
]

export default flavor
