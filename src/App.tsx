import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Button, Animated, ScrollView } from 'react-native'
import Box from './Box'
import ShowView from './ShowView'

const App = () => {
    const [isStartRemoved, setStartRemoved] = useState(false)
    const [isRemoved, setRemoved] = useState(false)

    const pressAdd = () => {
        if (isRemoved == false)
            setStartRemoved(true) // remove
        else {
            setStartRemoved(false)
            setRemoved(false) // add new
        }
    }

    return <SafeAreaView style={styles.view}>

        <ScrollView>
            {isRemoved == false && <ShowView
                removed={isStartRemoved}
                onCallbackRemoved={() => {
                    setStartRemoved(false)
                    setRemoved(true)
                }}>
                <Text style={styles.text}>Hello, world!</Text>
            </ShowView>}

            <Box
                color='blue'
            />

            <Text style={styles.text}>Hello, world!</Text>

            <View style={{ flex: 1 }} />

            <Button
                title='ADD'
                onPress={pressAdd} />
        </ScrollView>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        marginVertical: 20,
        alignSelf: 'center',
        fontSize: 30
    }
})

export default App