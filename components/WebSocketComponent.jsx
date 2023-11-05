import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

class WebSocketComponent extends Component {
  constructor(props) {
    super(props);

    // WebSocket 서버의 주소를 지정
    this.webSocket = new WebSocket("ws://port-0-door-lock-server-jvpb2alnwnfxkw.sel5.cloudtype.app/");

    // WebSocket 이벤트 리스너 등록
    this.webSocket.onopen = () => {
      console.log("웹소켓 서버와 연결 성공");
    };

    this.webSocket.onmessage = (event) => {
      console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`);
      // 여기에서 메시지를 처리하거나 React state를 업데이트할 수 있습니다.
    };

    this.webSocket.onclose = (event) => {
      console.log("서버 웹소켓 연결 종료");
      console.log(event.reason);
    };

    this.webSocket.onerror = (error) => {
      console.error(error);
    };

    // 컴포넌트 상태 초기화
    this.state = {
      message: '',
    };
  }

  // 메시지 보내기
  sendMessage = () => {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(this.state.message);
      this.setState({ message: '' });
    } else {
      Alert.alert("알림", "연결된 웹소켓 서버가 없습니다.");
    }
  };
  closeWebSocket = () => {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.close();
    } else {
      Alert.alert("알림", "연결된 웹소켓 서버가 없습니다.");
    }
  };

  render() {
    return (
      <View>
        <Text>웹소켓 테스트</Text>

        {/* TextInput으로 메시지 입력 */}
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="메시지 입력"
          value={this.state.message}
          onChangeText={(text) => this.setState({ message: text })}
        />

        {/* 메시지 전송 버튼 */}
        <Button title="메시지 전송" onPress={this.sendMessage} />

        {/* 연결 끊기 버튼 */}
        <Button title="연결 끊기" onPress={this.closeWebSocket} />
      </View>
    );
  }
}

export default WebSocketComponent;