import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const RESOURCES = [
  {
    category: 'Scripture',
    items: [
      { label: 'Bible Gateway', sub: 'Read Scripture in multiple translations', href: 'https://www.biblegateway.com' },
      { label: 'Blue Letter Bible', sub: 'Deep word study and commentaries', href: 'https://www.blueletterbible.org' },
      { label: 'ESV Bible', sub: 'English Standard Version online', href: 'https://www.esv.org' },
    ],
  },
  {
    category: 'Prayer',
    items: [
      { label: 'Book of Common Prayer', sub: 'The 1662 BCP online', href: 'https://www.bcponline.org' },
      { label: 'The Valley of Vision', sub: 'Puritan prayers and devotions', href: 'https://www.monergism.com/valley-vision-collection-puritan-prayers-devotions' },
    ],
  },
  {
    category: 'Church history',
    items: [
      { label: 'Christian Classics Ethereal Library', sub: 'Church fathers, reformers, and more', href: 'https://www.ccel.org' },
      { label: 'Ligonier Ministries', sub: 'Reformed teaching and resources', href: 'https://www.ligonier.org' },
    ],
  },
  {
    category: 'Catechisms',
    items: [
      { label: 'Westminster Shorter Catechism', sub: '107 questions and answers', href: 'https://www.shortercatechism.com' },
      { label: 'New City Catechism', sub: '52 questions for families and groups', href: 'https://newcitycatechism.com' },
      { label: 'Heidelberg Catechism', sub: 'The 1563 catechism of the Reformation', href: 'https://www.heidelberg-catechism.com' },
    ],
  },
]

export default async function MorePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  return (
    <div className="px-5 pt-10 pb-4">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>Resources</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--ink-soft)' }}>Curated links for the walk.</p>

      <div className="flex flex-col gap-6">
        {RESOURCES.map(section => (
          <div key={section.category}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>
              {section.category}
            </p>
            <div className="flex flex-col gap-2">
              {section.items.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl px-5 py-4 active:opacity-70 transition-opacity"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--ink-soft)' }}>{item.sub}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border)', flexShrink: 0 }}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
