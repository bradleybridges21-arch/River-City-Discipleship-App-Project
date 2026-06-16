export interface Quote {
  text: string
  author: string
  source?: string
}

export const QUOTES: Quote[] = [
  { text: 'What comes into our minds when we think about God is the most important thing about us.', author: 'A.W. Tozer', source: 'The Knowledge of the Holy' },
  { text: 'We pursue God because, and only because, He has first put an urge within us that spurs us to the pursuit.', author: 'A.W. Tozer' },
  { text: 'To be right with God has often meant to be in trouble with men.', author: 'A.W. Tozer' },
  { text: 'The man who has God for his treasure has all things in One.', author: 'A.W. Tozer' },
  { text: 'I believe in Christianity as I believe that the sun has risen — not only because I see it, but because by it I see everything else.', author: 'C.S. Lewis', source: 'The Weight of Glory' },
  { text: 'There are far, far better things ahead than any we leave behind.', author: 'C.S. Lewis' },
  { text: 'To love at all is to be vulnerable. Love anything and your heart will be wrung and possibly broken.', author: 'C.S. Lewis', source: 'The Four Loves' },
  { text: 'Hardships often prepare ordinary people for an extraordinary destiny.', author: 'C.S. Lewis' },
  { text: 'If we find ourselves with a desire that nothing in this world can satisfy, the most probable explanation is that we were made for another world.', author: 'C.S. Lewis', source: 'Mere Christianity' },
  { text: 'Faith is the art of holding on to things your reason has once accepted, in spite of your changing moods.', author: 'C.S. Lewis', source: 'Mere Christianity' },
  { text: 'Faithless is he that says farewell when the road darkens.', author: 'J.R.R. Tolkien', source: 'The Fellowship of the Ring' },
  { text: 'Even darkness must pass. A new day will come. And when the sun shines it will shine out the clearer.', author: 'J.R.R. Tolkien' },
  { text: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien', source: 'The Fellowship of the Ring' },
  { text: 'The gospel is this: We are more sinful and flawed than we ever dared believe, yet at the same time more loved and accepted in Jesus Christ than we ever dared hope.', author: 'Tim Keller' },
  { text: 'If Jesus rose from the dead, then you have to accept all that he said; if he didn\'t rise from the dead, then why worry about any of what he said?', author: 'Tim Keller', source: 'The Reason for God' },
  { text: 'The church is not a museum for good people. It is a hospital for the broken.', author: 'Tim Keller' },
  { text: 'To be loved but not known is comforting but superficial. To be known and not loved is our greatest fear. But to be fully known and truly loved is a lot like being loved by God.', author: 'Tim Keller' },
  { text: 'God is always doing 10,000 things in your life, and you may be aware of three of them.', author: 'John Piper' },
  { text: 'God is most glorified in us when we are most satisfied in him.', author: 'John Piper', source: 'Desiring God' },
  { text: 'The greatest fear should not be of failure but of succeeding at things in life that don\'t really matter.', author: 'Francis Chan', source: 'Crazy Love' },
  { text: 'Stop settling for a lukewarm faith. Jesus never called us to be comfortable.', author: 'Francis Chan' },
  { text: 'Jesus did not die simply to give us peace and purpose. He died to save us from the wrath of God.', author: 'David Platt', source: 'Radical' },
  { text: 'The goal of our lives is not comfort, safety, and prosperity. The goal is the glory of God.', author: 'David Platt' },
  { text: 'Grace is not opposed to effort. It is opposed to earning.', author: 'Dallas Willard', source: 'The Great Omission' },
  { text: 'You must arrange your days so that you are experiencing deep contentment, joy, and confidence in your everyday life with God.', author: 'Dallas Willard' },
  { text: 'Our greatest competitor of devotion to Jesus is service for him.', author: 'Oswald Chambers', source: 'My Utmost for His Highest' },
  { text: 'My worth to God in public is what I am in private.', author: 'Oswald Chambers', source: 'My Utmost for His Highest' },
  { text: 'There is no pit so deep that God\'s love is not deeper still.', author: 'Corrie ten Boom', source: 'The Hiding Place' },
  { text: 'You can never learn that Christ is all you need until Christ is all you have.', author: 'Corrie ten Boom' },
  { text: 'You can give without loving, but you cannot love without giving.', author: 'Amy Carmichael' },
  { text: 'A faith that costs nothing, and suffers nothing, and sacrifices nothing is worth nothing.', author: 'Charles Spurgeon' },
  { text: 'I have learned to kiss the wave that throws me against the Rock of Ages.', author: 'Charles Spurgeon' },
  { text: 'It is not how much we have, but how much we enjoy, that makes happiness.', author: 'Charles Spurgeon' },
  { text: 'Cheap grace is the mortal enemy of our Church.', author: 'Dietrich Bonhoeffer', source: 'The Cost of Discipleship' },
  { text: 'The cross is not the terrible end to an otherwise god-fearing and happy life, but it meets us at the beginning of our communion with Christ.', author: 'Dietrich Bonhoeffer' },
  { text: 'The Christian ideal has not been tried and found wanting. It has been found difficult; and left untried.', author: 'G.K. Chesterton', source: 'What\'s Wrong with the World' },
  { text: 'The purpose of an open mind, like an open mouth, is to close it on something solid.', author: 'G.K. Chesterton' },
  { text: 'Our heart is restless until it finds its rest in Thee.', author: 'Augustine of Hippo', source: 'Confessions' },
  { text: 'Thou hast made us for Thyself, and our heart is restless until it rests in Thee.', author: 'Augustine of Hippo', source: 'Confessions' },
  { text: 'Our soul is made for God and it will not rest until it rests in him.', author: 'Thomas Aquinas' },
  { text: 'I am not what I ought to be, I am not what I want to be, I am not what I hope to be — but I am not what I once was, and by the grace of God, I am what I am.', author: 'John Newton' },
  { text: 'Science can tell you how to clone a T-Rex. Religion can tell you why this might be a bad idea.', author: 'John Lennox' },
  { text: 'The resurrection of Jesus Christ is the single most important event in human history. Everything else is downstream of it.', author: 'John Lennox' },
  { text: 'The evidence for the existence of God is not thin historical gossip — it\'s the warp and woof of reality itself.', author: 'Wes Huff' },
  { text: 'Jesus\'s resurrection is the beginning of God\'s new project — not to snatch people away from earth to heaven, but to colonize earth with the life of heaven.', author: 'N.T. Wright', source: 'Surprised by Hope' },
  { text: 'There is not one blade of grass, there is no color in this world that is not intended to make us rejoice.', author: 'John Calvin' },
  { text: 'The permanent temptation of the church is to save itself through silence about the cross.', author: 'Martin Luther' },
  { text: 'God writes the Gospel not in the Bible alone, but also on trees, and in the flowers and clouds and stars.', author: 'Martin Luther' },
  { text: 'The Christian life is not a constant high. I have my moments of deep discouragement. But it is in those moments I go to God.', author: 'R.C. Sproul' },
  { text: 'Discipleship is not an option. Jesus did not say "if you would like to be my disciple." He said "Follow me."', author: 'Matt Chandler' },
  { text: 'The glory of God is man fully alive.', author: 'Irenaeus of Lyon', source: 'Against Heresies' },
  { text: 'He became what we are that he might make us what he is.', author: 'Athanasius of Alexandria', source: 'On the Incarnation' },
]

export function getDailyQuote(): Quote {
  const dayIndex = Math.floor(Date.now() / 86_400_000)
  return QUOTES[dayIndex % QUOTES.length]
}
