import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import AppHeader from './AppHeader.jsx'
import StatusBar from './StatusBar.jsx'
import { initialConversations } from '../data/conversations.js'

const keyboardRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

function getKeyboardKey(character) {
  if (!character) return null
  if (character === ' ') return 'space'
  if (/[a-z]/i.test(character)) return character.toLowerCase()
  if (character === '?') return 'question'
  if (character === '!') return 'exclamation'
  if (character === '.') return 'period'
  if (character === ',') return 'comma'
  return null
}

function getMessageTime(message) {
  if (message.time) return message.time
  return new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date())
}

function getMessageTimestamp(message, fallbackDate) {
  return new Date(`${message.date || fallbackDate}T${message.time || '00:00'}`).getTime()
}

function formatChatDate(date) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T00:00`))
}

function ProfileImage({ conversation, small = false }) {
  return <span className={`chat-avatar ${small ? 'chat-avatar-small' : ''} ${conversation.id === 'orion' ? 'avatar-orion' : ''}`}>
    <img src={conversation.profileImage} alt={`${conversation.name} profile`} />
  </span>
}

export default function MessengerApp({ onBack }) {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(null)
  const [chatFlow, setChatFlow] = useState(null)
  const [typedMessage, setTypedMessage] = useState('')
  const messageListRef = useRef(null)
  const activeConversation = conversations.find(chat => chat.id === activeId)
  const hasMoreMessages = activeConversation
    ? activeConversation.messageIndex < activeConversation.messagesToSend.length
    : false
  const pressedKey = chatFlow?.phase === 'me'
    ? getKeyboardKey(chatFlow.message[typedMessage.length])
    : null

  useLayoutEffect(() => {
    const messageList = messageListRef.current
    if (messageList) messageList.scrollTop = messageList.scrollHeight
  }, [activeId, activeConversation?.messages.length, chatFlow?.phase])

  useEffect(() => {
    if (!chatFlow) return undefined

    if (chatFlow.phase === 'me' && typedMessage.length < chatFlow.message.text.length) {
      const timer = setTimeout(() => {
        setTypedMessage(chatFlow.message.text.slice(0, typedMessage.length + 1))
      }, 55)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      if (chatFlow.phase === 'me') {
        setChatFlow(current => current?.conversationId === chatFlow.conversationId
          ? { ...current, phase: 'sending' }
          : current)
        return
      }

      if (chatFlow.phase === 'sending') {
        setConversations(current => current.map(chat => chat.id === chatFlow.conversationId
          ? {
              ...chat,
              preview: chatFlow.message.text,
              time: getMessageTime(chatFlow.message),
              messageIndex: chat.messageIndex + 1,
              messages: [...chat.messages, { id: Date.now(), ...chatFlow.message, date: chatFlow.message.date || chat.date, time: getMessageTime(chatFlow.message) }],
            }
          : chat))
        if (chatFlow.reply) {
          setChatFlow(current => current?.conversationId === chatFlow.conversationId
            ? { ...current, phase: 'them' }
            : current)
        } else {
          setChatFlow(null)
          setTypedMessage('')
        }
        return
      }

      setConversations(current => current.map(chat => chat.id === chatFlow.conversationId
        ? {
            ...chat,
            preview: chatFlow.reply.text,
            time: getMessageTime(chatFlow.reply),
            replyIndex: chat.replyIndex + 1,
            messages: [...chat.messages, { id: Date.now(), ...chatFlow.reply, date: chatFlow.reply.date || chat.date, time: getMessageTime(chatFlow.reply) }],
          }
        : chat))
      setChatFlow(null)
      setTypedMessage('')
    }, chatFlow.phase === 'them' ? 1300 : 350)
    return () => clearTimeout(timer)
  }, [chatFlow, typedMessage])

  const startReply = () => {
    if (chatFlow || !activeConversation || !hasMoreMessages) return
    setTypedMessage('')
    setChatFlow({
      conversationId: activeConversation.id,
      phase: 'me',
      message: activeConversation.messagesToSend[activeConversation.messageIndex],
      reply: activeConversation.messagesToSend[activeConversation.messageIndex].replyIndex === null
        ? null
        : activeConversation.replies[
            activeConversation.messagesToSend[activeConversation.messageIndex].replyIndex
              ?? activeConversation.replyIndex
          ],
    })
  }

  const back = () => {
    if (activeId) {
      setActiveId(null)
      setChatFlow(null)
      setTypedMessage('')
    } else {
      onBack()
    }
  }

  return <div className="app-screen screen messenger-screen">
    <StatusBar dark />
    {activeConversation ? <>
      <AppHeader title={activeConversation.name} onBack={back} subtitle="Our little chat" avatar={<ProfileImage conversation={activeConversation} small />} />
      <div className="messenger-thread">
        <div className="message-list" ref={messageListRef}>
          {activeConversation.messages
            .slice()
            .sort((a, b) => getMessageTimestamp(a, activeConversation.date) - getMessageTimestamp(b, activeConversation.date))
            .map((message, index, messages) => <div key={message.id} className={`message-group ${message.from === 'me' ? 'message-group-own' : ''}`}>
              {(index === 0 || message.date !== messages[index - 1].date) && <div className="chat-date">{formatChatDate(message.date || activeConversation.date)}</div>}
              <div className={`message-row ${message.from === 'me' ? 'message-own' : ''}`}>
                {message.from === 'them' && <ProfileImage conversation={activeConversation} small />}
                <div className="message-bubble"><p>{message.text}</p><small>{message.time}</small></div>
              </div>
            </div>)}
          {chatFlow?.conversationId === activeId && ['me', 'sending'].includes(chatFlow.phase) && <div className="message-row message-own" aria-label={chatFlow.phase === 'me' ? 'You are typing' : 'Your message was sent'}>
            <div className="message-bubble"><p>{chatFlow.phase === 'me' ? 'Typing...' : chatFlow.message.text}</p></div>
          </div>}
          {chatFlow?.conversationId === activeId && chatFlow.phase === 'them' && <div className="message-row typing-row" aria-label={`${activeConversation.name} is typing`}>
            <ProfileImage conversation={activeConversation} small />
            <div className="typing-bubble"><span /><span /><span /></div>
          </div>}
        </div>
        <div className="message-composer">
          <button className="message-prompt" onClick={startReply} disabled={Boolean(chatFlow) || !hasMoreMessages} aria-label={!hasMoreMessages ? 'No more messages' : 'Tap to start a conversation'}>
            <span>{chatFlow?.phase === 'me' ? `${typedMessage ? `${typedMessage}` : '...'}` : chatFlow?.phase === 'sending' ? 'Sending...' : chatFlow?.phase === 'them' ? 'They are typing...' : hasMoreMessages ? 'Tap here to write a message...' : 'No more messages'}</span>
            <Send size={16} />
          </button>
          {chatFlow?.phase === 'me' && <div className="phone-keyboard" aria-label="Phone keyboard typing animation">
            <div className="keyboard-suggestions"><span>♡</span><span>{typedMessage || ' '}</span><span>✨</span></div>
            {keyboardRows.map((row, rowIndex) => <div className={`keyboard-row keyboard-row-${rowIndex + 1}`} key={row}>
              {row.split('').map(key => <span className={`keyboard-key ${pressedKey === key ? 'key-pressed' : ''}`} key={key}>{key}</span>)}
            </div>)}
            <div className="keyboard-row keyboard-row-bottom">
              <span className={`keyboard-key keyboard-special ${pressedKey === 'question' ? 'key-pressed' : ''}`}>?123</span>
              <span className={`keyboard-key ${pressedKey === 'comma' ? 'key-pressed' : ''}`}>,</span>
              <span className={`keyboard-key keyboard-space ${pressedKey === 'space' ? 'key-pressed' : ''}`}>English (US)</span>
              <span className={`keyboard-key ${pressedKey === 'period' ? 'key-pressed' : ''}`}>.</span>
              <span className={`keyboard-key keyboard-return ${pressedKey === 'exclamation' ? 'key-pressed' : ''}`}>↵</span>
            </div>
          </div>}
        </div>
      </div>
    </> : <>
      <AppHeader title="Messenger" onBack={onBack} subtitle="A little place to talk" />
      <div className="messenger-content">
        <div className="messenger-welcome">
          <span className="messenger-welcome-icon"><MessageCircle size={21} /></span>
          <div><h3>Our conversations</h3><p>Little messages, just between us.</p><span className="mystery-fragment" aria-label="Mystery password fragment">{conversations.find(chat => chat.clue)?.clue}</span></div>
        </div>
        <p className="messenger-section-label">MESSAGES</p>
        <div className="conversation-list">
          {conversations
            .slice()
            .sort((a, b) => getMessageTimestamp(b, b.date) - getMessageTimestamp(a, a.date))
            .map(chat => <button key={chat.id} className="conversation-row" onClick={() => setActiveId(chat.id)}>
            <ProfileImage conversation={chat} />
            <span className="conversation-info"><b>{chat.name}</b><small>{chat.preview}</small></span>
            <span className="conversation-time">{chat.time}</span>
          </button>)}
        </div>
      </div>
    </>}
  </div>
}
