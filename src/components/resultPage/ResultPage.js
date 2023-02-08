import React, {Component} from 'react';
import styles from './resultPage.module.css';

class ResultPage extends Component {
    winner = function (){
        return this.props.data.playerCount <= this.props.data.compCount ?
            this.props.data.playerCount === this.props.data.compCount ? styles.grey : styles.red : styles.green;
    }
    render() {
        return (
            <div className={'wrapper'}>
                <div className={`container ${styles.green} ${styles.cont} ${this.winner}`}>
                    <p className={styles.winnerName}>{this.props.data.playerCount <= this.props.data.compCount ?
                        this.props.data.playerCount === this.props.data.compCount ? 'Draw' : 'Computer win' : 'You win'}</p>
                    <p className={'score'}>{`${this.props.data.playerCount} : ${this.props.data.compCount}`}</p>
                    <button className={'btn'} onClick={() => this.props.handleAgainClick(sessionStorage.getItem('name'))}>Again?</button>
                </div>
            </div>
        );
    }
}

export default ResultPage;