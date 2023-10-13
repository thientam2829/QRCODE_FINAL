import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const QRCodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
   
    console.log(`Bar code scanned: ${data}`);
    const [name, email, phone] = data.split(", ");

  
    navigation.navigate("UserInfo", { name, email, phone });
   
  };

  if (hasPermission === null) {
    return <Text>Đợi xin quyền truy cập máy ảnh...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không có quyền truy cập máy ảnh.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Quét lại" onPress={() => setScanned(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default QRCodeScannerScreen;
