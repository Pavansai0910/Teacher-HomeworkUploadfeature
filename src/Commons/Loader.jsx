import {View, ActivityIndicator} from 'react-native';
function Loader() {
  return (
    <View className=" flex-1 inline-flex justify-center items-center">
      <ActivityIndicator size="large" color="#06286E" />
    </View>
  );
}

export default Loader;
