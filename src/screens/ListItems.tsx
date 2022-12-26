import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Item from './components/Item';

const ListItems = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                List Of Itunes Search
            </Text>
            <TextInput placeholder='Search Itunes' style={styles.input} />
            <Item />
        </View>
    )
}

export default ListItems

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }
})