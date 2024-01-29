import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../constants/index'
import ProductCartView from './ProductCartView';
import { Context } from '../../store/index';
import useFetch from '../../hook/useFetch'
const ProductRow = () => {
   const {data, isLoading, error, reFetch} = useFetch('https://food-app-328l.onrender.com/products')
   const [state, dispatch] = React.useContext(Context)
   React.useEffect(()=> {
      dispatch({
         type: 'FETCH_API_PRODUCTS',
         products: data
      })
   }, [data])

   
   return (
      <View style={styles.container}>
         {isLoading ? (
            <ActivityIndicator size={SIZES.large} color={COLORS.primary}/>
         ) : error ? (
            <Text>Something went wrong!!</Text>
         ) : (
            <FlatList
               data={data}
               renderItem={({ item }) => <ProductCartView product={item}/>}
               horizontal
               contentContainerStyle={{
                  columnGap: SIZES.medium
               }}
            />
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      marginTop: SIZES.medium,
      marginHorizontal: SIZES.small,
   },

})

export default ProductRow;
