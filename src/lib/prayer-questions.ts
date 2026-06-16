export interface PrayerQuestion {
  id: string
  question: string
  source: string
  context: string
  category: 'jesus-asked' | 'suffering' | 'faith' | 'obedience' | 'character' | 'identity' | 'scripture'
}

export const PRAYER_QUESTIONS: PrayerQuestion[] = [
  // ── Questions Jesus Asked ──────────────────────────────────
  {
    id: 'jq-1',
    question: 'Who do you say I am?',
    source: 'Matthew 16:15',
    context: 'Jesus asked this of his disciples after asking what the crowds said. The crowds had opinions. He wanted theirs — and ours. This question cannot be answered abstractly. It requires a personal, present-tense answer. Not "who did Peter say you were" but: who do I say you are, today, given everything I know and everything I have seen?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-2',
    question: 'What do you want me to do for you?',
    source: 'Mark 10:51',
    context: 'Jesus asked this of blind Bartimaeus, who had been crying out from the roadside. The question seems obvious — of course the blind man wants to see. But Jesus asks anyway. He does not presume. He invites us to name what we actually want, because the naming is part of the prayer. What do you want him to do for you right now?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-3',
    question: 'Why are you so afraid?',
    source: 'Matthew 8:26',
    context: 'The disciples were in a boat in a storm that threatened to sink them. Jesus had been asleep. They woke him in panic. His first response was not to calm the storm — it was to ask why they were afraid. The question implies that fear, in his presence, requires explanation. What storm are you in right now, and why are you afraid in a boat that holds the Lord of the sea?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-4',
    question: 'Do you love me?',
    source: 'John 21:17',
    context: 'Jesus asked Peter this three times on the beach after the resurrection — once for each denial. He did not ask "do you understand what I taught?" or "do you repent of your failure?" He asked: do you love me? The restoration of Peter was accomplished not through a recitation of doctrine but through a declaration of love. This is the question he returns to with us as well.',
    category: 'jesus-asked',
  },
  {
    id: 'jq-5',
    question: 'Where is your faith?',
    source: 'Luke 8:25',
    context: 'Asked after stilling the storm, not before. The disciples had been terrified. He had calmed the sea. Then he asked where their faith was. Not accusing — inquiring. Faith does not always disappear in storms; sometimes it goes somewhere: buried under anxiety, hidden under circumstances, temporarily misplaced. Where is yours today?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-6',
    question: 'Why do you call me "Lord, Lord," and not do what I tell you?',
    source: 'Luke 6:46',
    context: 'One of the sharpest things Jesus ever said. He is not addressing unbelievers — he is addressing people who call him Lord. The title without the obedience is incoherent. Is there an area of your life where you call him Lord but are not actually following his instruction?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-7',
    question: 'What does it profit a man to gain the whole world and forfeit his soul?',
    source: 'Mark 8:36',
    context: 'Not a rhetorical device — a genuine question worth sitting with. What are you trading your soul for? Not in dramatic ways, but in the ordinary ones: the ambition that shapes your calendar, the approval you are working for, the thing you would find it hardest to give up. What world are you gaining? What is it costing you?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-8',
    question: 'Can any of you by worrying add a single hour to your life?',
    source: 'Matthew 6:27',
    context: 'Not a rebuke — a genuine inquiry into the logic of anxiety. Worry assumes that our mental energy can alter outcomes that are beyond us. Jesus does not say "stop worrying because it is sin" — he says "stop worrying because it does not work." What are you worrying about today that your worrying is not actually helping?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-9',
    question: 'Why are you weeping? Whom are you seeking?',
    source: 'John 20:15',
    context: 'These were the first words of the risen Christ — addressed to Mary Magdalene in the garden, who did not yet recognize him. He asked about her grief and her search simultaneously. He meets us in both. What are you mourning today? And in your searching, do you recognize the One who is already present?',
    category: 'jesus-asked',
  },
  {
    id: 'jq-10',
    question: 'Do you believe that I am able to do this?',
    source: 'Matthew 9:28',
    context: 'Jesus asked two blind men this before healing them. He did not ask if they deserved it, or if they had been faithful enough. He asked if they believed he was able. Belief in his power and willingness — not in our performance — is what the prayer of faith rests on. Do you actually believe he is able, in the situation you are bringing to him today?',
    category: 'jesus-asked',
  },

  // ── Questions about Suffering ──────────────────────────────
  {
    id: 'suf-1',
    question: 'What is God doing in this suffering that I cannot yet see?',
    source: 'Romans 8:28',
    context: '"All things work together for good" is not a promise that hard things are secretly good — it is a promise about where history is going. It does not explain the pain. It promises a Craftsman who is at work even in what feels like wreckage. What might God be making that requires this particular material?',
    category: 'suffering',
  },
  {
    id: 'suf-2',
    question: 'Is there a difference between the suffering I am in and the suffering I am adding to it?',
    source: 'James 1:2–4',
    context: 'Some of our pain is the circumstance itself. Some of it is the story we tell about the circumstance — what it means, what it proves, what will never be right again. James does not say the trial is joyful. He says to count it joy — which implies a choice. What is the actual pain, and what is the interpretation I am adding to it?',
    category: 'suffering',
  },
  {
    id: 'suf-3',
    question: 'Have I brought this grief honestly to God, or am I performing composure?',
    source: 'Psalm 88:1–2',
    context: 'Psalm 88 is the only psalm with no resolution, no turn to praise. It ends in darkness. It is in the canon, which means God welcomes honest lament without requiring us to tidy it up. Have you told God the truth about how you feel today — all of it — or only the part that sounds spiritually appropriate?',
    category: 'suffering',
  },
  {
    id: 'suf-4',
    question: 'Where have I seen God\'s faithfulness in past suffering that I am not remembering right now?',
    source: 'Lamentations 3:21–23',
    context: '"This I call to mind, and therefore I have hope." The turn in Lamentations 3 is not an improvement in circumstances — it is an act of memory. The writer chooses to recall God\'s past mercies. Memory is a spiritual discipline. What has God done before that your current pain is causing you to forget?',
    category: 'suffering',
  },
  {
    id: 'suf-5',
    question: 'If I could not change this suffering, what would it mean to find Christ sufficient within it?',
    source: '2 Corinthians 12:9',
    context: 'Paul\'s thorn was not removed. The grace that was given instead was sufficiency — not the absence of the problem but the presence of the One who is enough within it. If God said to you, as he said to Paul, "My grace is sufficient," what would faithfulness look like from within this pain?',
    category: 'suffering',
  },

  // ── Questions about Faith ──────────────────────────────────
  {
    id: 'faith-1',
    question: 'What do my habits reveal about what I actually believe — versus what I say I believe?',
    source: 'James 2:17',
    context: 'We can say we believe God provides while spending our days in financial anxiety. We can say we trust him while controlling every outcome we can reach. Our behavior is the confession our bodies make, whether we intend it or not. Look at your week: what God does your schedule believe in?',
    category: 'faith',
  },
  {
    id: 'faith-2',
    question: 'Is my faith in God himself, or in the things I believe God will do for me?',
    source: 'Habakkuk 3:17–18',
    context: 'Habakkuk\'s great confession — "though the fig tree does not blossom… yet I will rejoice in the Lord" — describes a faith that survives the failure of every expected blessing. It is faith in a Person, not in an outcome. If God gave you nothing in this season but himself, would that be enough?',
    category: 'faith',
  },
  {
    id: 'faith-3',
    question: 'What would change in my life if I fully believed what I claim to believe about God?',
    source: 'Hebrews 11:1',
    context: 'Faith is "the conviction of things not seen" — a present-tense certainty about unseen realities. If you were absolutely certain of the resurrection, certain of God\'s provision, certain of his love — what would you stop fearing? What would you start doing? The gap between those behaviors and your current ones is the gap between stated faith and operative faith.',
    category: 'faith',
  },
  {
    id: 'faith-4',
    question: 'Am I more afraid of what people think of my faith than of what God thinks of my faithlessness?',
    source: 'Galatians 1:10',
    context: 'Paul said he could not be a servant of Christ if he were still trying to please men. The fear of human opinion and the fear of God pull in different directions. Which one is shaping more of your decisions right now — the social consequence of being visibly Christian, or the eternal consequence of being unfaithful?',
    category: 'faith',
  },
  {
    id: 'faith-5',
    question: 'When did I last do something that required faith — that would have failed if God were not real?',
    source: 'Matthew 14:28–29',
    context: 'Peter walked on water only because he got out of the boat. The miracle required exposure to the danger of failure. A faith that is never tested is never proven. Is there anything in your current life that would collapse if God did not show up — or has your life been so prudently arranged that God is optional to its functioning?',
    category: 'faith',
  },

  // ── Questions about Obedience ──────────────────────────────
  {
    id: 'ob-1',
    question: 'Is there anything God has made clear that I have been delaying?',
    source: 'James 4:17',
    context: '"Whoever knows the right thing to do and fails to do it, for him it is sin." Not dramatic disobedience — just delay. Just the letter you haven\'t written, the conversation you haven\'t had, the practice you haven\'t started, the person you haven\'t forgiven. Is there anything you know is right that you are currently procrastinating on?',
    category: 'obedience',
  },
  {
    id: 'ob-2',
    question: 'Am I obeying out of love, or out of fear of consequences?',
    source: '1 John 4:18',
    context: '"Perfect love casts out fear." Fear-based obedience produces a servant who does what is required and no more, who is resentful, who performs differently when the master is not watching. Love-based obedience produces someone who wants to do more than is required. Which one is driving your obedience right now?',
    category: 'obedience',
  },
  {
    id: 'ob-3',
    question: 'Where am I obeying in public but disobeying in private?',
    source: 'Matthew 6:1',
    context: 'Jesus specifically warned against the gap between public and private religion. The religious leaders prayed loudly, fasted visibly, gave publicly — and Jesus called them hypocrites. The word means "actor." Where is the gap between the person you present to the church and the person who exists when no one is watching?',
    category: 'obedience',
  },
  {
    id: 'ob-4',
    question: 'What is the next obedient step — not the whole plan, just the next step?',
    source: 'Psalm 119:105',
    context: 'A lamp to your feet illuminates just enough for the next step. We often avoid obedience because we cannot see the whole road. But the whole road is not required — only the next step. What is the one clear thing in front of you that faithfulness requires right now, today?',
    category: 'obedience',
  },
  {
    id: 'ob-5',
    question: 'Is there someone I need to go to — to ask forgiveness, to offer reconciliation, to speak honest love?',
    source: 'Matthew 5:23–24',
    context: 'Jesus said to leave your gift at the altar and go be reconciled to your brother first. Worship is interrupted by unresolved relationship. The order matters: repair the relationship, then bring the offering. Who is the person this instruction is about for you today?',
    category: 'obedience',
  },

  // ── Questions about God's Character ───────────────────────
  {
    id: 'char-1',
    question: 'What does the cross reveal about what God is willing to do for the people he loves?',
    source: 'Romans 8:32',
    context: '"He who did not spare his own Son but gave him up for us all — how will he not also with him graciously give us all things?" The cross is the proof. If God did the hardest thing — did not withhold his Son — then every lesser provision is already guaranteed by the logic of the greater gift. What lesser thing are you afraid God might withhold?',
    category: 'character',
  },
  {
    id: 'char-2',
    question: 'What does God\'s patience with my repeated failures tell me about his character?',
    source: 'Lamentations 3:22–23',
    context: 'His mercies are new every morning — not every decade, not every season of repentance, but every morning. There is no accumulation of failures that exhausts the morning mercy. What would it mean to actually receive this, today, for the specific failure you are carrying?',
    category: 'character',
  },
  {
    id: 'char-3',
    question: 'Do I actually believe God is good — not just that he produces good outcomes, but that he himself is good?',
    source: 'Psalm 34:8',
    context: '"Taste and see that the Lord is good." The goodness of God is not an abstraction — it is something to be experienced. But our circumstances often seem to argue against it. The Psalmist wrote this while hiding in a cave, having faked madness to survive. His testimony was not from the mountain. Where have you tasted God\'s goodness in circumstances that seemed to argue against it?',
    category: 'character',
  },
  {
    id: 'char-4',
    question: 'What does it mean that God is holy — and how does that change how I approach him?',
    source: 'Isaiah 6:3',
    context: 'Isaiah\'s vision of the holiness of God — "Holy, holy, holy is the Lord of hosts; the whole earth is full of his glory" — produced immediate collapse: "Woe is me, for I am ruined." Holiness is not primarily about rules. It is the utter otherness, the moral completeness, the weight of God\'s being. How often do you approach God as the Holy One versus as a helpful resource?',
    category: 'character',
  },
  {
    id: 'char-5',
    question: 'How does God\'s patience with the nations — his slowness to judge — reveal something about his character that I should imitate?',
    source: '2 Peter 3:9',
    context: '"The Lord is not slow to fulfill his promise as some count slowness, but is patient toward you, not wishing that any should perish." What God withholds in judgment, he offers as invitation. His patience is the window of grace. How am I reflecting his patience in my own dealings with people who have wronged me or who do not yet know him?',
    category: 'character',
  },

  // ── Questions about Identity in Christ ────────────────────
  {
    id: 'id-1',
    question: 'What does it mean, in practice today, that I have been adopted as a child of God?',
    source: 'Romans 8:15–16',
    context: '"You have received the Spirit of adoption as sons, by whom we cry, \'Abba! Father!\'" Adoption in the Roman world was permanent, legal, and conveyed full rights of inheritance. You were not born into God\'s family — you were brought in, chosen, and given the full name and standing of a child. What would change if you approached today — its decisions, its relationships, its anxieties — from the posture of a beloved child rather than a servant hoping not to be fired?',
    category: 'identity',
  },
  {
    id: 'id-2',
    question: 'Where do I still define myself by what I have done rather than by what Christ has done?',
    source: '2 Corinthians 5:17',
    context: '"If anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come." The old self is not reformed — it is replaced. The new identity is not earned by improved behavior but received in Christ. Which of your old identities are you still wearing — the shame, the failure, the label someone else put on you — that Christ has already removed?',
    category: 'identity',
  },
  {
    id: 'id-3',
    question: 'Am I living as someone who has been forgiven everything, or as someone who is managing their debt?',
    source: 'Luke 7:47',
    context: 'Jesus said the one who is forgiven much loves much. The woman who washed his feet with her tears had been forgiven a great debt and knew it. The Pharisee who hosted dinner had been forgiven the same debt and didn\'t know it — and loved little. The difference was not in the forgiveness but in the awareness of its magnitude. Do you know what you have been forgiven?',
    category: 'identity',
  },
  {
    id: 'id-4',
    question: 'What would I stop being afraid of if I truly believed I was sealed by the Holy Spirit?',
    source: 'Ephesians 1:13–14',
    context: '"You were sealed with the promised Holy Spirit, who is the guarantee of our inheritance." A seal is a mark of ownership and protection. You belong to someone strong enough that your belonging cannot be undone by your failures or your circumstances. What fears would lose their power if this became more real to you than they are?',
    category: 'identity',
  },

  // ── Scripture-sourced questions ────────────────────────────
  {
    id: 'scr-1',
    question: 'What is God saying to me through what I have read in Scripture this week?',
    source: 'Hebrews 4:12',
    context: '"The word of God is living and active, sharper than any two-edged sword." Scripture is not an archive — it is a voice. It speaks into the present. Not "what did this text mean to its original audience" (though that matters) but: what is the living God saying through this text to me, today, in this moment of my life?',
    category: 'scripture',
  },
  {
    id: 'scr-2',
    question: 'Is there a verse I have memorized but not yet believed?',
    source: 'Psalm 119:11',
    context: '"I have stored up your word in my heart, that I might not sin against you." The psalmist stored the Word not as information but as ammunition for moments of temptation and difficulty. We sometimes know verses the way we know historical facts — accurately, but at a distance. Is there a truth you know in your head that has not reached your daily behavior?',
    category: 'scripture',
  },
  {
    id: 'scr-3',
    question: 'What would it mean to obey the last clear thing God said to me through Scripture?',
    source: 'Luke 11:28',
    context: '"Blessed rather are those who hear the word of God and keep it." There is usually one clear instruction — from a recent reading, a sermon, a passage you have returned to repeatedly — that has not been acted on yet. We often seek more direction before obeying the last direction. What is the last thing God made clear that is still waiting for your obedience?',
    category: 'scripture',
  },
  {
    id: 'scr-4',
    question: 'Which character in Scripture am I most like right now — and what does their story tell me about mine?',
    source: 'Romans 15:4',
    context: '"Whatever was written in former days was written for our instruction." The Scriptures give us a cast of characters — people in every condition of faith and failure — so that we can find ourselves in the story. Not to judge ourselves by their worst moments or to flatter ourselves by their best — but to see that God was at work in lives like ours.',
    category: 'scripture',
  },
]

export function getDailyQuestion(): PrayerQuestion {
  const dayIndex = Math.floor(Date.now() / 86_400_000)
  return PRAYER_QUESTIONS[dayIndex % PRAYER_QUESTIONS.length]
}

export const QUESTION_CATEGORIES = [
  { key: 'all', label: 'All Questions' },
  { key: 'jesus-asked', label: 'Jesus Asked' },
  { key: 'suffering', label: 'Suffering' },
  { key: 'faith', label: 'Faith' },
  { key: 'obedience', label: 'Obedience' },
  { key: 'character', label: 'God\'s Character' },
  { key: 'identity', label: 'Identity' },
  { key: 'scripture', label: 'From Scripture' },
] as const
