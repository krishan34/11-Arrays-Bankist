'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // TO REMOVE Already defined contents from HTML.
  containerMovements.innerHTML = ' ';
  movements.forEach(function (mov, i) {
    const trans = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${trans}">${
      i + 1
    } ${trans}</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    // TO Insert HTML in the element based on potions.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

// computUserName

const UserName = [];
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.UserName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(l => l[0])
      .join('');
  });
};

createUserName(accounts);
console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUsd = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'Deposited' : 'Withdrawal'} ${Math.abs(
      mov
    )}`
);
console.log(movementsUsd);

// Filter Method

const withdrawal = movements.filter(withdrawal => withdrawal < 0);

console.log(withdrawal);

// reduce Method

// first solution
// 0 is the prevalue before adding the crValue in the prevalue
const balance = movements.reduce(function (preValue, crValue) {
  console.log(preValue);
  return preValue + crValue;
}, 0);

console.log(typeof balance);
// second solution

// const totalBalance = movements.reduce((total, i) => total + i);

// console.log(totalBalance);

/////////////////////////////////////////////////

// forEach
/*
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`Amount deposited ${movement}`);
    console.log();
  } else {
    console.log(`Amount Withdraw ${Math.abs(movement)}`);
  }
});

currencies.forEach(function (value, key, map) {
  if (key === 'USD') {
    console.log(`currency is in ${value}`);
  } else if (key === 'GBP') {
    console.log(`currency is in ${value}`);
  } else {
    console.log(`currency is in ${value}`);
  }
});
*/
