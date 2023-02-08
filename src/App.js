import './App.css';
import StartPage from "./components/startpage/StartPage";
import GamePage from "./components/gamePage/GamePage";
import ResultPage from "./components/resultPage/ResultPage";
import {cardDeck} from "./utils/constants";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'start',
            playerCount: 0,
            compCount: 0,
            count: 0,
        };
    }

    handleStartClick = (name) => {
        let temp = [...cardDeck];
        this.shuffle(temp);
        let playerDeck = [...(temp.slice(0, 26))];
        console.log(playerDeck);
        let compDeck = [...(temp.slice(26))];
        console.log(compDeck);
        sessionStorage.setItem('playerDeck', JSON.stringify(playerDeck));
        sessionStorage.setItem('compDeck', JSON.stringify(compDeck));
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('draw', JSON.stringify(0));
        this.setState({
            page: 'game',
            playerCount: 0,
            compCount: 0,
            count: 0,
        });
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    handleNextCLick = () => {
        let draw = JSON.parse(sessionStorage.getItem('draw'));
        if (this.state.count < 26) {
            let playerCard = JSON.parse(sessionStorage.getItem('playerDeck'))[this.state.count].value;
            let compCard = JSON.parse(sessionStorage.getItem('compDeck'))[this.state.count].value;
            if (playerCard > compCard) {
                this.setState({
                    page: this.state.page,
                    playerCount: (this.state.playerCount + draw + 1),
                    compCount: this.state.compCount,
                    count: this.state.count + 1,
                });
                sessionStorage.setItem('draw', JSON.stringify(0));
            } else if (playerCard < compCard) {
                this.setState({
                    page: this.state.page,
                    playerCount: this.state.playerCount,
                    compCount: (this.state.compCount + draw + 1),
                    count: this.state.count + 1,
                });
                sessionStorage.setItem('draw', JSON.stringify(0));
            } else {
                this.setState({
                    page: this.state.page,
                    playerCount: this.state.playerCount,
                    compCount: this.state.compCount,
                    count: this.state.count + 1,
                });
                sessionStorage.setItem('draw', JSON.stringify(draw + 1));
            }
        } else {
            if (draw) {
                this.setState({
                    page: 'result',
                    playerCount: this.state.playerCount + draw,
                    compCount: this.state.compCount + draw,
                    count: this.state.count,
                });
            }else{
                this.setState({
                    page: 'result',
                    playerCount: this.state.playerCount,
                    compCount: this.state.compCount,
                    count: this.state.count,
                });
            }
        }
    }

    renderPage = () => {
        switch (this.state.page) {
            case 'start':
                return <StartPage handleStartClick={this.handleStartClick}/>
            case 'game':
                return <GamePage handleNextClick={this.handleNextCLick}
                                 data={{
                                     count: this.state.count,
                                     compCount: this.state.compCount,
                                     playerCount: this.state.playerCount,
                                 }
                                 }/>
            case 'result':
                return <ResultPage handleAgainClick={this.handleStartClick}
                                   data={{
                                       count: this.state.count,
                                       compCount: this.state.compCount,
                                       playerCount: this.state.playerCount,
                                   }}

                />
            default:
                return (<div>Error</div>);
        }
    }

    render() {
        return (<div>
            {this.renderPage()}
        </div>);
    }
}

export default App;
