# 🌿 Ultai - AI-Powered Skincare Recommendation Platform

A sophisticated Next.js application that combines AI-driven skincare consultations with intelligent product recommendations. Built with modern web technologies and powered by Google's Gemini AI.

## ✨ Features

### 🤖 AI Skincare Consultant

- **Personalized Consultations**: Interactive chat with AI skincare expert
- **Smart Questioning**: Progressive information gathering about skin type, concerns, and experience level
- **Ingredient Recommendations**: AI-generated lists of specific skincare ingredients tailored to user needs
- **Real-time Responses**: Powered by Google Gemini AI for accurate, up-to-date skincare advice

### 🔍 Advanced Product Search

- **Algolia-Powered Search**: Lightning-fast, typo-tolerant product discovery
- **Visual Product Cards**: Beautiful product displays with placeholder images
- **Product Comparison**: Compare products side-by-side with magnifying glass quick-access
- **Smart Filtering**: Filter by product type, price, ingredients, and more

### 🎨 Beautiful UI/UX

- **Sage Green Theme**: Calming, spa-like aesthetic perfect for skincare
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Smooth Animations**: Polished micro-interactions and hover effects
- **Accessible Design**: Built with accessibility best practices

### 💾 Smart Recommendations

- **Ingredient Matching**: Products recommended based on AI-suggested ingredients
- **Save & Compare**: Users can save products and build comparison lists
- **Personalized Results**: Recommendations adapt to user's specific skin profile

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Material-UI** - Component library for forms and UI elements
- **React Icons** - Beautiful icon library

### AI & Search

- **Google Gemini AI** - Advanced language model for skincare consultations
- **Algolia Search** - Powerful search and discovery platform
- **React InstantSearch** - Search UI components

### Development

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Papa Parse** - CSV data processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Google Gemini API key
- Algolia account and API keys

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd skinCareAI
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
   NEXT_PUBLIC_ALGOLIA_API_KEY=your_algolia_search_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/              # AI chat endpoint
│   │   └── recommendations/   # Product recommendation API
│   ├── components/
│   │   ├── Chatbox.tsx        # AI chat interface
│   │   ├── Navbar.tsx         # Navigation component
│   │   ├── Products.tsx       # Product search & display
│   │   ├── Recommendations.tsx # Product recommendations
│   │   └── SearchBridge.tsx   # Algolia search bridge
│   ├── data/
│   │   ├── cleaned_skincare_products.csv  # Product database
│   │   └── skincareIngredients.json       # Ingredient knowledge base
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
public/
└── placeholders/              # Product placeholder images
```

## 🔧 Configuration

### Algolia Setup

1. Create an Algolia account
2. Upload your product CSV to create a searchable index
3. Configure search attributes and ranking
4. Add API keys to environment variables

### Gemini AI Setup

1. Get API key from Google AI Studio
2. Add to environment variables
3. Configure model parameters in `api/chat/route.ts`

## 🎯 Usage

### For Users

1. **Start a Consultation**: Click the chat interface to begin
2. **Answer Questions**: Provide information about skin type and concerns
3. **Get Recommendations**: Receive personalized ingredient suggestions
4. **Search Products**: Use the search bar to find specific products
5. **Compare & Save**: Use the magnifying glass to compare products

### For Developers

1. **Modify AI Prompts**: Edit prompts in `api/chat/route.ts`
2. **Add Product Data**: Update CSV files in the `data/` directory
3. **Customize Styling**: Modify Tailwind classes or add custom CSS
4. **Extend Features**: Add new components or API endpoints

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- AWS
- Google Cloud

## 🔒 Environment Variables

| Variable                      | Description                 | Required |
| ----------------------------- | --------------------------- | -------- |
| `GEMINI_API_KEY`              | Google Gemini AI API key    | Yes      |
| `NEXT_PUBLIC_ALGOLIA_APP_ID`  | Algolia application ID      | Yes      |
| `NEXT_PUBLIC_ALGOLIA_API_KEY` | Algolia search-only API key | Yes      |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- Algolia for exceptional search capabilities
- Tailwind CSS for beautiful, responsive design
- Next.js team for the amazing framework
- Material-UI for accessible components

Built with ❤️ for skincare enthusiasts and AI technology lovers.
