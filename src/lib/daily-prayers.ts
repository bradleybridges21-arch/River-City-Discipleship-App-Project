export interface DailyPrayer {
  text: string
  attribution: string
  period: 'morning' | 'midday' | 'evening'
}

const prayers: DailyPrayer[] = [
  // ── MORNING ──────────────────────────────────────────────
  {
    period: 'morning',
    text: 'This is the day the Lord has made; let us rejoice and be glad in it.',
    attribution: 'Psalm 118:24',
  },
  {
    period: 'morning',
    text: 'O Lord, open my lips, and my mouth will declare your praise.',
    attribution: 'Psalm 51:15',
  },
  {
    period: 'morning',
    text: 'Awake, O sleeper, and arise from the dead, and Christ will shine on you.',
    attribution: 'Ephesians 5:14',
  },
  {
    period: 'morning',
    text: 'Thou awakest us to delight in Thy praise; for Thou madest us for Thyself, and our heart is restless, until it repose in Thee.',
    attribution: 'Augustine of Hippo, Confessions (c. 397)',
  },
  {
    period: 'morning',
    text: 'Lord Jesus Christ, you are the morning star who never sets. You give light to all who live, as you illumine this day for us with the light of your face.',
    attribution: 'Attributed to St. Ambrose of Milan (c. 397)',
  },
  {
    period: 'morning',
    text: 'Grant, O Lord, that none may love thee less this day because of me; that never word or act of mine may turn one soul from thee.',
    attribution: 'Amy Carmichael (1867–1951)',
  },
  {
    period: 'morning',
    text: 'Lord, make me an instrument of your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith.',
    attribution: 'St. Francis of Assisi (c. 1224)',
  },
  {
    period: 'morning',
    text: 'O God, the King eternal, who dividest the day from the darkness, and turnest the shadow of death into the morning: Drive far off from us all wrong desires, incline our hearts to keep thy law, and guide our feet into the way of peace.',
    attribution: 'Book of Common Prayer (1662)',
  },
  {
    period: 'morning',
    text: 'I bind unto myself today the strong name of the Trinity, by invocation of the same, the Three in One and One in Three.',
    attribution: 'St. Patrick of Ireland (c. 433)',
  },
  {
    period: 'morning',
    text: 'Every morning I will direct my prayer to you and watch eagerly.',
    attribution: 'Psalm 5:3',
  },
  {
    period: 'morning',
    text: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.',
    attribution: 'Lamentations 3:22–23',
  },
  {
    period: 'morning',
    text: 'Teach me your way, O Lord, and I will walk in your truth; give me an undivided heart, that I may fear your name.',
    attribution: 'Psalm 86:11',
  },

  // ── MIDDAY ───────────────────────────────────────────────
  {
    period: 'midday',
    text: 'Be still, and know that I am God.',
    attribution: 'Psalm 46:10',
  },
  {
    period: 'midday',
    text: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    attribution: 'Matthew 11:28',
  },
  {
    period: 'midday',
    text: 'The practice of the presence of God is the shortest and easiest way to attain to Christian perfection.',
    attribution: 'Brother Lawrence, The Practice of the Presence of God (c. 1692)',
  },
  {
    period: 'midday',
    text: 'Lord, grant that I may always allow myself to be guided by you, always follow your plans, and perfectly accomplish your holy will.',
    attribution: 'St. Ignatius of Loyola (1491–1556)',
  },
  {
    period: 'midday',
    text: 'We know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    attribution: 'Romans 8:28',
  },
  {
    period: 'midday',
    text: 'O Christ, who art the Light and Day, thou drivest night and gloom away; O Light of light, whose word doth show the light to men who long to know.',
    attribution: 'A Hymn for Noonday, Latin (6th century)',
  },
  {
    period: 'midday',
    text: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.',
    attribution: 'Psalm 23:1–3',
  },
  {
    period: 'midday',
    text: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.',
    attribution: 'Philippians 4:6',
  },
  {
    period: 'midday',
    text: 'O Savior of the world, who by thy cross and precious blood hast redeemed us: save us and help us, we humbly beseech thee, O Lord.',
    attribution: 'Book of Common Prayer (1662)',
  },
  {
    period: 'midday',
    text: 'Fix your thoughts on what is true, and honorable, and right, and pure, and lovely, and admirable. Think about things that are excellent and worthy of praise.',
    attribution: 'Philippians 4:8',
  },
  {
    period: 'midday',
    text: 'He gives strength to the weary and increases the power of the weak. Those who hope in the Lord will renew their strength.',
    attribution: 'Isaiah 40:29, 31',
  },

  // ── EVENING ──────────────────────────────────────────────
  {
    period: 'evening',
    text: 'Lord, now you are letting your servant depart in peace, according to your word; for my eyes have seen your salvation.',
    attribution: 'Luke 2:29–30 (Nunc Dimittis)',
  },
  {
    period: 'evening',
    text: 'He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.',
    attribution: 'Psalm 91:1',
  },
  {
    period: 'evening',
    text: 'Watch, dear Lord, with those who wake or watch or weep tonight, and give your angels charge over those who sleep. Tend your sick ones, O Lord Christ. Rest your weary ones. Bless your dying ones. Soothe your suffering ones. Shield your joyous ones. And all for your love\'s sake.',
    attribution: 'Augustine of Hippo (354–430)',
  },
  {
    period: 'evening',
    text: 'Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night.',
    attribution: 'Book of Common Prayer (1662)',
  },
  {
    period: 'evening',
    text: 'Stay with us, Lord, for it is toward evening and the day is far spent.',
    attribution: 'Luke 24:29',
  },
  {
    period: 'evening',
    text: 'I lie down and sleep; I wake again, because the Lord sustains me.',
    attribution: 'Psalm 3:5',
  },
  {
    period: 'evening',
    text: 'Now I lay me in the hands of God, as a child who has played all day lays himself in the arms of his mother at evening.',
    attribution: 'Martin Luther (1483–1546)',
  },
  {
    period: 'evening',
    text: 'Lord Jesus, receive my spirit. Make me worthy of that peace which surpasses all understanding.',
    attribution: 'Polycarp of Smyrna, before his martyrdom (c. 155)',
  },
  {
    period: 'evening',
    text: 'Into your hands, O Lord, I commend my spirit. You have redeemed me, O Lord, God of truth.',
    attribution: 'Psalm 31:5',
  },
  {
    period: 'evening',
    text: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.',
    attribution: 'Numbers 6:24–26',
  },
  {
    period: 'evening',
    text: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.',
    attribution: 'Romans 15:13',
  },
]

function getPeriod(): 'morning' | 'midday' | 'evening' {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'midday'
  return 'evening'
}

export function getDailyPrayer(): DailyPrayer {
  const period = getPeriod()
  const pool = prayers.filter(p => p.period === period)
  // Deterministic by day of year so everyone sees the same prayer
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  return pool[dayOfYear % pool.length]
}

export function getPeriodLabel(): string {
  const period = getPeriod()
  if (period === 'morning') return 'Morning prayer'
  if (period === 'midday') return 'Midday prayer'
  return 'Evening prayer'
}
