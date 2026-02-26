# SEO & UX/UI Аудит: Lorem Ipsum Generator

**Дата аудита:** 2026-02-26  
**Проект:** /home/cr1t_dmg/.openclaw/workspace/projects/lorem-ipsum  
**URL:** https://lorem-ipsum.vercel.app

---

## 🔴 КРИТИЧНО (Немедленное действие)

### 1. Отсутствуют robots.txt и sitemap.xml
**Проблема:** Нет файлов `robots.txt` и `sitemap.xml` — поисковики не получают инструкций по индексации.

**Решение:**
```
# robots.txt
User-agent: *
Allow: /
Sitemap: https://lorem-ipsum.vercel.app/sitemap.xml

# sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lorem-ipsum.vercel.app/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🟠 ВЫСОКИЙ (Важно исправить)

### 2. Отсутствуют Open Graph и Twitter Card изображения
**Проблема:** `og:image` и `twitter:image` не указаны — при шеринге в соцсетях не будет превью.

**Решение:** Добавить в `layout.tsx`:
```tsx
openGraph: {
  images: [{
    url: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Lorem Ipsum Generator'
  }]
},
twitter: {
  images: ['/og-image.png']
}
```

### 3. Отсутствует canonical URL
**Проблема:** Нет `rel="canonical"` — риск дублирования контента при разных параметрах URL.

**Решение:** Добавить в metadata:
```tsx
alternates: {
  canonical: 'https://lorem-ipsum.vercel.app'
}
```

### 4. Два H1 на странице
**Проблема:** `<h1>` в шапке и `<h2>` в hero-section (должен быть H1). Сейчас иерархия нарушена.

**Текущая структура:**
- header > h1 "Lorem Ipsum" (должен быть span/div)
- section > h2 "Lorem Ipsum Generator" (должен быть h1)

**Решение:** Поменять h1 в шапке на span, а h2 в hero на h1.

### 5. Интерактивные элементы без aria-label
**Проблема:** Кнопки "Generate" и "Copy" не имеют accessible names для скринридеров.

**Решение:**
```tsx
<button aria-label="Generate Lorem Ipsum text">✨ Generate Lorem Ipsum</button>
<button aria-label="Copy generated text to clipboard">📋 Copy to Clipboard</button>
```

---

## 🟡 СРЕДНИЙ (Рекомендуется)

### 6. Отсутствует favicon
**Проблема:** Нет иконки сайта — выглядит непрофессионально во вкладке.

**Решение:** Добавить `favicon.ico` или SVG иконку в metadata.

### 7. Schema.org JSON-LD неполный
**Проблема:** Структурированные данные отсутствуют ключевые поля: `url`, `image`, `aggregateRating` (или `review`).

**Текущий код:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Lorem Ipsum Generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": "Custom paragraphs, Custom words, HTML format, Plain text"
}
```

**Рекомендуемое дополнение:**
```json
{
  "url": "https://lorem-ipsum.vercel.app",
  "image": "https://lorem-ipsum.vercel.app/og-image.png",
  "author": {
    "@type": "Organization",
    "name": "SmartOK Tools"
  }
}
```

### 8. Нет skip-to-content ссылки
**Проблема:** Нет возможности пропустить навигацию для пользователей клавиатуры.

**Решение:** Добавить в начало body:
```tsx
<a href="#main-content" className="skip-link">Skip to main content</a>
<main id="main-content">...</main>
```

### 9. Цвета кнопок не соответствуют системе
**Проблема:** В globals.css `.btn-primary` использует `bg-indigo-600`, но в page.tsx кнопка переопределена `bg-orange-500`. Неконсистентность.

**Решение:** Использовать единую систему цветов или создать orange-вариант кнопки.

---

## 🟢 НИЗКИЙ (Хорошо бы иметь)

### 10. Нет theme-color meta tag
**Проблема:** Браузеры не подстраивают цвет интерфейса под сайт.

**Решение:**
```tsx
<meta name="theme-color" content="#f97316" />
```

### 11. Отсутствует манифест PWA
**Проблема:** Нет `manifest.json` — нельзя установить как приложение.

### 12. Нет preload для критических ресурсов
**Проблема:** CSS загружается без приоритета.

### 13. Футер слишком минималистичный
**Проблема:** Только копирайт — нет ссылок на политику, контакты, другие инструменты.

---

## ✅ ЧТО УЖЕ ХОРОШО

| Критерий | Статус |
|----------|--------|
| Title tag | ✅ Оптимизирован (59 символов) |
| Meta description | ✅ Есть (95 символов) |
| Viewport | ✅ Настроен |
| Open Graph базовые | ✅ title, description, url, type |
| Twitter Cards базовые | ✅ card, title, description |
| Semantic HTML | ✅ header, main, footer, section |
| Mobile responsive | ✅ Breakpoints sm/md/lg |
| Lang attribute | ✅ lang="en" |
| Robots meta | ✅ index, follow |
| Keywords | ✅ Есть (хотя Google их игнорирует) |
| Tailwind структура | ✅ Хорошая организация |
| Цветовой контраст | ✅ slate-900 на белом — ок |
| Focus states | ✅ focus:ring-2 focus:ring-indigo-500 |

---

## 📊 Приоритетная очередь исправлений

```
Неделя 1 (Критично + Высокий):
├── Создать robots.txt
├── Создать sitemap.xml  
├── Исправить H1-иерархию
├── Добавить OG/Twitter изображения
├── Добавить canonical URL
└── Добавить aria-label кнопкам

Неделя 2 (Средний):
├── Добавить favicon
├── Дополнить Schema.org
├── Добавить skip-to-content
└── Унифицировать цвета кнопок

Неделя 3+ (Низкий):
├── Добавить theme-color
├── Создать manifest.json
└── Расширить футер
```

---

## 🛠️ Быстрые правки

### layout.tsx — исправления:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://lorem-ipsum.vercel.app'),
  title: 'Lorem Ipsum Generator — Generate Placeholder Text | Free Tool',
  description: 'Generate Lorem Ipsum placeholder text for your designs. Free online Lorem Ipsum generator.',
  keywords: ['lorem ipsum', 'lorem ipsum generator', 'placeholder text', 'dummy text'],
  authors: [{ name: 'SmartOK Tools' }],
  alternates: {  // ← ДОБАВИТЬ
    canonical: 'https://lorem-ipsum.vercel.app'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lorem-ipsum.vercel.app',
    siteName: 'Lorem Ipsum',
    title: 'Lorem Ipsum Generator — Generate Placeholder Text',
    description: 'Generate Lorem Ipsum placeholder text.',
    images: [{  // ← ДОБАВИТЬ
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Lorem Ipsum Generator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lorem Ipsum Generator',
    description: 'Generate Lorem Ipsum placeholder text.',
    images: ['/og-image.png']  // ← ДОБАВИТЬ
  },
  robots: { index: true, follow: true },
  other: {  // ← ДОБАВИТЬ theme-color
    'theme-color': '#f97316'
  }
}
```

### page.tsx — исправления:
```tsx
// В шапке — поменять h1 на span:
<span className="text-xl font-bold text-slate-900">Lorem Ipsum</span>

// В hero — поменять h2 на h1:
<h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
  Lorem Ipsum Generator
</h1>

// Кнопкам добавить aria-label:
<button 
  onClick={generate} 
  aria-label="Generate Lorem Ipsum text"
  className="..."
>
  ✨ Generate Lorem Ipsum
</button>
```

### Файлы для создания:
- `public/robots.txt`
- `public/sitemap.xml`
- `public/og-image.png` (1200×630)
- `public/favicon.ico`

---

**Итог:** Проект имеет хорошую базовую SEO-структуру, но критически важно добавить robots.txt, sitemap.xml и исправить иерархию заголовков. После этих правок сайт будет полностью соответствовать базовым SEO-стандартам.
