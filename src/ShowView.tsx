import React, { useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, Text, ViewStyle } from 'react-native'

type Props = {
    children?: React.ReactNode
    style?: ViewStyle
    removed?: boolean
    onCallbackRemoved?: () => void
}

export default ({
    children,
    style,
    removed,
    onCallbackRemoved
}: Props) => {
    const [height, setHeight] = useState(0)

    const animateHeight = useRef(new Animated.Value(0)).current
    const animateOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        showView()
    }, [])

    useEffect(() => {
        if (removed) {
            hideView()
        }
    }, [removed])

    const showView = () => {
        const toHeight = { toValue: 1, duration: 300, useNativeDriver: false, delay: 200 }
        const toOpacity = { toValue: 1, duration: 280, useNativeDriver: false }

        // animateOpacity.setValue(0)
        // animateHeight.setValue(0)
        Animated.sequence([
            Animated.timing(animateHeight, toHeight),
            Animated.timing(animateOpacity, toOpacity)
        ]).start()
    }

    const hideView = () => {
        const toOpacity = { toValue: 0, duration: 200, useNativeDriver: false }
        const toHeight = { toValue: 0, duration: 280, useNativeDriver: false }

        // animateOpacity.setValue(1)
        // animateHeight.setValue(1)
        Animated.sequence([
            Animated.timing(animateOpacity, toOpacity),
            Animated.timing(animateHeight, toHeight)
        ]).start(onCallbackRemoved)
    }

    return <Animated.View
        style={{
            height: height > 0 ? animateHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height]
            }) : undefined,
            opacity: animateOpacity,
            ...style
        }}
        onLayout={(e: LayoutChangeEvent) => {
            if (height <= 0) setHeight(e.nativeEvent.layout.height)
        }}>
        {children}
    </Animated.View>
}