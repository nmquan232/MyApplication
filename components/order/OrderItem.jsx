import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const OrderItem = ({item}) => {
    const navigation = useNavigation()
    
    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <View style={styles.image}>
                    <Image
                        source={{
                            uri: item.productId.imageUrl
                        }}
                        style={styles.productImg}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.productTitle}>
                        {item.productId.title}
                    </Text>
                    <Text style={styles.supplier}>
                        {item.productId.supplier}
                    </Text>
                    <Text style={styles.supplier}>
                        $ {item.total}
                    </Text>
                </View>
                
                <View style={styles.delivery}>
                    <MaterialCommunityIcons name="truck-delivery-outline" size={20} color={COLORS.gray} />
                    <Text style={styles.deliveryTxt}>{item.delivery_status}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: SIZES.small,
        flexDirection: 'row',
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: '#fff',
        ...SHADOWS.medium,
        shadowColor: COLORS.lightWhite,
        justifyContent: 'space-between'
    },
    image: {
        width: 70,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: SIZES.medium
    },
    productImg: {
        width: '100%',
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: 'cover'
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium
    },
    productTitle: {
        fontFamily: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.primary
    },
    supplier: {
        fontFamily: 'regular',
        fontSize: SIZES.small + 2,
        color: COLORS.gray,
        marginTop: 3
    },
    delivery: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 20
    },
    deliveryTxt: {
        fontFamily: 'regular',
        color: COLORS.gray,
        marginHorizontal: 5
    }


})

export default OrderItem;
