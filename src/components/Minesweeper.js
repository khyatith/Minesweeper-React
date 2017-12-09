import React, { Component } from 'react';
import Menu from './Menu';
import MinesweeperActions from '../actions/MinesweeperActions';
import MinesweeperStore from '../store/MinesweeperStore';
import Table from './Table';
import Sound from 'react-sound';
import losingSound from '../Sound/losingSound.mp3';
import WinningSound from '../Sound/WinningSound.mp3';
import winningGif from '../Sound/winningGif.gif';
import sadGif from '../Sound/sadGif.gif';
import stare from '../Sound/stare.gif';

class Minesweeper extends Component {

    constructor() {
        super();
        this.state = MinesweeperStore.getState();
        this._onChange = this._onChange.bind(this);
        this.state = {
            openNum: 0,
            time: 0,
            status: "playing" //playing, end, won
        };
    }

    componentDidMount() {
        MinesweeperStore.addChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(MinesweeperStore.getState());
    }

    componentWillUnmount() {
        MinesweeperStore.removeChangeListener(this._onChange);
    }

    setLevel = (level) => {
        MinesweeperActions.setLevel(level);
    }

    gameOver = () => {
        this.setState({ status: "end" });
        clearInterval(this.interval);
    }

    setWon = () => {
        this.setState({ status: "won" });
        clearInterval(this.interval);
    }

    //This is for increasing the timer as soon as the user starts playing
    addOpenNum = () => {
        const{ openNum, status } = this.state;
        if(openNum === 0 && status === "playing"){
            this.interval = setInterval(this.tick, 1000);
        }
        this.setState({openNum : ++this.state.openNum });
    }

    //setting the state of the timer
    tick = () => {
        if(this.state.openNum > 0){
            this.setState({time: this.state.time + 1});
        }
    }

    handleSongFinishedPlaying = () => {
        this.setState({  openNum: 0, time: 0, status: "playing" });
    }

    render() {
        const { level, mineCount, rowCount, colCount, time, openNum, status } = this.state;
         const containerStyle = {
            backgroundColor: '#D3D3D3',
            width: level === '1' ? '500px' : ( level === '2' ? '490px' : '900px' ),
            height: level === '1' ? '300px' : ( level === '2' ? '490px' : '500px' ),
            left: '20%',
            position: 'absolute'
        };
        const gif = status === 'won' ? winningGif : (status === 'end' ? sadGif : stare);

        return (
            <div>
                <Menu setLevel={ this.setLevel } />
                {
                    level && 
                    <div className="container" style={ containerStyle }>
                        <div className="row">
                            <div className="col-md-4">
                                <i className="fa fa-clock-o fa-2x" aria-hidden="true" style={spanStyle}></i>
                                <span>{time}</span>
                            </div>
                            <div className="col-md-4">
                                <img style={gifStyle} src={gif} />
                            </div>
                            <div className="col-md-4">
                                <i className="fa fa-certificate fa-2x" aria-hidden="true" style={spanStyle}></i>
                                <span>{ mineCount }</span>
                            </div>
                        </div>
                        <div className="row">
                            <Table
                                mineCount={mineCount}
                                rowCount={rowCount}
                                colCount={colCount}
                                addOpenNum={this.addOpenNum}
                                gameOver={ this.gameOver }
                                openNum={openNum}
                                setWon={ this.setWon }
                                status={ status }
                            />
                        </div>
                    </div>
                }
                {
                    (status === 'end') && 
                    <Sound
                        url={losingSound}
                        playStatus={Sound.status.PLAYING}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                    />
                }
                {
                    status === 'won' &&
                    <Sound
                        url={WinningSound}
                        playStatus={Sound.status.PLAYING}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                    />
                }
            </div>
        );
    }

}

const spanStyle = {
    margin: '10px'
};

const gifStyle = {
    width: '90px',
    height: '90px',
    marginTop: '4px'
}

export default Minesweeper;