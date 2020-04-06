import React from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

class Layout extends React.Component {
  render() {
    return (
      <Aux>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

Layout.propTypes= {
  children: PropTypes.any,
};

export default Layout;
