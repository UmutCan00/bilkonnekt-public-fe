
const	postData = [
    {
     id: 1,
      sharer: 'Serhan',
      content: 'Mescit otoparkta arabamı çizen kisi kim?',
      title: 'Arabam çizildi!!',
      type: 'feed',
      comments : [
        { id: 1, text: 'Great post!', user: 'User1' },
        { id: 2, text: 'Interesting thoughts.', user: 'User2' },
        // Add more comments as needed
      ],

    },
    {
        id: 2,
        sharer: 'Bilkent YES',
        content: 'Cuma 15.30 A binası.',
        title: 'Girisimci ... geliyor!',
        type: 'clubPage',
    },
    {   
        id: 3,
        sharer: 'CVsi konuşan eleman',
        content: 'Ortalamam 4.0',
        title: 'Top ranking student',
        type: 'feed',
    },
]

export default postData ;
