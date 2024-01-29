import {useState, useEffect} from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { BackBTN } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { OrderItem } from '../components/index';
const Orders = ({navigation}) => {
    const [orderData, setOrderData] = useState(null)
    useEffect(() => {
        getOrder()
    }, [])
    
    const getOrder = async () => {
        const userId = await AsyncStorage.getItem('id')
        if (userId !== null) {

            try {
                const res = await axios.get(`https://food-app-328l.onrender.com/order/${userId}`)
                if (res.status === 200) {
                    setOrderData(res.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <BackBTN onPress={() => navigation.goBack()} />
            <Text style={styles.title}>Order</Text>
            <FlatList
                data={orderData}
                renderItem={({ item }) => (<OrderItem item={item} />)}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
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
    separator: {
        height: 16
    },
    title: {
        position: 'absolute',
        top: SIZES.large,
        left: SIZES.xxLarge,
        fontFamily: 'bold',
        fontSize: SIZES.large,
        color: COLORS.primary
    },
})

export default Orders;
