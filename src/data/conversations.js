export const initialConversations = [
  {
    id: 'orion',
    name: 'Orion',
    initials: 'O',
    profileImage: '/images/gallery/terryanna/5.jpg',
    preview: 'Knock knock?',
    clue: 'ing',
    date: '2026-11-04',
    time: '03:18',
    messagesToSend: [
      { text: 'Do you want to build a snowman?', from: 'me', replyIndex: 0, date: '2026-08-04', time: '03:20' },
      { text: 'Okay, bye.', from: 'me', replyIndex: null, date: '2026-08-04', time: '03:25' },
      { text: 'Why are you still awake, TH? Or you just woke up?', from: 'me', replyIndex: 1, date: '2026-08-04', time: '03:27' },
      { text: 'You are a morning person huh? Do you have something to do at this hour, TH? me? I cant sleep and not sleepy at all too.', from: 'me', replyIndex: 2, date: '2026-08-04', time: '03:36' },
    ],
    messageIndex: 0,
    replies: [
      { text: 'Go away, Anna noona.', from: 'them', date: '2026-08-04', time: '03:24' },
      { text: 'I just woke up, actually. How about you, noona? Why are you still awake?', from: 'them', date: '2026-08-04', time: '03:33' },
      { text: 'I feel like i\'m more of a night person.... Ah, nope. I have nothing to do except count sheep until i fall asleep again. Why cant you sleep, noona? Do you have something to do?', from: 'them', date: '2026-08-04', time: '03:47' },
    ],
    replyIndex: 0,
    messages: [
      { id: 1, text: 'Knock knock?', from: 'me', date: '2026-08-04', time: '03:14' },
      { id: 2, text: 'Who\'s there?', from: 'them', date: '2026-08-04', time: '03:18' },
    ],
  },
  {
    id: 'aleyna',
    name: 'Aleyna',
    initials: 'A',
    profileImage: '/images/gallery/terryanna/4.jpg',
    preview: 'This little place is so cute!',
    date: '2026-11-03',
    time: '18:30',
    messagesToSend: [
      { text: 'I made this little place for us ♡', from: 'me', date: '2026-11-03', time: '18:35' },
      { text: 'What should we add next?', from: 'me', date: '2026-11-03', time: '18:40' },
    ],
    messageIndex: 0,
    replies: [
      { text: 'I’m glad you like it! ♡', from: 'them', date: '2026-11-03', time: '18:36' },
      { text: 'We should add more memories soon.', from: 'them', date: '2026-11-03', time: '18:42' },
    ],
    replyIndex: 0,
    messages: [
      { id: 1, text: 'This little place is so cute!', from: 'them', date: '2026-11-03', time: '18:30' },
    ],
  },
]
