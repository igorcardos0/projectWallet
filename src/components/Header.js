import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  totalExpense = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acumulador, { value, currency, exchangeRates }) => (
      acumulador + (Number(value) * Number(exchangeRates[currency].ask))
    ), 0);
    return total.toFixed(2);
  };

  render() {
    const { currency } = this.state;
    const { Email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ Email }</p>
        <p data-testid="total-field">{ this.totalExpense() }</p>
        <span data-testid="header-currency-field">{ currency }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  Email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          ask: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};
export default connect(mapStateToProps)(Header);
