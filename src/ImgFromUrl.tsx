import React, { useEffect, useRef, useState } from 'react'
import { Image, ImageBackground, StyleSheet, ActivityIndicator, Pressable, ViewStyle, View, Animated } from 'react-native'

type Status = 'idle' | 'loading' | 'error' | 'success'

type Props = {
    uri: string | null | undefined
    style?: ViewStyle
}

export default ({
    uri,
    style
}: Props) => {
    const [status, setStatus] = useState<Status>('idle')
    const animOpacity = useRef(new Animated.Value(0)).current

    // actions
    useEffect(() => {
        if (status == 'idle') setStatus('loading')
    }, [status])

    const reload = () => {
        setStatus('idle') // idle => loading
    }

    // views
    const createBody = () => {
        if (status == 'error')
            return createBodyError()
        else if (status == 'loading')
            return <ActivityIndicator />

        return null
    }

    const createBodyError = () => {
        return <Pressable
            style={{
                position: 'absolute',
                left: 0, top: 0, right: 0, bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red'
            }}
            onPress={reload}>

            <Image
                source={require('./imgs/image_err.png')}
                style={{ width: 44, height: 44 }} />

        </Pressable>
    }

    const createBodyNoImage = () => {
        return <View style={{ ...styles.view, ...style }}>
            <Image
                style={{
                    width: '50%',
                    height: '50%'
                }}
                source={require('./imgs/no_image.png')}
                resizeMode={'contain'}
            />
        </View>
    }

    if (status == 'idle') return null

    if (!uri) return createBodyNoImage()

    return <ImageBackground
        source={{ uri }}
        style={{ ...styles.view, ...style }}
        onLoad={() => setStatus('success')}
        onError={() => setStatus('error')}>

        {createBody()}

    </ImageBackground>
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center'
    }
})