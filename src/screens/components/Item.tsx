import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

function formatDate(date = "2009-09-01T07:00:00Z") {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export default function Item() {
    return (
        <View style={styles.item}>
            <Image source={{ uri: "https://picsum.photos/100/100" }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    This is the title
                </Text>
                <Text style={styles.price}>
                    Price: USD 10.00
                </Text>
                <Text style={styles.releaseDate}>
                    Released: {formatDate()}
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