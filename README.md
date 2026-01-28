# 🍁 MapleSwapper

**Easily Find Canadian Alternatives to American Products**

MapleSwapper helps Canadians find local alternatives to common American grocery products. Upload your grocery list and we'll suggest Canadian equivalents using AI-powered analysis.

![MapleSwapper Homepage](https://github.com/user-attachments/assets/312e1c5b-4d6f-4268-9ae9-77967df9e35d)

## ✨ Features

- **Smart Grocery List Scanning** - Enter or upload your grocery list and get Canadian alternatives
- **Browse Products** - Explore our database of 87+ Canadian products and their American counterparts
- **AI-Powered Analysis** - Uses DeepSeek AI to provide intelligent product recommendations
- **Bilingual Support** - Available in English and French
- **Dark/Light Theme** - Toggle between themes for comfortable viewing
- **Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mikop22/maple-swapper.git
cd maple-swapper
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure API for AI-powered analysis:
```bash
cp .env.example .env.local
# Edit .env.local and add your DeepSeek API key
```

> **Note:** The app works without an API key using fallback responses for demo purposes.

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:8080 in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## 📖 How to Use

### Scan Your Grocery List

1. Navigate to the **Scan** page
2. Enter your American grocery items (one per line) or upload a text file
3. Click **Find Alternatives** 
4. View your Canadian alternatives with:
   - Canadian Score indicator
   - Brands to avoid (American)
   - Brands to look for (Canadian)
   - Recommended Canadian products

### Browse Products

1. Navigate to the **Browse** page
2. Search by product name, brand, or category
3. Filter by Canadian, American, or all products
4. View detailed product information with images and prices

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Radix UI components
- **State Management:** React Query
- **Routing:** React Router
- **AI Integration:** DeepSeek API (optional)
- **Animations:** Framer Motion

## 📁 Project Structure

```
maple-swapper/
├── public/
│   ├── products/       # Product images (can/us subdirectories)
│   ├── brands/         # Brand logos
│   └── placeholder.svg
├── src/
│   ├── components/     # React components
│   ├── contexts/       # Theme and Language contexts
│   ├── data/           # Product CSV data
│   ├── lib/            # Utilities and API functions
│   ├── pages/          # Page components
│   └── translations/   # i18n JSON files
└── .env.example        # Environment variables template
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_DEEPSEEK_API_KEY` | DeepSeek API key for AI analysis | No (fallback available) |

## 📄 License

This project is private.

## 🙏 Acknowledgments

- Product data sourced from Canadian grocery stores
- Built with [shadcn/ui](https://ui.shadcn.com/) components
- AI powered by [DeepSeek](https://deepseek.com/)
