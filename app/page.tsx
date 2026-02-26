'use client'

import { useState, useCallback } from 'react'

const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function generateLorem(count: number, asParagraphs: boolean): string {
  if (asParagraphs) {
    const paragraphs: string[] = []
    const wordsPerParagraph = 60 // ~60 слов на параграф
    
    for (let i = 0; i < count; i++) {
      const words: string[] = []
      for (let j = 0; j < wordsPerParagraph; j++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
      }
      paragraphs.push(words.join(' ').replace(/^[a-z]/, (c) => c.toUpperCase()) + '.')
    }
    return paragraphs.join('\n\n')
  }
  
  // Режим слов
  const words: string[] = []
  for (let i = 0; i < count; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
  }
  return words.join(' ').replace(/^[a-z]/, (c) => c.toUpperCase()) + '.'
}

export default function Home() {
  const [count, setCount] = useState(5)
  const [asParagraphs, setAsParagraphs] = useState(true)
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    setText(generateLorem(count, asParagraphs))
  }, [count, asParagraphs])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-2xl shadow-lg">📄</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Lorem Ipsum</h1>
                <p className="text-sm text-slate-500">Placeholder text</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-3xl shadow-xl mb-6">📄</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Lorem Ipsum Generator</h2>
            <p className="text-lg md:text-xl text-slate-600">Generate placeholder text for your designs and prototypes.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of {asParagraphs ? 'paragraphs' : 'words'}
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min={1}
                max={100}
                className="input"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={asParagraphs}
                  onChange={(e) => setAsParagraphs(e.target.checked)}
                  className="rounded border-slate-300"
                />
                As paragraphs
              </label>
            </div>
          </div>

          <button onClick={generate} className="btn-primary bg-orange-500 hover:bg-orange-600 mb-6">
            ✨ Generate Lorem Ipsum
          </button>

          {text && (
            <>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">{text}</pre>
              </div>
              <button onClick={copyToClipboard} className="btn-secondary">
                {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
              </button>
            </>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
