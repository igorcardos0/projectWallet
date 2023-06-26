import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleEditExpense = (index) => {
    console.log(index);
    const { dispatch } = this.props;
    dispatch(editExpense(index, true));
  };

  handleDeleteExpense = (description) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(description));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense, index) => {
            const { currency, description, tag, method, value } = expense;
            const { name, ask } = expense.exchangeRates[currency];
            return (
              <tr key={ description + index }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ name }</td>
                <td>{ Number(ask).toFixed(2) }</td>
                <td>{ (Number(ask) * Number(value)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteExpense(description) }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditExpense(index) }
                  >
                    Editar despesa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
