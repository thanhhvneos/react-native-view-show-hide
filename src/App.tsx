import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Button, Animated, ScrollView } from 'react-native'
import Box from './Box'
import ShowView from './ShowView'

const MAX = 8

const App = () => {
    const [count, setCount] = useState(Math.floor(Math.random() * MAX))

    const pressAdd = () => {
        if (count < MAX) setCount(count + 1)
        else setCount(Math.floor(Math.random() * MAX))
    }

    const arr = []
    for (let i = 0; i < count; i++) {
        arr.push(<Text
            key={i.toString()}
            style={styles.text}>Hello, world! {i + 1}</Text>)
    }

    return <SafeAreaView style={styles.view}>

        <ShowView
            style={{ padding: 20 }} >
            {arr}
        </ShowView>

        <Box
            color='blue'
        />

        <Text style={styles.text}>{count}</Text>

        <View style={{ flex: 1 }} />

        <Button
            title='ADD'
            onPress={pressAdd} />

    </SafeAreaView>
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        alignSelf: 'center',
        fontSize: 30
    }
})

export default App