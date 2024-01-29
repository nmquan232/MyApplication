import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons'

import {COLORS} from '../constants/index'
import {Home, Search, Profile} from '../screens/index'



const Tab = createBottomTabNavigator()


const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                // position: 'absolute',
                // bottom: -50,
                // right: 0,
                // left: 0,
                // elevation: 0,
                // height: 70
            }
        }}>
            <Tab.Screen 
            name='Home' 
            component={Home}
            options={{
                tabBarIcon: ({focused, size, color}) => {
                    return (
                        <Ionicons name={focused ? 'home' : 'home-outline'}
                        size={24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                        />
                    )
                }
            }}
            />
            <Tab.Screen 
            name='Search' 
            component={Search}
            options={{
                tabBarIcon: ({focused, size, color}) => {
                    return (
                        <Ionicons name='search-sharp'
                        size={24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                        />
                    )
                }
            }}
            />
            <Tab.Screen 
            name='Profile' 
            component={Profile}
            options={{
                tabBarIcon: ({focused, size, color}) => {
                    return (
                        <Ionicons name={focused ? 'person' : 'person-outline'}
                        size={24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                        />
                    )
                }
            }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default BottomTabNavigation;
