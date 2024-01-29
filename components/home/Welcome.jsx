import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './welcome.style';
import { COLORS, SIZES } from '../../constants/index'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
const Welcome = () => {
   const navigation = useNavigation()
   return (
      <View>
         <View style={styles.container}>
            <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall, SIZES.xsLarge)}>Delicious Food For You</Text>
            <Text style={styles.welcomeTxt(COLORS.gray, SIZES.xSmall, SIZES.large)}>Find your favourites food</Text>
         </View>

         <View style={styles.searchContainer}>
            <TouchableOpacity>
               <Feather name='search' size={24} style={styles.searchIcon} />
            </TouchableOpacity>

            <View style={styles.searchWrapper}>
               <TextInput
                  style={styles.searchInput}
                  value=''
                  onPressIn={() => { navigation.navigate('Search') }}
                  placeholder='What are locking for??'
               />
            </View>

            <View >
               <TouchableOpacity style={styles.searchBtn}>
                  <Ionicons name='camera-outline' size={24} color={COLORS.lightWhite} />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}


export default Welcome;
