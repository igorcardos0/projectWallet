import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchangeRate, saveAllExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { editor, idToEdit, expenses } = this.props;
    if (prevProps.editor !== editor && editor) {
      const { value, description, currency, method, tag } = expenses[idToEdit];
      this.setState({
        value,
        description,
        currency,
        method,
        tag,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    this.setState((prev) => (
      {
        id: prev.id + 1,
        value: '',
        description: '',
      }
    ));

    const expense = { id, value, description, currency, method, tag };
    dispatch(fetchExchangeRate(expense));
  }

  handleEdit() {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, idToEdit, dispatch } = this.props;
    const newExpense = expenses.map((e) => e);
    newExpense[idToEdit].value = value;
    newExpense[idToEdit].description = description;
    newExpense[idToEdit].currency = currency;
    newExpense[idToEdit].method = method;
    newExpense[idToEdit].tag = tag;
    dispatch(saveAllExpenses(newExpense));
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        <label htmlFor="value-input">
          Valor da despesa:
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição da despesa:
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((curr) => (
              <option key={ curr } value={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <hr />
        { !editor
          ? (
            <button type="button" onClick={ this.handleClick }>
              Adicionar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.handleEdit }
            >
              Editar despesa
            </button>)}
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,

};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
