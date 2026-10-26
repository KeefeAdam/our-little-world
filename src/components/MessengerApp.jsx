import { useEffect, useState } from 'react'
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
    replies: ['I’m glad you like it! ♡', 'We should add more memories soon.'],
    replyIndex: 0,
    messages: [
      { id: 1, text: 'This little place is so cute!', from: 'them', time: 'Yesterday' },
    ],
  },
]

export default function MessengerApp({ onBack }) {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(null)
  const [typingConversationId, setTypingConversationId] = useState(null)
  const activeConversation = conversations.find(chat => chat.id === activeId)

  useEffect(() => {
    if (!typingConversationId) return undefined
    const timer = setTimeout(() => {
      const time = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date())
      setConversations(current => current.map(chat => {
        if (chat.id !== typingConversationId) return chat
        const text = chat.replies[chat.replyIndex]
        return {
          ...chat,
          preview: text,
          time,
          replyIndex: (chat.replyIndex + 1) % chat.replies.length,
          messages: [...chat.messages, { id: Date.now(), text, from: 'them', time }],
        }
      }))
      setTypingConversationId(null)
    }, 1300)
    return () => clearTimeout(timer)
  }, [typingConversationId])

  const startReply = () => {
    if (!typingConversationId) setTypingConversationId(activeId)
  }

  const back = () => {
    if (activeId) {
      setActiveId(null)
      setTypingConversationId(null)
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
        <div className="message-list">
          {activeConversation.messages.map(message => <div key={message.id} className={`message-row ${message.from === 'me' ? 'message-own' : ''}`}>
            {message.from === 'them' && <span className="chat-avatar chat-avatar-small">{activeConversation.initials}</span>}
            <div className="message-bubble"><p>{message.text}</p><small>{message.time}</small></div>
          </div>)}
          {typingConversationId === activeId && <div className="message-row typing-row" aria-label={`${activeConversation.name} is typing`}>
            <span className="chat-avatar chat-avatar-small">{activeConversation.initials}</span>
            <div className="typing-bubble"><span /><span /><span /></div>
          </div>}
        </div>
        <div className="message-composer">
          <button className="message-prompt" onClick={startReply} disabled={typingConversationId === activeId} aria-label="Tap to get a reply">
            <span>{typingConversationId === activeId ? 'They are typing...' : 'Tap here to write a message...'}</span>
            <Send size={16} />
          </button>
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
