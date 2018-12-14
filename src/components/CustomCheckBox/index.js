import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image'
import img_History from '../../assets/CheckBox/img_History.jpg'
import styles from './styles'
import PropTypes from 'prop-types';

class CustomCheckBox extends PureComponent {

    static propTypes = {
        checked:PropTypes.bool,
        text: PropTypes.string,
        image: PropTypes.number,
        opacity:PropTypes.number
    };
    
    static defaultProps = {
        checked:false,
        text: "Text",
        image: img_History,
        opacity:0.7
    };

    constructor(props)
    {
        super(props)
        this.setInstanceStyle(props)
    }

    componentWillReceiveProps(nextProps)
    {
        if( nextProps.width!==this.props.width ||
            nextProps.textStyle!==this.props.textStyle) 
        {
            this.setInstanceStyle(nextProps)
        }
    }

    setInstanceStyle = (props) => {
        this.touchOpacity_Style = Object.assign({}, styles.touchOpacity,)

        this.imageStyle = Object.assign({}, styles.image,)
        
        this.textStyle = Object.assign({}, styles.text, props.textStyle)
    }

    onPress = () => {
        let {
          onPress,
          checked,
        } = this.props;
    
        if (onPress) {
          onPress(!checked);
        }
    }

    render () {
        return (
            <View
            style={styles.container}
            >
                <TouchableOpacity
                style={this.touchOpacity_Style}
                onPress={this.onPress}>
                {this.props.checked?
                    <FastImage
                        source={this.props.image} 
                        resizeMode="cover" 
                        style={{flexShrink:1}}/>
               :    <FastImage
                        source={this.props.image} 
                        resizeMode="cover" 
                        style={{height:200,width:200}}/>
                }
                <Text style={this.textStyle}> {this.props.text} </Text>

                </TouchableOpacity>
            </View>
        )
    }
}

export default CustomCheckBox