export const initialConversations = [
  {
    id: 'orion',
    name: 'Orion',
    initials: 'O',
    preview: 'Can’t wait to see you ♡',
    time: '9:41',
    messagesToSend: [
      { text: 'What are you doing right now? ♡', from: 'me', time: '9:42' },
      { text: 'I was just thinking about you.', from: 'me', time: '9:45' },
      { text: 'Tell me about your day ✨', from: 'me', time: '9:48' },
    ],
    messageIndex: 0,
    replies: [
      { text: 'Tell me more about it ♡', from: 'them', time: '9:43' },
      { text: 'I’m always happy when we get to talk.', from: 'them', time: '9:46' },
      { text: 'You make my day better too ✨', from: 'them', time: '9:49' },
    ],
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
    messagesToSend: [
      { text: 'I made this little place for us ♡', from: 'me', time: 'Yesterday' },
      { text: 'What should we add next?', from: 'me', time: 'Yesterday' },
    ],
    messageIndex: 0,
    replies: [
      { text: 'I’m glad you like it! ♡', from: 'them', time: 'Yesterday' },
      { text: 'We should add more memories soon.', from: 'them', time: 'Yesterday' },
    ],
    replyIndex: 0,
    messages: [
      { id: 1, text: 'This little place is so cute!', from: 'them', time: 'Yesterday' },
    ],
  },
]
