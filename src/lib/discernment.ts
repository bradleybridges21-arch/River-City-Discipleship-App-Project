export interface DiscernmentPattern {
  id: string
  pattern: string
  description: string
  likely_source: 'flesh' | 'world' | 'enemy' | 'mixed'
  questions: string[]
  response: string
}

export interface Enemy {
  id: 'flesh' | 'world' | 'enemy'
  name: string
  greek: string
  meaning: string
  how_it_works: string
  scripture: string
  scriptureText: string
  symptoms: string[]
  the_grace: string
}

export const THREE_ENEMIES: Enemy[] = [
  {
    id: 'flesh',
    name: 'The Flesh',
    greek: 'sarx (σάρξ)',
    meaning: 'In Paul\'s usage, "flesh" (sarx) does not mean your physical body — it means the orientation of your whole person toward self-rule, self-gratification, and self-sufficiency apart from God. It is the old nature, the Adamic default, the curved-inward heart that Augustine described. It is not outside of you — it is the part of you that has not yet been surrendered.',
    how_it_works: 'The flesh operates through desire — particularly desire that has become disordered. It amplifies your appetites (for pleasure, comfort, approval, control), minimizes consequences, and whispers that you deserve this, that no one will know, that a little is fine. It is reactive: triggered by stress, boredom, fear, rejection, fatigue. It does not tempt you toward things that feel wrong in the moment — it tempts you toward things that feel right, necessary, or earned.',
    scripture: 'Galatians 5:19–21, 24 (CSB)',
    scriptureText: '"Now the works of the flesh are obvious: sexual immorality, moral impurity, promiscuity, idolatry, sorcery, hatreds, strife, jealousy, outbursts of anger, selfish ambitions, dissensions, factions, envy, drunkenness, carousing, and anything similar... Those who belong to Christ Jesus have crucified the flesh with its passions and desires."',
    symptoms: [
      'The impulse feels urgent but not holy',
      'You are tired, stressed, bored, or lonely',
      'You are seeking comfort, escape, or numbing',
      'The desire is long-standing and familiar',
      'You feel entitled: "I deserve this" or "I\'ve been good enough"',
      'You minimize the harm: "It\'s not that bad" or "Just this once"',
      'The conviction comes after, not during',
      'You want to hide it from people you respect',
    ],
    the_grace: 'The flesh is not defeated by willpower — it is crucified with Christ and replaced by the Spirit. "Walk by the Spirit, and you will certainly not carry out the desire of the flesh" (Galatians 5:16 CSB). The response to flesh is not primarily resistance but reorientation — toward God, toward Scripture, toward community, toward the practices that keep you "alive to God in Christ Jesus" (Romans 6:11 CSB). You cannot fight the flesh by staring at it. You overcome it by turning away from it toward the better thing.',
  },
  {
    id: 'world',
    name: 'The World',
    greek: 'kosmos (κόσμος)',
    meaning: '"The world" (kosmos) in New Testament usage does not mean the physical earth or the people in it. It means the organized system of values, assumptions, powers, and structures that operate independently of God and in opposition to his kingdom. It is the water you swim in without noticing — the ambient culture that quietly shapes what you assume is normal, desirable, valuable, and possible.',
    how_it_works: 'The world works through normalization. It does not need to convince you that something is good — it simply needs to surround you with it long enough that you stop noticing it. It shapes your values through media, comparison, consumption, status, and fear of being left behind. John identifies its three primary appeals: "the lust of the flesh, the lust of the eyes, and the pride in one\'s possessions" (1 John 2:16 CSB) — pleasure, acquisition, and status. It does not usually tempt you toward dramatic sin; it tempts you toward gradual drift.',
    scripture: '1 John 2:15–17 (CSB)',
    scriptureText: '"Do not love the world or the things in the world. If anyone loves the world, the love of the Father is not in him. For everything in the world — the lust of the flesh, the lust of the eyes, and the pride in one\'s possessions — is not from the Father, but is from the world. And the world with its lust is passing away, but the one who does the will of God remains forever."',
    symptoms: [
      'You feel behind others in career, possessions, status, or lifestyle',
      'You are more concerned about what others think than what God thinks',
      'You have absorbed assumptions about success, beauty, or worth from culture',
      'You feel pressure to perform, achieve, or be seen',
      'Your sense of security is tied to financial, social, or professional standing',
      'You have grown numb to something that Scripture clearly addresses',
      'The values you are living by look more like your culture than like the Sermon on the Mount',
      'You are exhausted from keeping up appearances',
    ],
    the_grace: 'The antidote to the world is not withdrawal from it — Jesus prays "not that you take them out of the world, but that you protect them from the evil one" (John 17:15 CSB). It is renewal: "Do not be conformed to this age, but be transformed by the renewing of your mind" (Romans 12:2 CSB). The way you are renewed is by saturating yourself with a different story — Scripture, worship, community, prayer, fasting — until the world\'s story sounds thin by comparison. You begin to see its promises for what they are: bright, loud, and unable to deliver.',
  },
  {
    id: 'enemy',
    name: 'The Enemy',
    greek: 'diabolos (διάβολος) / Satan (Σατανᾶς)',
    meaning: '"Diabolos" means "slanderer" or "accuser." "Satan" means "adversary" or "one who opposes." The enemy is a personal, malevolent spiritual being — not a symbol of evil, not a metaphor for the subconscious — who actively works against God\'s purposes and against the people of God. Jesus treated him as real (Matthew 4:1–11; Luke 10:18; John 8:44). So did Paul (Ephesians 6:11–12; 2 Corinthians 11:14). So did Peter (1 Peter 5:8). This is not superstition — it is the consistent witness of Scripture.',
    how_it_works: 'The enemy works primarily through deception — "he is a liar and the father of lies" (John 8:44 CSB). He does not usually announce himself. He plants false accusations, false identities, false conclusions, and false fears. He also works through accusation — which is his title. He uses your actual failures against you, bringing shame that cannot be answered because the facts are true. He amplifies wounds, distorts Scripture, presents counterfeits of God\'s gifts, and attacks in moments of weakness. He prowls "like a roaring lion, looking for anyone he can devour" (1 Peter 5:8 CSB) — the roar is not always loud. It is often very quiet.',
    scripture: 'Ephesians 6:11–12 (CSB)',
    scriptureText: '"Put on the full armor of God so that you can stand against the schemes of the devil. For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the cosmic powers of this darkness, against evil, in the heavenly realms."',
    symptoms: [
      'Thoughts that deny the truth of who you are in Christ — "God doesn\'t love you," "You\'re disqualified," "There\'s no hope for you"',
      'False accusations that spiral but cannot be confessed away',
      'Sudden, intrusive temptations that are out of character and feel external',
      'Spiritual attacks that coincide with significant acts of obedience or ministry',
      'Obsessive shame that keeps returning after genuine repentance',
      'A counterfeit that mimics something holy but produces confusion and bondage rather than fruit',
      'Relational division and accusation that seems to come from nowhere and cannot be resolved',
      'Fear that is disproportionate to the actual situation and resistant to prayer',
    ],
    the_grace: 'The enemy is real — but he is already defeated. "The reason the Son of God was revealed was to destroy the devil\'s works" (1 John 3:8 CSB). The cross was the decisive victory; the Christian life is living in the consequences of that victory. We are not fighting to win — we are fighting from a win. The weapons are not psychological but spiritual: truth (the belt), righteousness (the breastplate), the gospel (the shoes), faith (the shield), salvation (the helmet), and the Word of God (the sword). And prayer: "praying at all times in the Spirit" (Ephesians 6:18 CSB). The enemy cannot withstand the name of Jesus spoken in faith, the blood of the Lamb, and the word of your testimony (Revelation 12:11).',
  },
]

export const DISCERNMENT_QUESTIONS: Array<{
  question: string
  points_toward: 'flesh' | 'world' | 'enemy' | 'clarifying'
  explanation: string
}> = [
  {
    question: 'How long have I struggled with this?',
    points_toward: 'clarifying',
    explanation: 'Long-standing patterns (years, decades) usually involve the flesh — ingrained habits of the old nature. Sudden, acute attacks often involve the enemy. Gradual drift over seasons usually involves the world.',
  },
  {
    question: 'Does this thought or desire feel like me — familiar, internal?',
    points_toward: 'flesh',
    explanation: 'Fleshly temptation feels native. It is your own desire, amplified. You recognize it as something you want, not something foreign.',
  },
  {
    question: 'Am I comparing myself to others, seeking status, or feeling behind?',
    points_toward: 'world',
    explanation: 'The world\'s primary tool is comparison. If the anxiety or desire is fundamentally relational to culture — status, appearance, success, belonging — the world is likely at work.',
  },
  {
    question: 'Is this accusation true, or is it a distortion of something true?',
    points_toward: 'enemy',
    explanation: 'The enemy accuses. His accusations often contain enough truth to sting but are distorted in scope, permanence, or implication. "You failed" is sometimes true; "You are disqualified forever" is always a lie.',
  },
  {
    question: 'Does this thought deny or undermine my identity in Christ?',
    points_toward: 'enemy',
    explanation: 'Thoughts that say "God doesn\'t love you," "You\'re beyond grace," or "You\'re not really a Christian" go after identity. This is the enemy\'s primary strategy — undermine who God says you are.',
  },
  {
    question: 'Am I tired, stressed, hungry, lonely, or bored?',
    points_toward: 'flesh',
    explanation: 'The flesh is opportunistic. It activates under physical and emotional vulnerability. This is why ancient spiritual writers fasted and slept and rested — they understood that bodily rhythms affect spiritual vigilance.',
  },
  {
    question: 'Did this come on suddenly around a significant act of obedience?',
    points_toward: 'enemy',
    explanation: 'Spiritual attacks often intensify around significant commitments, seasons of ministry, or moments of breakthrough. If the timing is suspicious — right before a baptism, a hard conversation, a mission trip — take note.',
  },
  {
    question: 'Have I been saturating myself in a particular cultural current?',
    points_toward: 'world',
    explanation: 'What you consume shapes what you desire. If the pull you feel can be traced to particular media, environments, or social circles, the world is doing its work of normalization.',
  },
  {
    question: 'When I confess this, does the shame lift?',
    points_toward: 'clarifying',
    explanation: 'Godly sorrow (2 Corinthians 7:10) produces repentance and freedom. Shame that returns after genuine repentance and confession is often enemy accusation — he has no right to condemn what has been confessed.',
  },
  {
    question: 'Is this a pattern I can trace in my family or history?',
    points_toward: 'flesh',
    explanation: 'Generational patterns — not in a mystical sense, but in the sense of learned behaviors, emotional patterns, and ingrained responses — are usually the flesh operating through formed habits. They are real, they are deep, and they are not quick to yield.',
  },
]

export const UNIFIED_RESPONSE = {
  title: 'The Response Is Always the Same',
  body: `Whether the source is flesh, world, or enemy — the response is always the same movement, even if the emphasis differs.

**Acknowledge it.** Name it without minimizing or dramatizing. "This is what is happening in me."

**Bring it to God.** Confession to God (and to trusted others, James 5:16) is always the first movement. Not self-analysis. Not willpower. Prayer.

**Resist it.** "Submit to God. Resist the devil, and he will flee from you" (James 4:7 CSB). Submission to God precedes resistance to the enemy. You cannot resist from your own strength.

**Replace it.** Temptation defeated by willpower is just suppression — the desire will return. The flesh is overcome by walking in the Spirit. The world is overcome by renewal of the mind. The enemy is overcome by the Word of God. Fill the space with truth, with Scripture, with worship, with community.

**Stay in community.** The isolated disciple is the vulnerable disciple. All three enemies prefer darkness and isolation. Genuine Christian community — where you are known, prayed for, and accountable — is one of the most powerful weapons against all three.`,
  scripture: 'James 4:7–8 (CSB)',
  scriptureText: '"Therefore, submit to God. Resist the devil, and he will flee from you. Draw near to God, and he will draw near to you."',
}

export const DISCERNMENT_INTRO = `One of the most practical questions in the Christian life is this: when you feel a pull toward something you know isn't right — when you find yourself in a pattern you can't break, when a thought won't leave you alone — where is it coming from? The Bible identifies three sources of opposition: the flesh (sarx), the world (kosmos), and the enemy (diabolos). They are distinct. They work differently. And understanding which one is at work helps you respond wisely. Most of the time, it is not a demon. Most of the time it is your own flesh, or the ambient pressure of a culture shaped by values other than the kingdom. But sometimes it is more — and the disciple should know the difference.`
