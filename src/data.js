export const DEMO_PASSCODE = '0408' // Temporary demo code; replace with a meaningful number.
export const MYSTERY_PASSWORD = 'everlasting'

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
    { title: 'Green Couple', caption: 'Terry and Anna together', symbol: '♡', src: '/images/gallery/terryanna/2.png' },
    { title: 'Terryanna - Moodboard', caption: 'Moodboard for Terryanna (us)', symbol: '♡', src: '/images/gallery/terryanna/3.jpg' },
    { title: 'Aley - Moodboard', caption: 'Moodboard for Aleyna', symbol: '♡', src: '/images/gallery/terryanna/4.jpg' },
    { title: 'Orion - Moodboard', caption: 'Moodboard for Orion', symbol: '♡', src: '/images/gallery/terryanna/5.jpg' },
    { title: 'Editan Anna', caption: 'Terryanna as Couple', symbol: '♡', src: '/images/gallery/terryanna/6.png' },
    { title: 'Terryanna Couple', caption: 'We are having a date!', symbol: '♡', src: '/images/gallery/terryanna/7.jpg' },
    { title: 'Terryanna Couple', caption: 'Walking together', symbol: '♡', src: '/images/gallery/terryanna/8.jpg' },
  ]},
  { id: 'chibis', title: 'Our Chibis', date: 'Our representative chibis', photos: [
    { title: 'Aleyna', caption: 'Chibi Birthday from Orion (1)', symbol: '☾', src: '/images/gallery/chibi/1.png' },
    { title: 'Aleyna', caption: 'Chibi Birthday from Orion (2)', symbol: '☾', src: '/images/gallery/chibi/2.png' },
    { title: 'Aleyna', caption: 'Chibi Birthday from Orion (3)', symbol: '☾', src: '/images/gallery/chibi/3.png' },
    { title: 'Terryanna', caption: 'Terryanna Chibi piggyback', symbol: '☾', src: '/images/gallery/chibi/4.jpg' },
    { title: 'Our Family', caption: 'Terryanna with Selfie', symbol: '☾', src: '/images/gallery/chibi/5.png' },
    { title: 'Couple', caption: 'Chibi Terryanna when Orion asks Aleyna to be his girlfriend', symbol: '☾', src: '/images/gallery/chibi/6.jpg' },
    { title: 'Couple', caption: 'Chibi Terryanna when Orion asks Aleyna to be his girlfriend, with our names!', symbol: '☾', src: '/images/gallery/chibi/7.png' },
    { title: 'Orion', caption: 'Cute Bouquet Orion. Aleyna said Yes!', symbol: '☾', src: '/images/gallery/chibi/8.png' },
    { title: 'Selfie', caption: 'Selfie emotes!', symbol: '☾', src: '/images/gallery/chibi/9.png' },
  ]},
  { id: 'favorites', title: 'Our Favorites', date: 'Selected memories', photos: [
    { title: 'One', caption: 'First favorite', symbol: '✧', src: '/images/gallery/favorites/1.jpg' },
    { title: 'Two', caption: 'Second favorite', symbol: '✧', src: '/images/gallery/favorites/2.jpg' },
    { title: 'Three', caption: 'Third favorite', symbol: '✧', src: '/images/gallery/favorites/3.jpg' },
    { title: 'Four', caption: 'Fourth favorite', clue: 'ev', symbol: '✧', src: '/images/gallery/favorites/4.jpg' },
    { title: 'Five', caption: 'Fifth favorite', symbol: '✧', src: '/images/gallery/favorites/5.jpg' },
    { title: 'Six', caption: 'Sixth favorite', symbol: '✧', src: '/images/gallery/favorites/6.jpg' },
  ]},
]

export const calendarEvents = [
  { date: '2026-07-27', title: 'First Kiss', note: 'Day 1 Kissing, Soobin x Beomgyu.', clue: 'st' },
  { date: '2026-08-04', title: "Terryanna's First Meeting", note: 'Knock knock? Do you wanna build a snowman?' },
  { date: '2026-08-05', title: "Terryanna's House", note: 'Orion is the head and Aleyna is the house inspector' },
  { date: '2026-09-04', title: "Something from Orion's heart", note: 'Orion gave Aleyna a carrd' },
  { date: '2026-10-05', title: 'Becoming a Couple', note: 'I am yours, you are mine.' },
  { date: '2026-11-05', title: 'One month of us', note: 'Our first month anniversary.' },
]

export const playlists = [
  {
    id: 'our-soundtrack',
    title: 'Our Little Soundtrack',
    description: 'The songs that tell our story.',
    tracks: [
      { title: 'Butterflies', artist: 'JVKE (ft. Taehyun and Chaewon)', src: '/audio/butterflies.mp3', note: 'Our anthem. A little piece is hidden in the story: la.' },
      { title: 'Kita usahakan rumah itu', artist: 'Sal Priadi', src: '/audio/kita-usahakan-rumah-itu.mp3', note: "Let's build a home together." },
      { title: 'Cintanya aku', artist: 'Tiara Andini, Arsy Widianto', src: '/audio/cintanya-aku.mp3', note: "You are the love of my life." },
      { title: '10,000 hours (With Justin Bieber)', artist: 'Dan + Shay', src: '/audio/10000-hours.mp3', note: "I want to spend forever with you." },
      { title: 'They Dont Know About Us', artist: 'One Direction', src: '/audio/they-dont-know-about-us.mp3', note: "We have something special." },
      { title: 'Little Bit Better', artist: 'Caleb Hearn, ROSIE', src: '/audio/little-bit-better.mp3', note: "We're getting better together." },
      { title: 'Green Tea & Honey', artist: 'Dane Amar, Montemayor', src: '/audio/green-tea-honey.mp3', note: "A sweet and simple love." },
      { title: 'Awal Kisah Selamanya', artist: 'Raisa, Bersena Bestandhi', src: '/audio/awal-kisah-selamanya.mp3', note: "The beginning of our eternal story." },
    ],
  },
  {
    id: 'songs-for-us',
    title: 'Songs That Feel Like Us',
    description: 'A few songs to keep close.',
    tracks: [
      { title: 'Take My Half', artist: 'Choi Beomgyu', src: '/audio/take-my-half.mp3', note: 'Orion, you can take my half. It\'s yours.' },
      { title: 'Scars', artist: 'Keenan Te', src: '/audio/scars.mp3', note: 'Loving you is worth it all.' },
      { title: '1000x', artist: 'Ghea Indrawari', src: '/audio/1000x.mp3', note: 'So lucky to be loved by you.' },
      { title: 'Jatuh sejatuh-jatuhnya', artist: 'Anneth', src: '/audio/jatuh-sejatuh-jatuhnya.mp3', note: 'I fall for you hard' },
      { title: 'Until I Found You', artist: 'Stephen Sanchez, Em Beihold', src: '/audio/until-i-found-you.mp3', note: 'Finally i found you' },
      { title: 'WDYS', artist: 'yedira, asheu', src: '/audio/wdys.mp3', note: 'Let\'s meet tonight. What do you say?' },
    ],
  },
]

export const notes = [
  { id: 'orion-card', title: 'Carrd from Orion', body: 'Something from Orion\'s heart. Check it in this link:', link: 'https://terryanna.carrd.com/#terryanna' },
  { id: 'date-ideas', title: 'Date Ideas', items: [
    'Dengerin Spotify bareng',
    'Makan Fried Chicken bareng',
    'Makan tiramisu cake bareng',
    'Lakuin Diamond Painting bareng',
    'Nonton Barbie (baru pengen hehe)',
  ] },
  { id: 'our-future', title: 'Our Future', body: 'I hope we can build a future together, filled with love, laughter, and endless adventures. I want to be there for you through thick and thin, supporting each other in every way possible. Let\'s create a life that we both dream of, hand in hand, heart to heart.' },
  { id: 'about-orion', title: 'About Orion', items: [
    'Orion loves coffee',
    'Orion loves the color Blue',
    'Orion loves mie goreng',
  ] },
  { id: 'clue-one', title: 'Clue for Mystery App', body: 'Keep this piece close: er. Other clues are hidden throughout The Apps here.', clue: true },
  { id: 'things-to-watch', title: 'Things to Watch Together', items: [
    'Barbie (2023)',
    'The Notebook (2004)',
    'LENIVERSE',
  ] },
  { id: 'things-to-play', title: 'Things to Play Together', items: [
    'Roblox: Raft 101 Survival',
    'Roblox: Typical Ramen',
  ] },
]

export const finalLetter = `To My Favorite Person,

Happy first month of us, Iyon. ♡

It's been a month since we officially became each other's person, and somehow, I still find myself smiling when I think about us. It's a little funny, isn't it? One month might sound like such a short time, but when I think about everything we've shared, everything we've been through, and all the little moments that have brought us here, it feels like there's so much more to celebrate than just a number on the calendar.

One thing I want you to know is that I don't take us for granted.

Our journey hasn't always been easy. We've had our fair share of misunderstandings, difficult conversations, and moments when we didn't quite know how to reach each other. Sometimes we get things wrong, and even when our intentions are good, we still end up hurting each other.

But look at us. We're still here. And I think that's something worth appreciating.

Not because we've managed to get everything right, but because we're still learning how to get things right together. Despite the difficult moments, we're still finding ways to listen, understand, make room for each other's feelings, and find our way back to one another.

I want to appreciate you for being here, for the things you do, the efforts you make, and even the little things you might think go unnoticed. I hope you know that I see them. I see the ways you try, the ways you care, and the ways you're still figuring things out. You don't have to be perfect to be someone I appreciate. You don't have to have all the right words or know exactly what to do every time.

I hope you give yourself room to grow, too. You can make mistakes without immediately thinking you're not enough. I don't want you to see every difficult moment between us as a failure. We're two different people, after all, learning how to love each other in ways we may not have known before.

And I want to appreciate us, too. For every little step we've taken, the conversations that brought us closer, the laughter that made ordinary days feel special, the silly moments, and even the difficult conversations that have taught us something new.

I'm proud of us for making it this far. Not because our relationship is perfect, but because it is ours. We're building something together, one day at a time, with all the imperfect little pieces that make us who we are.

I hope the video above gives you a glimpse of how I see us, and perhaps a little of what I feel about our journey so far.

There's a particular thought I want to leave here, something I hope you'll carry with you whenever you think about us.

Loving someone means allowing yourself to be vulnerable. It means letting someone matter to you so deeply that their words, their presence, and even their absence can touch parts of you that nobody else can. And sometimes, that vulnerability comes with a few scars.

But I want you to know that loving you is worth all the scars.

Not because I want us to hurt each other, nor because I believe love should be painful to be meaningful. I simply believe that something as precious as what we're building is worth the effort it takes to understand, nurture, and protect it.

I don't expect us to never make mistakes or hurt each other. We're human, and we're still learning. But I hope we never become careless with each other's hearts. I hope we learn to acknowledge the hurt, take responsibility for it, and find ways to heal rather than letting those wounds become something we carry in silence.

I don't mind that loving you makes me vulnerable, or that growing together might sometimes be uncomfortable. What matters to me is that we don't stop trying to make things better, that we keep choosing kindness even when things get difficult, and that we never forget we're supposed to be on the same team.

I want to keep loving you, and I want us to keep healing each other along the way. Not by being each other's perfect solution, but by being two people willing to listen, understand, and grow.

Because I don't just want us to survive the difficult chapters. I want us to come out of them understanding each other a little better, loving each other a little wiser, and appreciating what we have even more.

And now, about this little website...

I know it's just a website, technically speaking. A collection of pages, pictures, music, little games, and memories. But I hope you can see a little more than that when you open it.

I made it because I wanted to give us a little world of our own. Somewhere we can keep pieces of our story, revisit our memories, laugh at silly things, and add new ones as time goes by.

I wanted to make something that feels like us. Something you can come back to whenever you want a little reminder of what we're building together.

Maybe one day, we'll look back at this first version and laugh at how much has changed. Maybe there will be more pictures, more songs, more games, more memories, and so many little things we haven't experienced yet.

And I hope we'll still be adding to it.

I don't know exactly what every chapter ahead of us will look like. I can't promise that everything will always be easy, or that we'll always know what to do. But I know I want to keep learning with you, discovering new things about you, creating memories, and finding new ways to make you feel loved.

I hope we never become too comfortable to appreciate the little things or stop being curious about each other. And whenever we face something difficult, I hope we remember that it's not you against me. It's us against the problem.

Thank you for being part of my days, Iyon. Thank you for letting me be part of yours, too.

Happy first month, my love.

Here's to us, to the little world we're building, to all the memories we've made, and to all the ones waiting for us.

I love you. Through the beautiful parts, through the imperfect parts, and through all the little things in between.

**Loving you is worth all the scars. And I hope we keep healing, growing, and loving each other along the way.**

With all my love,
Aleyna ♡`
