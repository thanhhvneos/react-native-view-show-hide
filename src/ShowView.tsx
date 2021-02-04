import React, { useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, ViewStyle } from 'react-native'

type Props = {
    children?: React.ReactNode
    style?: ViewStyle
}

export default ({
    children,
    style
}: Props) => {
    const [attackedToParent, setAttackedToParent] = useState(false)
    const [isAnimating, setAnimating] = useState(false)

    const animateOpacity = useRef(new Animated.Value(0)).current
    const animateHeight = useRef(new Animated.Value(0)).current

    const changeView = (newHei: number) => {
        if (newHei <= 0) return

        const toHeight = { toValue: newHei, duration: 220, useNativeDriver: false }
        animateOpacity.setValue(0)
        setAnimating(true)
        Animated.sequence([
            Animated.timing(animateHeight, toHeight),
            Animated.timing(animateOpacity, {
                toValue: 1,
                duration: 180,
                useNativeDriver: false
            }),
            Animated.delay(50)
        ]).start(() => {
            setAnimating(false)
        })
    }

    return <Animated.View
        style={{
            height: attackedToParent ? (isAnimating ? animateHeight : undefined) : undefined,
            opacity: attackedToParent ? animateOpacity : 0,
            position: attackedToParent ? 'relative' : 'absolute',
            ...style
        }}
        onLayout={(e: LayoutChangeEvent) => {
            const newHeight = e.nativeEvent.layout.height
            if (newHeight > 0) {
                if (attackedToParent == false) {
                    setAttackedToParent(true)
                }

                if (isAnimating == false) {
                    changeView(newHeight)
                }
            }
        }}>
        {children}
    </Animated.View>
}