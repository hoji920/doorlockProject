//회원가입 페이지
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

function Join() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [rpw, setRpw] = useState('');

  const isButtonEnabled = name !== '' && id !== '' && pw !== '' && rpw !== '' && pw === rpw;

  const handleIdChange = (newid) => {
    setId(newid);
  };

  const handleNameChange = (newname) => {
    setName(newname);
  };

  const handlePwChange = (newpw) => {
    setPw(newpw);
  };

  const handlePwrChange = (newrpw) => {
    setRpw(newrpw);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerText}>회원가입</Text>
      </View>
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={styles.inputBox}
          placeholder={'닉네임'}
          onChangeText={handleNameChange}
          value={name}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'아이디'}
          onChangeText={handleIdChange}
          value={id}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'비밀번호'}
          onChangeText={handlePwChange}
          value={pw}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'비밀번호 확인'}
          onChangeText={handlePwrChange}
          value={rpw}
          secureTextEntry={true}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.okayBtn, { backgroundColor: isButtonEnabled ? '#7D74E4' : '#333' }]}
          disabled={!isButtonEnabled}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: '#7D74E4',
    marginHorizontal: 20,
    marginTop: '10%',
  },
  containerText: {
    color: '#868e96',
    fontSize: 16,
    marginBottom: 10,
  },
  inputBox: {
    width: 250,
    height: 35,
    borderColor: '#7D74E4',
    borderWidth: 2,
    paddingHorizontal: 8,
    marginTop: 16,
    fontSize: 14,
    padding: 3,
    borderRadius: 5,
    marginTop: 45,
  },
  okayBtn: {
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
  },
});

export default Join;
