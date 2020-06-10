import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';

type Props = React.ComponentProps<typeof Switch>;

const Checkbox = ({style, ...props}: Props) => (
    <Switch
        style={[
            style,
        ]}
        labelStyle={styles.text}
        {...props}
    />
);

const styles = StyleSheet.create({

});

export default memo(Checkbox);
