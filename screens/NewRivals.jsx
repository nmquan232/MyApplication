import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants';
import {Ionicons} from '@expo/vector-icons'
import { ProductList } from '../components';
const NewRivals = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper} >
                <View style={styles.upperRow}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} >
                        <Ionicons name='chevron-back-circle' size={30} color={COLORS.lightWhite} />
                    </TouchableOpacity>
                    <Text style={styles.upperTitle}>All Products</Text>
                </View>

                <ProductList />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
    },
    upperRow: {
        width: SIZES.width - 50,
        marginHorizontal: SIZES.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.large,
        top: SIZES.large,
        zIndex: 999
    },
    upperTitle: {
        fontFamily: 'semiBold',
        marginRight: SIZES.medium,
        color: COLORS.lightWhite,
        fontSize: SIZES.medium
    }
})

export default NewRivals;
