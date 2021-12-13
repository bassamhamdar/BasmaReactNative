import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  Dimensions,
} from "react-native";
import LoginContext from "../context/LoginContext";
import { LineChart } from "react-native-chart-kit";

export default function Home({ navigation }) {
  const {
    state: { Customers },
    actions: { getData, logout },
  } = useContext(LoginContext);
  const Chartdata = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  if (Customers) {
    Object.entries(Customers).forEach((item) => {
      Chartdata.labels.push(item[0]);
      Chartdata.datasets[0].data.push(item[1]);
    });
    console.log("test", Chartdata.labels);
  }
  // useEffect(() => getData(), []);
  useEffect(() => {
    navigation.setOptions({
      title: "Home",

      headerRight: () => (
        <TouchableOpacity onPress={() => logout(navigation)}>
          <Text style={styles.btn}>Log out</Text>
        </TouchableOpacity>
      ),
    }),
      getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Welcome to BASMA</Text>
      {Customers && (
        <LineChart
          data={Chartdata}
          width={Dimensions.get("window").width / 1.1}
          height={220}
          paddingVertical={100}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#5336de",
            backgroundGradientTo: "#337da1",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      <Text style={styles.txt}>Customer's Data</Text>
      <Text style={styles.p}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        nemo vel temporibus mollitia labore dolore?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 10,
  },
  btn: {
    color: "#00008B",
    fontWeight: "bold",
  },
  txt: {
    fontWeight: "bold",
    marginBottom: 50,
    fontSize: 20,
    color: "#00008B",
  },
  p: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#00008B",
    margin: 5,
    textAlign: "center",
  },
});
