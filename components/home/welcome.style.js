import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/index";

const styles = StyleSheet.create({
   container: {
      width: "100%"
   },
   welcomeTxt: (color, top, fontSize) => ({
      fontFamily: 'bold',
      fontSize: fontSize,
      marginTop: top,
      color: color,
      marginHorizontal: SIZES.small
   }),
   searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: COLORS.lightWhite,
      marginVertical: SIZES.medium,
      marginHorizontal: SIZES.medium,
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

export default styles