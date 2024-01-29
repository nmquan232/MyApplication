import { useContext } from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Context } from '../../store';
import ProductCartView from './ProductCartView';
const ProductList = () => {
    const [state, dispatch] = useContext(Context)
    return (
        <View style={styles.container}>
            <FlatList
                data={state.products}
                numColumns={2}
                renderItem={({item}) => <ProductCartView product={item} />}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={styles.separator} /> } 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: SIZES.xxLarge,
        paddingLeft: SIZES.small/2
    },
    separator: {
        height: 16
    }
})

export default ProductList;
