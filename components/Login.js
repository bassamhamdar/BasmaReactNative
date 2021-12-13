import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import LoginContext from "../context/LoginContext";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {
    state: { loginError },
    actions: { login },
  } = useContext(LoginContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../icons/loginIcon.png")}
          style={styles.image}
        />
        {loginError ? (
          <Text style={styles.credential}>{loginError}</Text>
        ) : (
          <Text style={{ color: "#00008B" }}>Log into application</Text>
        )}
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="password"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          title="Login"
          onPress={() => {
            login(email, password, navigation);
            setEmail("");
            setPassword("");
          }}
          style={styles.button}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 6,
    borderColor: "#00008B",
  },
  credential: { color: "#8b0000" },
  image: { width: 150, height: 150, marginBottom: 10, paddingTop: 50 },
  button: { color: "#00008B", fontWeight: "bold" },
});
