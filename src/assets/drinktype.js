const type = [
  {
    nameEN: 'Espresso',
    nameCH: '浓缩咖啡',
    nameJP: '',
    url: '/static/imgs/Starbucks/Americano.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Caffe Americano',
    nameCH: '美式咖啡',
    nameJP: '',
    url: '/static/imgs/Starbucks/Americano.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Cappuccino',
    nameCH: '卡布奇诺',
    nameJP: '',
    url: '/static/imgs/Starbucks/Cappuccino.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Caffe Lattee',
    nameCH: '拿铁',
    nameJP: '',
    url: '/static/imgs/Starbucks/CaffeLattee.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Vanilla Flavored Latte',
    nameCH: '香草风味拿铁',
    nameJP: '',
    url: '/static/imgs/Starbucks/CaffeLattee.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Caramel Macchiato',
    nameCH: '焦糖玛奇朵',
    nameJP: '',
    url: '/static/imgs/Starbucks/Macchiato.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Caffe Mocha',
    nameCH: '摩卡',
    nameJP: '',
    url: '/static/imgs/Starbucks/Cappuccino.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Hazelnut Flavored Latte',
    nameCH: '榛果风味拿铁',
    nameJP: '',
    url: '/static/imgs/Starbucks/CaffeLattee.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Starbucks Flat White',
    nameCH: '馥芮白',
    nameJP: '',
    url: '/static/imgs/Starbucks/CaffeLattee.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Extra Shot Mocha',
    nameCH: '浓郁咖啡摩卡',
    nameJP: '',
    url: '/static/imgs/Starbucks/Cappuccino.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Green Tea Latte',
    nameCH: '抹茶拿铁',
    nameJP: '',
    url: '/static/imgs/Starbucks/GreenTeaLatte.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Black Tea Latte',
    nameCH: '红茶拿铁',
    nameJP: '',
    url: '/static/imgs/Starbucks/Americano.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Iced Shaken Blackcurrant Raspberry Juiced Tea',
    nameCH: '冰摇红莓黑加仑茶',
    nameJP: '',
    url: '/static/imgs/Starbucks/IcedShakenBlackcurrantRaspberryJuicedTea.jpg',
    config: 0 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Espresso Frappuccino',
    nameCH: '浓缩咖啡星冰乐',
    nameJP: '',
    url: '/static/imgs/Starbucks/Frappuccino.jpg',
    config: 1 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Mocha Java Chip Frappuccino',
    nameCH: '摩卡可可碎片星冰乐',
    nameJP: '',
    url: '/static/imgs/Starbucks/Frappuccino.jpg',
    config: 1 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Mocha Frappuccino',
    nameCH: '摩卡星冰乐',
    nameJP: '',
    url: '/static/imgs/Starbucks/Frappuccino.jpg',
    config: 1 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Vanilla Flavored Cream Frappuccino',
    nameCH: '香草风味星冰乐',
    nameJP: '',
    url: '/static/imgs/Starbucks/VanillaFlavoredCreamFrappuccino.jpg',
    config: 1 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Green Tea Cream Frappuccino',
    nameCH: '抹茶星冰乐',
    nameJP: '',
    url: '/static/imgs/Starbucks/GreenTeaCreamFrappuccino.jpg',
    config: 1 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Mango Passion Fruit and Tea Blened Juice Drink',
    nameCH: '芒果西番莲果茶星冰乐',
    nameJP: '',
    url: '/static/imgs/Starbucks/MangoPassionFruitandTeaBlenedJuiceDrink.jpg',
    config: 1 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  },
  {
    nameEN: 'Caramel Espresso Frappuccino',
    nameCH: '焦糖浓缩咖啡星冰乐',
    nameJP: '',
    url: '/static/imgs/Starbucks/CaramelEspressoFrappuccino.jpg',
    config: 1 //  [HOT/ICE, SUGER, CREAM, CAF/DECAF, MILK, SOYA, SHOTS] 0: none, 1:default choice, 2: option choice
  }
]

export default type
