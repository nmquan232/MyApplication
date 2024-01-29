import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants/index';
import { BackBTN, Button } from '../components';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const validationSchema = Yup.object().shape({

    password: Yup.string()
        .min(8, 'Password must be least 8 character')
        .required('Required'),
    email: Yup.string()
        .email('Provide a valid email address')
        .required('Required'),
})
const LoginPage = ({ navigation }) => {
    const [loader, setLoader] = useState(false)
    const [resData, setResData] = useState(null)
    const [obsecureText, setObsecureText] = useState(true)

    const inValidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required helds",
            [

                { defaultIndex: 1 }
            ]
        )
    }
    useEffect(()=> {
        if(resData !== null) {
            saveUser()
        }
    }, [resData])
    
    const handleLogin = async (value) => {
        setLoader(true)
        try {
            const response = await axios.post('https://food-app-328l.onrender.com/auth/login', value)
            if (response.status === 200) {
                setResData(response.data)
                setLoader(false)
                
            } else {
                Alert.alert(
                    "Login fail",
                    "Email or password not correct",
                    [
        
                        { defaultIndex: 1 }
                    ]
                )
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false)
        }
    }
    const saveUser = async () => {
        await AsyncStorage.setItem(`user${resData._id}`, JSON.stringify(resData))
        await AsyncStorage.setItem('id', resData._id)
        navigation.replace('Bottom navigation')
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View >
                    <View style={styles.backBTN} >
                        <BackBTN onPress={() => { navigation.goBack() }} />
                    </View>
                    
                    <Text style={styles.title}>Login you account</Text>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={value => handleLogin(value)}
                    >
                        {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                            <View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Email</Text>
                                    <View style={styles.textInputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='email-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            styte={styles.iconStyle} />
                                        <TextInput
                                            placeholder='Enter email'
                                            onFocus={() => { setFieldTouched('email') }}
                                            onBlur={() => setFieldTouched('email', '')}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={styles.inputText}

                                        />
                                    </View>


                                    {touched.email && errors.email && (
                                        <Text style={styles.errMsg}> {errors.email} </Text>
                                    )}
                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.textInputWrapper(touched.password ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='lock-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            styte={styles.iconStyle} />
                                        <TextInput
                                            secureTextEntry={obsecureText}
                                            placeholder='Enter password'
                                            onFocus={() => { setFieldTouched('password') }}
                                            onBlur={() => setFieldTouched('password', '')}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={styles.inputText}
                                        />
                                        <TouchableOpacity onPress={() => setObsecureText(!obsecureText)} >
                                            <MaterialCommunityIcons
                                                name={!obsecureText ? 'eye-outline' : 'eye-off-outline'}
                                                size={18}
                                                color={COLORS.gray}
                                                styte={styles.iconStyle} />
                                        </TouchableOpacity>
                                    </View>


                                    {touched.password && errors.password && (
                                        <Text style={styles.errMsg}> {errors.password} </Text>
                                    )}
                                </View>
                                <Button title={'Login'} onPress={isValid ? handleSubmit : inValidForm} isValid={isValid} loader={loader} />
                                <Text style={styles.registerTxt} onPress={() => navigation.navigate('Register')}>Register</Text>
                            </View>
                        )}

                    </Formik>

                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    backBTN: {
        marginTop: SIZES.small,
        zIndex: 999
    },
    image: {
        height: SIZES.height / 2.4,
        resizeMode: 'contain',
        width: SIZES.width
    },
    title: {
        fontFamily: 'bold',
        fontSize: SIZES.large,
        color: COLORS.primary,
        marginBottom: SIZES.xxLarge,
        textAlign: 'center',
        marginTop: 50

    },
    wrapper: {
        marginBottom: 20,
    },
    label: {
        fontFamily: 'regular',
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: 'right'
    },
    textInputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 55,
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
    }

})

export default LoginPage;
