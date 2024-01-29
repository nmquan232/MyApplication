import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from '../../constants';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
const CartItem = ({ item }) => {
    const navigation = useNavigation()
    const handleDelete = () => {
        Alert.alert(
            "Delete",
            "Are you sure?",
            [
                {text: "Cancel", onPress: ()=> {}},
                {text: "Delete", onPress: ()=> deleteItem()},
                { defaultIndex: 1 }
            ]
        )
    }
    const deleteItem = async () => {
        try {
            const res = await axios.delete(`https://food-app-328l.onrender.com/cart/${item._id}`)
            if (res.status === 200) {
                navigation.replace('Cart')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View>
            <TouchableOpacity style={styles.container}>
                <View style={styles.image}>
                    <Image
                        source={{
                            uri: item.cartItem.imageUrl
                        }}
                        style={styles.productImg}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.productTitle}>
                        {item.cartItem.title}
                    </Text>
                    <Text style={styles.supplier}>
                        {item.cartItem.supplier}
                    </Text>
                    <Text style={styles.supplier}>
                        $ {item.cartItem.price} * {item.qty}
                    </Text>
                </View>
                <TouchableOpacity style={styles.checkOutBTN}
                    onPress={() => navigation.navigate('Checkout', {
                        product: item
                    })}
                >
                    <Text style={styles.checkoutText} >Checkout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteIcon} onPress={()=>handleDelete()} >
                    <AntDesign name="delete" size={24} color={COLORS.red} />
                </TouchableOpacity>
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
    checkOutBTN: {
        paddingHorizontal: 10,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        right: 10,
        bottom: 20
    },
    checkoutText: {
        color: COLORS.lightWhite,
        fontFamily: 'regular',
        fontSize: SIZES.small
    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        top: 20
    }

})

export default CartItem;
