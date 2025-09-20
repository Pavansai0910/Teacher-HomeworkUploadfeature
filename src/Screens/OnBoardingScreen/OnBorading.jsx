import HomeIcon from '../../Images/svg/HomeIcon';
import SelfAwareIcon from '../../Images/svg/SelfAwareIcon';
import AtoZIcon from '../../Images/svg/AtoZIcon';
import EdumetricIcon from '../../Images/svg/EdumetricIcon';
import CalendarIcon from '../../Images/svg/CalendarIcon';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import SyllabusCard from '../Homescreen/Cards/SyllabusCard';
import Card1 from './Cards/Card1';
import Card2 from './Cards/Card2';
import Card3 from './Cards/Card3';
import Card4 from './Cards/Card4';
import Card5 from './Cards/Card5';
import Card6 from './Cards/Card6';
import Secondbg from './OnBoardBackground/SecondBg';
import ThirdBg from './OnBoardBackground/ThirdBg';
import FourthBg from './OnBoardBackground/FourthBg';
import FirstBg from './OnBoardBackground/FirstBg';
import { SafeAreaView } from 'react-native-safe-area-context';
function OnBoarding() {
  const { width, height } = useWindowDimensions();
  const [isFirst, setIsFirst] = useState(true);
  const [isSecond, setIsSecond] = useState(false);
  const [isThird, setIsThird] = useState(false);
  const [isFourth, setIsFourth] = useState(false);
  const [isFifth, setIsFifth] = useState(false);
  const [isSixth, setIsSixth] = useState(false);

  const iconSize = width > 500 ? 40 : 30; // 40px for larger screens, 30px otherwise
    const centerIconSize = width > 500 ? 50 : 40;
  const imageType = width > 500 ? 'cover' : 'contain'; // 'cover' for larger screens, 'contain' otherwise
  return (
    <SafeAreaView style={styles.container}>

      {isFirst && (
        <View style={{flex:1,alignItems:'center'}}>
          <FirstBg />
        </View>
      )}

      {/* Real Component as Background */}
      <View style={styles.backgroundComponent}>

        {isFirst && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SyllabusCard /> </View>}

        {isSecond && <Secondbg />}

        {isThird && <ThirdBg />}

        {isFourth && <FourthBg />}

        {isFifth && <Image source={require('../../Images/png/onbg5.png')}
          resizeMode={imageType}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />}

        {isSixth && <Image source={require('../../Images/png/onbg6.png')}
          resizeMode={imageType}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />}

      </View>

      {!(isFifth || isSixth) && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        />
      )}

      {isFirst && (
        <View style={styles.cardContainer}>
          <Card1 width={width} height={height} setIsFirst={setIsFirst} setIsSecond={setIsSecond} />
        </View>
      )}

      {isSecond && (
        <View style={styles.cardContainer}>
          <Card2 width={width} height={height} setIsFirst={setIsFirst} setIsSecond={setIsSecond} setIsThird={setIsThird} />
        </View>
      )}

      {isThird && (
        <View style={styles.cardContainer}>
          <Card3 width={width} height={height} setIsSecond={setIsSecond} setIsThird={setIsThird} setIsFourth={setIsFourth} />
        </View>
      )}

      {isFourth && (
        <View style={styles.cardContainer}>
          <Card4 width={width} height={height} setIsThird={setIsThird} setIsFourth={setIsFourth} setIsFifth={setIsFifth} />
        </View>
      )}

      {isFifth && (
        <View style={styles.cardContainer}>
          <Card5 width={width} height={height} setIsFourth={setIsFourth} setIsFifth={setIsFifth} setIsSixth={setIsSixth} />
        </View>
      )}

      {isSixth && (
        <View style={styles.cardContainer}>
          <Card6 width={width} height={height} setIsFifth={setIsFifth} setIsSixth={setIsSixth} />
        </View>
      )}

      {/* Bottom Navigation Icon */}
      {isFirst && (
        
        <View style={styles.tabBar}>

          <View style={styles.iconContainer} className='opacity-30'>
            <HomeIcon size={iconSize} />
          </View>

          <View style={styles.iconContainer} className='opacity-30'>
            <SelfAwareIcon size={iconSize} />
          </View>

          <View style={styles.iconContainer}>
            <AtoZIcon size={centerIconSize} />
          </View>

          <View style={styles.iconContainer} className='opacity-30'>
            <EdumetricIcon bg={'#979797'} star={'#FFFFFF'} size={iconSize} />
          </View>

          <View style={styles.iconContainer} className='opacity-30'>
            <CalendarIcon size={iconSize} />
          </View>

        </View>
      )}
    </SafeAreaView>
  );
}

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundComponent: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
    paddingTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
  },
});
