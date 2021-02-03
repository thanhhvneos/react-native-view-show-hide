import React, { useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, Text, ViewStyle } from 'react-native'

type Props = {
    color?: string
    size?: number
    style?: ViewStyle
    removed?: boolean
    onCallbackRemoved?: () => void
}

const Box = ({
    color = 'green',
    // size,
    style,
    removed,
    onCallbackRemoved
}: Props) => {
    const [height, setHeight] = useState(0)

    const animateHeight = useRef(new Animated.Value(0)).current
    const animateOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        componentDidMount()
    }, [])

    useEffect(() => {
        if (removed) {
            const toOpacity = { toValue: 0, duration: 200, useNativeDriver: false }
            const toHeight = { toValue: 0, duration: 280, useNativeDriver: false }

            Animated.sequence([
                Animated.timing(animateOpacity, toOpacity),
                Animated.timing(animateHeight, toHeight)
            ]).start(onCallbackRemoved)
        }
    }, [removed])

    const componentDidMount = () => {
        const toHeight = { toValue: 1, duration: 300, useNativeDriver: false }
        const toOpacity = { toValue: 1, duration: 280, useNativeDriver: false }

        Animated.sequence([
            Animated.timing(animateHeight, toHeight),
            Animated.timing(animateOpacity, toOpacity)
        ]).start()
    }

    return <Animated.View
        style={{
            backgroundColor: color,
            height: height > 0 ? animateHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height]
            }) : undefined,
            opacity: animateOpacity,
            ...style
        }}
        onLayout={(e: LayoutChangeEvent) => {
            if (height == 0) setHeight(e.nativeEvent.layout.height)
        }}>
        <Text style={{ fontSize: 50 }}>HELLO</Text>
    </Animated.View>
}

export default Box