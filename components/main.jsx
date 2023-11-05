//메인 페이지
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
    Alert
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Main({navigation}){

    const [isEnteringPassword, setIsEnteringPassword] = useState(false);
    const [isMoojeegEnabled, setIsMoojeegEnabled] = useState(false);
    const [moo,setMoo] = useState(false)

    const [lock,setLock] = useState(faLock);
    const [moojeeg,setMoojeeg] = useState(false);

    //const [loginCheck, setLoginCheck] = useState(true);
    const [moojeegpw, setMooJeegPw] = useState('');
    const {loginCheck, idText, setLoginCheck } = useAuth();

    const handelMooJeegPwchange = (value) => {
        setMooJeegPw(value);
    }
   const serverUrl = 'https://port-0-door-lock-server-jvpb2alnwnfxkw.sel5.cloudtype.app';
    const handleOpenDoor = () => {
        // 클라이언트에서 서버로 POST 요청을 보냅니다.
        axios
          .post(`${serverUrl}/door-open`,{userId: 'test',doorlockStatus: true})
          .then((response) => {
            console.log(response.data)
            setMoo(!response.data.doorlockStatus)

          })
          .catch((error) => {
            console.error('오류 발생: ' + error);
          });
      };
 //자물쇠 상태변경
 const lockChange = () => {
    if (!moojeeg) {
      if (lock === faLock) {
        setLock(faLockOpen);
      } else {
        setLock(faLock);
      }
    }
  }
    const logOut = () => {
        if (!isMoojeegEnabled) {
            setLoginCheck(false);
        } else {
          Alert.alert('알림', '무적 모드 상태에서는 로그아웃할 수 없습니다.');
        }
    }

    const handleButtonClick = (onPress) => {
      if (loginCheck) {
        onPress();
      } else {
        Alert.alert('알림', '로그인 후 이용바랍니다.');
      }
    };

    const askToDisableMoojeeg = () => {
        Alert.alert(
            '무적 모드 해제',
            '무적 모드를 해제하시겠습니까?',
            [
                {
                    text: '확인',
                    onPress: () => {
                        setMoojeeg(false);
                        setIsMoojeegEnabled(false);
                        setMoo(false);
                    },
                },
                {
                    text: '아니요',
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    }

      //카테고리 버튼
    const MainButton = ({name,onPress,keyProp}) => (
        <TouchableOpacity style={styles.mainButton} key={keyProp} onPress={() => handleButtonClick(onPress)}>
            <View>
                <Text style={{color:'#fff',fontSize:15}}>{name}</Text>
            </View>
        </TouchableOpacity>
    )


        //무적 비번입력 창
    const checkPassword = () => {

        if (moojeegpw === '1') { // 여기에 비번
            setIsMoojeegEnabled(true);
            setIsEnteringPassword(false);
            setMoojeeg(true);
            setMooJeegPw('');
            setMoo(true);
        } else {
            Alert.alert('알림', '올바른 비밀번호를 입력하세요.');
        }
    }

    //무적 켜게
    const moojeegOn = () => {
        if (isMoojeegEnabled === true){
            if(moo === true){
            // 이미 무적 모드가 활성화되어 있을 때 해제를 물어봅니다.
            askToDisableMoojeeg();
        }
        setIsMoojeegEnabled(!isMoojeegEnabled);
    }else {
            // 무적 모드가 활성화되어 있지 않으면 활성화합니다.
            setIsEnteringPassword(true);
            setLock(faLock);
            setIsMoojeegEnabled(true);
        }
    }

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.headerBar}>
                    <View style={styles.headerBars}>
                        <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                            <Text style={[styles.headerBarText,{fontSize:16,marginTop:7}]}>{loginCheck ? {idText}+'님 환영합니다': '로그인을 해주세요.'}</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', marginTop:5,}}>
            {loginCheck ? (<TouchableOpacity style={styles.logOut} onPress={logOut}>
                                <Text style={{fontSize:10,color:'blue'}}>로그아웃</Text>
                            </TouchableOpacity>) : ''}
                        <TouchableOpacity
                          onPress={() => {
                            if (loginCheck) {
                              navigation.navigate('Usagedetails');
                            } else {
                              Alert.alert('알림', '로그인 후 이용바랍니다.');
                            }
                        }}
                        style={{position:'absolute', right:0}} >
                            <Text style={[styles.headerBarText]}>이용내역</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.mainTitle}>
                    <Text style={styles.mainText}>스마트 도어락</Text>
                </View>
                <View style={styles.mainTitle}>
                    <TouchableOpacity onPress={()=>{
                        if(loginCheck) {
                            lockChange()
                            }else{
                                Alert.alert('알림', '로그인 후 이용합니다.')
                            }
                        }}>
                        <View style={[styles.lockToll,{borderColor: moojeeg ? 'red' : '#7D74E4'}]}>
                            <View>
                            <TouchableOpacity  onPress={handleOpenDoor}>
                                <FontAwesomeIcon icon={lock} style={{ color: moojeeg ? 'red' : '#7D74E4' }} size={40} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {/* {isMoojeegEnabled && <MooJeegPw value={moojeegpw} onChangeText={handelMooJeegPwchange} />} */}
                    {isMoojeegEnabled && <View>
            {isEnteringPassword && (
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <TextInput
                        style={styles.moojeegpw}
                        placeholder='비밀번호를 입력해주세요.'
                        secureTextEntry={true}
                        onChangeText={handelMooJeegPwchange}
                        value={moojeegpw}
                    />
                    <TouchableOpacity onPress={checkPassword} style={{width:50,height:30,backgroundColor:'#7D74E4',justifyContent:'center',alignItems:'center',borderRadius:5,marginLeft:10,marginTop:15}}>
                        <Text style={{color:'#fff'}}>확인</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View> }
                </View>
                <View style={styles.mainButtonToll}>
                    <MainButton name={'임시비밀번호'} onPress={()=>navigation.navigate('TemporaryPw')} />
                    <MainButton name={'무적'} onPress={moojeegOn}/>
                </View>
                <View style={styles.mainButtonToll}>
                    <MainButton name={'비밀번호 관리'} key={'pwState'} onPress={()=>{navigation.navigate('pwState')}} />
                    <MainButton name={'예약'} onPress={()=>navigation.navigate('Reservation')}/>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                    <TouchableOpacity style={styles.useBtn} onPress={()=>{navigation.navigate('UseBook')}}>
                        <Text style={{fontSize:14, color:'#fff', fontWeight:'700'}}>이용백서</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                    <TouchableOpacity style={styles.useBtn} onPress={()=>{navigation.navigate('WebSocketComponent')}}>
                        <Text style={{fontSize:14, color:'#fff', fontWeight:'700'}}>웹소켓</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.mainTitle,{marginHorizontal:20,marginTop:'20%'}]}>
                    <Text style={{color:'#333',fontSize:10}}>안녕하세요. 스마트도어락입니다 저희 스마트도어락으로 안전하게 지키세요!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerBar: {
        width:"100%",
        height:60,
        backgroundColor:'#7D74E4'
    },
    headerBars: {
        marginHorizontal:20
    },
    headerBarText: {
        color:'#fff',
    },
    mainTitle: {
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    mainText: {
        color:'#000',
        fontSize:18,
    },
    lockToll: {
        width:120,
        height:120,
        borderColor:'#7D74E4',
        borderWidth:3,
        borderRadius:70,
        alignItems:'center',
        justifyContent:'center'
    },
    mainButton: {
        width:'40%',
        height:50,
        backgroundColor:'#7D74E4',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#D9D9D9',
        borderWidth:2,
        margin:20
    },
    mainButtonToll: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    logOut: {
        width:80,
        height:20,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    useBtn: {
        width:200,
        height:40,
        backgroundColor:'#7D74E4',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    moojeegpw: {
        width: 250,
        height: 35,
        borderColor: '#7D74E4',
        borderWidth: 2,
        paddingHorizontal: 8,
        marginTop: 16,
        fontSize: 14,
        padding: 3,
        borderRadius: 5,
    }
});

export default Main