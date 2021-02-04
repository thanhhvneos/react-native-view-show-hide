import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Button, Animated, ScrollView, Image } from 'react-native'
import Box from './Box'
import ImgFromUrl from './ImgFromUrl'
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

        {/* <ShowView
            style={{ padding: 20 }} >
            {arr}
        </ShowView> */}

        <ScrollView>

            <Image
                source={{ uri: 'https://contents.file-server.net/store/5/post-item-image/33746608/ca6cd942-9cc0-4f3c-96b4-865830a6be4a-high.png' }}
                style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1.5,
                }} />

            {/* <View style={{ height: 1 }} /> */}

            <ImgFromUrl
                uri='https://contents.file-server.net/store/5/post-item-image/33746608/ca6cd942-9cc0-4f3c-96b4-865830a6be4a-high.png'
                style={{ marginTop: 20 }} />

            <ImgFromUrl
                uri={null}
                style={{ marginTop: 20 }} />

            <Button
                title='ADD'
                onPress={pressAdd} />

        </ScrollView>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    text: {
        alignSelf: 'center',
        fontSize: 30
    }
})

export default App