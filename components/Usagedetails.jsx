//이용내역 페이지
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function Usagedetails() {

    const [data,setData] = useState([
        {
            state : false,
            day : '2023/07/23',
            time : '19:02'
        },
        {
            state : true,
            day : '2023/07/21',
            time : '09:02'
        },
        {
            state : true,
            day : '2022/01/21',
            time : '07:02'
        }
    ])

    const [updown,setUpDown] = useState(false);

    const updownBtn = () => {

        const sortedData = updown
          ? [...data].sort((a, b) => (a.day > b.day ? 1 : -1))
          : [...data].sort((a, b) => (a.day > b.day ? -1 : 1));

        setData(sortedData);
        setUpDown(!updown);
    };

    const ReadBox = ({ item }) => (
        <View style={styles.readBox}>
          <Text style={[styles.statusText, { color: item.state ? 'red' : 'blue' }]}>
            {item.state ? 'OPEN' : 'CLOSE'}
          </Text>
          <View>
            <Text style={[styles.textStyle, { fontSize: 16 }]}>{item.day}</Text>
            <Text style={{ alignSelf: 'flex-end', color: '#000', fontSize: 12 }}>{item.time}</Text>
          </View>
        </View>
    );

    return(
        <SafeAreaView>

                <View style={styles.container}>
                    <Text style={styles.containerText}>이용내역</Text>
                </View>
                <TouchableOpacity onPress={updownBtn} style={styles.updownBtn}>
                    <Text style={{fontSize:12, color:'#868e96'}}>{updown ? '오른차순' : '내림차순'}</Text>
                </TouchableOpacity>
                <View>
                <FlatList
                   data={data}
                   renderItem={ReadBox}
                   contentContainerStyle={{width:'100%'}}
                />
                </View>

        </SafeAreaView>
    )
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
    updownBtn: {
        marginHorizontal:20,
        marginTop:10,
        alignSelf:'flex-end'
    },
    readBox: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginTop:15
    },
    textStyle: {
        color:'#000',
    },
})

export default Usagedetails