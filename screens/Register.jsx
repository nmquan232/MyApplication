import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants/index';
import { BackBTN, Button } from '../components';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { MaterialCommunityIcons, FontAwesome, Ionicons  } from '@expo/vector-icons'
import axios from 'axios';

const validationSchema = Yup.object().shape({

    password: Yup.string()
        .min(8, 'Password must be least 8 character')
        .required('Required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string()
        .email('Provide a valid email address')
        .required('Required'),
    location: Yup.string()
        .min(3, 'Enter your location')
        .required('Required'),
    username: Yup.string()
        .min(3, 'Username too short')
        .max(20, 'Username too long')
        .required('Required'),
    fullname: Yup.string()
        .required('Required'),
    
})
const Register = ({navigation}) => {
    const [loader, setLoader] = useState(false)
    const [obsecureText, setObsecureText] = useState(true)
    const [obsecurePasswordCf, setObsecurePasswordCf] = useState(true)

    const inValidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required helds",
            [

                { defaultIndex: 1 }
            ]
        )
    }


    const handleSignUp = async (value) => {
        setLoader(true)
        
        try {
            const response = await axios.post('https://food-app-328l.onrender.com/auth/register', value)
            if (response.status === 201) {
                setLoader(false)
                Alert.alert(
                    "Success",
                    "Login your account",
                    [
                        {
                            text: "Continue", onPress: () => {navigation.navigate('Login') }
                        },
                        { defaultIndex: 1 }
                    ]
                )
            }else {
                Alert.alert(
                    "Fail",
                    "Account already exists",
                    [
        
                        { defaultIndex: 1 }
                    ]
                )
            }
        } catch (error) {
            console.log(error);
        }finally {
            setLoader(false)
        }
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View >
                    <View style={styles.backBTN} >
                        <BackBTN onPress={() => { navigation.goBack() }} />
                    </View>
                    <Text style={styles.title}>Sign Up</Text>
                    <Formik
                        initialValues={{ email: '', password: '', fullname: '', username: '', location: '', passwordConfirmation: '' }}
                        validationSchema={validationSchema}
                        onSubmit={value => handleSignUp(value)}
                    >
                        {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                            <View>

                                {/* -----EMAIL------- */}
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
                                            style={{ flex: 1, marginLeft: 10 }}
                                        />
                                    </View>
                                    {touched.email && errors.email && (
                                        <Text style={styles.errMsg}> {errors.email} </Text>
                                    )}
                                </View>
                            
                                {/* -----EMAIL------- */}
                                {/* -----LOCATION------- */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Location</Text>
                                    <View style={styles.textInputWrapper(touched.location ? COLORS.secondary : COLORS.offwhite)}>
                                        <Ionicons
                                            name='location-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            styte={styles.iconStyle} />
                                        <TextInput
                                            placeholder='Enter location'
                                            onFocus={() => { setFieldTouched('location') }}
                                            onBlur={() => setFieldTouched('location', '')}
                                            value={values.location}
                                            onChangeText={handleChange('location')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1, marginLeft: 10 }}
                                        />
                                    </View>
                                    {touched.location && errors.location && (
                                        <Text style={styles.errMsg}> {errors.location} </Text>
                                    )}
                                </View>
                                {/* -----LOCATION------- */}

                                {/* -----FULLNAME------- */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Fullname</Text>
                                    <View style={styles.textInputWrapper(touched.fullname ? COLORS.secondary : COLORS.offwhite)}>
                                        <FontAwesome
                                            name='user-o'
                                            size={20}
                                            color={COLORS.gray}
                                            styte={styles.iconStyle} />
                                        <TextInput
                                            placeholder='Fullname'
                                            onFocus={() => { setFieldTouched('fullname') }}
                                            onBlur={() => setFieldTouched('fullname', '')}
                                            value={values.fullname}
                                            onChangeText={handleChange('fullname')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1, marginLeft: 10 }}
                                        />
                                    </View>
                                    {touched.fullname && errors.fullname && (
                                        <Text style={styles.errMsg}> {errors.fullname} </Text>
                                    )}
                                </View>
                                {/* -----FULLNAME------- */}
                                {/* -----USERNAME------- */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Username</Text>
                                    <View style={styles.textInputWrapper(touched.username ? COLORS.secondary : COLORS.offwhite)}>
                                        <FontAwesome
                                            name='user-o'
                                            size={20}
                                            color={COLORS.gray}
                                            styte={styles.iconStyle} />
                                        <TextInput
                                            placeholder='Username'
                                            onFocus={() => { setFieldTouched('username') }}
                                            onBlur={() => setFieldTouched('username', '')}
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1, marginLeft: 10 }}
                                        />
                                    </View>
                                    {touched.username && errors.username && (
                                        <Text style={styles.errMsg}> {errors.username} </Text>
                                    )}
                                </View>
                                {/* -----USERNAME------- */}

                                {/* -----PASSWORD------- */}
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
                                            style={{ flex: 1, marginLeft: 10 }}
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
                                {/* -----PASSWORD------- */}

                                {/* -----CF PASSWORD------- */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Comfirm Password</Text>
                                    <View style={styles.textInputWrapper(touched.passwordConfirmation ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='lock-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            styte={styles.iconStyle} />
                                        <TextInput
                                            secureTextEntry={obsecurePasswordCf}
                                            placeholder='Comfirm Password'
                                            onFocus={() => { setFieldTouched('passwordConfirmation') }}
                                            onBlur={() => setFieldTouched('passwordConfirmation', '')}
                                            value={values.passwordConfirmation}
                                            onChangeText={handleChange('passwordConfirmation')}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            style={{ flex: 1, marginLeft: 10 }}
                                        />
                                        <TouchableOpacity onPress={() => setObsecurePasswordCf(!obsecurePasswordCf)} >
                                            <MaterialCommunityIcons
                                                name={!obsecurePasswordCf ? 'eye-outline' : 'eye-off-outline'}
                                                size={18}
                                                color={COLORS.gray}
                                                styte={styles.iconStyle} />
                                        </TouchableOpacity>
                                    </View>


                                    {touched.passwordConfirmation && errors.passwordConfirmation && (
                                        <Text style={styles.errMsg}> {errors.passwordConfirmation} </Text>
                                    )}
                                </View>
                                {/* -----CF PASSWORD------- */}

                                <Button title={'Sign Up'} onPress={isValid ? handleSubmit : inValidForm} isValid={isValid} loader={loader} />
                                <Text style={styles.registerTxt} onPress={() => navigation.navigate('Login')}>Sign In</Text>
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
        height: SIZES.height / 3,
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
    }
})

export default Register;
