import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Modal, StyleSheet, View, Text, ActivityIndicator } from "react-native";

function NetworkInfo() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Modal
      visible={!isConnected}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View className="flex flex-row justify-center items-center gap-5">
            <View>
              <ActivityIndicator size="large" color="#06286E" />
            </View>
          <Text style={styles.text}>No Internet Connection</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Highest priority
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    elevation: 10,
    minWidth: 250,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#06286E",
  },
});

export default NetworkInfo;