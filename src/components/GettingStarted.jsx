import { Info } from 'lucide-react'

export default function GettingStarted() {
  return (
    <section id="getting-started" className="getting-started" aria-labelledby="getting-started-title">
      <div className="container">
        <div className="getting-started-heading">
          <h2 id="getting-started-title">Getting Started</h2>
          <p>Choose a category, search by name or topic, and use the filters to narrow results by language or resource type. Download documents directly or open websites, tools, videos, and channels in a new tab.</p>
        </div>
        <aside className="getting-started-note">
          <span className="note-icon" aria-hidden="true"><Info size={20} /></span>
          <div>
            <strong>Disclaimer</strong>
            <p>AI is just a tool. Use it for help, not for solving whole programs or questions.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
