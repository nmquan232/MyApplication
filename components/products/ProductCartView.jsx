import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductCartView = (props) => {
   const navigation = useNavigation()

   const handleAddCart = async () => {
      const id = await AsyncStorage.getItem('id')
      if(id !== null){
         try {
            const newCart = {
               userId: id,
               cartItem: props.product._id,
               qty: 1
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
      }
   }
   return (
      <TouchableOpacity onPress={() => { navigation.navigate('ProductDetails', {id: props.product._id})} }>
         <View style={styles.container}>
            <View style={styles.imageContainer}>
               <Image
                  style={styles.image}
                  source={{uri: props.product.imageUrl}}
               />
            </View>

            <View style={styles.details}>
               <Text style={styles.title} numberOfLines={1}>{props.product.title}</Text>
               <Text style={styles.suplier}>{props.product.supplier}</Text>
               <Text style={styles.price} numberOfLines={1}>{props.product.price} đ</Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={()=> handleAddCart()}>
               <Ionicons name="add-circle" size={35} color={COLORS.primary} />
            </TouchableOpacity>
         </View>

      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 182,
      height: 240,
      borderRadius: SIZES.medium,
      marginEnd: 22,
      backgroundColor: '#fff'
   },
   imageContainer: {
      flex: 1,
      width: 170,
      marginLeft: SIZES.small / 2,
      marginTop: SIZES.small / 2,
      borderRadius: SIZES.small,
      overflow: 'hidden'
   },
   image: {
      // aspectRatio: 1,
      resizeMode: 'cover',
      width: '100%',
      height: '100%'
   },
   details: {
      padding: SIZES.small,

   },
   title: {
      fontFamily: 'bold',
      fontSize: SIZES.large,
      marginBottom: 2
   },
   suplier: {
      fontFamily: 'regular',
      fontSize: SIZES.small,
      color: COLORS.gray,
   },
   price: {
      fontFamily: 'bold',
      fontSize: SIZES.medium,
      marginBottom: 2,
      color: COLORS.price
   },
   addBtn: {
      position: 'absolute',
      right: SIZES.small,
      bottom: SIZES.medium
   }
})

export default ProductCartView;
