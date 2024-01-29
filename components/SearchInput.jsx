import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SIZES } from '../constants/index';
import { Feather, Ionicons } from '@expo/vector-icons'
const SearchInput = ({handleSearch}) => {
   const [searchKey, setSearchKey] = useState('')

   
   return (
      <View style={styles.searchContainer}>
         <TouchableOpacity>
            <Ionicons name='camera-outline' size={24} style={styles.searchIcon} />
         </TouchableOpacity>

         <View style={styles.searchWrapper}>
            <TextInput
               style={styles.searchInput}
               value={searchKey}
               onChangeText={setSearchKey}
               placeholder='What are locking for??'
            />
         </View>

         <View >
            <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchKey)}>
               <Feather name='search' size={24} color={COLORS.lightWhite} />
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: COLORS.lightWhite,
      marginVertical: SIZES.medium,
      borderRadius: SIZES.medium,
      height: 50
   },
   searchIcon: {
      marginHorizontal: SIZES.small,
      color: COLORS.gray,
      marginTop: SIZES.small
   },
   searchWrapper: {
      flex: 1,
      backgroundColor: COLORS.lightWhite,
      marginRight: SIZES.small,
      borderRadius: SIZES.small
   },
   searchInput: {
      paddingHorizontal: SIZES.small,
      fontFamily: 'regular',
      width: '100%',
      height: '100%'
   },
   searchBtn: {
      backgroundColor: COLORS.primary,
      width: 50,
      height: '100%',
      borderRadius: SIZES.medium,
      justifyContent: 'center',
      alignItems: 'center'
   }
})

export default SearchInput;
