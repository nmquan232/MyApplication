import { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { BackBTN, Button } from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const validationSchema = Yup.object().shape({

    phone: Yup.string()
        .min(8, 'Phone must be least 8 character')
        .required('Required'),
    city: Yup.string()
        .min(3, 'City must be least 3 character')
        .required('Required'),
    district: Yup.string()
        .min(3, 'District must be least 3 character')
        .required('Required'),
    street: Yup.string()
        .min(3, 'Street must be least 3 character')
        .required('Required'),
})
const Checkout = ({ navigation, route }) => {
    const [loader, setLoader] = useState(false)
    const {product} = route.params
    console.log(product);
    const inValidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required helds",
            [

                { defaultIndex: 1 }
            ]
        )
    }

    const handleCheckout = async (value) => {
        const userId = await AsyncStorage.getItem('id')
        const address = `${value.city}, ${value.district}, ${value.street}`
        const newOrder = {
            productId: product.cartItem._id,
            qty: product.qty,
            address: address,
            total: ((product.cartItem.price)*(product.qty) + 0.99),
            phone: Number(value.phone),
            payment: "Thanh toán khi nhận hàng"
        }
        try {
            const res = await axios.post(`https://food-app-328l.onrender.com/order/${userId}`, newOrder)
            if(res.status === 200){
                console.log('success');
                navigation.replace('Orders')
            } else {
                console.log('fail');
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <BackBTN onPress={() => navigation.goBack()} />
                <Text style={styles.title}>Check out</Text>
                <View>
                    <View style={styles.header}>

                        <Text style={styles.productName}>{product.cartItem.title}</Text>
                        <Text style={styles.productPrice}>$ {product.cartItem.price} * {product.qty}</Text>
                    </View>
                    <View style={styles.orderDetail} >
                        <Formik
                            initialValues={{ district: '', phone: '', city: '', street: '' }}
                            validationSchema={validationSchema}
                            onSubmit={value => handleCheckout(value)}
                        >
                            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                                <View>
                                    <View style={styles.wrapper}>
                                        <Text style={styles.label}>Số điện thoại</Text>
                                        <View style={styles.textInputWrapper(touched.phone ? COLORS.secondary : COLORS.offwhite)}>
                                            <TextInput
                                                placeholder='Nhập số điện thoại'
                                                onFocus={() => { setFieldTouched('phone') }}
                                                onBlur={() => setFieldTouched('phone', '')}
                                                value={values.phone}
                                                onChangeText={handleChange('phone')}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                style={styles.inputText}
                                            />
                                        </View>
                                        {touched.phone && errors.phone && (
                                            <Text style={styles.errMsg}> {errors.phone} </Text>
                                        )}
                                    </View>
                                    <View style={styles.wrapper}>
                                        <Text style={styles.label}>Tỉnh/Thành Phố</Text>
                                        <View style={styles.textInputWrapper(touched.city ? COLORS.secondary : COLORS.offwhite)}>

                                            <TextInput
                                                placeholder='Nhập thành phố/tỉnh của bạn'
                                                onFocus={() => { setFieldTouched('city') }}
                                                onBlur={() => setFieldTouched('city', '')}
                                                value={values.city}
                                                onChangeText={handleChange('city')}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                style={styles.inputText}
                                            />
                                        </View>
                                        {touched.city && errors.city && (
                                            <Text style={styles.errMsg}> {errors.city} </Text>
                                        )}
                                    </View>
                                    <View style={styles.wrapper}>
                                        <Text style={styles.label}>Quận/huyện</Text>
                                        <View style={styles.textInputWrapper(touched.district ? COLORS.secondary : COLORS.offwhite)}>

                                            <TextInput
                                                placeholder='Nhập quận/huyện'
                                                onFocus={() => { setFieldTouched('district') }}
                                                onBlur={() => setFieldTouched('district', '')}
                                                value={values.district}
                                                onChangeText={handleChange('district')}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                style={styles.inputText}
                                            />
                                        </View>
                                        {touched.district && errors.district && (
                                            <Text style={styles.errMsg}> {errors.district} </Text>
                                        )}
                                    </View>
                                    <View style={styles.wrapper}>
                                        <Text style={styles.label}>Địa chỉ</Text>
                                        <View style={styles.textInputWrapper(touched.street ? COLORS.secondary : COLORS.offwhite)}>

                                            <TextInput
                                                placeholder='Địa chỉ chi tiết'
                                                onFocus={() => { setFieldTouched('street') }}
                                                onBlur={() => setFieldTouched('street', '')}
                                                value={values.street}
                                                onChangeText={handleChange('street')}
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                style={styles.inputText}
                                            />
                                        </View>
                                        {touched.street && errors.street && (
                                            <Text style={styles.errMsg}> {errors.street} </Text>
                                        )}
                                    </View>
                                    <View style={styles.totalDetails}>
                                        <View style={styles.payment}>
                                            <Text style={styles.txt}>Thanh toán khi nhận hàng</Text>
                                        </View>
                                        <View style={styles.totalText}>
                                            <Text style={styles.txt}>Shipping: </Text>
                                            <Text style={styles.txt}>$ 0.99</Text>
                                        </View>
                                        <View style={styles.totalText}>
                                            <Text style={styles.txt}>Subtotal: </Text>
                                            <Text style={styles.txt}>$ {product.cartItem.price}</Text>
                                        </View>
                                        <View style={styles.totalText}>
                                            <Text style={styles.totalTxt}>Total: </Text>
                                            <Text style={styles.totalTxt}>$ {((product.cartItem.price)*(product.qty) + 0.99).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                    <Button title={'Đặt hàng'} onPress={isValid ? handleSubmit : inValidForm} isValid={isValid} loader={loader} />
                                </View>
                            )}

                        </Formik>


                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZES.xxLarge + 20,
        paddingLeft: SIZES.small / 2,
        marginHorizontal: 20,
        marginTop: 10

    },
    title: {
        position: 'absolute',
        top: 21,
        left: SIZES.xxLarge,
        fontFamily: 'bold',
        fontSize: SIZES.large,
        color: COLORS.primary
    },
    header: {
        alignItems: 'center',
        marginBottom: SIZES.xxLarge
    },
    productName: {
        fontFamily: 'regular',
        fontSize: SIZES.large,
        color: COLORS.gray
    },
    productPrice: {
        fontFamily: 'bold',
        fontSize: SIZES.xLarge
    },

    wrapper: {
        marginBottom: 20,
    },
    label: {
        fontFamily: 'regular',
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: 'left'
    },
    textInputWrapper: (borderColor, height = 55) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: height,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center'
    }),
    iconStyle: {
        marginRight: 10
    },
    errMsg: {
        color: COLORS.red,
        fontFamily: 'regular',
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
    registerTxt: {
        textAlign: 'center',
        marginBottom: 40
    },
    inputText: {
        flex: 1,
        marginLeft: 10
    },
    totalDetails: {
        marginTop: SIZES.xLarge
    },
    totalText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    payment: {
        marginBottom: 5
    },
    paymentTxt: {

    },
    txt: {
        fontFamily: 'regular',
        color: COLORS.gray
    },
    totalTxt: {
        fontFamily: 'semiBold',
        fontSize: 18
    }

})


export default Checkout;
