'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import PageHeader from '@/components/PageHeader'
import { HYMNS, HYMN_CATEGORIES } from '@/lib/hymns'
import { BIBLE_BOOKS, OT_SECTIONS, NT_SECTIONS } from '@/lib/bible-books'
import { COUNTERFEITS, CAPSTONE } from '@/lib/true-blessing'
import { TEACHING_LIBRARY } from '@/lib/teaching-library'
import { PRAYER_QUESTIONS, QUESTION_CATEGORIES } from '@/lib/prayer-questions'
import { HARD_WORDS, HARD_WORDS_INTRO } from '@/lib/hard-words'
import { WORDS_NOT_IN_BIBLE, WORDS_INTRO } from '@/lib/words-not-in-bible'
import { THREE_ENEMIES, DISCERNMENT_QUESTIONS, UNIFIED_RESPONSE, DISCERNMENT_INTRO } from '@/lib/discernment'

interface Teaching {
  id: string; week_label: string; hook: string
  scripture_ref: string; application: string; question: string
}
interface Response { id: string; body: string }

const CATECHISM = [
  { q: 'What is the chief end of man?', a: 'Man\'s chief end is to glorify God, and to enjoy him forever.', ref: 'Q.1' },
  { q: 'What is God?', a: 'God is a Spirit, infinite, eternal, and unchangeable, in his being, wisdom, power, holiness, justice, goodness, and truth.', ref: 'Q.4' },
  { q: 'Are there more Gods than one?', a: 'There is but one only, the living and true God.', ref: 'Q.5' },
  { q: 'How many persons are there in the Godhead?', a: 'There are three persons in the Godhead: the Father, the Son, and the Holy Ghost; and these three are one God, the same in substance, equal in power and glory.', ref: 'Q.6' },
  { q: 'What are the decrees of God?', a: 'The decrees of God are his eternal purpose, according to the counsel of his will, whereby, for his own glory, he hath foreordained whatsoever comes to pass.', ref: 'Q.7' },
  { q: 'What is the work of creation?', a: 'The work of creation is God\'s making all things of nothing, by the word of his power, in the space of six days, and all very good.', ref: 'Q.9' },
  { q: 'What is sin?', a: 'Sin is any want of conformity unto, or transgression of, the law of God.', ref: 'Q.14' },
  { q: 'Who is the Redeemer of God\'s elect?', a: 'The only Redeemer of God\'s elect is the Lord Jesus Christ, who, being the eternal Son of God, became man, and so was, and continueth to be, God and man in two distinct natures, and one person, forever.', ref: 'Q.21' },
  { q: 'What is faith in Jesus Christ?', a: 'Faith in Jesus Christ is a saving grace, whereby we receive and rest upon him alone for salvation, as he is offered to us in the gospel.', ref: 'Q.86' },
  { q: 'What is repentance unto life?', a: 'Repentance unto life is a saving grace, whereby a sinner, out of a true sense of his sin, and apprehension of the mercy of God in Christ, doth, with grief and hatred of his sin, turn from it unto God, with full purpose of, and endeavor after, new obedience.', ref: 'Q.87' },
]

// Cycle through accent colors per card
const ACCENTS = ['#c0654a', '#8f9d84', '#7a8faa', '#b8956a', '#a07a8f']

const CREEDS = [
  {
    title: "Apostles' Creed",
    shortTitle: "Apostles'",
    date: 'c. 140 AD',
    text: `I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead.\n\nI believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,
  },
  {
    title: 'Nicene Creed',
    shortTitle: 'Nicene',
    date: '325 AD',
    text: `We believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.\n\nAnd in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all worlds; God of God, Light of Light, very God of very God; begotten, not made, being of one substance with the Father, by whom all things were made.\n\nWho, for us men and for our salvation, came down from heaven, and was incarnate by the Holy Spirit of the virgin Mary, and was made man; and was crucified also for us under Pontius Pilate; He suffered and was buried; and the third day He rose again, according to the Scriptures; and ascended into heaven, and sits on the right hand of the Father; and He shall come again, with glory, to judge the quick and the dead; whose kingdom shall have no end.\n\nAnd we believe in the Holy Ghost, the Lord and Giver of Life; who proceeds from the Father and the Son; who with the Father and the Son together is worshipped and glorified; who spoke by the prophets.\n\nAnd we believe in one holy catholic and apostolic Church. We acknowledge one baptism for the remission of sins. And we look for the resurrection of the dead, and the life of the world to come. Amen.`,
  },
]

const DIDACHE_CHAPTERS = [
  { n: 1, title: 'The Two Ways', text: 'There are two ways, one of life and one of death, and there is a great difference between the two ways.\n\nThe way of life is this: First, you shall love God who made you; and second, your neighbor as yourself; and whatever you do not want to happen to you, do not do to another.\n\nThe teaching of these words is this: Bless those who curse you, and pray for your enemies, and fast for those who persecute you. For what credit is it if you love those who love you? Do not even the Gentiles do the same? But you shall love those who hate you, and you will not have an enemy.\n\nAbstain from fleshly and bodily cravings. If someone strikes you on the right cheek, turn the other also, and you will be perfect. If someone compels you to go one mile, go two. If someone takes your cloak, give him your tunic also. If someone takes what is yours, do not ask for it back, for you are not able to.\n\nGive to everyone who asks of you, and do not ask for it back; for the Father wants gifts to be given to all from his own free gifts. Blessed is the one who gives according to the commandment, for he is innocent.' },
  { n: 2, title: 'The Second Commandment', text: 'And the second commandment of the teaching is: You shall not murder; you shall not commit adultery; you shall not corrupt children; you shall not be sexually immoral; you shall not steal; you shall not practice magic; you shall not use drugs; you shall not kill a child by abortion or kill a newborn infant.\n\nYou shall not covet your neighbor\'s possessions; you shall not be greedy; you shall not be a miser; you shall not be a lover of money. You shall not be prideful. You shall not take evil counsel against your neighbor. You shall not hate any person, but some you shall reprove, and for others you shall pray, and still others you shall love more than your own life.' },
  { n: 3, title: 'Other Sins to Avoid', text: 'My child, flee from all evil and everything that resembles it. Do not be prone to anger, for anger leads to murder. Do not be jealous or quarrelsome or hot-tempered, for all these things lead to murder.\n\nMy child, do not be lustful, for lust leads to sexual immorality. Do not be foul-mouthed or lecherous, for all these things lead to adultery.\n\nMy child, do not be an observer of omens, since it leads to idolatry. Do not be an enchanter or an astrologer or a practitioner of magic, and do not desire to observe these things, for all these things lead to idolatry.\n\nMy child, do not be a liar, since lying leads to theft. Do not be avaricious or vain, for all these things lead to theft.\n\nMy child, do not be a grumbler, since it leads to blasphemy. Do not be arrogant or evil-minded, for all these things lead to blasphemy. But be meek, since the meek shall inherit the earth. Be long-suffering and merciful and guileless and quiet and good, and always trembling at the words which you have heard.' },
  { n: 4, title: 'The Way of Life, Continued', text: 'My child, remember night and day the one who speaks the word of God to you, and honor him as the Lord, for where the Lord\'s nature is discussed, there the Lord is.\n\nAnd you shall seek daily the presence of the saints, that you may be refreshed by their words. You shall not desire division but shall bring peace to those who quarrel.\n\nYou shall judge righteously; you shall not show partiality when reproving transgressions. You shall not waver in your decisions.\n\nDo not be one who stretches out his hands to receive but withdraws them when it comes to giving. If you have wealth, you shall give a ransom for your sins. You shall not hesitate to give, nor shall you grumble when giving, for you shall know who is the good paymaster of the reward.\n\nYou shall not turn away the needy, but shall share everything with your brother, and shall not say it is your own, for if you are partners in immortal things, how much more in mortal?' },
  { n: 5, title: 'The Way of Death', text: 'And the way of death is this: First of all, it is evil and full of curse; murders, adulteries, lusts, sexual immorality, thefts, idolatries, magic arts, drugs, robberies, false testimonies, hypocrisies, double-heartedness, deceit, pride, malice, stubbornness, covetousness, foul language, jealousy, arrogance, pride, boastfulness.\n\nPersecutors of the good, haters of truth, lovers of falsehood, not knowing the reward of righteousness, not adhering to the good nor to righteous judgment, staying awake not for the good but for evil; from whom meekness and patience are far away; lovers of vanity, pursuing reward, having no mercy for the poor, not laboring for the afflicted, not knowing the one who made them, murderers of children, destroyers of God\'s image, turning away the needy, oppressing the afflicted, advocates of the rich, unjust judges of the poor — sinners in every way. May you be delivered, children, from all these.' },
  { n: 6, title: 'Against Idols', text: 'See that no one leads you astray from this way of the teaching, for such a person teaches you without God.\n\nFor if you are able to bear the whole yoke of the Lord, you will be perfect; but if you are not able, then do what you can. And concerning food, bear what you are able, but keep strictly away from food offered to idols, for it is the worship of dead gods.' },
  { n: 7, title: 'Concerning Baptism', text: 'And concerning baptism, baptize this way: having said all these things beforehand, baptize in the name of the Father and of the Son and of the Holy Spirit in running water.\n\nBut if you do not have running water, baptize in other water; and if you are not able to in cold water, then in warm. But if you have neither, pour water on the head three times in the name of the Father and of the Son and of the Holy Spirit.\n\nBefore the baptism, let the one baptizing and the one being baptized fast — and any others who are able. Also command the one being baptized to fast beforehand for one or two days.' },
  { n: 8, title: 'Concerning Fasting and Prayer', text: 'Do not let your fasts be with the hypocrites, for they fast on the second day of the week and on the fifth; but fast on the fourth day and on the day of preparation.\n\nNeither pray as the hypocrites do, but as the Lord commanded in his Gospel, pray this way:\n\nOur Father who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done, as in heaven, so on earth. Give us today our daily bread, and forgive us our debt as we also forgive our debtors. And bring us not into temptation, but deliver us from the evil one; for thine is the power and the glory for ever.\n\nPray this three times each day.' },
  { n: 9, title: 'The Eucharist', text: 'And concerning the Eucharist, give thanks this way:\n\nFirst, concerning the cup: We give thanks to you, our Father, for the holy vine of David your servant, which you made known to us through Jesus your servant; to you be the glory forever.\n\nAnd concerning the broken bread: We give thanks to you, our Father, for the life and knowledge which you made known to us through Jesus your servant; to you be the glory forever. As this broken bread was scattered over the mountains, and gathered together and became one, so let your Church be gathered together from the ends of the earth into your kingdom; for yours is the glory and the power through Jesus Christ forever.\n\nBut let no one eat or drink of your Eucharist except those baptized in the name of the Lord, for the Lord also said concerning this: Do not give what is holy to dogs.' },
  { n: 10, title: 'Prayer After Communion', text: 'But after you are satisfied, give thanks this way:\n\nWe give thanks to you, Holy Father, for your holy name which you have made dwell in our hearts, and for the knowledge and faith and immortality which you made known to us through Jesus your servant; to you be the glory forever.\n\nYou, Almighty Master, created all things for your name\'s sake, and gave food and drink to people for enjoyment, that they might give thanks to you; but to us you have given spiritual food and drink and eternal life through Jesus your servant.\n\nAbove all, we give thanks to you because you are mighty. To you be the glory forever.\n\nRemember your Church, O Lord, to deliver it from all evil and to make it perfect in your love, and gather it from the four winds — the sanctified — into your kingdom which you have prepared for it; for yours is the power and the glory forever.\n\nLet grace come and let this world pass away. Hosanna to the God of David. If anyone is holy, let him come; if anyone is not, let him repent. Maranatha. Amen.' },
  { n: 11, title: 'Apostles and Prophets', text: 'So, if anyone comes and teaches you all these things that have been said before, receive him. But if the teacher himself turns and teaches another doctrine to the destruction of this, do not listen to him. But if he teaches to increase righteousness and the knowledge of the Lord, receive him as the Lord.\n\nAnd concerning the apostles and prophets, act according to the decree of the Gospel. Let every apostle who comes to you be received as the Lord. He shall stay only one day, and if there is need, also the next day; but if he stays three days, he is a false prophet.\n\nAnd when an apostle leaves, let him take nothing except bread until he reaches his lodging. If he asks for money, he is a false prophet. And every prophet who speaks in the Spirit, do not test or judge; for every sin will be forgiven, but this sin will not be forgiven.' },
  { n: 12, title: 'Receiving Travelers', text: 'Let everyone who comes in the name of the Lord be received; then, when you have tested him you will know him, for you will have understanding of what is right and what is false.\n\nIf the one who comes is a traveler, help him as much as you can. He shall not stay with you more than two or three days, if there is need. If he wants to settle among you and has a trade, let him work and eat. If he does not have a trade, take care, according to your understanding, that no one lives among you idle and a Christian. If he does not wish to do this, he is trafficking on Christ. Watch out for such people.' },
  { n: 13, title: 'Support of Prophets', text: 'But every genuine prophet who wishes to settle among you is worthy of his food. Likewise, every genuine teacher is also worthy, like the laborer, of his food.\n\nTherefore, you shall take every firstfruit of the produce of the wine press and the threshing floor, and of the cattle and sheep, and give it to the prophets, for they are your high priests.\n\nBut if you do not have a prophet, give it to the poor. If you make bread, take the firstfruit and give it according to the commandment. Similarly when you open a jar of wine or oil, give the firstfruit to the prophets. With your money and clothing and all your possessions, take the firstfruit as seems right to you and give it according to the commandment.' },
  { n: 14, title: 'The Lord\'s Day', text: 'And on the Lord\'s day — the day of the Lord — gather together, break bread and give thanks, having beforehand confessed your transgressions, that your sacrifice may be pure.\n\nBut let no one who is at odds with his neighbor come together with you until they are reconciled, so that your sacrifice may not be defiled. For this is the sacrifice concerning which the Lord said: "In every place and time, offer me a pure sacrifice; for I am a great king," says the Lord, "and my name is marvelous among the nations."' },
  { n: 15, title: 'Bishops and Deacons', text: 'Therefore, elect for yourselves bishops and deacons worthy of the Lord — men who are meek and not lovers of money, and genuine and proven; for they also serve you in the ministry of the prophets and teachers.\n\nDo not despise them, for they are your honored ones along with the prophets and teachers.\n\nAnd correct one another, not in anger but in peace, as you find it in the Gospel. And to everyone who offends against another, let no one speak, nor let him hear anything from you, until he repents. Your prayers and your giving and all your deeds, do these as you find it in the Gospel of our Lord.' },
  { n: 16, title: 'Watch for the Lord\'s Coming', text: 'Watch over your life; do not let your lamps go out, and do not be unprepared, but be ready, for you do not know the hour at which our Lord will come.\n\nAssemble frequently, seeking the things that are beneficial for your souls, for the whole time of your faith will not be useful to you unless you are made perfect in the last time.\n\nFor in the final days, false prophets and corruptors will be multiplied, and the sheep will be turned into wolves, and love will be turned into hate. For as lawlessness increases, they will hate one another and persecute and betray. And then the deceiver of the world will appear as a son of God, and will perform signs and wonders, and the earth will be delivered into his hands.\n\nThen humanity will enter into the fire of testing, and many will be made to stumble and will perish. But those who endure in their faith will be saved by the Cursed One himself. And then the signs of truth will appear: first, the sign of an opening in the heavens; then, the sign of the sound of a trumpet; and the third, a resurrection of the dead — though not of all, but as it was said: "The Lord will come and all his saints with him." Then the world will see the Lord coming on the clouds of the sky.' },
]

const SOLAS = [
  {
    latin: 'Sola Scriptura',
    english: 'Scripture Alone',
    color: 'var(--terracotta)',
    scripture: '2 Timothy 3:16–17',
    scriptureText: 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.',
    meaning: 'Scripture is the supreme and final authority for the Christian — above church tradition, papal decree, and human reason. It is the only infallible rule for faith and practice. This does not mean that tradition is worthless; it means that tradition stands under Scripture and is judged by it, not the other way around.',
    history: 'Luther\'s breakthrough came when he began reading Paul\'s letter to the Romans and realized that the church\'s teaching about indulgences had no biblical grounding. When summoned to the Diet of Worms in 1521 and ordered to recant, he refused unless "convinced by Scripture and plain reason," declaring that his conscience was captive to the Word of God. This principle — that the Bible, not the pope, is the final court of appeal — ignited the Reformation and shattered the medieval church\'s claim to interpretive monopoly.',
  },
  {
    latin: 'Sola Fide',
    english: 'Faith Alone',
    color: 'var(--sage)',
    scripture: 'Romans 1:17',
    scriptureText: 'For in it the righteousness of God is revealed from faith for faith, as it is written: "The righteous shall live by faith."',
    meaning: 'Justification — being declared righteous before God — is received through faith alone, not through any works, merit, or sacramental system. Faith is the instrument, not the basis, of our justification; the basis is Christ\'s righteousness imputed to us. Good works follow genuine faith as its fruit, not its root. Luther called this the article by which the church stands or falls.',
    history: 'The medieval church had developed a complex system of merit, penance, indulgences, and purgatory through which sinners could earn or purchase their standing before God. Luther, an Augustinian monk tormented by his own sin, found no peace in this system. Reading Romans 1:17, he saw that the "righteousness of God" was not something God demands of us but something God gives to us — through faith in Christ. He later wrote that when he understood this, he felt he had been "born again and entered paradise itself through open gates." The Council of Trent (1545) explicitly condemned the doctrine of justification by faith alone, cementing the formal division between Rome and the Reformers.',
  },
  {
    latin: 'Sola Gratia',
    english: 'Grace Alone',
    color: 'var(--slate)',
    scripture: 'Ephesians 2:8–9',
    scriptureText: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.',
    meaning: 'Salvation is entirely God\'s work from beginning to end. He initiates it, sustains it, and completes it. The human will, darkened by sin, does not cooperate with grace as an equal partner — it is transformed by grace. We contribute nothing to our redemption except the sin that made it necessary. This is the death of all spiritual pride and the birth of all genuine gratitude.',
    history: 'Augustine had articulated this in the 5th century against Pelagius, who taught that human will and divine grace cooperate as partners in salvation. The Reformers recovered Augustine\'s insight against a medieval church that had drifted toward semi-Pelagianism — teaching that God gives grace but the human will must initiate or cooperate. Calvin in particular pressed this principle to its logical conclusion in his doctrine of election: if grace is wholly God\'s work, then even our faith itself is a gift, not a contribution.',
  },
  {
    latin: 'Solus Christus',
    english: 'Christ Alone',
    color: 'var(--gold)',
    scripture: '1 Timothy 2:5',
    scriptureText: 'For there is one God, and there is one mediator between God and men, the man Christ Jesus, who gave himself as a ransom for all.',
    meaning: 'Christ is the sole mediator between God and humanity. Salvation is found in no other name, through no other merit, by no other sacrifice. The Reformers rejected the Catholic doctrine of priestly mediation, the treasury of merit drawn from the saints, and the sacrifice of the Mass — all of which implied that something additional to Christ\'s finished work was needed. His death on the cross was final, complete, and sufficient: "It is finished."',
    history: 'The Reformation\'s doctrine of Christ alone arose directly from its understanding of the atonement. If Christ\'s sacrifice on the cross was truly sufficient, then the Mass as a re-presentation of that sacrifice was not only unnecessary but an offense to the gospel. If Christ is the one mediator, then prayers to saints as intercessors undercut the uniqueness of his priesthood. Luther\'s early writings attacked indulgences precisely because they implied that something beyond Christ\'s atoning work could satisfy divine justice. Zwingli, Calvin, and the other Reformers pressed this further, insisting that the church\'s authority must derive from Christ and his Word alone.',
  },
  {
    latin: 'Soli Deo Gloria',
    english: 'Glory to God Alone',
    color: 'var(--mauve)',
    scripture: '1 Corinthians 10:31',
    scriptureText: 'So, whether you eat or drink, or whatever you do, do all to the glory of God.',
    meaning: 'All of life — not merely worship, not merely religious practice, but all of it — exists for the glory of God alone. Nothing is secular. The farmer, the merchant, the mother, the scholar: all are called to their work as a vocation from God, and all of it is to be done to his glory. This was the Reformation\'s great gift to everyday life: it made the ordinary sacred.',
    history: 'The medieval church had created a two-tiered spirituality: the clergy and monastics lived the "higher" religious life, while laypeople lived a lesser, more worldly existence. The Reformers demolished this division. Luther\'s doctrine of vocation taught that every honest calling — plowing a field, nursing a child, governing a city — is equally holy before God when done in faith. Calvin extended this into a comprehensive vision of culture: all of creation is God\'s theater, and everything in it declares his glory. The phrase Soli Deo Gloria became the summary and seal of the whole Reformation project. J.S. Bach wrote "SDG" at the bottom of every composition.',
  },
]

export default function LearnClient({ userId, teachings, latestResponse }: {
  userId: string
  teachings: Teaching[]
  latestResponse: Response | null
}) {
  const supabase = createClient()
  const [tab, setTab] = useState<'teaching' | 'catechism' | 'creeds' | 'didache' | 'solas' | 'hymns' | 'bible' | 'blessing' | 'hardwords' | 'notinbible' | 'discernment' | 'questions'>('teaching')
  const [qCategory, setQCategory] = useState<string>('all')
  const [expandedWord, setExpandedWord] = useState<string | null>(null)
  const [expandedBibleWord, setExpandedBibleWord] = useState<string | null>(null)
  const [expandedEnemy, setExpandedEnemy] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [creedIndex, setCreedIndex] = useState(0)
  const [responseDraft, setResponseDraft] = useState(latestResponse?.body ?? '')
  const [response, setResponse] = useState<Response | null>(latestResponse)
  const [saving, setSaving] = useState(false)
  const [expandedCat, setExpandedCat] = useState<number | null>(null)
  const [expandedDidache, setExpandedDidache] = useState<number | null>(null)
  const [expandedHymn, setExpandedHymn] = useState<string | null>(null)
  const [hymnCategory, setHymnCategory] = useState<string>('All')
  const [bibleTestament, setBibleTestament] = useState<'OT' | 'NT'>('OT')
  const [expandedBook, setExpandedBook] = useState<string | null>(null)

  const teaching = teachings[0] ?? null

  async function saveResponse() {
    if (!teaching || !responseDraft.trim()) return
    setSaving(true)
    if (response) {
      await supabase.from('responses').update({ body: responseDraft }).eq('id', response.id)
    } else {
      const { data } = await supabase
        .from('responses')
        .insert({ teaching_id: teaching.id, user_id: userId, body: responseDraft })
        .select().single()
      setResponse(data)
    }
    setSaving(false)
  }

  const creed = CREEDS[creedIndex]

  // ── Search ────────────────────────────────────────────────
  const q = searchQuery.trim().toLowerCase()
  type SearchResult = { type: string; title: string; subtitle: string; body: string; tabKey: string; itemId?: string | number }
  const searchResults: SearchResult[] = q.length < 2 ? [] : [
    ...TEACHING_LIBRARY.filter(t =>
      [t.theme, t.week_label, t.hook, t.context ?? '', t.scripture_ref, t.application, t.transformation ?? ''].some(s => s.toLowerCase().includes(q))
    ).map(t => ({ type: 'Teaching', title: t.week_label, subtitle: t.theme, body: t.hook, tabKey: 'teaching', itemId: t.id })),

    ...CATECHISM.filter(c => c.q.toLowerCase().includes(q) || c.a.toLowerCase().includes(q))
      .map((c, i) => ({ type: 'Catechism', title: c.q, subtitle: `Westminster Shorter · ${c.ref}`, body: c.a, tabKey: 'catechism', itemId: i })),

    ...DIDACHE_CHAPTERS.filter(ch => ch.title.toLowerCase().includes(q) || ch.text.toLowerCase().includes(q))
      .map(ch => ({ type: 'Didache', title: `Chapter ${ch.n}: ${ch.title}`, subtitle: 'The Didache · c. 50–120 AD', body: ch.text.slice(0, 180) + '…', tabKey: 'didache', itemId: ch.n })),

    ...CREEDS.filter(c => c.title.toLowerCase().includes(q) || c.text.toLowerCase().includes(q))
      .map(c => ({ type: 'Creed', title: c.title, subtitle: c.date, body: c.text.slice(0, 180) + '…', tabKey: 'creeds' })),

    ...SOLAS.filter(s => [s.latin, s.english, s.meaning, s.history, s.scriptureText].some(v => v.toLowerCase().includes(q)))
      .map(s => ({ type: '5 Solas', title: s.latin, subtitle: s.english, body: s.meaning.slice(0, 180) + '…', tabKey: 'solas' })),

    ...HYMNS.filter(h => [h.title, h.author, h.verses, h.meaning, h.legacy, h.occasion].some(v => v.toLowerCase().includes(q)))
      .map(h => ({ type: 'Hymn', title: h.title, subtitle: `${h.author} · ${h.year}`, body: h.meaning.slice(0, 180) + '…', tabKey: 'hymns', itemId: h.id })),

    ...BIBLE_BOOKS.filter(b => [b.name, b.author, b.preface, b.audience, ...b.themes].some(v => v.toLowerCase().includes(q)))
      .map(b => ({ type: 'Bible', title: b.name, subtitle: `${b.author} · ${b.date}`, body: b.preface.slice(0, 180) + '…', tabKey: 'bible', itemId: b.name })),

    ...COUNTERFEITS.filter(c => [c.name, c.the_lie, c.the_truth, c.church_witness, c.transformation, c.scriptureText].some(v => v.toLowerCase().includes(q)))
      .map(c => ({ type: 'The Blessing', title: c.name, subtitle: c.tagline, body: c.the_truth.slice(0, 180) + '…', tabKey: 'blessing', itemId: c.id })),

    ...HARD_WORDS.filter(w => [w.word, w.what_it_actually_means, w.what_you_may_have_heard, w.the_grace_in_it, w.scriptureText].some(v => v.toLowerCase().includes(q)))
      .map(w => ({ type: 'Hard Words', title: w.word, subtitle: w.scripture, body: w.what_it_actually_means.slice(0, 180) + '…', tabKey: 'hardwords', itemId: w.id })),

    ...WORDS_NOT_IN_BIBLE.filter(w => [w.word, w.the_surprise, w.what_scripture_does_say, w.why_it_matters].some(v => v.toLowerCase().includes(q)))
      .map(w => ({ type: 'Not in the Bible', title: w.word, subtitle: w.category, body: w.the_surprise.slice(0, 180) + '…', tabKey: 'notinbible', itemId: w.id })),

    ...THREE_ENEMIES.filter(e => [e.name, e.how_it_works, e.meaning, e.the_grace].some(v => v.toLowerCase().includes(q)))
      .map(e => ({ type: 'Flesh or Foe', title: e.name, subtitle: e.greek, body: e.how_it_works.slice(0, 180) + '…', tabKey: 'discernment', itemId: e.id })),

    ...PRAYER_QUESTIONS.filter(pq => [pq.question, pq.context, pq.source].some(v => v.toLowerCase().includes(q)))
      .map(pq => ({ type: 'Question', title: `"${pq.question}"`, subtitle: pq.source, body: pq.context.slice(0, 180) + '…', tabKey: 'questions', itemId: pq.id })),
  ]

  return (
    <div>
      <PageHeader title="Learn" subtitle="Teaching, catechism, and the creeds." glowColor="rgba(176,120,48,0.20)" />

      <div style={{ background: 'var(--paper)', borderRadius: '24px 24px 0 0', marginTop: '-20px', position: 'relative', zIndex: 1, padding: '1.5rem 1.125rem 2rem' }}>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search teachings, catechism, hymns, Scripture…"
            style={{ width: '100%', paddingLeft: '38px', paddingRight: searchQuery ? '36px' : '14px', paddingTop: '10px', paddingBottom: '10px', borderRadius: '14px', fontSize: '14px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.70)', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', padding: '4px', display: 'flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        {/* Scrollable pill tabs */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none', marginBottom: '1.25rem' }}>
          {([['teaching', 'This Week'], ['catechism', 'Catechism'], ['creeds', 'Creeds'], ['didache', 'Didache'], ['solas', '5 Solas'], ['hymns', 'Hymns'], ['bible', 'Bible Books'], ['blessing', 'The Blessing'], ['hardwords', 'Hard Words'], ['notinbible', 'Not in the Bible'], ['discernment', 'Flesh or Foe?'], ['questions', 'Questions']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                whiteSpace: 'nowrap', flexShrink: 0, padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s ease',
                background: tab === key ? 'var(--ink)' : 'rgba(30,27,22,0.07)',
                color: tab === key ? '#fff' : 'var(--ink-soft)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Search results ── */}
        {searchQuery.trim().length >= 2 && (
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for &ldquo;{searchQuery.trim()}&rdquo;
            </p>
            {searchResults.length === 0 ? (
              <div className="glass" style={{ borderRadius: '14px', padding: '1.25rem' }}>
                <p style={{ color: 'var(--ink-muted)', fontSize: '14px', lineHeight: 1.6 }}>Nothing found. Try a different word — or browse the tabs above to explore by topic.</p>
              </div>
            ) : (
              searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => { setSearchQuery(''); setTab(r.tabKey as typeof tab) }}
                  style={{ width: '100%', textAlign: 'left', padding: '0.875rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-soft)', cursor: 'pointer' }}
                >
                  <span style={{ flexShrink: 0, padding: '3px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'var(--blue-light)', color: 'var(--blue)', marginTop: '2px', whiteSpace: 'nowrap' }}>
                    {r.type}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)', lineHeight: 1.4, marginBottom: '2px' }}>{r.title}</p>
                    <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '6px' }}>{r.subtitle}</p>
                    <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.55 }}>{r.body}</p>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border)', flexShrink: 0, marginTop: '4px' }}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              ))
            )}
          </div>
        )}

        {/* ── This week's teaching ── */}
        {!searchQuery.trim() && tab === 'teaching' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!teaching ? (
              <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem' }}>
                <p style={{ color: 'var(--ink-muted)', fontSize: '14px' }}>Your leader hasn't posted this week's teaching yet. Check back soon.</p>
              </div>
            ) : (
              <>
                <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ height: '2px', background: 'var(--terracotta)' }} />
                  <div style={{ padding: '1.125rem 1.25rem' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.625rem' }}>
                      {teaching.week_label}
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--ink)', marginBottom: '1rem' }}>{teaching.hook}</p>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--sage)' }} />
                      <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '17px', fontStyle: 'italic', lineHeight: 1.7 }}>{teaching.scripture_ref}</p>
                    </div>
                    {teaching.application && (
                      <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{teaching.application}</p>
                    )}
                  </div>
                </div>

                <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ height: '2px', background: 'var(--sage)' }} />
                  <div style={{ padding: '1.125rem 1.25rem' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '0.625rem' }}>
                      This week's question
                    </p>
                    <p style={{ fontWeight: 600, fontSize: '15px', lineHeight: 1.55, color: 'var(--ink)', marginBottom: '1rem' }}>{teaching.question}</p>
                    <textarea
                      value={responseDraft}
                      onChange={e => setResponseDraft(e.target.value)}
                      rows={5}
                      placeholder="Write your response… your leader will see this."
                      style={{ width: '100%', borderRadius: '10px', padding: '12px', fontSize: '14px', resize: 'none', outline: 'none', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.6)', color: 'var(--ink)', fontFamily: 'inherit' }}
                    />
                    <button onClick={saveResponse} disabled={saving || !responseDraft.trim()} className="btn-primary" style={{ marginTop: '10px' }}>
                      {saving ? 'Saving…' : response ? 'Update response' : 'Share response'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Catechism ── */}
        {!searchQuery.trim() && tab === 'catechism' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                Westminster Shorter Catechism
              </p>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            {CATECHISM.map((item, i) => {
              const accent = ACCENTS[i % ACCENTS.length]
              const open = expandedCat === i
              return (
                <button
                  key={i}
                  onClick={() => setExpandedCat(open ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '1rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', borderBottom: `1px solid var(--border-soft)`, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, background: accent + '20', color: accent, marginTop: '1px' }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.45, color: 'var(--ink)', paddingRight: '8px' }}>{item.q}</p>
                    {open && (
                      <div style={{ marginTop: '12px' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div style={{ width: '2px', flexShrink: 0, borderRadius: '2px', background: accent, alignSelf: 'stretch' }} />
                          <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '15px', lineHeight: 1.7 }}>{item.a}</p>
                        </div>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: accent, marginTop: '10px', marginLeft: '14px' }}>
                          Westminster Shorter Catechism · {item.ref}
                        </p>
                      </div>
                    )}
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: '4px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              )
            })}
          </div>
        )}

        {/* ── Creeds ── */}
        {!searchQuery.trim() && tab === 'creeds' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Creed selector */}
            <div className="seg-control">
              {CREEDS.map((c, i) => (
                <button key={i} className={`seg-tab${creedIndex === i ? ' active' : ''}`} onClick={() => setCreedIndex(i)}>
                  {c.shortTitle}
                </button>
              ))}
            </div>

            <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ height: '2px', background: 'var(--gold)' }} />
              <div style={{ padding: '1.125rem 1.25rem 0.25rem' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>{creed.title}</p>
                <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '1rem' }}>{creed.date}</p>
              </div>
              <div style={{ padding: '0 1.25rem 1.25rem' }}>
                {creed.text.split('\n\n').map((para, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: i === 0 ? 'var(--gold)' : 'var(--border)' }} />
                    <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '16px', lineHeight: 1.72 }}>{para}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Didache ── */}
        {!searchQuery.trim() && tab === 'didache' && (
          <div>
            <div className="glass" style={{ borderRadius: '16px', padding: '1.125rem 1.25rem', marginBottom: '12px', borderLeft: '3px solid var(--sienna)' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sienna)', marginBottom: '6px' }}>The Teaching of the Twelve Apostles</p>
              <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '8px' }}>c. 50–120 AD</p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                The Didache is one of the earliest Christian documents outside the New Testament — a practical manual for new believers covering the way of life, baptism, fasting, prayer, the Eucharist, and church order. It gives us a window into how the first communities lived and worshipped.
              </p>
            </div>

            {DIDACHE_CHAPTERS.map((chapter, i) => {
              const open = expandedDidache === i
              return (
                <button
                  key={i}
                  onClick={() => setExpandedDidache(open ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '1rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', borderBottom: `1px solid var(--border-soft)`, background: 'none', border: 'none', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'var(--border-soft)', cursor: 'pointer' }}
                >
                  <span style={{ flexShrink: 0, width: '36px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, background: 'var(--sienna-light)', color: 'var(--sienna)', marginTop: '1px', fontFamily: 'Newsreader, Georgia, serif' }}>
                    {chapter.n}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.45, color: 'var(--ink)', paddingRight: '8px' }}>{chapter.title}</p>
                    {open && (
                      <div style={{ marginTop: '12px' }}>
                        {chapter.text.split('\n\n').map((para, j) => (
                          <div key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: j === 0 ? 'var(--sienna)' : 'var(--border)' }} />
                            <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '15px', lineHeight: 1.7 }}>{para}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: '4px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              )
            })}
          </div>
        )}

        {/* ── Hymns ── */}
        {!searchQuery.trim() && tab === 'hymns' && (
          <div>
            <div className="glass" style={{ borderRadius: '16px', padding: '1.125rem 1.25rem', marginBottom: '16px', borderLeft: '3px solid var(--mauve)' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '6px' }}>A Library of Hymns</p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                Hymns are theology sung. Each one was born from a moment — grief, wonder, persecution, revival — and carries within it the convictions of the people who wrote it. To learn a hymn is to inhabit a moment in the long story of the church.
              </p>
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none', marginBottom: '1.25rem' }}>
              {(['All', ...HYMN_CATEGORIES]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setHymnCategory(cat)}
                  style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s ease', background: hymnCategory === cat ? 'var(--mauve)' : 'rgba(122,88,130,0.10)', color: hymnCategory === cat ? '#fff' : 'var(--mauve)' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {HYMNS.filter(h => hymnCategory === 'All' || h.category === hymnCategory).map(hymn => {
              const open = expandedHymn === hymn.id
              return (
                <button
                  key={hymn.id}
                  onClick={() => setExpandedHymn(open ? null : hymn.id)}
                  style={{ width: '100%', textAlign: 'left', padding: '1rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', borderBottom: '1px solid var(--border-soft)', background: 'none', border: 'none', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'var(--border-soft)', cursor: 'pointer' }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.4, color: 'var(--ink)', paddingRight: '8px' }}>{hymn.title}</p>
                    <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>{hymn.author} · {hymn.year}</p>
                    {open && (
                      <div style={{ marginTop: '16px' }}>
                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '6px' }}>Why It Was Written</p>
                        <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>{hymn.occasion}</p>

                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '8px' }}>The Words</p>
                        <div style={{ background: 'rgba(122,88,130,0.06)', borderRadius: '12px', padding: '14px 16px', marginBottom: '1.25rem', borderLeft: '2px solid var(--mauve)' }}>
                          <p className="font-reading" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--ink)', whiteSpace: 'pre-line' }}>{hymn.verses}</p>
                        </div>

                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '6px' }}>What It Means</p>
                        <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>{hymn.meaning}</p>

                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '6px' }}>Why the Church Sings It</p>
                        <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{hymn.legacy}</p>
                      </div>
                    )}
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: '4px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              )
            })}
          </div>
        )}

        {/* ── Bible Books ── */}
        {!searchQuery.trim() && tab === 'bible' && (
          <div>
            <div className="glass" style={{ borderRadius: '16px', padding: '1.125rem 1.25rem', marginBottom: '16px', borderLeft: '3px solid var(--blue)' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '6px' }}>The Books of the Bible</p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                Each book has an author, an audience, a moment, and a message. Understanding who wrote it, when, and why changes how we read every page. Scripture is not a timeless collection of spiritual principles — it is the living Word of God spoken into specific times, to specific people, about specific realities.
              </p>
            </div>

            {/* OT / NT toggle */}
            <div className="seg-control" style={{ marginBottom: '1.25rem' }}>
              <button className={`seg-tab${bibleTestament === 'OT' ? ' active' : ''}`} onClick={() => { setBibleTestament('OT'); setExpandedBook(null) }}>
                Old Testament
              </button>
              <button className={`seg-tab${bibleTestament === 'NT' ? ' active' : ''}`} onClick={() => { setBibleTestament('NT'); setExpandedBook(null) }}>
                New Testament
              </button>
            </div>

            {(bibleTestament === 'OT' ? OT_SECTIONS : NT_SECTIONS).map(section => {
              const books = BIBLE_BOOKS.filter(b => b.testament === bibleTestament && b.section === section)
              if (books.length === 0) return null
              return (
                <div key={section} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--blue)', whiteSpace: 'nowrap' }}>{section}</p>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-soft)' }} />
                  </div>
                  {books.map(book => {
                    const open = expandedBook === book.name
                    return (
                      <button
                        key={book.name}
                        onClick={() => setExpandedBook(open ? null : book.name)}
                        style={{ width: '100%', textAlign: 'left', padding: '0.875rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-soft)', cursor: 'pointer' }}
                      >
                        <span style={{ flexShrink: 0, width: '32px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, background: 'var(--blue-light)', color: 'var(--blue)', marginTop: '1px' }}>
                          {book.abbreviation}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.4, color: 'var(--ink)', paddingRight: '8px' }}>{book.name}</p>
                          <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>{book.author} · {book.date}</p>
                          {open && (
                            <div style={{ marginTop: '16px' }}>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                {book.themes.map(t => (
                                  <span key={t} style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '10px', background: 'var(--blue-light)', color: 'var(--blue)' }}>{t}</span>
                                ))}
                              </div>

                              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '6px' }}>Audience</p>
                              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: '1rem' }}>{book.audience}</p>

                              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '6px' }}>Overview</p>
                              <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{book.preface}</p>
                            </div>
                          )}
                        </div>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: '4px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}

        {/* ── 5 Solas ── */}
        {!searchQuery.trim() && tab === 'solas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass" style={{ borderRadius: '16px', padding: '1.125rem 1.25rem', borderLeft: '3px solid var(--gold)' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>The Five Solas</p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                In the 16th century, the Protestant Reformers crystallized the gospel around five Latin phrases that captured what had been lost in the medieval church and what Scripture declares. Together they form a complete statement of the gospel.
              </p>
            </div>

            {SOLAS.map((sola, i) => (
              <div key={i} className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ height: '3px', background: sola.color }} />
                <div style={{ padding: '1.125rem 1.25rem' }}>
                  <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '22px', fontWeight: 500, fontStyle: 'italic', color: sola.color, marginBottom: '2px' }}>{sola.latin}</p>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>{sola.english}</p>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '1rem', background: 'rgba(30,27,22,0.04)', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: sola.color }} />
                    <div>
                      <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '15px', lineHeight: 1.7, fontStyle: 'italic' }}>{sola.scriptureText}</p>
                      <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '6px' }}>{sola.scripture}</p>
                    </div>
                  </div>

                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: sola.color, marginBottom: '6px' }}>Meaning</p>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1rem' }}>{sola.meaning}</p>

                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: sola.color, marginBottom: '6px' }}>The Reformation</p>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{sola.history}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── The Blessing ── */}
        {!searchQuery.trim() && tab === 'blessing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Intro */}
            <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem', marginBottom: '20px', borderLeft: '3px solid #1e3f6b' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#1e3f6b', marginBottom: '8px' }}>The Blessing Is Christ</p>
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '10px' }}>
                Every generation inherits a set of false gospels — promises that look like blessing but lead away from Christ. The prosperity gospel wears many costumes. Here are the ones most alive in our time: the promises of money, comfort, ease, safety, self-protection, approval, and control. Each one is named, examined, and answered — not with rules, but with Christ himself.
              </p>
              <p className="font-reading" style={{ fontSize: '15px', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.7 }}>
                &ldquo;Indeed, I count everything as loss because of the surpassing worth of knowing Christ Jesus my Lord.&rdquo;
              </p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '6px' }}>Philippians 3:8</p>
            </div>

            {/* Counterfeit cards */}
            {COUNTERFEITS.map((c, i) => {
              const isLast = c.id === 'christ'
              return (
                <div key={c.id} className="glass" style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: isLast ? '20px' : '12px' }}>
                  <div style={{ height: '3px', background: c.color }} />
                  <div style={{ padding: '1.125rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                      <div>
                        <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '20px', fontWeight: 600, color: c.color, lineHeight: 1.2, marginBottom: '2px' }}>{c.name}</p>
                        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{c.tagline}</p>
                      </div>
                      <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '8px', background: c.color + '18', color: c.color, whiteSpace: 'nowrap', marginTop: '4px' }}>
                        {isLast ? 'The Truth' : 'Counterfeit'}
                      </span>
                    </div>

                    {/* Scripture */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '1rem', background: 'rgba(30,27,22,0.04)', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: c.color }} />
                      <div>
                        <p className="font-reading" style={{ fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic', color: 'var(--ink)' }}>{c.scriptureText}</p>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '5px' }}>{c.scripture}</p>
                      </div>
                    </div>

                    {!isLast && (
                      <>
                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: c.color, marginBottom: '5px' }}>The Lie</p>
                        <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1rem' }}>{c.the_lie}</p>

                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: c.color, marginBottom: '5px' }}>Why It Fails</p>
                        <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1rem' }}>{c.why_it_fails}</p>
                      </>
                    )}

                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: c.color, marginBottom: '5px' }}>The Truth</p>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1rem' }}>{c.the_truth}</p>

                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: c.color, marginBottom: '5px' }}>The Church Witness</p>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1rem' }}>{c.church_witness}</p>

                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: c.color, marginBottom: '5px' }}>Becoming Like Christ</p>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{c.transformation}</p>
                  </div>
                </div>
              )
            })}

            {/* Capstone */}
            <div style={{ background: 'linear-gradient(160deg, var(--dark) 0%, var(--dark-2) 100%)', borderRadius: '20px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', paddingBottom: '60%', background: 'radial-gradient(circle, rgba(59,110,168,0.22) 0%, transparent 68%)', pointerEvents: 'none' }} />
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', position: 'relative' }}>{CAPSTONE.title}</p>
              {CAPSTONE.body.split('\n\n').map((para, i) => (
                <p key={i} className={i === 0 ? 'font-reading' : ''} style={{ fontSize: i === 0 ? '16px' : '14px', lineHeight: 1.75, color: i === 0 ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.60)', marginBottom: '1rem', fontStyle: i === 0 ? 'normal' : 'normal', position: 'relative' }}>{para}</p>
              ))}
              <p className="font-reading" style={{ fontSize: '17px', fontStyle: 'italic', color: 'rgba(255,255,255,0.82)', position: 'relative', marginTop: '0.5rem' }}>He is the blessing. Everything else is gift.</p>
            </div>
          </div>
        )}

        {/* ── Questions ── */}
        {!searchQuery.trim() && tab === 'questions' && (() => {
          const filtered = qCategory === 'all' ? PRAYER_QUESTIONS : PRAYER_QUESTIONS.filter(q => q.category === qCategory)
          return (
            <div>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1.5rem', fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' }}>
                Questions open what statements close. Jesus asked more questions than he answered. Sit with one of these — slowly, honestly — and let it do its work.
              </p>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', marginBottom: '1.75rem', paddingBottom: '2px' }}>
                {QUESTION_CATEGORIES.map(cat => (
                  <button key={cat.key} onClick={() => setQCategory(cat.key)} style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '6px 13px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', background: qCategory === cat.key ? 'var(--mauve)' : 'rgba(122,88,130,0.10)', color: qCategory === cat.key ? '#fff' : 'var(--mauve)' }}>
                    {cat.label}
                  </button>
                ))}
              </div>
              {filtered.map((q, i) => (
                <div key={q.id} style={{ paddingBottom: '1.75rem', marginBottom: '1.75rem', borderBottom: i < filtered.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '8px' }}>
                    {QUESTION_CATEGORIES.find(c => c.key === q.category)?.label}
                  </p>
                  <p className="font-reading" style={{ fontSize: '20px', lineHeight: 1.5, color: 'var(--ink)', marginBottom: '12px', fontStyle: 'italic' }}>
                    &ldquo;{q.question}&rdquo;
                  </p>
                  <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '8px' }}>{q.context}</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--mauve)' }}>{q.source}</p>
                </div>
              ))}
            </div>
          )
        })()}

        {/* ── Hard Words ── */}
        {!searchQuery.trim() && tab === 'hardwords' && (
          <div>
            <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.5rem', fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' }}>{HARD_WORDS_INTRO}</p>
            {HARD_WORDS.map(word => {
              const open = expandedWord === word.id
              return (
                <div key={word.id} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <button
                    onClick={() => setExpandedWord(open ? null : word.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '1.125rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                  >
                    <div>
                      <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '20px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '3px' }}>{word.word}</p>
                      <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)' }}>{word.the_greek_or_hebrew.split(' ')[0]} {word.the_greek_or_hebrew.split(' ')[1]}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--ink-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {open && (
                    <div style={{ paddingBottom: '1.5rem' }}>
                      {/* What you may have heard */}
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '6px' }}>What You May Have Heard</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{word.what_you_may_have_heard}</p>

                      {/* What it actually means */}
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '6px' }}>What It Actually Means</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{word.what_it_actually_means}</p>

                      {/* Greek / Hebrew */}
                      <div style={{ background: 'rgba(30,27,22,0.04)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1.125rem' }}>
                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '4px' }}>The Word</p>
                        <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{word.the_greek_or_hebrew}</p>
                      </div>

                      {/* Scripture */}
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '1.125rem', background: 'rgba(30,27,22,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
                        <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--blue)' }} />
                        <div>
                          <p className="font-reading" style={{ fontSize: '15px', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--ink)' }}>{word.scriptureText}</p>
                          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '6px' }}>{word.scripture}</p>
                        </div>
                      </div>

                      {/* How Jesus used it */}
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '6px' }}>How Jesus Used It</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{word.how_jesus_used_it}</p>

                      {/* The grace in it */}
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>The Grace in It</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{word.the_grace_in_it}</p>

                      {/* Transformation */}
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '6px' }}>Becoming Like Christ</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)' }}>{word.transformation}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── Not in the Bible ── */}
        {!searchQuery.trim() && tab === 'notinbible' && (
          <div>
            <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.5rem', fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' }}>{WORDS_INTRO}</p>
            {WORDS_NOT_IN_BIBLE.map(word => {
              const open = expandedBibleWord === word.id
              return (
                <div key={word.id} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <button
                    onClick={() => setExpandedBibleWord(open ? null : word.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '1.125rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                  >
                    <div>
                      <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '20px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '3px' }}>{word.word}</p>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: 'rgba(30,27,22,0.07)', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{word.category}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--ink-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {open && (
                    <div style={{ paddingBottom: '1.5rem' }}>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '6px' }}>The Surprise</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{word.the_surprise}</p>

                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '6px' }}>What Scripture Does Say</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{word.what_scripture_does_say}</p>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '1.125rem', background: 'rgba(30,27,22,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
                        <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--blue)' }} />
                        <div>
                          <p className="font-reading" style={{ fontSize: '15px', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--ink)' }}>{word.scriptureText}</p>
                          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '6px' }}>{word.scripture}</p>
                        </div>
                      </div>

                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>Why It Matters</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{word.why_it_matters}</p>

                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '6px' }}>The Principle</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)' }}>{word.the_principle}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── Flesh or Foe? ── */}
        {!searchQuery.trim() && tab === 'discernment' && (
          <div>
            <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.5rem', fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' }}>{DISCERNMENT_INTRO}</p>

            {/* Three enemies */}
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>The Three Sources</p>
            {THREE_ENEMIES.map(enemy => {
              const open = expandedEnemy === enemy.id
              const colors = { flesh: 'var(--terracotta)', world: 'var(--gold)', enemy: 'var(--mauve)' }
              const color = colors[enemy.id]
              return (
                <div key={enemy.id} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <button
                    onClick={() => setExpandedEnemy(open ? null : enemy.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '1.125rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                  >
                    <div>
                      <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '20px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '3px' }}>{enemy.name}</p>
                      <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)' }}>{enemy.greek}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--ink-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {open && (
                    <div style={{ paddingBottom: '1.5rem' }}>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color, marginBottom: '6px' }}>What It Is</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{enemy.meaning}</p>

                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color, marginBottom: '6px' }}>How It Works</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '1.125rem' }}>{enemy.how_it_works}</p>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '1.125rem', background: 'rgba(30,27,22,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
                        <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: color }} />
                        <div>
                          <p className="font-reading" style={{ fontSize: '15px', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--ink)' }}>{enemy.scriptureText}</p>
                          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '6px' }}>{enemy.scripture}</p>
                        </div>
                      </div>

                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color, marginBottom: '6px' }}>Signs</p>
                      <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: '1.125rem' }}>
                        {enemy.symptoms.map((s, i) => (
                          <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', paddingBottom: '6px' }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, marginTop: '8px', flexShrink: 0 }} />
                            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>{s}</p>
                          </li>
                        ))}
                      </ul>

                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '6px' }}>The Grace</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--ink-soft)' }}>{enemy.the_grace}</p>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Diagnostic questions */}
            <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>Diagnostic Questions</p>
              {DISCERNMENT_QUESTIONS.map((dq, i) => {
                const colors2: Record<string, string> = { flesh: 'var(--terracotta)', world: 'var(--gold)', enemy: 'var(--mauve)', clarifying: 'var(--slate)' }
                const c = colors2[dq.points_toward]
                return (
                  <div key={i} style={{ borderBottom: '1px solid var(--border-soft)', paddingTop: '1rem', paddingBottom: '1rem' }}>
                    <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4, marginBottom: '6px' }}>{dq.question}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: c + '18', color: c, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{dq.points_toward === 'clarifying' ? 'Clarifying' : `Points to: ${dq.points_toward}`}</span>
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-muted)' }}>{dq.explanation}</p>
                  </div>
                )
              })}
            </div>

            {/* Unified response */}
            <div style={{ background: 'linear-gradient(160deg, var(--dark) 0%, var(--dark-2) 100%)', borderRadius: '20px', padding: '1.5rem', position: 'relative', overflow: 'hidden', marginTop: '0.5rem' }}>
              <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', paddingBottom: '60%', background: 'radial-gradient(circle, rgba(59,110,168,0.18) 0%, transparent 68%)', pointerEvents: 'none' }} />
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem', position: 'relative' }}>{UNIFIED_RESPONSE.title}</p>
              {UNIFIED_RESPONSE.body.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.72)', marginBottom: '0.875rem', position: 'relative' }}>{para}</p>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: '1rem', marginTop: '0.5rem', position: 'relative' }}>
                <p className="font-reading" style={{ fontSize: '16px', fontStyle: 'italic', lineHeight: 1.75, color: 'rgba(255,255,255,0.82)', marginBottom: '6px' }}>{UNIFIED_RESPONSE.scriptureText}</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>{UNIFIED_RESPONSE.scripture}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
