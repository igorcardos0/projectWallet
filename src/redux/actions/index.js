export const SAVE_EMAIL = 'SAVE_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const IS_EDIT = 'IS_EDIT';
export const SAVE_ALL_EXPENSES = 'SAVE_ALL_EXPENSES';

export function saveEmail(email) {
  return {
    type: 'SAVE_EMAIL',
    payload: email,
  };
}

export function saveExpense(expense) {
  return {
    type: 'SAVE_EXPENSE',
    expense,
  };
}

export function fetchExchangeRate(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(saveExpense({ ...expense, exchangeRates: data }));
  };
}

export function deleteExpense(description) {
  return {
    type: DELETE_EXPENSE,
    payload: description,
  };
}

export function editExpense(index, edit) {
  return {
    type: EDIT_EXPENSE,
    payload: { index, edit },
  };
}

export function saveAllExpenses(save) {
  return {
    type: SAVE_ALL_EXPENSES,
    payload: save,
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await
    fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch({ type: FETCH_CURRENCIES, currencies });
  };
}
