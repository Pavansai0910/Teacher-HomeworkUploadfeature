import {View, Text, TextInput} from 'react-native';
import {React, useState} from 'react';
import axios from 'axios';
import GetFontSize from './GetFontSize';
import SearchIcon from '../Images/svg/SearchIcon';
import AlertCircleIcon from '../Images/svg/AlertCircleIcon';
import API_URL from '../Constants/API_URL';

const Dictionary = ({dictionaryPlaceholder}) => {
  const BASE_URL = API_URL + '/api/v1';
  const [definition, setDefinition] = useState('');
  const [wordData, setWordData] = useState({
    word: '',
    pos: 'noun', // If not used, consider removing this.
  });

  const handleChange = value => {
    setWordData({...wordData, word: value});
  };

  const handleSubmit = async () => {
    if (wordData.word.trim() === '') {
      setDefinition('Please enter a word');
      return;
    }

    setDefinition('Searching...');
    try {
      const response = await axios.post(`${BASE_URL}/note/getmeaning`, {
        word: wordData.word,
      });
      setDefinition(response.data.answer || 'No meaning found!');
    } catch (error) {
      setDefinition('No meaning found!');
    }
  };

  return (
    <View className="h-[150px] bg-white overflow-y-scroll">
      <View className="flex flex-row items-center">
        <View className="ml-2">
          <SearchIcon width={20} height={20} />
        </View>
        <View className="mt-2 min-w-[25%] max-w-[80%] overflow-y-scroll  ">
          <TextInput
            placeholder={dictionaryPlaceholder || "Paste from Notes"}
            placeholderTextColor="#969696"
            value={wordData.word}
            className=" font-poppins400 "
            onSubmitEditing={handleSubmit}
            onChangeText={handleChange}
            style={{
              fontSize: GetFontSize(12),
              color: '#969696',
            }}
          />
        </View>

        <View className="absolute right-2 ">
          <AlertCircleIcon width={18} height={18} />
        </View>
      </View>
      <Text
        style={{
          fontSize: GetFontSize(12),
        }}
        className="text-[#969696] mx-2">
        {definition}
      </Text>
    </View>
  );
};

export default Dictionary;
