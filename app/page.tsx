'use client'

import { useState, useCallback } from 'react'
import styles from './page.module.css'

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
  'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
  'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
  'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
  'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

export default function Home() {
  const [paragraphs, setParagraphs] = useState(3)
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(5)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generateLorem = useCallback(() => {
    const result = []
    
    for (let p = 0; p < paragraphs; p++) {
      const sentences = []
      for (let s = 0; s < sentencesPerParagraph; s++) {
        const sentenceLength = Math.floor(Math.random() * 10) + 8
        const words = []
        for (let w = 0; w < sentenceLength; w++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
        }
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
        sentences.push(words.join(' ') + '.')
      }
      result.push(sentences.join(' '))
    }
    
    setOutput(result.join('\n\n'))
  }, [paragraphs, sentencesPerParagraph])

  const copyText = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const wordCount = output.split(/\s+/).filter(w => w.length > 0).length
  const charCount = output.length

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📝 Lorem Ipsum Generator</h1>
      
      <div className={styles.controls}>
        <div className={styles.control}>
          <label>Paragraphs: {paragraphs}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value))}
          />
        </div>

        <div className={styles.control}>
          <label>Sentences per paragraph: {sentencesPerParagraph}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={sentencesPerParagraph}
            onChange={(e) => setSentencesPerParagraph(parseInt(e.target.value))}
          />
        </div>
      </div>

      <button onClick={generateLorem} className={styles.generateBtn}>
        ✨ Generate Text
      </button>

      {output && (
        <>
          <div className={styles.stats}>
            {wordCount} words • {charCount} characters • {paragraphs} paragraphs
          </div>
          <div className={styles.outputContainer}>
            <textarea
              value={output}
              readOnly
              className={styles.output}
            />
            <button onClick={copyText} className={styles.copyBtn}>
              {copied ? '✓ Copied!' : '📋 Copy All'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}