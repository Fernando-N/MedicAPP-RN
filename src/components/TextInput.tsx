import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {theme} from '../core/theme';

type Props = React.ComponentProps<typeof Input> & { errorText?: string } & { inputStyle?: {} } & { textStyle?: {} } & { reference: {} };

const TextInput = ({errorText, inputStyle, textStyle, reference, ...props}: Props) => (
    <View style={styles.container}>
        <Input
            style={[styles.input, inputStyle ? inputStyle : {}]}
            selectionColor={theme.colors.primary}
            underlineColor="transparent"
            mode="outlined"
            ref={ (ref) => { if (props.label && reference) reference[props.label] = ref } }
            {...props}
        />
        {errorText ? <Text style={[styles.error, textStyle ? textStyle : {}]}>{errorText}</Text> : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: theme.colors.surface,
    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
});

export default memo(TextInput);
