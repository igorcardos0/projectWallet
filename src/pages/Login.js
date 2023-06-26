import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isButton: true,
  };

  validation = () => {
    const { email, password } = this.state;
    const minPassword = 6;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= minPassword;
    this.setState({ isButton: !isEmailValid || !isPasswordValid });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, this.validation);
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value }, this.validation);
  };

  handleLogin = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButton } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="email-input"
              id="email-input"
              type="email"
              value={ email }
              placeholder="Digite seu email"
              onChange={ this.handleEmailChange }
            />
            <label htmlFor="password-input">Senha:</label>
            <input
              type="password"
              id="password-input"
              data-testid="password-input"
              value={ password }
              onChange={ this.handlePasswordChange }
            />
            <button
              disabled={ isButton }
              type="button"
              onClick={ this.handleLogin }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
