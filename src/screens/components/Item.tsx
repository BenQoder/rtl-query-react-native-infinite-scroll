import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ItunesItem } from '../../../types'

function formatDate(date = "2009-09-01T07:00:00Z") {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export default function Item({ item }: { item: ItunesItem }) {
    return (
        <View style={styles.item}>
            <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.trackName}
                </Text>
                <Text style={styles.price}>
                    Price: USD {item.trackPrice}
                </Text>
                <Text style={styles.releaseDate}>
                    Released: {formatDate(item.releaseDate)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 100,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    content: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    price: {
        fontSize: 14,
        color: 'green',
    },
    releaseDate: {
        fontSize: 14,
        color: 'gray',
    }
})