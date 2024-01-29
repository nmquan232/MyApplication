import { useState } from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput, SearchTile } from '../components/index';
import {COLORS, SIZES} from '../constants/index';
import axios from 'axios';
const Search = () => {
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async (searchKey)=> {
        try {
            const res = await axios.get(`https://food-app-328l.onrender.com/products/search/${searchKey}`)
            setSearchResults(res.data)
         } catch (error) {
            console.log('st wrong in handleSearch', error);
         }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <SearchInput handleSearch={handleSearch} />
            {searchResults.length === 0 ? 
            (<View style={{flex: 1}}>
                <Image 
                    source={require('../assets/images/Pose23.png')}
                    style={styles.searchImage}
                />
            </View>)
            :
            (<FlatList
                data={searchResults}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <SearchTile product={item} />}
                />)    
        }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: SIZES.large
  },
  searchImage: {
    resizeMode: 'contain',
    width: SIZES.width -100,
    height: SIZES.height -300,
    opacity: 0.8
  }
})

export default Search;
