import {
  DELETE_EXPENSE, EDIT_EXPENSE, FETCH_CURRENCIES, SAVE_ALL_EXPENSES,
  SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: null,
  expenseToEdit: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return { ...state, currencies: action.currencies };

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses:
      [...state.expenses, {
        ...action.expense }],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.description !== action.payload,
      ),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload.index,
      editor: action.payload.edit,
    };

  case SAVE_ALL_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
      expenseToEdit: null,
      editor: false,
    };

  default:
    return state;
  }
};

export default wallet;
