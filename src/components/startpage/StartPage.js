import React, {Component} from 'react';
import styles from './startPage.module.css';
import '../../App.css';

class StartPage extends Component {
    render() {
        return (
            <div className={'wrapper'}>
                <div className={'container'}>
                    <p className={styles.p}>Ready for War</p>
                    <input type="text" id={'name'} placeholder={'Enter your name'} className={styles.inp}/>
                    <button className={styles.btn} onClick={() => this.props.handleStartClick(document.getElementById('name').value)}>start
                    </button>
                </div>
            </div>
        );
    }
}

export default StartPage;