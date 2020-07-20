import React, {memo} from 'react';
import {View, Animated, Easing, TouchableWithoutFeedback} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
    rating: number,
    size: number,
    onPress?: Function
};

const Rating = ({rating, size, onPress}: Props) => {

    const animation = new Animated.Value(1);

    const animateScale = animation.interpolate({
        inputRange: [1, 1.5, 2],
        outputRange: [1, 1.4, 1]
    });

    const animateWobble = animation.interpolate({
        inputRange: [1, 1.25, 1.75, 2],
        outputRange: ["0deg", "-3deg", "3deg", "0deg"]
    });

    const animateOpacity = animation.interpolate({
        inputRange: [1, 1.2, 2],
        outputRange: [1, 0.5, 1]
    });

    const animationStyle = {
        transform: [{ scale: animateScale }, { rotate: animateWobble }],
        opacity: animateOpacity
    };

    const rate = star => {
        rating = star;
    };

    const animate = () => {
        Animated.timing(animation, {
            toValue: 2,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(() => {
            animation.setValue(1);
        });
    };

    let stars = [];

    for (let x = 1; x <= 5; x++) {
        stars.push(
            <TouchableWithoutFeedback
                key={x}
                onPress={() => {
                    rate(x), animate();
                    if (onPress) {
                        onPress();
                    }
                }}
            >
                <Animated.View style={x <= rating ? animationStyle : ""}>
                    <Star filled={x <= rating} size={size} />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }


    return (
        <View>
            <View style={{ flexDirection: "row" }}>{stars}</View>
        </View>
    )
};

const Star = (props) => (
    <FontAwesome
        name={props.filled === true ? "star" : "star-o"}
        color={'#ffd726'}
        size={props.size}
        style={{ marginHorizontal: 6 }}
    />
);

export default memo(Rating);
