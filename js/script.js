let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),

    btnExpenses = document.getElementsByTagName('button')[0],
    btnOptionalExpenses = document.getElementsByTagName('button')[1],
    btnCalculate = document.getElementsByTagName('button')[2],

    optExpItemInputs = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeInput = document.querySelector('.choose-income'),
    savingsCheckboxInput = document.querySelector('#savings'),

    savingsTotalInp = document.querySelector('.choose-sum'),
    savingsPercentInp = document.querySelector('.choose-percent'),

    yearValueInput = document.querySelector('.year-value'),
    monthValueInput = document.querySelector('.month-value'),
    dayValueInput = document.querySelector('.day-value');

    console.log(savingsTotalInp);

let money, time;

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

startBtn.addEventListener('click', function() {
    time = prompt("Write date in fromat YYYY-MM-DD", '');
    money = +prompt("What is Your budget on this month", '');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("What is Your budget on this month");
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValueInput.value = new Date(Date.parse(time)).getFullYear();
    monthValueInput.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValueInput.value = new Date(Date.parse(time)).getDate();
});

btnExpenses.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ( (typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50)
        {
            console.log("All parameters is on");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

btnOptionalExpenses.addEventListener('click', function () {
    
    for (let i = 0; i < optExpItemInputs.length; i++) {
        
        let a = optExpItemInputs[i].value;
        
        if ( (typeof(a))=== 'string' && (typeof(a)) != null && a != '' && a.length < 50)
        {
            appData.optionalExpenses[i] = a;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
            console.log("all parameters iss on");
        } else {
            alert("One of inputs is empty");
        }
    }
});

btnCalculate.addEventListener('click', function() {

    if(appData.budget != undefined) {

        appData.moneyPerDay = (appData.budget / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if(appData.moneyPerDay == 99) {
            levelValue.textContent = 'YOU ARE A DEVIL, JEZZZ';
        } else if(appData.moneyPerDay > 1 && appData.moneyPerDay < 100) {
            levelValue.textContent = 'minimal lvl of money';
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'middle lvl of money';
        } else if(appData.moneyPerDay > 2000) {
            levelValue.textContent = 'hight lvl of money';
        }  else {
            levelValue.textContent = 'Here is a mistake';
        }
    } else {
        dayBudgetValue.textContent = 'Here is a mistake';
    }
});

chooseIncomeInput.addEventListener('input', function() {

    let items = chooseIncomeInput.value;
    appData.income = items.split(', ' || ',');
    incomeValue.textContent = appData.income;
});

savingsCheckboxInput.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

savingsTotalInp.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +savingsTotalInp.value,
            percent = +savingsPercentInp.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

savingsPercentInp.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +savingsTotalInp.value,
            percent = +savingsPercentInp.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});