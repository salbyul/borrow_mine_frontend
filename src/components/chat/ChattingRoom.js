import { useCallback, useEffect, useRef, useState } from 'react';

// TODO target에 새로 들어온 target값 확인 나머진 모두 복사본
// 채팅을 보낼때마다 토큰값을 확인해야하는가
function ChattingRoom({ target }) {
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [chat, setChat] = useState([]);
    const [log, setLog] = useState(false);
    const [socketData, setSocketData] = useState();

    const ws = useRef(null);

    useEffect(() => {
        if (socketData !== undefined) {
            const tempData = chat.concat(socketData);
            console.log(tempData);
            setChat(tempData);
        }
    }, [socketData]);

    const onText = (e) => {
        console.log(e.target.value);
        setMsg(e.target.value);
    };

    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket('ws://localhost:8080/chat');

        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        };
    });

    const send = useCallback(() => {
        if (!log) {
            if (name === '') {
                alert('이름을 입력하세요.');
                document.getElementById('name').focus();
                return;
            }
            webSocketLogin();
            setLog(true);
        }

        if (msg !== '') {
            const data = {
                name,
                msg,
                data: new Date().toLocaleString(),
            };

            const temp = JSON.stringify(data);

            if (ws.current.readyState === 0) {
                ws.current.onopen = () => {
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                };
            } else {
                ws.current.send(temp);
            }
        } else {
            alert('메시지를 입력하세요.');
            document.getElementById('msg').focus();
            return;
        }
        setMsg('');
    });

    const msgBox = chat.map((item, idx) => {
        <div key={idx} className={item.name === name ? 'me' : 'other'}>
            <span>
                <b>{item.name}</b>
            </span>{' '}
            [ {item.date} ]<br />
            <span>{item.msg}</span>
        </div>;
    });

    return (
        <>
            <div>
                <div>
                    <h1>WebSocket Chatting</h1>
                    <br />
                    <div>
                        <div></div>
                        {msgBox}
                    </div>
                    <input
                        type="text"
                        disabled={log}
                        placeholder="이름을 입력하세요."
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div>
                        <textarea
                            id="msg"
                            value={msg}
                            onChange={onText}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    send();
                                }
                            }}
                        />
                        <input type="button" value="전송" onClick={send} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default ChattingRoom;
