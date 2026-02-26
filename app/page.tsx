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
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">📄</div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Lorem Ipsum</span>
                <p className="text-sm text-slate-500">Placeholder text</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-orange-50 via-white to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-600 text-4xl shadow-2xl shadow-orange-500/25 mb-8 transform hover:scale-110 transition-transform duration-300">📄</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
              Lorem Ipsum Generator
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light">Generate placeholder text for your designs and prototypes.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
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
                className="input hover:border-orange-300 transition-colors duration-200"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer hover:text-orange-600 transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={asParagraphs}
                  onChange={(e) => setAsParagraphs(e.target.checked)}
                  className="rounded border-slate-300 hover:border-orange-400 focus:ring-orange-500 cursor-pointer"
                />
                As paragraphs
              </label>
            </div>
          </div>

          <button onClick={generate} className="btn-primary bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 mb-6 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transform hover:-translate-y-0.5 transition-all duration-200">
            ✨ Generate Lorem Ipsum
          </button>

          {text && (
            <>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 mb-4 shadow-inner">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans min-h-[150px] md:min-h-[200px]">{text}</pre>
              </div>
              <button onClick={copyToClipboard} className="btn-secondary hover:shadow-md hover:border-orange-300 hover:text-orange-600 transition-all duration-200">
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
