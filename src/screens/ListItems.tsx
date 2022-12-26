import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Item from './components/Item';
import { itemsAdapter, itemsSelector, useSearchQuery } from '../state/api';
import { useDebounce } from '@react-hook/debounce';

const ListItems = () => {
    const [offset, setOffset] = React.useState(0);
    const [term, setTerm] = useDebounce("")

    const { data } = useSearchQuery({
        term,
        offset,
    }, {
        selectFromResult: ({ data, ...otherParams }) => ({
            data: itemsSelector.selectAll(
                data ?? itemsAdapter.getInitialState()
            ),
            ...otherParams
        }),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                List Of Itunes Search
            </Text>
            <TextInput onChangeText={setTerm} placeholder='Search Itunes' style={styles.input} />
            <FlatList
                style={{ flex: 1 }}
                data={data ?? []}
                renderItem={({ item }) => <Item item={item} queryParams={{
                    term,
                    offset
                }} />}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                onEndReached={() => setOffset(offset + 10)}
            />
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