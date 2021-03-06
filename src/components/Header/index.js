import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles'
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';

class Header extends PureComponent {

  static propTypes = {
    onPressLeftIcon: PropTypes.func,
    onPressRightIcon: PropTypes.func,
    title: PropTypes.string,
    showLeftIcon:PropTypes.bool,
    leftIcon:PropTypes.object,
    rightIcon: PropTypes.object,
    color: PropTypes.string
  };

  static defaultProps = {
    onPressLeftIcon: () => {},
    onPressRightIcon: () =>{},
    title: "Title",
    showLeftIcon: true,
    rightIcon: null,
    leftIcon:null,
    color: 'black'
  };

  constructor(props) {
    super(props)
    this.setInstanceStyle(props)
  }

  componentWillReceiveProps(nextProps)
  {
      if( nextProps.color!==this.props.color) 
      {
          this.setInstanceStyle(nextProps)
      }
  }

  setInstanceStyle = (props) => {
    this.headerContainer = Object.assign({}, styles.headerContainer, {
         color: props.color
    })
  }

  renderLeftIcon = () => {
    if(this.props.leftIcon){
      return this.props.leftIcon
    }
    else
    {
      if(this.props.showLeftIcon){
        return (
        <TouchableOpacity onPress={() => this.props.onPressLeftIcon()}>
          <Icon name="md-arrow-dropleft" size={40} color="white"  />
        </TouchableOpacity>)
      }
      else
        return <Text/>
    }
  }

  render() {
    return (
      <View style={this.headerContainer}>
        {this.renderLeftIcon()}
        <Text style={styles.textHeader}> {this.props.title} </Text>
        <TouchableOpacity onPress={() => this.props.onPressRightIcon()}>
        {
          this.props.rightIcon ?
            this.props.rightIcon : <Text />
        }
        </TouchableOpacity>

      </View>
    )
  }
}

export default Header