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

  // ── EARLY CHURCH ─────────────────────────────────────────
  {
    id: 'earlychurch-1',
    theme: 'Early Church',
    week_label: 'Born at Pentecost',
    hook: 'Fifty days after the resurrection, something happened in Jerusalem that changed the world. A group of frightened men and women who had locked themselves in a room became — overnight — a movement that turned the Roman Empire upside down. The church was born not by human strategy but by the Spirit of God.',
    scripture_ref: 'Acts 2:1–4 — "When the day of Pentecost arrived, they were all together in one place. And suddenly there came from heaven a sound like a mighty rushing wind… And they were all filled with the Holy Spirit."',
    application: 'The early church had no buildings, no budgets, no political power, and no social media. What they had was the Spirit, the Scriptures, the sacraments, and each other. The same is available to us.',
    question: 'What about the early church most surprises or convicts you? What would it look like for our group to carry that same DNA?',
  },
  {
    id: 'earlychurch-2',
    theme: 'Early Church',
    week_label: 'The Cost of Witness',
    hook: 'The word "martyr" comes from the Greek word for witness — martys. To be a witness in the early church was, for many, to lay down your life. Polycarp, bishop of Smyrna, was burned at the stake at 86 years old. When asked to deny Christ to save his life, he said: "Eighty-six years I have served him, and he has done me no wrong. How can I blaspheme my King who saved me?"',
    scripture_ref: 'Revelation 2:10 — "Do not fear what you are about to suffer… Be faithful unto death, and I will give you the crown of life."',
    application: 'We are not likely to be martyred for our faith — but we are called to witness at cost. There are things worth saying that are unpopular. There are people worth loving who cannot repay us. Faithfulness has a price.',
    question: 'What does it cost you right now to follow Jesus openly? Where are you tempted to go quiet about your faith?',
  },
  {
    id: 'earlychurch-3',
    theme: 'Early Church',
    week_label: 'They Devoted Themselves',
    hook: 'The first description of the early church in Acts 2 is a portrait of four commitments: the apostles\' teaching, fellowship, the breaking of bread, and prayer. Not programs — practices. Not attendance — devotion. The church grew not because it was well-organized but because it was deeply formed.',
    scripture_ref: 'Acts 2:42–47 — "And they devoted themselves to the apostles\' teaching and the fellowship, to the breaking of bread and the prayers… And the Lord added to their number day by day those who were being saved."',
    application: 'These four practices — Word, community, Eucharist, prayer — are not suggestions. They are the architecture of the Christian life. This week, examine your own life against them. Which is strongest? Which is weakest?',
    question: 'Of the four — teaching, fellowship, communion, prayer — which do you most neglect? What would it take to give it its proper place?',
  },
  {
    id: 'earlychurch-4',
    theme: 'Early Church',
    week_label: 'The Church Fathers',
    hook: 'Between the apostles and us stand centuries of men and women who held the faith under pressure — Ignatius of Antioch, who wrote letters to churches as he was being taken to Rome to be killed; Athanasius, who was exiled five times rather than deny the full divinity of Christ; Augustine, whose Confessions became one of the greatest books ever written. We did not receive this faith in a vacuum.',
    scripture_ref: 'Hebrews 12:1 — "Therefore, since we are surrounded by so great a cloud of witnesses, let us also lay aside every weight, and sin which clings so closely, and let us run with endurance the race that is set before us."',
    application: 'We stand in a long line. The faith we hold was preserved at enormous cost by people who loved Christ more than comfort or reputation. To read the Fathers is to be humbled and strengthened at the same time.',
    question: 'Do you have a sense of your place in the long story of the church? What would it mean to see yourself as a link in a chain stretching back 2,000 years?',
  },

  // ── THE CANON ────────────────────────────────────────────
  {
    id: 'canon-1',
    theme: 'The Canon',
    week_label: 'How We Got the Bible',
    hook: 'People sometimes ask: who decided which books went into the Bible? The short answer is: no one person, no single council, no political conspiracy. The canon was recognized — not invented. The church listened for the voice of the Shepherd, and over time, the books that bore the marks of divine authority became undeniable.',
    scripture_ref: 'John 10:27 — "My sheep hear my voice, and I know them, and they follow me."',
    application: 'The books of Scripture were recognized by three broad criteria: apostolic origin or authority, consistency with the rule of faith, and widespread acceptance across churches. The process was messy, gradual, and real — which is itself a sign of its authenticity.',
    question: 'Has anyone ever challenged your confidence in the Bible? How did you respond — and what would you want to be able to say?',
  },
  {
    id: 'canon-2',
    theme: 'The Canon',
    week_label: 'The Old Testament Canon',
    hook: 'Jesus quoted the Old Testament constantly — from the Law, the Prophets, and the Writings. When he said "the Scriptures must be fulfilled," he was pointing to a defined body of texts his hearers recognized. The Hebrew canon was largely settled by the time of Jesus, and he affirmed it. He is the key that unlocks every page of it.',
    scripture_ref: "Luke 24:44 — \"Then he said to them, 'These are my words that I spoke to you while I was still with you, that everything written about me in the Law of Moses and the Prophets and the Psalms must be fulfilled.'\"",
    application: 'The Old Testament is not a preface to throw away — it is the foundation everything else stands on. To understand Jesus, you must understand what he came to fulfill. Genesis through Malachi is the story into which he stepped.',
    question: 'How much of the Old Testament do you actually read? Is there a part of it that feels confusing or distant? What would help?',
  },
  {
    id: 'canon-3',
    theme: 'The Canon',
    week_label: 'The New Testament Canon',
    hook: 'By the end of the first century, churches were circulating letters from Paul, eyewitness accounts of Jesus\' life, and apocalyptic visions from John. Not all writings claiming apostolic authority were genuine. The church had to ask hard questions: Was this written by an apostle or a close associate? Does it agree with what the apostles taught everywhere? Was it recognized by the churches who knew the apostles personally?',
    scripture_ref: '2 Peter 1:20–21 — "No prophecy of Scripture comes from someone\'s own interpretation. For no prophecy was ever produced by the will of man, but men spoke from God as they were carried along by the Holy Spirit."',
    application: 'The Muratorian Fragment (c. 170 AD) and Athanasius\' Festal Letter of 367 AD represent early and late snapshots of canonical consensus. What strikes us is not how much was disputed — but how much was agreed on from very early.',
    question: 'What would you say to someone who claimed the Bible was just put together by powerful people to control the church? What evidence would you offer?',
  },
  {
    id: 'canon-4',
    theme: 'The Canon',
    week_label: 'Scripture and Tradition',
    hook: 'The Bible did not fall from heaven bound in leather. It was written by real people, copied by real people, translated by real people, and handed to us by the church. This does not make it less authoritative — it shows how God works. He uses human instruments to carry divine truth.',
    scripture_ref: '2 Timothy 3:16–17 — "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work."',
    application: 'We receive Scripture through tradition — and tradition must always be tested by Scripture. The two are not enemies. The church that gave us the Bible also gave us the creeds, the liturgy, and the sacraments. We receive all of it gratefully, and test all of it carefully.',
    question: 'How do you decide what in Christian tradition to keep and what to question? What role does Scripture play in that process for you?',
  },

  // ── THE CREEDS ───────────────────────────────────────────
  {
    id: 'creeds-1',
    theme: 'The Creeds',
    week_label: 'Why Creeds Matter',
    hook: 'Some Christians say "no creed but the Bible" — and mean it sincerely. But every church has a theology, whether written down or not. Creeds are simply the church\'s attempt to summarize what Scripture teaches about the most important things. They are guardrails, not cages. They protect the faith from being quietly redefined in every generation.',
    scripture_ref: 'Jude 3 — "Beloved, although I was very eager to write to you about our common salvation, I found it necessary to write appealing to you to contend for the faith that was once for all delivered to the saints."',
    application: 'The faith was "once for all delivered" — meaning it has a shape, a content, a substance that can be passed on, tested, and defended. Creeds give us the vocabulary for that. Learn one this week — say it slowly, ask what every line means.',
    question: 'Do you see creeds as helpful or as a barrier to personal faith? What do you think you gain — or lose — by saying "I believe" with the whole church across history?',
  },
  {
    id: 'creeds-2',
    theme: 'The Creeds',
    week_label: 'The Council of Nicaea',
    hook: 'In 325 AD, Emperor Constantine called 300 bishops to Nicaea to settle the most important theological dispute in church history. A theologian named Arius was teaching that Jesus was a created being — the greatest creature, but not truly God. Bishop Athanasius stood nearly alone against him. The Council affirmed what Christians had always believed: Jesus is "of the same substance" as the Father. Fully God, fully man.',
    scripture_ref: 'John 1:1 — "In the beginning was the Word, and the Word was with God, and the Word was God."',
    application: 'Athanasius contra mundum — Athanasius against the world. He was exiled five times for refusing to compromise on the full divinity of Christ. The question he refused to let go of was: if Jesus is not fully God, can he actually save us? The answer he gave — and we give — is: only God can do what Jesus did.',
    question: 'Why does it matter whether Jesus is fully God and not just the greatest of created beings? What is at stake practically, not just theologically?',
  },
  {
    id: 'creeds-3',
    theme: 'The Creeds',
    week_label: 'The Council of Chalcedon',
    hook: 'If Nicaea answered "Is Jesus God?" — yes — then Chalcedon (451 AD) answered "How is Jesus both God and man?" The answer: two natures, one person. Fully divine, fully human, without confusion, without change, without division, without separation. It sounds abstract. But it has everything to do with whether Jesus could actually bear our sin, feel our temptation, and rise from our death.',
    scripture_ref: 'Hebrews 4:15 — "For we do not have a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sin."',
    application: 'If Jesus were only God, his suffering wasn\'t real. If Jesus were only man, his sacrifice wasn\'t sufficient. The "two natures" doctrine is not an abstraction — it is the hinge on which salvation swings. He is one of us, and he is God. That is why the cross works.',
    question: 'How does knowing that Jesus was fully human — not just appearing to be — change how you relate to him in your own suffering or temptation?',
  },

  // ── APOLOGETICS ──────────────────────────────────────────
  {
    id: 'apologetics-1',
    theme: 'Apologetics',
    week_label: 'Always Be Ready',
    hook: 'Peter writes to scattered, persecuted Christians and tells them to always be ready to give a reason for the hope they have — but to do it with gentleness and respect. Apologetics is not winning arguments. It\'s giving a reason. It\'s opening a door. It starts with the quality of life people see in you.',
    scripture_ref: '1 Peter 3:15 — "But in your hearts honor Christ the Lord as holy, always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect."',
    application: 'The best apologetic is a life that requires an explanation. But words matter too. This week, think about the two or three questions your skeptical friends or family members most often raise. What would you say?',
    question: 'What is the hardest question someone has ever asked you about your faith? How did you respond — and how would you respond now?',
  },
  {
    id: 'apologetics-2',
    theme: 'Apologetics',
    week_label: 'The Resurrection: History\'s Hinge',
    hook: 'Paul is astonishingly blunt: if Christ has not been raised, your faith is futile and you are still in your sins. Christianity is not a philosophy or a lifestyle — it is a historical claim. Something happened on the third day. The question is not whether you like it. The question is whether it\'s true.',
    scripture_ref: '1 Corinthians 15:17–20 — "And if Christ has not been raised, your faith is futile and you are still in your sins… But in fact Christ has been raised from the dead, the firstfruits of those who have fallen asleep."',
    application: 'The historical evidence for the resurrection is stronger than most people realize. The empty tomb, the post-resurrection appearances to over 500 people, the transformation of the disciples, the conversion of Paul and James, the explosion of the church in Jerusalem — all demand explanation. Naturalistic explanations consistently fail.',
    question: 'If someone told you they didn\'t believe in the resurrection, what would you say? What evidence do you find most compelling?',
  },
  {
    id: 'apologetics-3',
    theme: 'Apologetics',
    week_label: 'The Problem of Evil',
    hook: 'If God is good and all-powerful, why is there so much suffering? This is the question that has caused more people to walk away from faith than almost any other. It deserves a real answer — not a tidy one, but a real one. And Christianity, uniquely, does not offer a detached philosophical response. It offers a God who entered the suffering.',
    scripture_ref: 'Romans 8:18 — "For I consider that the sufferings of this present time are not worth comparing with the glory that is to be revealed to us."',
    application: 'The Christian answer to suffering is not an explanation but a person. Jesus did not explain evil from a distance — he entered it. He was betrayed, tortured, abandoned, and killed. On the cross, God absorbed the worst the world could do. That is not a proof that evil doesn\'t exist. It\'s a promise that it will not have the last word.',
    question: 'How do you hold together personal suffering with belief in a good God? Has suffering ever shaken your faith — or deepened it?',
  },
  {
    id: 'apologetics-4',
    theme: 'Apologetics',
    week_label: 'Is Jesus the Only Way?',
    hook: 'Jesus said "I am the way, the truth, and the life. No one comes to the Father except through me." This is the claim that feels most offensive to the modern world. It sounds exclusive, arrogant, narrow. But consider: if Jesus is who he claimed to be — fully God, risen from the dead — then the question changes. The question is not "is this too narrow?" but "is it true?"',
    scripture_ref: 'John 14:6 — "Jesus said to him, \'I am the way, and the truth, and the life. No one comes to the Father except through me.\'"',
    application: 'Exclusivity is only arrogant if the claim is false. A doctor who says "this is the only medication that will treat your condition" is not being arrogant — they\'re being honest. The question Christianity invites is not "do you like this claim?" but "is Jesus who he said he was?"',
    question: 'How do you talk about Jesus being "the only way" with people who find that offensive? What tone and framing has helped you — or hasn\'t?',
  },
  {
    id: 'apologetics-5',
    theme: 'Apologetics',
    week_label: 'Faith and Science',
    hook: 'Many people assume that science has disproved Christianity — or that to be a serious Christian you must distrust science. Neither is true. The founders of modern science — Galileo, Kepler, Newton, Faraday, Mendel — were largely Christians who believed they were thinking God\'s thoughts after him. Science asks "how?" Christianity asks "why?" They are not competing answers to the same question.',
    scripture_ref: 'Psalm 19:1–2 — "The heavens declare the glory of God, and the sky above proclaims his handiwork. Day to day pours out speech, and night to night reveals knowledge."',
    application: 'The fine-tuning of the universe, the origin of life, the existence of consciousness, the reality of objective morality — none of these are solved by naturalism. They are, if anything, more mysterious the more we learn. The Christian has no reason to fear the data.',
    question: 'Has science ever felt like a challenge to your faith? What questions do you still find difficult — and which ones have you found good answers to?',
  },
]

export const THEMES = [...new Set(TEACHING_LIBRARY.map(t => t.theme))]
