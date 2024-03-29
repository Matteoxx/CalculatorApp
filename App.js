
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default class App extends Component {

  constructor(){
    super()
    this.state = {
      resultText: '',
      calculationText: ''
    }
    this.operations = ['Del','+', '-', '*', '/']
  }

  calculateResult(){
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed(text) {
    if(text == 'AC'){
      this.setState({
        resultText: '',
        calculationText: ''
      })
    } else {
      if (text == '='){
        return this.validate() && this.calculateResult()
      }
    
      this.setState({
        resultText: this.state.resultText + text
      })
    }
  }

  operate(operation){
    switch(operation){
      case 'Del':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
          const lastChar = this.state.resultText.split('').pop()
          if(this.operations.indexOf(lastChar) > 0) return


          if(this.state.text == '') return
          
          this.setState({
            resultText: this.state.resultText + operation
          })
    }
  }

  render() {

    let rows = [];
    let nums = [ ['AC','',''],[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']];
    for(let i = 0; i < 5; i++){
      let row = [];
      for(let j=0; j < 3; j++){
        row.push(<TouchableOpacity style={styles.buttonNumbers} key = {nums[i][j]} onPress={()=>this.buttonPressed(nums[i][j])}>
          <Text style={styles.buttonText}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View style={styles.row} key = {i}>{row}</View>)
    }

    let ops = [];
    
    for(let i=0; i < 5; i++){
      ops.push(<TouchableOpacity style={styles.button} key = {this.operations[i]} onPress={()=>this.operate(this.operations[i])}>
        <Text style={[styles.buttonText, styles.white]}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
              {ops}
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  result: {
    flex: 2,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5
  },
  resultText: {
    fontSize: 30,
    color: 'white'
  },
  calculation: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5
  },
  calculationText: {
    fontSize: 24,
    color: 'white'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  buttonNumbers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#a09ea1'
 
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#a09ea1'
  },
  buttonText: {
    fontSize: 30
  },
  white: {
    color: 'white'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#cfcdd0'
  },
  operations: {
    flex: 1,
    backgroundColor: '#ff8321',
    justifyContent: 'space-around'
  }
});