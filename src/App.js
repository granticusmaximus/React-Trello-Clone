import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import { addBoard } from './actions/BoardActions.js';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardsLayout from './components/BoardsLayout.js';
import './App.css';
var helpers = require('./helpers.js');

class App extends Component {
  constructor(props){
    super(props);
    this.addNewBoard = this.addNewBoard.bind(this);
  }
  
  addNewBoard(){
    this.props.dispatch(
      addBoard(helpers.makeUniqueId(this.props.state.boards))
    )
  }

  render() {
    const { state, dispatch } = this.props;  
    return (
      <div className="App">
        <div style={{backgroundColor : "#373737", height: "68px", textAlign:"left"}}>
          <div style={{color:"white",fontSize:"28px", marginLeft:"120px", display:"inline-block"}}> 
            ToDo Board
            <span style={{marginTop:"-4px", marginLeft:"2px", fontSize:"14px", display:"block"}}>by Grant Watson</span>
          </div>
          <div class="newBoard" style={{float:"right", position:"relative", display:"inline-block", right:"16%", top:"16px"}} onClick={this.addNewBoard}>
            New Board 
          </div>
        </div>
        <BoardsLayout boards={state.boards} dispatch={dispatch} cards={state.cards} /> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(App));
