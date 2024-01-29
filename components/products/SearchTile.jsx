
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
const SearchTile = ({ product }) => {
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProductDetails', {id: product._id})}>
                <View style={styles.image}>
                    <Image
                        source={{
                            uri: product.imageUrl
                        }}
                        style={styles.productImg}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.productTitle}>
                        {product.title}
                    </Text>
                    <Text style={styles.supplier}>
                        {product.supplier}
                    </Text>
                    <Text style={styles.supplier}>
                       $ {product.price}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: SIZES.small,
        flexDirection: 'row',
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: '#fff',
        ...SHADOWS.medium,
        shadowColor: COLORS.lightWhite,
        justifyContent: 'space-between'
    },
    image: {
        width: 70,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: SIZES.medium
    },
    productImg: {
        width: '100%',
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: 'cover'
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium
    },
    productTitle: {
        fontFamily: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.primary
    },
    supplier: {
        fontFamily: 'regular',
        fontSize: SIZES.small + 2,
        color: COLORS.gray,
        marginTop: 3
    }
})

export default SearchTile;
