import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { COLORS, SIZES } from '../constants';

const Button = ({title, onPress, isValid, loader}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btnStyle(!isValid ? COLORS.gray : COLORS.primary)}>
            
            {loader ? (<ActivityIndicator/>): (<Text style={styles.buttonTxt}>{title}</Text>)}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnStyle:(backgroundColor)=>({
        backgroundColor: backgroundColor,
        height: 50,
        width: '100%',
        marginVertical: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.small
    }) ,
    buttonTxt: {
        fontFamily: 'bold',
        color: COLORS.lightWhite,
        fontSize: 18
    }
})

export default Button;
