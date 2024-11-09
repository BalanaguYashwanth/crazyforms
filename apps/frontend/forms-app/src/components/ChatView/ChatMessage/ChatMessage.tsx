import ReactMarkdown from 'react-markdown';
import { ChatMessageProps } from '../../../common/types';
import './ChatMessage.scss'

const ChatMessage = ({ message, url, alt }: ChatMessageProps) => {
    return (
        <div className="flex-center">
            <img
                width='30px'
                height='30px'
                src={url}
                alt={alt}
            />
            <ReactMarkdown className="flex-column">{message}</ReactMarkdown>
        </div>
    )
}

export default ChatMessage;