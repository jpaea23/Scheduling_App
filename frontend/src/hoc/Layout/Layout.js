import React from 'react';

import Aux from '../Aux/Aux';
import styles from './Layout.module.css'; 

class Layout extends React.Component {
    render() {
        return (
            <Aux>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;