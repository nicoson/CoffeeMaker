const flavor = [
  {
    name: 'Sugar',
    iconUrl: '/static/imgs/coffeeicons/Sugar@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/SugarS@2x.png',
    animationUrl: '/static/imgs/coffeeicons/AddSugar/Comp 1_000',
    subMenu: [],
    replace: null,
    choice: ['NO SUGAR', '1/2', 'STANDARD', '+1', '+2', '+3'],
    defaultChoice: 2
  },
  {
    name: 'Cream',
    iconUrl: '/static/imgs/coffeeicons/Cream@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/Cream_S@2x.png',
    animationUrl: '/static/imgs/coffeeicons/AddCream/Comp 1_000',
    subMenu: [],
    replace: null,
    choice: ['NO CREAM', '1/2', 'STANDARD', '+1', '+2', '+3'],
    defaultChoice: 2
  },
  {
    name: 'Milk',
    iconUrl: '/static/imgs/coffeeicons/Milk@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
    animationUrl: '/static/imgs/coffeeicons/Milk/Comp 1_000',
    subMenu: [
      {
        name: 'WHOLE MILK',
        iconUrl: '/static/imgs/coffeeicons/Milk@2x.png',
        bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
        animationUrl: '/static/imgs/coffeeicons/Milk/Comp 1_000',
        color: 'white'
      },
      {
        name: 'SKIM MILK',
        iconUrl: '/static/imgs/coffeeicons/Skim@2x.png',
        bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
        animationUrl: '/static/imgs/coffeeicons/AddSkim/Comp 1_000',
        color: '#bbdeff'
      },
      {
        name: 'SOYA MILK',
        iconUrl: '/static/imgs/coffeeicons/Soya@2x.png',
        bottomUrl: '/static/imgs/coffeeicons/Milk_S@2x.png',
        animationUrl: '/static/imgs/coffeeicons/AddSoya/Comp 1_000',
        color: '#f3ce91'
      }
    ],
    replace: null,
    choice: ['NO MILK', '1/2', 'STANDARD', '+1', '+2', '+3'],
    defaultChoice: 2
  },
  {
    name: 'Decaf',
    iconUrl: '/static/imgs/coffeeicons/Decaf@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/Caf_S@2x.png',
    animationUrl: '/static/imgs/coffeeicons/AddDecaf/Comp 1_000',
    subMenu: [],
    replace: null,
    choice: ['DECAF', '1/2 DECAF', 'STANDARD'],
    defaultChoice: 2
  },
  {
    name: 'Temp',
    iconUrl: '/static/imgs/coffeeicons/hot@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/AddIce@2x.png',
    animationUrl: '/static/imgs/coffeeicons/Shot/Comp 1_000',
    subMenu: [],
    replace: null,
    choice: ['ICED', 'HOT'],
    defaultChoice: 1
  },
  {
    name: 'Shot',
    iconUrl: '/static/imgs/coffeeicons/Shot@2x.png',
    bottomUrl: '/static/imgs/coffeeicons/Shot_S@2x.png',
    animationUrl: '/static/imgs/coffeeicons/Shot/Shot_000',
    subMenu: [],
    replace: null,
    choice: ['STANDARD', '+1', '+2'],
    defaultChoice: 0
  }
]

export default flavor
