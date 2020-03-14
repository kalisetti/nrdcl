import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Content,
    H2,
    Card,
    Body,
    CardItem
} from 'native-base';
import globalStyle from '../../styles/globalStyle';
import Dialog from "react-native-dialog";
import { Alert } from 'react-native';

export const sucessMsg = (message) => { 
    Alert.alert(
        'Application Sucess',
        message,
        [
            { text: '' },
            {
                text: '',
                style: 'cancel',
            },
            { text: 'OK', style: 'button', },
        ],
        { cancelable: false }
    )
} 
