export interface WordNotInBible {
  id: string
  word: string
  category: 'doctrine' | 'ethics' | 'practice' | 'eschatology' | 'sexuality'
  the_surprise: string
  what_scripture_does_say: string
  scripture: string
  scriptureText: string
  why_it_matters: string
  the_principle: string
}

export const WORDS_NOT_IN_BIBLE: WordNotInBible[] = [
  {
    id: 'trinity',
    word: 'Trinity',
    category: 'doctrine',
    the_surprise: 'The word "Trinity" does not appear anywhere in the Bible. Not once. The doctrine of the Trinity — that God is one being eternally existing in three distinct persons, Father, Son, and Holy Spirit — was formalized by the church councils of the 4th century. Arius denied it; the Council of Nicaea (AD 325) and Constantinople (AD 381) defended it. The word is post-biblical. The doctrine is not.',
    what_scripture_does_say: 'Scripture never uses the word "Trinity," but it makes the doctrine inescapable. At Jesus\'s baptism, the Father speaks from heaven, the Son stands in the water, and the Spirit descends as a dove — three persons present simultaneously (Matthew 3:16–17). Jesus tells his disciples to baptize "in the name" (singular) "of the Father and of the Son and of the Holy Spirit" (Matthew 28:19) — one name, three persons. The prologue to John says "the Word was with God, and the Word was God" (John 1:1) — simultaneously distinct from and identical to God. Paul closes 2 Corinthians with a triadic blessing: "The grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit be with you all" (2 Corinthians 13:14 CSB). The church did not invent the Trinity — it observed it in Scripture and insisted on finding the best language to protect what was there.',
    scripture: 'Matthew 28:19 (CSB)',
    scriptureText: '"Go, therefore, and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."',
    why_it_matters: 'The Trinity is not an abstract philosophical puzzle — it is the shape of the Christian God. A God who is eternally relational within himself — Father loving Son, Son glorifying Father, Spirit proceeding from both — is a God for whom love is not a reaction to creation but his eternal nature. We were made for relationship because God himself is relational at his core. The Trinity is also the foundation of the gospel: the Father sends, the Son obeys and atones, the Spirit applies and transforms. All three are essential. To collapse any person into another is to lose the gospel.',
    the_principle: 'Not every true thing is named in Scripture. The Bible does not contain an index of itself. The church\'s job has always been to faithfully understand and articulate what Scripture reveals — and what Scripture reveals requires the doctrine of the Trinity to make sense of it.',
  },
  {
    id: 'homosexuality',
    word: 'Homosexuality',
    category: 'sexuality',
    the_surprise: 'The word "homosexuality" did not exist until the late 19th century — it was coined in 1869 by the Hungarian writer Karl-Maria Kertbeny and entered English psychological literature in the 1890s. The modern concept of sexual orientation as a stable personal identity is a 19th-century invention. No biblical author could have used the word because it did not exist in any ancient language. This does not mean the Bible is silent on same-sex practice — it is not — but it does mean the church should be careful about importing a modern psychological framework wholesale onto ancient texts.',
    what_scripture_does_say: 'Scripture consistently treats sexual union as designed for one man and one woman in covenant marriage (Genesis 2:24; Matthew 19:4–6). The creation account establishes this as the ordering principle, not merely a cultural preference. The New Testament, in several passages (Romans 1:26–27; 1 Corinthians 6:9–10; 1 Timothy 1:9–10), addresses same-sex sexual practice and describes it as contrary to God\'s design. These passages are debated in their translation and scope, but they are not peripheral — they connect directly to the creation framework Jesus himself affirmed. At the same time, Scripture everywhere insists that every human being — regardless of their experience of desire — is made in the image of God, loved by him, and invited into his family. The church\'s calling is to hold both truths without collapsing either.',
    scripture: 'Genesis 2:24 (CSB)',
    scriptureText: '"This is why a man leaves his father and mother and bonds with his wife, and they become one flesh."',
    why_it_matters: 'The question is not whether the word "homosexuality" appears in the Bible — it doesn\'t. The question is whether Scripture has a coherent vision of human sexuality and what it is designed for. It does. That vision is rooted in creation (male and female, covenant union), not merely in Levitical law or Pauline cultural preference. Jesus himself, when asked about sexual ethics, went back to Genesis 2 — to the beginning, to design. The church that takes Scripture seriously must grapple with both its clarity about God\'s design and its insistence on welcome, dignity, and grace for every person, including those who experience same-sex attraction.',
    the_principle: 'The absence of a modern word does not mean the absence of biblical teaching. Scripture addresses human sexuality through its theology of creation, image, covenant, and embodiment — none of which requires the word "homosexuality" to be relevant.',
  },
  {
    id: 'rapture',
    word: 'Rapture',
    category: 'eschatology',
    the_surprise: 'The word "rapture" does not appear in the Bible. The doctrine of a secret pre-tribulation rapture — in which believers are suddenly removed from earth before a period of tribulation — was largely unknown in church history before the 1830s. It was systematized by John Nelson Darby and popularized in the 20th century by Dwight L. Moody, the Scofield Reference Bible, Hal Lindsey\'s The Late Great Planet Earth, and the Left Behind series. Most Christians throughout history have held to a general resurrection at Christ\'s return, not a separate secret event beforehand.',
    what_scripture_does_say: 'The key passage is 1 Thessalonians 4:16–17 (CSB): "For the Lord himself will descend from heaven with a shout, with the archangel\'s voice, and with the trumpet of God, and the dead in Christ will rise first. Then we who are still alive, who are left, will be caught up together with them in the clouds to meet the Lord in the air, and so we will always be with the Lord." The Latin word for "caught up" is rapturus — which is where "rapture" comes from. The event described is real: at Christ\'s return, believers alive and dead will be gathered to him. What is debated is the timing, sequence, and nature of this event relative to tribulation and final judgment. Christians of good faith hold different views on this.',
    scripture: '1 Thessalonians 4:16–17 (CSB)',
    scriptureText: '"For the Lord himself will descend from heaven with a shout, with the archangel\'s voice, and with the trumpet of God, and the dead in Christ will rise first. Then we who are still alive, who are left, will be caught up together with them in the clouds to meet the Lord in the air, and so we will always be with the Lord."',
    why_it_matters: 'The word is recent; the reality it points toward is not. Christ is returning. The dead will be raised. The living will be transformed. Every human being will face God. These are not peripheral doctrines — they are the hope of the Christian life. Whether the sequence is pre-, mid-, or post-tribulation is a genuine debate among faithful Christians; what is not debatable is that history has a direction, a destination, and a King who is coming.',
    the_principle: 'Some doctrines are named after biblical events even if the name itself is not in the text. The naming matters less than the substance — and the substance here is the bodily return of Christ and the resurrection of the dead.',
  },
  {
    id: 'quiet-time',
    word: 'Quiet Time',
    category: 'practice',
    the_surprise: '"Quiet time" — the daily practice of a set period of personal Bible reading and prayer — is not a biblical phrase, and the modern form of it (individual, scheduled, often journaled) is largely a product of the Puritan tradition and later 19th-century evangelical piety. Ancient Christians did not structure their devotional life primarily around individual Bible reading, partly because most of them could not read and did not own personal copies of Scripture.',
    what_scripture_does_say: 'Scripture is saturated with the assumption of regular communion with God — David\'s psalms ("Evening and morning and at noon, I will pray," Psalm 55:17), Daniel\'s three-daily prayer habit (Daniel 6:10), Jesus\'s regular withdrawal to pray (Luke 5:16: "he often withdrew to deserted places and prayed"). The early church devoted themselves to "the apostles\' teaching, to the fellowship, to the breaking of bread, and to prayer" (Acts 2:42 CSB). The call to "pray without ceasing" (1 Thessalonians 5:17 CSB) and to "let the word of Christ dwell richly among you" (Colossians 3:16 CSB) point toward lives saturated with Scripture and prayer — a posture, not merely a practice.',
    scripture: 'Psalm 1:2 (CSB)',
    scriptureText: '"Instead, his delight is in the LORD\'s instruction, and he meditates on it day and night."',
    why_it_matters: 'The concept is sound even if the phrase is not in the text. Regular, intentional engagement with Scripture and prayer is essential to discipleship. The question is whether "quiet time" becomes an obligation to check off or a genuine encounter with the living God. The danger of a named practice is that it becomes formalized into a rule that produces guilt when missed rather than relationship when kept.',
    the_principle: 'Some practices are biblical even when their name is not. The practice of sitting with God daily — in Scripture, in prayer, in silence — is as ancient as the psalms. The name is modern; the practice is eternal.',
  },
  {
    id: 'free-will',
    word: 'Free Will',
    category: 'doctrine',
    the_surprise: '"Free will" as a philosophical category (the metaphysical libertarian freedom to have done otherwise) does not appear in Scripture. The phrase is never used. What Scripture does address — extensively — is the human capacity to choose, the reality of moral responsibility, the bondage of the will to sin apart from grace, and the sovereignty of God over all things. The philosophical debate about "free will" vs. determinism is largely a Greek import into Christian theology, not a native biblical category.',
    what_scripture_does_say: 'Scripture presents human beings as genuine agents — we choose, we are held responsible, we are called to repent and believe. "Choose for yourselves today whom you will serve" (Joshua 24:15 CSB). "Whoever believes in the Son has eternal life" (John 3:36 CSB). At the same time, Scripture is clear that apart from grace, the human will is bound to sin: "No one can come to me unless the Father who sent me draws him" (John 6:44 CSB). "The natural person does not accept the things of the Spirit of God, for they are folly to him" (1 Corinthians 2:14). The resolution Scripture offers is not libertarian free will or hard determinism — it is grace. God\'s sovereign work and human genuine choice coexist in Scripture without a philosophical resolution. This is the mystery that Reformed and Arminian traditions have argued about for centuries, and both are reading the same Bible.',
    scripture: 'John 6:44 (CSB)',
    scriptureText: '"No one can come to me unless the Father who sent me draws him, and I will raise him up on the last day."',
    why_it_matters: 'The biblical truth is that humans are genuinely responsible and God is genuinely sovereign — and that these two truths do not cancel each other out, even when we cannot resolve the philosophical tension. The gospel does not wait for the resolution. "Repent and believe" is a genuine call; "your salvation is the Lord\'s doing" is a genuine truth. The practical implication is that we pray for people\'s salvation (trusting God\'s sovereignty) and preach to them (trusting that their response matters).',
    the_principle: 'The absence of a philosophical category does not mean Scripture has nothing to say. It often means Scripture is operating with a different framework than the one we imported. Read Scripture on its own terms before importing philosophical vocabulary.',
  },
  {
    id: 'soulmate',
    word: 'Soulmate',
    category: 'practice',
    the_surprise: '"Soulmate" — the idea that God has one specific person uniquely predestined to be your romantic partner, and that marriage involves finding that one person — is not a biblical concept. It is a Romantic-era idea with roots in Plato\'s Symposium (the myth that humans were originally split in two and spend their lives searching for their other half). It has been thoroughly absorbed into Christian dating culture despite having no scriptural foundation.',
    what_scripture_does_say: 'Scripture presents marriage as a covenant — a binding promise between a man and a woman before God and the community — not as the discovery of a metaphysically predetermined match. The Song of Solomon celebrates erotic love within covenant. Proverbs 31 describes a wife of noble character. Ephesians 5 calls husbands to love their wives as Christ loved the church — a sacrificial, ongoing choice, not the natural consequence of having found "the one." Paul in 1 Corinthians 7 presents both marriage and singleness as valid callings (and seems to prefer singleness for those who can pursue it without distress). Scripture nowhere suggests that God has one specific person for each person and that finding them is the key to happiness. It does say that covenant love, shaped by Christ\'s love for the church, is the model.',
    scripture: 'Ephesians 5:25 (CSB)',
    scriptureText: '"Husbands, love your wives, just as Christ loved the church and gave himself for her."',
    why_it_matters: 'The "soulmate" idea puts enormous pressure on a single relationship to be the source of meaning, completion, and ultimate belonging — things that belong to God alone. It also creates a framework where people feel free to leave marriages when they stop feeling like their "soulmate" has been found. The biblical alternative — covenant love, chosen daily, shaped by Christ — is far more demanding and far more beautiful.',
    the_principle: 'Cultural ideas that feel spiritual are not automatically biblical. The soulmate framework is psychologically compelling and spiritually empty. Scripture\'s framework — covenant, sacrifice, and grace — is harder and truer.',
  },
  {
    id: 'addiction',
    word: 'Addiction',
    category: 'practice',
    the_surprise: '"Addiction" as a medical category — a chronic brain disorder characterized by compulsive use of a substance or behavior despite harmful consequences — is a modern concept. The word does not appear in Scripture. The medical model of addiction has only been dominant since the 20th century. But Scripture addresses the underlying reality — enslaved desire, compulsive behavior, the bondage to appetite — with great depth and precision.',
    what_scripture_does_say: 'Paul describes the dynamics of addiction with striking psychological accuracy in Romans 7: "I do not understand what I am doing, because I do not practice what I want to do, but I do what I hate... For I do not do the good that I want to do, but I practice the evil that I do not want to do" (Romans 7:15, 19 CSB). He speaks of being "enslaved to sin" (Romans 6:6). Peter warns that "people are enslaved to whatever defeats them" (2 Peter 2:19 CSB). Proverbs 20:1 says "Wine is a mocker, beer is a brawler; whoever goes astray because of them is not wise." Scripture also presents the answer not as moral willpower but as transformation by the Spirit: "walk by the Spirit, and you will certainly not carry out the desire of the flesh" (Galatians 5:16 CSB). The gospel does not minimize the bondage — it offers genuine liberation.',
    scripture: 'Romans 6:6 (CSB)',
    scriptureText: '"For we know that our old self was crucified with him so that the body ruled by sin might be rendered powerless so that we may no longer be enslaved to sin."',
    why_it_matters: 'The church sometimes errs in two directions: treating addiction as only a moral failure (so the solution is try harder) or treating it as only a medical condition (so the solution is therapy and medication). Scripture\'s framework holds more. Sin is real — the compulsion has a moral dimension and not only a neurological one. But grace is also real — and it addresses the bondage that willpower cannot. The goal is not merely sobriety but freedom, and freedom is the work of the Spirit.',
    the_principle: 'The absence of the modern word does not mean the absence of ancient wisdom. Romans 7 describes the inner experience of compulsive, enslaved desire with more honesty and depth than most clinical literature — and Romans 8 offers the answer.',
  },
  {
    id: 'accountability',
    word: 'Accountability Partner',
    category: 'practice',
    the_surprise: '"Accountability partner" — the one-on-one relationship in which two people regularly report their sins and struggles to each other — is an evangelical practice developed in the late 20th century, particularly in men\'s ministry contexts. It is not a biblical category. The word does not appear in Scripture. The practice is well-intentioned but carries risks that Scripture\'s actual community framework avoids.',
    what_scripture_does_say: 'Scripture calls the whole community to mutual confession and care. "Confess your sins to one another and pray for one another, so that you may be healed" (James 5:16 CSB) — the context here is the gathered church community, not a private one-on-one reporting relationship. "Brothers and sisters, if someone is overtaken in any wrongdoing, you who are spiritual, restore such a person with a gentle spirit" (Galatians 6:1 CSB). Hebrews 10:24–25 (CSB): "And let us consider one another in order to provoke love and good works, not neglecting to gather together, as some are in the habit of doing." The pattern is communal, pastoral, and Spirit-empowered — not merely informational reporting. Confession in Scripture flows into prayer, restoration, and community — not a checklist of weekly failures.',
    scripture: 'James 5:16 (CSB)',
    scriptureText: '"Therefore, confess your sins to one another and pray for one another, so that you may be healed. The prayer of a righteous person is very powerful in its effect."',
    why_it_matters: 'The accountability partner model can produce shame cycles rather than transformation if it is reduced to reporting without prayer, pastoral care, and genuine community. It can also become a substitute for the sacramental and communal life Scripture envisions. The richer framework is: honest confession within a community of grace, pastoral oversight, mutual prayer, and the Spirit\'s transforming work — not two men texting each other their failure scores on Friday.',
    the_principle: 'The instinct behind accountability is right — we need others in our struggle. But the biblical shape of that help is communal, Spirit-led, and oriented toward restoration, not performance.',
  },
]

export const WORD_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'doctrine', label: 'Doctrine' },
  { key: 'ethics', label: 'Ethics' },
  { key: 'sexuality', label: 'Sexuality' },
  { key: 'practice', label: 'Practice' },
  { key: 'eschatology', label: 'End Times' },
] as const

export const WORDS_INTRO = `These are words that Christians use every day that don't appear in the Bible — not because the Bible is silent on what they describe, but because the biblical world didn't have our vocabulary. Understanding why helps us read Scripture more carefully, hold our theological language more humbly, and trust the Bible to speak on its own terms.`
