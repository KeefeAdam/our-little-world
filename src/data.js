export const DEMO_PASSCODE = '1902' // Temporary demo code; replace with a meaningful number.

export const apps = [
  { id: 'gallery', label: 'Gallery', icon: '▧', tone: 'rose' },
  { id: 'calendar', label: 'Calendar', icon: '31', tone: 'cream' },
  { id: 'music', label: 'Music', icon: '♫', tone: 'blue' },
  { id: 'notes', label: 'Notes', icon: '☷', tone: 'sage' },
  { id: 'messenger', label: 'Messenger', icon: '◌', tone: 'lavender' },
  { id: 'mystery', label: 'Mystery', icon: '✦', tone: 'gold' },
]

export const albums = [
  { id: 'layouts', title: 'Our Layouts', date: 'What we have so far', photos: [
    { title: "Anna's Layout", caption: 'For her birthday', symbol: '♡', src: '/images/gallery/layout/1.png' },
    { title: "Anna's Layout", caption: 'For her birthday', symbol: '♡', src: '/images/gallery/layout/2.png' },
    { title: "Our Cool Layout", caption: 'Finally become a couple', symbol: '♡', src: '/images/gallery/layout/3.png' },
    { title: "Our Warm Layout", caption: 'Finally become a couple', symbol: '♡', src: '/images/gallery/layout/4.png' },
  ]},
  { id: 'terryanna', title: "Terryanna's House", date: 'Edited photos for Terry and Anna', photos: [
    { title: 'From Terry', caption: 'To cheer Anna up!', symbol: '♡', src: '/images/gallery/terryanna/1.png' },
    { title: 'Green Couple', caption: 'Terry and Anna together', symbol: '✧', src: '/images/gallery/terryanna/2.png' },
  ]},
  { id: 'chibis', title: 'Our Chibis', date: 'Our representative chibis', photos: [
    { title: 'Orion', caption: 'All about Orion', symbol: '☾', src: '/images/gallery/chibi/1.png' },
    { title: 'Aleyna', caption: 'All about Aleyna', symbol: '✧', src: '/images/gallery/chibi/2.png' },
  ]},
  { id: 'favorites', title: 'Our Favorites', date: 'Selected memories', photos: [
    { title: 'One', caption: 'First favorite', symbol: '☾', src: '/images/gallery/favorites/1.png' },
    { title: 'Two', caption: 'Second favorite', symbol: '✧', src: '/images/gallery/favorites/2.png' },
  ]},
]

export const calendarEvents = [
  { date: '2026-10-05', title: 'A little milestone', note: 'Replace with a date that matters to you both.' },
  { date: '2026-10-09', title: 'Our first date', note: 'Add a memory, a photo, or a small message.' },
  { date: '2026-11-05', title: 'One month of us', note: 'Our first month anniversary.' },
]

export const playlists = [
  {
    id: 'our-soundtrack',
    title: 'Our Little Soundtrack',
    description: 'The songs that tell our story.',
    tracks: [
      { title: 'Butterflies', artist: 'JVKE (ft. Taehyun and Chaewon)', src: '/audio/butterflies.mp3', note: 'Why does this song remind you of Orion?' },
    ],
  },
  {
    id: 'songs-for-us',
    title: 'Songs That Feel Like Us',
    description: 'A few songs to keep close.',
    tracks: [
      { title: 'Take My Half', artist: 'Choi Beomgyu', src: '/audio/take-my-half.mp3', note: 'Add the story behind this song.' },
    ],
  },
]

export const notes = [
  { id: 'welcome', title: 'A little note for you', date: 'Our first month', body: 'Dear Orion,\\n\\nThis little place is made for the memories we have already made, and the ones we have yet to make.\\n\\nReplace this sample with your own words.\\n\\nLove, Aleyna ♡', clue: false },
  { id: 'clue-one', title: 'Something to remember', date: 'Saved note', body: 'Some dates hold more than a number. Look through Our Days to find the next piece.', clue: true },
]

export const finalLetter = `Dear Orion,

One month is only the beginning of our story. I made this little world so we could keep a piece of our memories somewhere, and come back to it whenever we want.

Thank you for being part of my days. I hope we get to fill this place with so many more little moments.

Happy first month, my love.

Love,
Aleyna ♡`
