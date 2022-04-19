const transactionUL = document.querySelector('#transactions-list')
const modal = document.querySelector('.modal-area')
const totalDisplay = document.querySelector('#display-total')
const incomeDisplay = document.querySelector('#display-income')
const expenseDisplay = document.querySelector('#display-expense')
const form = document.querySelector('#transactions-form')
const inputTrasactionName = document.querySelector('#name-input')
const inputTrasactionAmount = document.querySelector('#amount-input')

const toggleModal = () =>{
    modal.classList.toggle('active')
    inputTrasactionName.value === ''
    inputTrasactionAmount.value === ''
}

const StorageTrasactions = JSON.parse(localStorage.getItem('appTransactions'))
let appTransactions = localStorage.getItem('appTransactions') !== null ? StorageTrasactions : []


const removeTrasaction = ID =>{
    appTransactions = appTransactions.filter((trasaction) => trasaction.id !== ID)
    init()
    updateLocalStorage()
}

const addTransactionsIntoDOM = ({name, amount, id}) => {
    const operator = amount > 0 ? '+' : '-'
    const CSSClass = amount > 0 ? 'plus' : 'minus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    <li class="transaction-item">
        <p>${name}</p>
        <p>${operator} R$${amountWithoutOperator}</p>
        <div class="delete-li" onclick="removeTrasaction(${id})">
            <i class="fa fa-trash"></i>
        </div>
    </li>
    `
    transactionUL.prepend(li)
}

//Add expenses, incomes and total in the cards.
const addDataInDisplay = (total, income, expense) => {
    totalDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
};

//Get from transactionsAmounts
const getIncomes = (transactionsAmounts) => {
    return transactionsAmounts
      .filter((value) => value > 0)
      .reduce((accumulator, value) => accumulator + value, 0)
      .toFixed(2);
};

//Get expenses from transactionsAmounts
const getExpense = (transactionsAmounts) => {
    return Math.abs(
      transactionsAmounts
        .filter((value) => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
    ).toFixed(2);
  };

//Get total from transactionsAmounts
const getTotal = (transactionsAmounts) => {
    return transactionsAmounts
      .reduce((accumulator, transaction) => accumulator + transaction, 0)
      .toFixed(2);
  };
  
//Active the functions to get values and put the values in display with addDataDisplay()
const updateCurrentBalance = () => {
    const transactionsAmounts = appTransactions.map(
      (transaction) => transaction.amount
    );
  
    const total = getTotal(transactionsAmounts);
    const income = getIncomes(transactionsAmounts);
    const expense = getExpense(transactionsAmounts);
  
    addDataInDisplay(total, income, expense);
};

//Update the application functions
const init = () =>{
    transactionUL.innerHTML = ''
    appTransactions.forEach(addTransactionsIntoDOM)
    updateCurrentBalance()
}

init()

const updateLocalStorage = () =>{
    localStorage.setItem('appTransactions', JSON.stringify(appTransactions))
}

const generateID = () =>{
    return Math.random() * 1000
}

const addTransactionInArray = (inputName, inputAmount) =>{
    appTransactions.push({
        id: generateID(),
        name: inputName.value,
        amount: Number(inputAmount.value)
    })
}

const handleFormInput = ( e ) =>{
    e.preventDefault()

    inputTrasactionName.value === ''
    inputTrasactionAmount.value === ''

    const emptyInputs = inputTrasactionName.value === '' || inputTrasactionAmount.value === ''

    if(emptyInputs){
        alert('Valores vazios')
        return
    }

    addTransactionInArray(inputTrasactionName, inputTrasactionAmount)
    updateCurrentBalance()
    init()
    updateLocalStorage()
    toggleModal()
}

form.addEventListener('submit', handleFormInput)
    