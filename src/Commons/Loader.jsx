import {View, ActivityIndicator} from 'react-native';
function Loader() {
  return (
    <View className=" w-full h-full inline-flex justify-center items-center">
      <ActivityIndicator size="large" color="#06286E" />
    </View>
  );
}

export default Loader;
