import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
} from '@chatscope/chat-ui-kit-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// TODO Image 어떻게 줘야 돼...
function ChattingRoom({ target }) {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [log, setLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const [cookies, setCookies, removeCookies] = useCookies();
    const [msgList, setMsgList] = useState([]);
    const [image, setImage] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const ws = useRef(null);

    useEffect(() => {
        setMsgList([]);
        if (target.length > 0) {
            axios
                .get(`/chat/log?to=${target}`)
                .then((response) => {
                    console.log(response);
                    const list = [...response.data.chatList];
                    let chatList = [];
                    list.forEach((chat) => {
                        let data;
                        if (chat.type === 'TEXT') {
                            data = {
                                message: chat.message,
                                type: 'text',
                                direction:
                                    chat.target === target
                                        ? 'outgoing'
                                        : 'incoming',
                                sentTime: chat.sentTime,
                            };
                        } else {
                            data = {
                                type: 'image',
                                image: chat.image,
                                direction:
                                    chat.target === target
                                        ? 'outgoing'
                                        : 'incoming',
                                sentTime: chat.sentTime,
                            };
                        }
                        chatList.push(data);
                    });
                    setMsgList(chatList);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [target]);

    useEffect(() => {
        console.log(msgList);
    }, [msgList]);

    useEffect(() => {
        if (imageSrc !== '') {
            send('image');
        }
    }, [imageSrc]);

    useEffect(() => {
        if (socketData !== undefined) {
            const list = [...msgList];
            list.push({
                type: socketData.type === 'text' ? 'text' : 'image',
                message: socketData.message,
                direction: 'incoming',
                setnTime: String(new Date()),
            });
            setMsgList(list);
        }
    }, [socketData]);

    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket(
            `ws://localhost:8080/chat/room/${cookies.nickname}?t=${cookies.SKAT}`
        );
        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        };
    });

    const send = useCallback((type) => {
        if (!log) {
            webSocketLogin();
            setLog(true);
        }

        if (message !== '' && type !== 'image') {
            const data = {
                from: cookies.nickname,
                type: 'text',
                message,
                target,
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
            const data = {
                from: cookies.nickname,
                type: 'image',
                data: image,
                target,
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
        }
        const list = [...msgList];
        if (message !== '' && type !== 'image') {
            const currentMsg = {
                message,
                type: 'text',
                direction: 'outgoing',
                sentTime: String(new Date()),
            };
            list.push(currentMsg);
        } else {
            const currentMsg = {
                type: 'image',
                image: imageSrc,
                direction: 'outgoing',
                sentTime: String(new Date()),
            };
            list.push(currentMsg);
        }
        setMsgList(list);
        setMessage('');
        setImage('');
    });

    const onImageBtnClick = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (_) => {
            let files = Array.from(input.files);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            setImage(files[0]);
        };
        input.click();
    };

    return (
        <>
            {target !== '' && (
                <div className="relative h-full">
                    <MainContainer>
                        <ChatContainer>
                            <MessageList>
                                {msgList.map((m, idx) =>
                                    m.type === 'image' ? (
                                        <Message
                                            key={idx}
                                            model={{
                                                direction: m.direction,
                                                sentTime: m.sentTime,
                                                position: 'last',
                                            }}
                                        >
                                            <Message.ImageContent
                                                src={m.image}
                                                alt={`img${idx}`}
                                                width={200}
                                            />
                                        </Message>
                                    ) : (
                                        <Message
                                            key={idx}
                                            model={{
                                                message: m.message,
                                                sentTime: m.sentTime,
                                                direction: m.direction,
                                                position: 'last',
                                            }}
                                        />
                                    )
                                )}
                            </MessageList>
                            <MessageInput
                                placeholder="메시지를 입력해주세요."
                                value={message}
                                onChange={(val) => setMessage(val)}
                                onSend={() => send()}
                                onAttachClick={onImageBtnClick}
                                attachButton={false}
                            />
                        </ChatContainer>
                    </MainContainer>
                </div>
            )}
        </>
    );
}
export default ChattingRoom;
