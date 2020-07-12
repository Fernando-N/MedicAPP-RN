import React, {memo} from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = { quantity?: number };

const StarIndicator = ({quantity}: Props) => {
    let stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push( i >= quantity ?
            <MaterialCommunityIcons name="star-outline" color='#000' size={25} /> :
            <MaterialCommunityIcons name="star" color='#ffeb3b' size={25} />
        );
    }

    return <View style={{flexDirection:'row', flexWrap:'wrap'}}>{stars}</View>
};

export default memo(StarIndicator);
