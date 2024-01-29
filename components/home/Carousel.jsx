import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS, SIZEZS} from '../../constants/index'
import { SliderBox } from 'react-native-image-slider-box'

const Carousel = () => {
   const sliders = [
     require('../../assets/images/fn1.jpg'),
     require('../../assets/images/fn2.jpg'),
     require('../../assets/images/fn3.jpg')


   ]
   return (
      <View style={styles.container}>
         <SliderBox images={sliders}
            ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 15}}
            autoplay
            circleLoop
            dotStyle={{
               display: 'none'
            }}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center'
   }
})

export default Carousel;
