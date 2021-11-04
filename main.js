// ---- Data ---- //
const drinkList = [
  {
    name: 'Black Tea',
    price: 30,
  },
  {
    name: 'Oolong Tea',
    price: 30,
  },
  {
    name: 'Baozong Tea',
    price: 30,
  },
  {
    name: 'Green Tea',
    price: 30,
  },
  {
    name: 'Bubble Milk Tea',
    price: 50,
  },
  {
    name: 'Lemon Green Tea',
    price: 50,
  },
  {
    name: 'Black Tea Latte',
    price: 55,
  },
  {
    name: 'Matcha Latte',
    price: 55,
  },
  {
    name: 'Americano',
    price: 60
  },
  {
    name: 'Caffee Latte',
    price: 70,
  },
  {
    name:'Mocha',
    price: 75,
  },
  {
    name:'Macchiato',
    price: 75,
  }
]

// ---- Nodes ---- //
const orderPanel = document.querySelector('.order-list__card-panel')
const menuPanel = document.querySelector('.menu__card-panel')
const iceLevel = document.querySelector('.menu__ice-level__btn-group')
const sugarLevel = document.querySelector('.menu__sugar-level__btn-group')
const addOrderBtn = document.querySelector('.menu__add-order-btn')
const checkoutBtn = document.querySelector('.order-list__checkout-btn')

// ------- functions ------- // 
// func: render menu list
const showMenu = function() {
  menuPanel.innerHTML = drinkList.map((drink, index) => {
    return `
      <label class="menu__card-panel__label">
            <input type="radio" name="drink" value="${drink.name}">
            <div class="menu__card-panel__label__card" data-id="${index}">
              <h3 class="menu__card-panel__label__card__drink-name">${drink.name}</h3>
              <div class="menu__card-panel__label__card__unit-price">
                <span>$</span>
                <span class="menu__card-panel__label__card__unit-price_number">${drink.price}</span>
              </div>
            </div>
          </label>
    `
  }).join('')
}()

// Constructor function for order creation //
function Order (drink, ice, sugar) {
  this.drink = drink
  this.ice = ice
  this.sugar = sugar
}
// method: price methods: get price of drink
Order.prototype.price = function() {
  const selectedDrink = drinkList.filter(item => item.name === this.drink)
  return selectedDrink[0].price
}

// Constructor function for Pos System //
function AlphaPos () {}
// method: get checked value
AlphaPos.prototype.getCheckedValue = function (inputName) {
  const targetInputs = document.querySelectorAll(`[name=${inputName}]`)
  let selectedOption = ''
  targetInputs.forEach(input => {
    if (input.checked) {
      selectedOption = input.value
    }
  })
  return selectedOption
}
// method: add order to order list
AlphaPos.prototype.addDrinkOrder = function (order) {
  const orderCard = `
    <div class="order-list__card-panel__card">
            <div class="order-list__card-panel__card__delete"><i class="order-list__card-panel__card__delete__icon fas fa-times"></i></div>
            <h3 class="order-list__card-panel__card__drink-name">${order.drink}</h3>
            <div class="order-list__card-panel__card__ice">
              <span class="order-list__card-panel__card__ice__level">${order.ice}</span>
              <span>Ice</span>
            </div>
            <div class="order-list__card-panel__card__sugar">
              <span class="order-list__card-panel__card__sugar__level">${order.sugar}</span>
              <span>Sugar</span>
            </div>
            <div class="order-list__card-panel__card__unit-price">
              <span>$</span>
              <span class="order-list__card-panel__card__unit-price_number">${order.price()}</span>
            </div>
          </div>
  `
  orderPanel.insertAdjacentHTML('afterbegin', orderCard)
}
// method: delete order card
AlphaPos.prototype.deleteOrderCard = function (targetCard) {
  targetCard.remove()
}
// method: checkout
AlphaPos.prototype.checkout = function () {
  const priceNodes = orderPanel.querySelectorAll('.order-list__card-panel__card__unit-price_number')
  let totalAmount = 0
  priceNodes.forEach(node => totalAmount += Number(node.innerHTML))
  return totalAmount
}
// create instance
const alphaPos = new AlphaPos

// function to add new order
function handleNewOrderAdd () {
  const drink = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  
  if (!drink) {
    alert('Please choose at least one drink.')
  } else {
    const selectedDrink = new Order(drink, ice, sugar)
    alphaPos.addDrinkOrder(selectedDrink)
    const drinkInputs = menuPanel.querySelectorAll('[name=drink]')
    drinkInputs.forEach(drink => drink.checked = false)
  }
}

function handleOrderDelete () {
  if (event.target.matches('.order-list__card-panel__card__delete__icon')) {
    alphaPos.deleteOrderCard(event.target.closest('.order-list__card-panel__card'))
  }
}

function handleCheckoutBtnClick () {
  const totalAmount = alphaPos.checkout()
  if(!totalAmount) {
    alert('Please add at least one order before checkout.')
  } else {
    alert(`Total amount is $${totalAmount}.`)
    orderPanel.innerHTML = ''
  }
}
// ---- Execution & function invoke ---- //
addOrderBtn.addEventListener('click', handleNewOrderAdd)
orderPanel.addEventListener('click', handleOrderDelete)
checkoutBtn.addEventListener('click', handleCheckoutBtnClick)
