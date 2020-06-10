import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
import LottieView from "lottie-react-native";

type Props = { animated?: boolean } & { lottieProps?: {} };

const Logo = ({animated, lottieProps}: Props) => (
    <>
        {animated ?
            <LottieView
                source={require('../assets/animations/smooth-healthy-animation.json')}
                style={styles.animation}
                resizeMode = 'cover'
                autoPlay
                loop={false}
                {...lottieProps}
            />

            :
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.image}
            />

        }
    </>
);

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
    },
    animation: {
        width: 150,
        height: 150,
        marginBottom: 12,
    },
});

export default memo(Logo);
