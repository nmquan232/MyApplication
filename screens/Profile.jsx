import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState(null)
    const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {
        checkExistingUser()
    }, [])

    const checkExistingUser = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = `user${id}`

        try {
            const currentUser = await AsyncStorage.getItem(userId)

            if (currentUser !== null) {
                const parseData = JSON.parse(currentUser)
                setUserData(parseData)
                setUserLogin(true)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const userLogout = async () => {
        const id = await AsyncStorage.getItem('id')
        const userId = `user${id}`
        try {
            await AsyncStorage.multiRemove([userId, 'id'])
            navigation.replace('Bottom navigation')
        } catch (error) {
            console.log(error);
        }

    }
    const logout = () => {

        Alert.alert(
            "Logout",
            "Are you sure want to logout",
            [
                {
                    text: "Cancel", onPress: () => { }
                },
                {
                    text: "Continue", onPress: () => userLogout()
                },
                { defaultIndex: 1 }
            ]
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    <Image
                        source={require('../assets/images/bg.webp')}
                        style={styles.image}
                    />
                </View>

                <View style={styles.profileContainer}>
                    <Image
                        source={require('../assets/images/userDefault.png')}
                        style={styles.profileImg}
                    />
                    <Text style={styles.name}>
                        {userLogin === true ? userData.fullname : "Please login your account!!"}
                    </Text>

                    {userLogin === false ?
                        (<View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <View style={styles.loginBtn}>
                                    <Text style={styles.loginText}>L O G I N</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <View style={styles.signUp}>
                                    <Text style={styles.loginText}>S I G N U P</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )

                        :
                        (<View style={styles.loginBtn}>
                            <Text style={styles.loginText}>{userData.email}</Text>
                        </View>)
                    }

                    {userLogin === false ?
                        (<View></View>)
                        :
                        (<View style={styles.manuWrapper}>
                            <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                                <View style={styles.menuItem(0.5)}>
                                    <AntDesign name="hearto" size={24} color={COLORS.gray} />
                                    <Text style={styles.itemText}>Favourites</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                                <View style={styles.menuItem(0.5)}>
                                    <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.gray} />
                                    <Text style={styles.itemText}>Orders</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                                <View style={styles.menuItem(0.5)}>
                                    <AntDesign name="shoppingcart" size={24} color={COLORS.gray} />
                                    <Text style={styles.itemText}>Cart</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => logout()}>
                                <View style={styles.menuItem(0)}>
                                    <AntDesign name="logout" size={24} color={COLORS.gray} />
                                    <Text style={styles.itemText}>Log Out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>)
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    image: {
        height: 290,
        width: '100%',
        resizeMode: 'cover'
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',

    },
    profileImg: {
        height: 155,
        width: 155,
        borderRadius: 999,
        borderColor: COLORS.primary,
        resizeMode: 'cover',
        marginTop: -99
    },
    name: {
        fontFamily: 'bold',
        color: COLORS.primary,
        marginVertical: 5
    },
    loginBtn: {
        backgroundColor: COLORS.secondary,
        padding: 2,
        borderWidth: 0.4,
        borderColor: COLORS.primary,
        borderRadius: SIZES.xxLarge,
        marginTop: SIZES.small
    },
    signUp: {
        backgroundColor: COLORS.lightWhite,
        padding: 2,
        borderWidth: 0.4,
        borderColor: COLORS.primary,
        borderRadius: SIZES.xxLarge,
        marginTop: SIZES.small,
        marginLeft: SIZES.small 
    },
    loginText: {
        fontWeight: '600',
        fontFamily: 'regular',
        marginHorizontal: 20,
        fontSize: 14,
        lineHeight: 26,
        color: COLORS.gray
    },
    manuWrapper: {
        marginTop: SIZES.xLarge,
        width: SIZES.width - SIZES.large,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12
    },
    menuItem: (borderBottomWidth) => ({
        borderBottomWidth: borderBottomWidth,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderColor: COLORS.gray,
        marginHorizontal: 30
    }),
    itemText: {
        fontFamily: 'regular',
        color: COLORS.gray,
        marginLeft: SIZES.large,
        fontSize: 16,
    }
})

export default Profile;
