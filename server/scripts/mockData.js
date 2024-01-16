const user1 = {
  firstName: 'John',
  email: 'john@gmail.com',
  password: 'passme',
};

const journalEntries1 = [
  {
    title: 'Deciding to study software development',
    textBody: 'I enjoy a lot working with computers. And it seems that there\'s plenty of well-paid jobs. Lately, I am thinking a lot about it.',
    journaledDate: '03-21-2023',
    tags: ['coding', 'career']
  },
  {
    title: 'Excitement for a New Journey',
    textBody: 'Today, I made the decision to embark on a new journey to become a software developer. The world of coding fascinates me, and I am eager to dive deep into the realms of programming languages and algorithms. This decision feels like a step towards a brighter future. Let the coding adventures begin!',
    journaledDate: '04-25-2023'
  },
  {
    title: 'Cycling Adventures',
    textBody: 'Cycling has become my escape, my therapy. The wind in my hair, the rhythmic pedaling - it\'s exhilarating. Today, I explored new trails and felt the rush of adrenaline as I conquered challenging terrains. Cycling not only keeps me physically fit but also clears my mind. Grateful for every spin of the pedal.',
    journaledDate: '05-10-2023'
  },
  {
    title: 'Late Night Coding Sessions',
    textBody: 'There is something magical about coding late into the night. The world is quiet, and my mind is in its creative zone. Tonight, I tackled a challenging problem, and the satisfaction of finding the solution is indescribable. Excited for the progress on this coding journey.',
    journaledDate: '06-02-2023'
  },
  {
    title: 'A Heartfelt Conversation with Parents',
    textBody: 'Had a heartfelt conversation with my parents today. Explained my decision to switch careers to software development. Their support means the world to me. It\'s reassuring to know they believe in my choices and dreams. Gratitude for understanding and encouragement.',
    journaledDate: '07-15-2023'
  },
  {
    title: 'Reflections on Progress',
    textBody: 'As I delve deeper into learning JavaScript and React, I reflect on the progress made. The initial challenges have turned into small victories. The joy of creating something functional from scratch is incomparable. Learning to code is a journey, and I am embracing every step.',
    journaledDate: '08-30-2023'
  },
  {
    title: 'Weekend Coding Retreat',
    textBody: 'Spent the weekend immersed in code. No distractions, just me and my laptop. It\'s amazing how much can be accomplished when fully focused. Solved complex problems, experimented with new frameworks. Feeling accomplished and ready to tackle the upcoming week with renewed energy.',
    journaledDate: '09-17-2023'
  },
  {
    title: 'Coding Breakthrough',
    textBody: 'Had a coding breakthrough today! The bug that had been eluding me finally got caught. The feeling of triumph is surreal. It\'s moments like these that remind me why I chose this path. Excited for the challenges that lie ahead and the solutions waiting to be discovered.',
    journaledDate: '11-05-2023'
  },
  {
    title: 'Celebrating Small Wins',
    textBody: 'Taking a moment to celebrate the small wins. Completed a challenging project, and the sense of accomplishment is empowering. It\'s essential to acknowledge progress, no matter how incremental. Here\'s to the small victories paving the way for greater achievements!',
    journaledDate: '12-22-2023'
  },
  {
    title: 'Reflecting on the Year',
    textBody: 'As the year comes to a close, I reflect on the transformative journey of becoming a software developer. From the initial doubts to the moments of clarity, each step has been worth it. Grateful for the support, the challenges, and the growth. Looking forward to the coding adventures of the coming year.',
    journaledDate: '12-31-2023'
  }
];

const user2 = {
  firstName: 'Laura',
  email: 'laura@email.com',
  password: 'passme',
};


const journalEntries2 = [
  {
    title: 'Embarking on the Coding Journey',
    textBody: 'Started my journey as a developer student today. Excitement and nerves fill me as I dive into the world of code. Ready to absorb the knowledge and embrace the challenges that come my way.',
    journaledDate: '07-15-2021',
    tags: ['coding', 'career', 'learning']
  },
  {
    title: 'Coding Breakthrough and Beach Volleyball Victory',
    textBody: 'Celebrating a coding breakthrough! Also, had an epic beach volleyball victory. A day of wins and progress. Feeling on top of the world!',
    journaledDate: '09-02-2021',
    tags: ['coding', 'beach-volleyball', 'celebration']
  },
  {
    title: 'Yoga Retreat in the Mountains',
    textBody: 'Attended a yoga retreat in the serene mountains. The combination of yoga, nature, and self-reflection brought inner peace. Grateful for moments of tranquility.',
    journaledDate: '11-18-2021',
    tags: ['yoga', 'travel', 'self-reflection']
  },
  {
    title: 'Challenges in Coding and Mindful Yoga Practices',
    textBody: 'Encountered coding challenges today. Balanced it out with mindful yoga practices. Learning to navigate both the digital and inner landscapes.',
    journaledDate: '02-07-2022',
    tags: ['coding', 'yoga', 'challenges']
  },
  {
    title: 'Exploring New Coding Languages and Yoga Poses',
    textBody: 'Ventured into learning new coding languages. Similarly, explored challenging yoga poses. Growth in both coding and flexibility!',
    journaledDate: '04-15-2022',
    tags: ['coding', 'yoga', 'learning']
  },
  {
    title: 'Coding Marathon and Beach Volleyball Tournament',
    textBody: 'A coding marathon day followed by a thrilling beach volleyball tournament. Exhausted but exhilarated. Balancing the digital and physical.',
    journaledDate: '06-29-2022',
    tags: ['coding', 'beach-volleyball', 'balance']
  },
  {
    title: 'Yoga Retreat by the Ocean',
    textBody: 'Immersed in a rejuvenating yoga retreat by the ocean. The sound of waves and the yoga flow brought a sense of calm. Finding peace amidst the chaos.',
    journaledDate: '09-12-2022',
    tags: ['yoga', 'travel', 'peace']
  },
  {
    title: 'Navigating Economic Worries with Code',
    textBody: 'Journaling about worries for the economy and finding solace in coding. Grateful for the distraction and the power of creating something meaningful.',
    journaledDate: '11-05-2022',
    tags: ['coding', 'economy', 'worries']
  },
  {
    title: 'Beach Volleyball Triumph and Code Refactoring',
    textBody: 'Victorious in beach volleyball and successful in code refactoring. Today is a testament to the joy of both physical and mental accomplishments.',
    journaledDate: '01-23-2023',
    tags: ['beach-volleyball', 'coding', 'triumph']
  },
  {
    title: 'Coding Challenges and Yoga for Resilience',
    textBody: 'Encountered tough coding challenges. Turned to yoga for resilience and a fresh perspective. Learning to bounce back in both coding and life.',
    journaledDate: '04-07-2023',
    tags: ['coding', 'yoga', 'resilience']
  },
  {
    title: 'Coding Breakthrough and Beach Volleyball Championship',
    textBody: 'Celebrating a major coding breakthrough and clinching the beach volleyball championship. A day of personal and professional victories.',
    journaledDate: '06-20-2023',
    tags: ['coding', 'beach-volleyball', 'victories']
  },
  {
    title: 'Yoga Retreat in the Countryside',
    textBody: 'Found serenity in a yoga retreat amidst the countryside. Disconnecting from screens, connecting with nature. A much-needed recharge.',
    journaledDate: '09-04-2023',
    tags: ['yoga', 'travel', 'recharge']
  },
  {
    title: 'Coding Challenges and Mindful Yoga Practices',
    textBody: 'Confronted coding challenges head-on. Balanced it with mindful yoga practices. A day of growth and introspection in both realms.',
    journaledDate: '11-15-2023',
    tags: ['coding', 'yoga', 'growth']
  },
  {
    title: 'Beach Volleyball Tournament and Economic Reflections',
    textBody: 'Participated in a beach volleyball tournament and reflected on economic concerns. Striking a balance between play and contemplation.',
    journaledDate: '01-08-2024',
    tags: ['beach-volleyball', 'economy', 'reflection']
  },
  {
    title: 'Coding Progress and Yoga for Inner Strength',
    textBody: 'Made significant coding progress and turned to yoga for inner strength. Channeling the energy into productivity and self-care.',
    journaledDate: '03-21-2024',
    tags: ['coding', 'yoga', 'progress']
  },
];


module.exports = { user1, journalEntries1, user2, journalEntries2 };
