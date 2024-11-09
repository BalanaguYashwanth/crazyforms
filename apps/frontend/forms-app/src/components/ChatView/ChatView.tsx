import { useEffect, useState } from 'react';
import { ChatProps, MessageProps } from '../../common/types';
import { fetchMessageAgent } from '../../common/api.service';
import { getInitialChat, restructureChatsAsPerLLMInput } from '../../common/helper';
import { IMAGE } from '../../common/constants';
import ChatMessage from './ChatMessage/ChatMessage';
import './ChatView.scss';

const ChatView = ({ data }: { data: ChatProps[] }) => {
    const initialChatData = getInitialChat(data);
    const [userText, setUserText] = useState<string>('');
    const [processing, setProessing] = useState(false);
    const [chats, setChats] = useState<ChatProps[]>([{ ...initialChatData }]);

    const fetchResponseFromAgent = async () => {
        const messages: MessageProps[] = restructureChatsAsPerLLMInput(chats);
        return fetchMessageAgent(messages);
    };

    const updatedAgentResponse = async () => {
        const agentText = await fetchResponseFromAgent();
        chats[chats.length - 1].agent = agentText || '';
        setChats([...chats]);
        setProessing(false);
    };

    const handleChats = async () => {
        setChats([...chats, { id: chats.length, user: userText || '', agent: '' }]);
        setUserText('');
        setProessing(true);
    };

    const handleUserText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserText(e.target.value);
    };

    const modifyPreviewChats = (chatData: ChatProps[]): ChatProps[] => {
        return chatData.length >= 1 ? chatData.slice(1) : chatData;
    };

    useEffect(() => {
        if (chats[chats.length - 1].user && processing) {
            updatedAgentResponse();
        }
    }, [processing]);

    return (
        <form className="chatContainer" onSubmit={e => {
            e.preventDefault();
            handleChats();
        }}>
            <article className="chatBody">
                {
                    modifyPreviewChats(chats).map((chat, index) => (
                        <article className="flex-between" key={`chat-${index}`}>
                            <ChatMessage message={chat.user} url={IMAGE.USER} alt="user" />
                            <ChatMessage message={chat.agent} url={IMAGE.AGENT} alt="agent" />
                        </article>
                    ))
                }
            </article>
            <article className="chatSection">
                <input
                    value={userText || ''}
                    placeholder='Enter "summarise" it'
                    className="innerSpacing"
                    onChange={handleUserText}
                />
                <button type="submit" className="innerSpacing">Submit</button>
            </article>
        </form>
    );
};

export default ChatView;
