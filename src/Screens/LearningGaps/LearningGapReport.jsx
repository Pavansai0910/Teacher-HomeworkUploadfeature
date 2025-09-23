import {View, Text, ScrollView, StyleSheet} from 'react-native';
import GetFontSize from '../../Commons/GetFontSize';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function LearningGapReport() {
  const {studentProfile} = useContext(AuthContext);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="mx-[20px] mb-[90px]">
          <View className="mt-[20px]">
            <Text
              style={{fontSize: GetFontSize(22)}}
              className="font-inter700 leading-[24px]">
              Hello {studentProfile?.name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
            </Text>

            <Text
              style={{fontSize: GetFontSize(10)}}
              className="mt-3 w-[176px] text-[#616161] font-inter400 leading-[13px]">
              Here is your personalized learning progress report.
            </Text>
          </View>

          <View className="w-full mt-[38px] flex flex-row justify-between items-center gap-[14px]">
            <View style={{width: '28%'}} className="gap-[14px] ">
              {/* Attempted */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#316ADE]">
                  Attempted
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#316ADE] opacity-80">
                  08
                </Text>
              </View>

              {/* Unattempted */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#316ADE]">
                  Unattempted
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#316ADE] opacity-80">
                  02
                </Text>
              </View>

              {/* Correct */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#246F41]">
                  Correct
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#366C43] opacity-80">
                  08
                </Text>
              </View>

              {/* Incorrect */}
              <View
                style={{shadowColor: '#5189FC'}}
                className=" w-full h-[68px] rounded-[10px] bg-white shadow-lg flex justify-center">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="ml-2 font-inter700 text-[#DD2222]">
                  Incorrect
                </Text>
                <Text
                  style={{fontSize: GetFontSize(22)}}
                  className="ml-2 font-inter700 text-[#dd2222] opacity-80">
                  08
                </Text>
              </View>
            </View>
            <View
              style={{width: '68%', shadowColor: '#5189FC'}}
              className="h-[320px] bg-white rounded-[10px] shadow-lg "></View>
          </View>

          {/* Zones */}
          <ScrollView
            style={{shadowColor: '#316ADE'}}
            className="mt-4 h-[240px] rounded-[6px] shadow-lg">
            <View className="min-h-full bg-white flex flex-row justify-evenly items-center">
              <View
                style={{width: '30%'}}
                className="h-full border-r border-[#5189FC57]">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="mt-3 font-inter600 text-[#33569F] leading-[12px] text-center">
                  Strength Zone
                </Text>
              </View>
              <View style={{width: '30%'}} className="h-full bg-white ">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="mt-3 font-inter600 text-[#33569F] leading-[12px] text-center ">
                  Learning Zone
                </Text>
              </View>

              <View
                style={{width: '30%'}}
                className="h-full bg-white border-l border-[#5189FC57] ">
                <Text
                  style={{fontSize: GetFontSize(12)}}
                  className="mt-3 font-inter600 text-[#33569F] leading-[12px] text-center">
                  Focus Zone
                </Text>
              </View>
            </View>
          </ScrollView>

          <View
            style={{shadowColor: '#316ADE'}}
            className="mt-4 h-[160px] rounded-[6px] shadow-lg bg-white ">
              
    
<View style={styles.row}>
        <View style={styles.gridItem}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>3</Text>
        </View>
      </View>
      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.gridItem}>
          <Text style={styles.text}>4</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>6</Text>
        </View>
      </View>
      {/* Row 3 */}
      <View style={styles.row}>
        <View style={styles.gridItem}>
          <Text style={styles.text}>7</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>8</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>9</Text>
        </View>
      </View>
      {/* Row 4 */}
      <View style={styles.row}>
        <View style={styles.gridItem}>
          <Text style={styles.text}>10</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>11</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>12</Text>
        </View>
      </View>
      {/* Row 5 */}
      <View style={styles.row}>
        <View style={styles.gridItem}>
          <Text style={styles.text}>13</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>14</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.text}>15</Text>
        </View>
      </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LearningGapReport;

const styles = StyleSheet.create({
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor:'#33569F52'
  },
  gridItem: {
    width: '33%',
    height: 24,
    // backgroundColor: '#5189FC',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    color: '#33569F',
    fontWeight: 'bold',
  },
});