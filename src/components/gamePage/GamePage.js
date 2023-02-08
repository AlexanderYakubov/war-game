import React, {Component} from 'react';
import styles from './gamePage.module.css';

class GamePage extends Component {
    biggerCard = function (who) {
        if (who === 'player')
            return JSON.parse(sessionStorage.getItem('playerDeck'))[this.props.data.count].value <= JSON.parse(sessionStorage.getItem('compDeck'))[this.props.data.count].value ?
                JSON.parse(sessionStorage.getItem('playerDeck'))[this.props.data.count].value === JSON.parse(sessionStorage.getItem('compDeck'))[this.props.data.count].value ? styles.draw : styles.lose : styles.win;
            else if (who === 'comp')
            return JSON.parse(sessionStorage.getItem('playerDeck'))[this.props.data.count].value >= JSON.parse(sessionStorage.getItem('compDeck'))[this.props.data.count].value ?
                JSON.parse(sessionStorage.getItem('playerDeck'))[this.props.data.count].value === JSON.parse(sessionStorage.getItem('compDeck'))[this.props.data.count].value ? styles.draw : styles.lose : styles.win;
    }

    isLastRound = function () {
        return this.props.data.count === 26;
    }

    cardColor = function (card){
        if(card.suit === '◆' || card.suit ==='♥')
            return styles.red;
        else
            return styles.black;
    }

    render() {
        return (!this.isLastRound() ?
                <div className={'wrapper'}>
                    <div className={`container ${styles.cont}`}>
                        <p>{this.props.data.compCount}-Computer</p>
                        <div className={`${styles.cardWrapper} ${this.biggerCard('comp')} `}>
                            <div className={`${styles.compCard} ${this.cardColor(JSON.parse(sessionStorage.getItem('compDeck'))[this.props.data.count])}`}>
                                {JSON.parse(sessionStorage.getItem('compDeck'))[this.props.data.count].rank}
                                <br/>
                                {JSON.parse(sessionStorage.getItem('compDeck'))[this.props.data.count].suit}
                            </div>
                        </div>
                        <div className={`${styles.cardWrapper} ${this.biggerCard('player')}`}>
                            <div className={`${styles.compCard} ${this.cardColor(JSON.parse(sessionStorage.getItem('playerDeck'))[this.props.data.count])}`}>
                                {JSON.parse(sessionStorage.getItem('playerDeck'))[this.props.data.count].rank}
                                <br/>
                                {JSON.parse(sessionStorage.getItem('playerDeck'))[this.props.data.count].suit}
                            </div>
                        </div>
                        <div>{JSON.parse(sessionStorage.getItem('draw')) ? 'Draw: 1' : null}</div>
                        <button className={'btn'} onClick={() => this.props.handleNextClick()}>next</button>
                        <p>{this.props.data.playerCount}-{sessionStorage.getItem('name')}</p>
                    </div>
                </div> :
                <div className={'wrapper'}>
                    <div className={`container ${styles.cont}`}>
                        <p>{this.props.data.compCount}-Computer</p>
                        <div>{this.isLastRound() ? 'Click next to see result' : null}</div>
                        <button className={'btn'} onClick={() => this.props.handleNextClick()}>next</button>
                        <p>{this.props.data.playerCount}-{sessionStorage.getItem('name')}</p>
                    </div>
                </div>
        );
    }
}

export default GamePage;