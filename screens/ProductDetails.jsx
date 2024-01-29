import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants/index'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { Context } from '../store/index';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ProductDetails = ({ route, navigation }) => {
    const { id } = route.params
    const stars = [1, 2, 3, 4, 5]
    const [state, dispatch] = React.useContext(Context)
    
    const [count, setCount] = React.useState(1)
    const product = React.useMemo(() => {
        return state.products.find((item) => item._id === id)
    }, [state])
    const handlePlus = () => {
        setCount(count + 1)
    }
    const handleMinus = () => {
        if (count > 1)
            setCount(count - 1)

    }
    const handleAddCart = async () => {
        const id = await AsyncStorage.getItem('id')
        if(id !== null){
           try {
              const newCart = {
                 userId: id,
                 cartItem: product._id,
                 qty: count
              }
              const res = await axios.post('https://food-app-328l.onrender.com/cart', newCart)
              if (res.status === 200) {
                 Alert.alert(
                    "Success",
                    "Add cart success",
                    [
        
                        { defaultIndex: 1 }
                    ]
                )
              }else{
                 Alert.alert(
                    "Fail",
                    "Add cart fail",
                    [
        
                        { defaultIndex: 1 }
                    ]
                )
              }
           } catch (error) {
              console.log(error);
           }
        }else{
            navigation.navigate('Profile')
        }
     }

     const handleBuy = async () => {
        const id = await AsyncStorage.getItem('id')
        if(id !== null){
           try {
              const newCart = {
                 userId: id,
                 cartItem: product._id,
                 qty: count
              }
              const res = await axios.post('https://food-app-328l.onrender.com/cart', newCart)
              navigation.navigate('Cart')
           } catch (error) {
              console.log(error);
           }
        }else{
            navigation.navigate('Profile')
        }
     }
    return (
        <ScrollView>

            <View style={styles.container}>
                <View style={styles.upperRow}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} >
                        <Ionicons name='chevron-back-circle' size={30} color={COLORS.white} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} >
                        <Ionicons style={{ marginRight: 16 }} name='heart' size={30} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: product.imageUrl}}
                        style={styles.image}
                    />
                </View>


                <View style={styles.details}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.title}</Text>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>{product.price} đ</Text>
                        </View>
                    </View>

                    <View style={styles.ratingRow}>
                        <View style={styles.rating}>
                            {stars.map((index) => {
                                return (
                                    <Ionicons
                                        key={index}
                                        name='star'
                                        size={24}
                                        color='gold'
                                    />
                                )
                            })}
                            <Text style={styles.ratingText}>(4.9)</Text>
                        </View>

                        <View style={styles.rating}>
                            <TouchableOpacity onPress={() => handleMinus()}>
                                <SimpleLineIcons name='minus' size={24} />
                            </TouchableOpacity>

                            <Text style={styles.ratingText}>{count}</Text>
                            <TouchableOpacity onPress={() => handlePlus()}>
                                <SimpleLineIcons name='plus' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.descWrapper}>
                        <Text style={styles.desc}>
                            Description
                        </Text>
                        <Text style={styles.descText}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, numquam possimus? At libero tempore ut corrupti ex repellat voluptate recusandae enim expedita blanditiis, quae deserunt accusamus dolor ullam alias eos! </Text>
                    </View>


                    <View style={styles.locationDelivery}>
                        <TouchableOpacity onPress={()=> {}}>
                            <View style={styles.locationWrapper}>
                                <Ionicons name='location-outline' size={24} />

                                <Text style={styles.locationText}> {product.product_location} </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {}}>
                            <View style={styles.locationWrapper}>
                                <MaterialCommunityIcons name="truck-delivery-outline" size={24} />
                                <Text style={styles.locationText}>Express</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.checkOutRow}>
                        <TouchableOpacity onPress={() => handleBuy()} style={styles.buyBtn}>
                            <Text style={styles.buyBtnText}>BUY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addToCart} onPress={()=> handleAddCart()}>
                            <FontAwesome name='shopping-bag' size={24} color={COLORS.lightWhite}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: SIZES.large
    },
    upperRow: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: SIZES.xxLarge,
        width: SIZES.width - 10,
        marginHorizontal: SIZES.medium,

        zIndex: 999

    },
    imageContainer: {
        width: SIZES.width,
        height: 350,

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    details: {
        marginTop: -SIZES.large,
        backgroundColor: COLORS.lightWhite,
        width: SIZES.width,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,

    },
    titleRow: {
        flexDirection: 'row',
        marginHorizontal: SIZES.medium,
        paddingBottom: SIZES.small,
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 20,


    },
    title: {
        fontFamily: 'bold',
        fontSize: SIZES.large
    },
    priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large,
        paddingHorizontal: 10,
    },
    price: {
        fontFamily: 'semiBold',
        fontSize: SIZES.large
    },
    ratingRow: {
        paddingBottom: SIZES.small,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZES.width,
        top: 5,
        flexDirection: 'row'

    },
    rating: {
        top: SIZES.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: SIZES.large
    },
    ratingText: {
        fontFamily: 'medium',
        color: COLORS.gray,
        marginHorizontal: SIZES.small
    },
    descWrapper: {
        marginTop: SIZES.large * 2,
        marginHorizontal: SIZES.large
    },
    desc: {
        fontFamily: 'regular',
        fontSize: SIZES.large,
        marginBottom: SIZES.small

    },
    descText: {
        fontFamily: 'regular',
        fontSize: SIZES.medium,
        marginBottom: SIZES.medium,
        textAlign: 'justify',
    },


    locationDelivery: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.medium,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        padding: 6,
        borderRadius: SIZES.medium
    },
    locationWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: SIZES.small
    },
    locationText: {
        fontFamily: 'regular',
        marginLeft: SIZES.small
    },

    checkOutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.medium,
        marginTop: SIZES.xxLarge
    },
    buyBtn: {
        padding: SIZES.small -4,
        width: SIZES.width*0.7,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: SIZES.xxLarge
    },
    buyBtnText: {
        color: COLORS.lightWhite,
        fontFamily: 'bold',
        fontSize: SIZES.large
    },
    addToCart: {
        padding: SIZES.small,
        width: SIZES.width*0.15,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.xsLarge
    }

})

export default ProductDetails;
