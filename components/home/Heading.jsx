import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS, SIZES} from '../../constants/index'
import { Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const Heading = () => {
   const navigation = useNavigation()
   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>New Food</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('ProductList')}}>
               <Ionicons name='ios-grid' size={24} color={COLORS.primary} />
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      marginTop: SIZES.medium,
      marginBottom: SIZES.xSmall,
      marginHorizontal: SIZES.small
   },
   header: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignContent: 'center'
   },
   headerTitle: {
      fontFamily: 'semiBold',
      fontSize: SIZES.xLarge
   }
})

export default Heading;
