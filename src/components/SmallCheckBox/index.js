import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'
import img_History from '../../assets/CheckBox/img_History.jpg'
import styles from './styles'
import PropTypes from 'prop-types';

class SmallCheckbox extends PureComponent {

    static propTypes = {
        checked:PropTypes.bool,
        text: PropTypes.string,
        image: PropTypes.number,
        opacity:PropTypes.number,
        onCheck:PropTypes.func
    };
    
    static defaultProps = {
        checked:false,
        diameter: 40,
        image: img_History,
        opacity:0.7
    };

    constructor(props)
    {
        super(props)
        this.setInstanceStyle(props)
        this.state = {
            checked : this.props.checked
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if( nextProps.diameter!==this.props.diameter ||
            nextProps.textStyle!==this.props.textStyle) 
        {
            this.setInstanceStyle(nextProps)
        }
    }

    setInstanceStyle = (props) => {
        this.touchCheckBox = Object.assign({}, styles.touchCheckBox, {
              
              borderRadius:10
            }) 

        this.viewCheckBox = Object.assign({}, styles.viewCheckBox, {
            backgroundColor : this.props.color,
            })
        
        this.textStyle = Object.assign({}, styles.text, props.textStyle)
    }

    onPress = () => {
        this.props.checked = !this.props.checked
        this.props.onCheck(!this.state.checked);
        this.setState({checked : !this.state.checked})
    }

    render () {
        return (
            <View
            style={styles.container}
            >
                <TouchableOpacity
                style={this.touchCheckBox}
                onPress={this.onPress}>
                {
                    this.state.checked ? 
                    <View style={this.viewCheckBox}>
                        <Text style={this.textStyle}>{this.props.title}</Text>
                    </View>
                    :<View style={Object.assign({}, this.viewCheckBox, {opacity:0.5})}>
                        <Text style={this.textStyle}>{this.props.title}</Text>
                    </View>
                }
                </TouchableOpacity>
            </View>
        )
    }
}

export default SmallCheckbox