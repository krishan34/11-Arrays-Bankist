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

const displayMovements = function (movements, sort = false) {
  // TO REMOVE Already defined contents from HTML.
  containerMovements.innerHTML = ' ';

  // didn't want to damage the orginal data so used slice method to make a copy.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const trans = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${trans}">${
      i + 1
    } ${trans}</div>
          <div class="movements__value">${mov} €</div>
        </div>`;
    // TO Insert HTML in the element based on potions.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// show total balance
const totalBalance = function (account) {
  account.balance = account.movements.reduce((total, i) => total + i, 0);
  labelBalance.textContent = `${account.balance} €`;
};

// Summary
const depositedSummary = function (account) {
  const inSummary = account.movements
    .filter(amount => amount > 0)
    .reduce((acc, crr) => acc + crr, 0);
  labelSumIn.textContent = `${inSummary}€`;

  const outSummary = account.movements
    .filter(amount => amount < 0)
    .reduce((acc, crr) => acc + crr, 0);
  labelSumOut.textContent = `${Math.abs(outSummary)}€`;

  const intrest = account.movements
    .filter(amount => amount > 0)
    .map(amount => (amount * account.interestRate) / 100)
    .filter((amount, i, arr) => {
      return amount >= 1;
    })
    .reduce((acc, intrs) => acc + intrs, 0);
  labelSumInterest.textContent = `${Math.abs(intrest)}€`;
};

// computUserName

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

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc.movements);
  // Display Balance
  totalBalance(acc);
  // Display Summary
  depositedSummary(acc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // to stop reloading a page.
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.UserName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ' ';
    // to loose focus of an element.
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.UserName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.UserName !== currentAccount.UserName
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    console.log(`${amount} Transfered to ${recieverAcc.owner}`);
    updateUI(currentAccount);
  } else {
    console.log(`please insert correct amount`);
  }
});

// Close Account Funtionality

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.UserName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.UserName === currentAccount.UserName
    );
    // Delete Account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ' ';
  }
});

// Loan Functionality

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  // Teacher solution

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(acc => acc >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    // Clear input fields
    inputLoanAmount.value = ' ';
  } else {
    console.log('rejected');
  }

  // my Solution
  /*
  const loanAmount = (currentAccount.balance * 10) / 100;
  console.log(loanAmount, inputLoanAmount.value);
  if (Number(inputLoanAmount.value) <= loanAmount) {
    currentAccount.movements.push(inputLoanAmount.value);
    console.log('approved');
  } else {
    console.log('rejected');
  }*/
});

// sorting Funtions:
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// MAP Method

const movementsUsd = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'Deposited' : 'Withdrawal'} ${Math.abs(
      mov
    )}`
);
console.log(movementsUsd);

// Filter Method return all the values or array

const withdrawal = movements.filter(withdrawal => withdrawal < 0);

console.log(withdrawal);

// reduce Method

//  first solution
// 0 is the prevalue before adding the crValue in the prevalue
const balance = movements.reduce(function (preValue, crValue) {
  console.log(preValue);
  return preValue + crValue;
}, 0);

// console.log(typeof balance);
// // second solution

// const totalBalance = movements.reduce((total, i) => total + i, 0);

// console.log(totalBalance);

// FIND Method only return just one value.

const time = movements.find(k => k > 400);
console.log(time);

//const account = accounts.find(acc => acc.owner === 'Jessica Davis');

for (const value of Object.values(account2)) {
  if (value === 'Jessica Davis') {
    console.log(`owner name is ${value}`);
  } else {
    console.log('not found');
  }
}
/////////////////////////////////////////////////

// forEach

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


const points = [40, 100, 1, 5, 25, 10];
// let len = points.length;
let max = -Infinity;
for (const len of points) {
  if (points[len] > max) {
    max = points[len];
  }
}
console.log(max);
*/
// Filling up array

const x = new Array(7);
// this will fill up an array seven time with value 1.
x.fill(1);
// fill can also be used as slice method.
x.fill(23, 3, 5);

console.log(x);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - Min + 1) - min);
}
// first argument is lengt secont is call back function.
const y = Array.from({ length: 100 }, randomNumber(1, 6));
console.log(y);
