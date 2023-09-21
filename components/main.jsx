//메인 페이지
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


function Main({navigation}){

    const [lock,setLock] = useState(faLock);
    const [moojeeg,setMoojeeg] = useState(false);

    const [loginCheck, setLoginCheck] = useState(true);

    const logOut = () => {
        setLoginCheck(loginCheck === false);
    }
  
    const handleButtonClick = (onPress) => {
      if (loginCheck) {
        onPress();
      } else {
        Alert.alert('알림', '로그인 후 이용바랍니다.');
      }
    };

    const lockChange = () => {
        if (!moojeeg) { 
          if (lock === faLock) {
            setLock(faLockOpen);
          } else {
            setLock(faLock);
          }
        }
      }

    const MainButton = ({name,onPress,keyProp}) => (
        <TouchableOpacity style={styles.mainButton} key={keyProp} onPress={() => handleButtonClick(onPress)}>
            <View>
                <Text style={{color:'#fff',fontSize:15}}>{name}</Text>
            </View>
        </TouchableOpacity>
    )

    const moojeegOn = () => {
        setMoojeeg(!moojeeg);
        setLock(faLock);
    }

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.headerBar}>
                    <View style={styles.headerBars}>
                        <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                            <Text style={[styles.headerBarText,{fontSize:16,marginTop:7}]}>{loginCheck ? '홍길동님 반갑습니다.' : '로그인을 해주세요.'}</Text>
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
                                <FontAwesomeIcon icon={lock} style={{ color: moojeeg ? 'red' : '#7D74E4' }} size={35} />
                            </View>
                        </View>
                    </TouchableOpacity>
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
    }
})

export default Main