export interface LibraryTeaching {
  id: string
  theme: string
  week_label: string
  hook: string
  scripture_ref: string
  application: string
  question: string
}

export const TEACHING_LIBRARY: LibraryTeaching[] = [
  // ── THE KINGDOM ──────────────────────────────────────────
  {
    id: 'kingdom-1',
    theme: 'The Kingdom',
    week_label: 'The Kingdom of God',
    hook: 'Jesus didn\'t come primarily to take us to heaven when we die. He came to bring heaven to earth — to announce that God\'s rule had broken into the world, and to invite us into it. The kingdom is here, and it is coming. We live in both realities at once.',
    scripture_ref: "Matthew 4:17 — \"From that time Jesus began to preach, saying, ‘Repent, for the kingdom of heaven is at hand.’\"",
    application: 'Repentance isn\'t guilt — it\'s a reorientation. To repent is to turn toward the King and live as a citizen of his kingdom today. That changes how we use our money, how we treat our enemies, how we handle power.',
    question: 'Where in your daily life do you find it hardest to live as if God is king? What would it look like to trust him there this week?',
  },
  {
    id: 'kingdom-2',
    theme: 'The Kingdom',
    week_label: 'The Beatitudes',
    hook: 'The Sermon on the Mount opens with eight shocks. Blessed are the poor, the mourning, the meek, the persecuted. Jesus turns every human power system upside down. The people the world overlooks are the ones the kingdom belongs to.',
    scripture_ref: 'Matthew 5:3–10 — "Blessed are the poor in spirit, for theirs is the kingdom of heaven…"',
    application: 'The Beatitudes aren\'t a ladder to climb — they\'re a portrait of Jesus himself. As we follow him, these qualities form in us not by striving but by staying near to him.',
    question: 'Which beatitude feels most foreign to how you naturally think about what makes a person blessed? Why?',
  },

  // ── PRAYER ───────────────────────────────────────────────
  {
    id: 'prayer-1',
    theme: 'Prayer',
    week_label: 'The Lord\'s Prayer',
    hook: 'The disciples didn\'t ask Jesus to teach them to preach, or to heal, or to cast out demons. They asked him to teach them to pray. They had watched him pray and they knew — whatever he had with the Father, they wanted it.',
    scripture_ref: 'Luke 11:1–4 — "Lord, teach us to pray, as John taught his disciples."',
    application: 'The Lord\'s Prayer is a school, not a script. Pray through it slowly this week — one line at a time. Let "your kingdom come" sit with you. Let "forgive us as we forgive" convict you.',
    question: 'What does your prayer life actually look like right now — honest answer? What\'s one thing you\'d want it to look like?',
  },
  {
    id: 'prayer-2',
    theme: 'Prayer',
    week_label: 'Praying in the Dark',
    hook: 'Some of the greatest prayers in Scripture are cries of confusion — My God, my God, why have you forsaken me? Where are you? How long? The Bible gives us language not just for praise but for lament. Bringing our darkness to God is an act of faith.',
    scripture_ref: 'Psalm 88:1–2 — "O Lord, God of my salvation; I cry out day and night before you. Let my prayer come before you; incline your ear to my cry!"',
    application: 'Lament is not doubt — it is intimate speech with God. This week, bring the thing you haven\'t said out loud to God. Name it. Let him hold it.',
    question: 'Is there something you\'ve been reluctant to bring to God in prayer? What would it take to trust him with it?',
  },

  // ── FASTING ──────────────────────────────────────────────
  {
    id: 'fasting-1',
    theme: 'Fasting',
    week_label: 'The Practice of Fasting',
    hook: 'Jesus said "when you fast" — not "if." He assumed his disciples would fast. Fasting is not punishment; it\'s a way of saying with your body what you believe with your mind: that God is more real than bread, and his presence more satisfying than any meal.',
    scripture_ref: 'Matthew 6:16–18 — "And when you fast, do not look gloomy like the hypocrites… but anoint your head and wash your face, that your fasting may not be seen by others but by your Father who is in secret."',
    application: 'Try a simple fast this week — skip one meal and use that time to pray. Let the hunger be a reminder to turn toward God rather than toward the next distraction.',
    question: 'Have you ever fasted? What feels most difficult or unfamiliar about it, and what might God be inviting you into through it?',
  },

  // ── FORGIVENESS ──────────────────────────────────────────
  {
    id: 'forgiveness-1',
    theme: 'Forgiveness',
    week_label: 'Forgiving as We\'ve Been Forgiven',
    hook: 'Peter thought he was being generous when he asked if forgiving someone seven times was enough. Jesus said seventy-seven. Not because he was keeping count differently — but because the forgiven don\'t count.',
    scripture_ref: "Matthew 18:21–22 — \"Then Peter came up and said to him, 'Lord, how often will my brother sin against me, and I forgive him? As many as seven times?' Jesus said to him, 'I do not say to you seven times, but seventy-seven times.'\"",
    application: 'Forgiveness is not excusing the wrong — it\'s releasing the debt. It\'s the act of a person who knows they have been forgiven a far greater debt. This week, name the person you\'ve been withholding forgiveness from.',
    question: 'Is there someone in your life you\'re still holding something against? What would it mean — practically, not just emotionally — to forgive them?',
  },

  // ── LOVE ─────────────────────────────────────────────────
  {
    id: 'love-1',
    theme: 'Love',
    week_label: 'The Greatest Commandment',
    hook: 'When asked to name the most important commandment, Jesus gave two — and said everything else hangs on them. Love God with everything you are. Love your neighbor as yourself. The whole law, compressed into relationship.',
    scripture_ref: 'Matthew 22:37–40 — "You shall love the Lord your God with all your heart and with all your soul and with all your mind. This is the great and first commandment. And a second is like it: You shall love your neighbor as yourself."',
    application: 'We don\'t manufacture love — we receive it and pass it on. Spend time this week simply receiving God\'s love for you. Read 1 John 4:9–11 slowly. Then look for one concrete way to pass it to someone nearby.',
    question: 'Which is harder for you right now — loving God or loving people? What do you think is underneath that?',
  },
  {
    id: 'love-2',
    theme: 'Love',
    week_label: 'Love Your Enemies',
    hook: 'Love your enemies. Pray for those who persecute you. This command alone separates Christianity from every other religion and philosophy. It is not natural — it is supernatural. It is only possible because of the cross.',
    scripture_ref: 'Matthew 5:44–45 — "But I say to you, Love your enemies and pray for those who persecute you, so that you may be sons of your Father who is in heaven."',
    application: 'Praying for someone you\'re in conflict with doesn\'t mean pretending the conflict away. It means asking God to bless them, to work in their life, to give them what they truly need. It changes you as much as it changes anything.',
    question: 'Who is the hardest person for you to love right now? Would you be willing to pray for them by name this week?',
  },

  // ── DISCIPLESHIP ─────────────────────────────────────────
  {
    id: 'discipleship-1',
    theme: 'Discipleship',
    week_label: 'Follow Me',
    hook: 'Jesus did not say "agree with me" or "believe my doctrine." He said follow me. Discipleship is not primarily an intellectual exercise — it\'s an apprenticeship. We follow someone in order to become like them.',
    scripture_ref: "Mark 1:17 — \"And Jesus said to them, 'Follow me, and I will make you become fishers of men.'\"",
    application: 'The goal of following Jesus is not knowing more about him — it\'s becoming like him. This week, pick one quality of Jesus that you want to grow in. Ask him to form it in you.',
    question: 'In what area of your life do you most clearly see yourself becoming more like Jesus? In what area do you feel least like him?',
  },
  {
    id: 'discipleship-2',
    theme: 'Discipleship',
    week_label: 'Abide in Me',
    hook: 'The branch doesn\'t strain to produce fruit. It abides. It stays connected. The fruit comes from the connection. Jesus doesn\'t ask us to try harder — he asks us to stay near. Everything else flows from that.',
    scripture_ref: 'John 15:4–5 — "Abide in me, and I in you. As the branch cannot bear fruit by itself, unless it abides in the vine, neither can you, unless you abide in me."',
    application: 'Abiding is the daily practice of returning to Jesus — through Scripture, prayer, silence, community. It\'s less a discipline than a posture. This week, identify the one practice that most helps you stay connected, and protect it.',
    question: 'What does abiding in Jesus actually look like in your daily rhythm right now? Is there anything crowding it out?',
  },

  // ── THE CROSS ────────────────────────────────────────────
  {
    id: 'cross-1',
    theme: 'The Cross',
    week_label: 'Take Up Your Cross',
    hook: 'Before the cross was a symbol, it was an instrument of death. When Jesus said "take up your cross," every listener knew exactly what he meant. To carry a cross was to walk toward your own execution. He was calling them to a kind of dying.',
    scripture_ref: "Luke 9:23 — \"And he said to all, 'If anyone would come after me, let him deny himself and take up his cross daily and follow me.'\"",
    application: 'The cross we\'re called to carry is not suffering in general — it\'s the death of our will in favor of his. What is the thing you are most reluctant to surrender to God? That is likely where your cross is.',
    question: 'What does "denying yourself" look like practically in your life this week — not in theory, but in a specific moment you\'re facing?',
  },

  // ── SCRIPTURE ────────────────────────────────────────────
  {
    id: 'scripture-1',
    theme: 'The Word',
    week_label: 'The Word as Lamp',
    hook: 'Before electricity, a lamp didn\'t illuminate everything at once — it lit just enough for the next step. Scripture is like that. It doesn\'t always give us a map. It gives us enough light to take the next step in faithfulness.',
    scripture_ref: 'Psalm 119:105 — "Your word is a lamp to my feet and a light to my path."',
    application: 'This week, read one chapter of the Gospels slowly — not to study it, but to listen to it. Read it as if Jesus is speaking directly to you. Then sit quietly for a few minutes afterward.',
    question: 'How do you currently engage with Scripture? Is it more like a textbook, a devotional, or a conversation? What would you want it to be?',
  },

  // ── GENEROSITY ───────────────────────────────────────────
  {
    id: 'generosity-1',
    theme: 'Generosity',
    week_label: 'The Generous Life',
    hook: 'Jesus talked about money more than almost any other subject. Not because he wanted your money — but because he knew that where your treasure is, your heart follows. Generosity is not a financial decision; it\'s a spiritual one.',
    scripture_ref: "Luke 12:15 — \"And he said to them, 'Take care, and be on your guard against all covetousness, for one's life does not consist in the abundance of his possessions.'\"",
    application: 'Generosity is a practice, not just an impulse. This week, give something away that costs you something — money, time, attention. Notice what it does to your heart.',
    question: 'What is your honest relationship with money right now? Does it feel like a tool, a security, or an identity?',
  },

  // ── SABBATH ──────────────────────────────────────────────
  {
    id: 'sabbath-1',
    theme: 'Sabbath',
    week_label: 'The Gift of Rest',
    hook: 'God rested on the seventh day — not because he was tired, but because the work was finished and it was good. He built rest into the fabric of creation. Sabbath is not laziness; it\'s trust. It\'s saying: the world does not depend on me.',
    scripture_ref: "Mark 2:27 — \"And he said to them, 'The Sabbath was made for man, not man for the Sabbath.'\"",
    application: 'Sabbath is resistance to the tyranny of productivity. This week, set aside a few hours — or a whole day if you can — to rest, play, worship, and delight. Do nothing that feels like work. See what happens.',
    question: 'Do you practice any form of Sabbath rest? What makes it hard, and what do you think it would give you if you did?',
  },
]

export const THEMES = [...new Set(TEACHING_LIBRARY.map(t => t.theme))]
