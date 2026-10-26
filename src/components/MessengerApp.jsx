import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import AppHeader from './AppHeader.jsx'
import StatusBar from './StatusBar.jsx'

const initialConversations = [
  {
    id: 'orion',
    name: 'Orion',
    initials: 'O',
    preview: 'Can’t wait to see you ♡',
    time: '9:41',
    messagesToSend: ['What are you doing right now? ♡', 'I was just thinking about you.', 'Tell me about your day ✨'],
    messageIndex: 0,
    replies: ['Tell me more about it ♡', 'I’m always happy when we get to talk.', 'You make my day better too ✨'],
    replyIndex: 0,
    messages: [
      { id: 1, text: 'Hey, how was your day?', from: 'them', time: '9:38' },
      { id: 2, text: 'It got better when you texted ♡', from: 'me', time: '9:39' },
      { id: 3, text: 'Can’t wait to see you ♡', from: 'them', time: '9:41' },
    ],
  },
  {
    id: 'aleyna',
    name: 'Aleyna',
    initials: 'A',
    preview: 'This little place is so cute!',
    time: 'Yesterday',
    messagesToSend: ['I made this little place for us ♡', 'What should we add next?'],
    messageIndex: 0,
    replies: ['I’m glad you like it! ♡', 'We should add more memories soon.'],
    replyIndex: 0,
    messages: [
      { id: 1, text: 'This little place is so cute!', from: 'them', time: 'Yesterday' },
    ],
  },
]

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

export default function MessengerApp({ onBack }) {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(null)
  const [chatFlow, setChatFlow] = useState(null)
  const [typedMessage, setTypedMessage] = useState('')
  const messageListRef = useRef(null)
  const activeConversation = conversations.find(chat => chat.id === activeId)
  const hasMoreMessages = activeConversation
    ? activeConversation.messageIndex < activeConversation.messagesToSend.length &&
      activeConversation.replyIndex < activeConversation.replies.length
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

    if (chatFlow.phase === 'me' && typedMessage.length < chatFlow.message.length) {
      const timer = setTimeout(() => {
        setTypedMessage(chatFlow.message.slice(0, typedMessage.length + 1))
      }, 55)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      const time = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date())
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
              preview: chatFlow.message,
              time,
              messageIndex: chat.messageIndex + 1,
              messages: [...chat.messages, { id: Date.now(), text: chatFlow.message, from: 'me', time }],
            }
          : chat))
        setChatFlow(current => current?.conversationId === chatFlow.conversationId
          ? { ...current, phase: 'them' }
          : current)
        return
      }

      setConversations(current => current.map(chat => chat.id === chatFlow.conversationId
        ? {
            ...chat,
            preview: chatFlow.reply,
            time,
            replyIndex: chat.replyIndex + 1,
            messages: [...chat.messages, { id: Date.now(), text: chatFlow.reply, from: 'them', time }],
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
      reply: activeConversation.replies[activeConversation.replyIndex],
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
      <AppHeader title={activeConversation.name} onBack={back} subtitle="Our little chat" />
      <div className="messenger-thread">
        <div className="chat-date">TODAY</div>
        <div className="message-list" ref={messageListRef}>
          {activeConversation.messages.map(message => <div key={message.id} className={`message-row ${message.from === 'me' ? 'message-own' : ''}`}>
            {message.from === 'them' && <span className="chat-avatar chat-avatar-small">{activeConversation.initials}</span>}
            <div className="message-bubble"><p>{message.text}</p><small>{message.time}</small></div>
          </div>)}
          {chatFlow?.conversationId === activeId && ['me', 'sending'].includes(chatFlow.phase) && <div className="message-row message-own" aria-label={chatFlow.phase === 'me' ? 'You are typing' : 'Your message was sent'}>
            <div className="message-bubble"><p>{chatFlow.phase === 'me' ? 'Typing...' : chatFlow.message}</p></div>
          </div>}
          {chatFlow?.conversationId === activeId && chatFlow.phase === 'them' && <div className="message-row typing-row" aria-label={`${activeConversation.name} is typing`}>
            <span className="chat-avatar chat-avatar-small">{activeConversation.initials}</span>
            <div className="typing-bubble"><span /><span /><span /></div>
          </div>}
        </div>
        <div className="message-composer">
          <button className="message-prompt" onClick={startReply} disabled={Boolean(chatFlow) || !hasMoreMessages} aria-label={!hasMoreMessages ? 'No more messages' : 'Tap to start a conversation'}>
            <span>{chatFlow?.phase === 'me' ? `${typedMessage ? `: ${typedMessage}` : '...'}` : chatFlow?.phase === 'sending' ? 'Sending...' : chatFlow?.phase === 'them' ? 'They are typing...' : hasMoreMessages ? 'Tap here to write a message...' : 'No more messages'}</span>
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
          <div><h3>Our conversations</h3><p>Little messages, just between us.</p></div>
        </div>
        <p className="messenger-section-label">MESSAGES</p>
        <div className="conversation-list">
          {conversations.map(chat => <button key={chat.id} className="conversation-row" onClick={() => setActiveId(chat.id)}>
            <span className={`chat-avatar ${chat.id === 'orion' ? 'avatar-orion' : ''}`}>{chat.initials}</span>
            <span className="conversation-info"><b>{chat.name}</b><small>{chat.preview}</small></span>
            <span className="conversation-time">{chat.time}</span>
          </button>)}
        </div>
        <p className="messenger-demo-note">Tap the message box to see a sample reply. Chats are only a demo.</p>
      </div>
    </>}
  </div>
}
