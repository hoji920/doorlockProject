import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
    Platform,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function Login({navigation}){

    const [idText, setIdText] = useState('');
    const [pwText, setPwText] = useState('');

    const handleIdChange = (newId) => {
        setIdText(newId);
    }
    const handlePwChange = (newPw) => {
        setPwText(newPw);
    }

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.logingLogo}>
                    <Text>로고</Text>
                </View>
                <View style={styles.idpwContainer}>
                    <TextInput 
                        style={[styles.inputStyle,
                            Platform.OS === 'ios' ? styles.iosInput : styles.androidInput,]}
                        placeholder='아이디를 입력해주세요.'
                        onChangeText={handleIdChange}
                        value={idText}
                    />
                    <TextInput 
                        style={[styles.inputStyle,
                            Platform.OS === 'ios' ? styles.iosInput : styles.androidInput,]}
                        placeholder='비밀번호를 입력해주세요.'
                        onChangeText={handlePwChange}
                        value={pwText}
                    />
                </View>
                <View style={styles.loginBtn}>
                    <TouchableOpacity style={styles.btnLo}>
                        <Text style={styles.btnText}>로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLo} onPress={()=>navigation.navigate('join')}>
                        <Text style={styles.btnText}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logingLogo: {
        justifyContent:'center',
        alignItems:'center',
        marginTop:'40%'
    },
    idpwContainer: {
        justifyContent:'center',
        alignItems:'center',
    },
    inputStyle: {
        width: 230,
        height: 30,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginTop: 16,
        fontSize: 14,
        padding: 3,
        borderRadius:5
    },
    loginBtn: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        margin:10
    },
    btnLo: {
        margin:10,
        width:100,
        height:30,
        backgroundColor:'#7D74E4',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText: {
        color:'#fff',
        fontSize:14,
        fontWeight:'700'
    }
});

export default Login