import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EdumetricLoading = ({ value }) => {
    const [currentWord, setCurrentWord] = useState(
        value === 'stress' 
            ? "I’m listening to the feelings involved" 
            : "Reading the question"
    );

    const educationalWords = [
        'Reading the question.',
        'Reading the question..',
        'Reading the question...',
        'Thinking about it.',
        'Thinking about it..',
        'Thinking about it...',
        'Breaking it down.',
        'Breaking it down..',
        'Breaking it down...',
        'Connecting the concepts.',
        'Connecting the concepts..',
        'Connecting the concepts...',
        'Forming the answer.',
        'Forming the answer..',
        'Forming the answer...',
        'Double-checking the logic.',
        'Double-checking the logic..',
        'Double-checking the logic...',
    ];
    const motivationalWords = [
        'I’m listening to the feelings involved.',
        'I’m giving this my full kindness and attention.',
        'I’m gently putting the pieces together.',
        'I’m thinking about how it all connects.',
        'I’m forming a caring response.',
        'I’m making sure my response is clear and kind.',
    ];

    useEffect(() => {
        let currentIndex = 0;
        const wordInterval = setInterval(() => {
            if (value === 'stress') {
                setCurrentWord(motivationalWords[currentIndex]);
                currentIndex = (currentIndex + 1) % motivationalWords.length;
            } else {
                setCurrentWord(educationalWords[currentIndex]);
                currentIndex = (currentIndex + 1) % educationalWords.length;
            }
        }, value === 'stress' ? 1000 : 800);

        return () => clearInterval(wordInterval);
    }, [value]);

    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.textStyle}>{currentWord}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 18,
        color: '#5189FC',
        textAlign: 'center',
        fontFamily:'Inter-Medium',
        fontWeight:500
    },
});
