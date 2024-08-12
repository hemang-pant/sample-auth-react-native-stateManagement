import React, { useEffect, useState } from "react";
import { Text, Button, View } from "react-native";
import Auth from "@arcana/auth-react-native";

export default function App() {

  const [authState, setAuthState] = useState("LoggedOut");

  useEffect(() => {
    if(componentARef.current.getLoginState() == "connected"){
      setAuthState("LoggedIn");
    }
    else {
      setAuthState("LoggedOut");
    }
  }, [componentARef]
);
  const componentARef = React.useRef(null);

  const [result, setResult] = useState({});

  const getUserInfo = async () => {
    if (componentARef !== null) {
      const userInfo = await componentARef?.current.getUserInfo();
      console.log({ userInfo });
      setResult(userInfo);
    }
  };
  const getAccount = async () => {
    if (componentARef !== null) {
      const accounts = await componentARef?.current.getAccount();
      console.log({ accounts });
      setResult(accounts);
    }
  };

  const login = async () => {
    componentARef?.current.loginWithSocial("google").then((res) => {
      console.log(res);
      setAuthState("LoggedIn");
    }
    );
  };
  const show = async () => {
    componentARef?.current.showWallet();
  };
  const hide = async () => {
    componentARef?.current.hideWallet();
  };

  const sendTx = async () => {
    componentARef?.current.sendTransaction({
      to: "0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780",
      value: "0x9184e72a",
    });
  };
  const getBalance = async () => {
    const balance = await componentARef?.current.getBalance();
    console.log(await componentARef?.current.getLoginState());
    setResult(balance);
  };

  const logout = async () => {
    await componentARef?.current.logout().then((res) => {
      console.log(res);
      setAuthState("LoggedOut");
    }
    );
  };

  return (
    <>
      <View>
        <Button title="Hide" onPress={hide} />
        {authState === "LoggedOut" ? (
          <Button title="Login" onPress
          ={login} />
        )
          : (
            <Text>{JSON.stringify(componentARef.current.getUserInfo().name)}</Text>
          )
        }
        <Button title="Get balance" onPress={getBalance} />
        <Button title="Send transaction" onPress={sendTx} />
        <Button title="Get User Info" onPress={getUserInfo} />
        <Button title="Get Account" onPress={getAccount} />
        <Button title="Show wallet" onPress={show} />
        {authState === "LoggedIn" && (
          <Button title="Logout" onPress={logout} />
        )
        }
        <Text>{JSON.stringify(result)}</Text>
        <Text>{JSON.stringify(componentARef.current)}</Text>
      </View>
      <Auth
        clientId={"xar_live_adad629c14269c2cb330abf87f0d0cbc5ff73fbc"}
        ref={componentARef}
      />
    </>
  );
}
