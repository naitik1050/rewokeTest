import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../theme/colors';

export const Button = (
    { onButtonPress,
        buttonTitle,
        backgroundColor,
        color,
        buttonStyle,
        loading,
        disabled
    }
) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            onPress={onButtonPress}
            style={[buttonStyle, { backgroundColor: disabled ? COLORS.lightgrey : backgroundColor }]}>
            {loading ? <ActivityIndicator color={color} style={styles.textRegister} /> :
                <Text style={[styles.textStyle, { color: color }]}>{buttonTitle}</Text>}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10
    }
});

