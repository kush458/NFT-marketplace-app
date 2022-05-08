import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {

  const ipAddr = "192.168.0.16"; //Find and enter the IP address of your computer!
  const [ users, setUsers ] = useState([]);
  const [ reqData, setReqData ] = useState(false);

  useEffect(() => {
    if(reqData){
      fetch(`http://${ipAddr}:3000/users`)
      .then(res => res.json())
      .then((result) => {
        setUsers(result);
      })
    }
  }, [reqData]);

  return (
    <View style={styles.container}>
      <Button 
        onPress={() => setReqData(true)}
        title="Request data"
      />
      <Text style={{paddingTop: 25}}>backend data:</Text>
      {users.map((data, i) => (
        <Text key={i}>{data.name}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
