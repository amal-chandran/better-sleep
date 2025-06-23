# Better Sleep

A modern web application built with Next.js and Contentful CMS to provide information and resources about better sleep habits.

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router and React 19
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **CMS**: [Contentful](https://www.contentful.com/)
- **GraphQL**: GraphQL API with code generation using [GraphQL Codegen](https://the-guild.dev/graphql/codegen)
- **UI Components**
  - [Radix UI](https://www.radix-ui.com/) for accessible UI components
  - [Lucide React](https://lucide.dev/) for icons
- **Rich Text Rendering**: Custom rich text renderer using [@contentful/rich-text-react-renderer](https://www.npmjs.com/package/@contentful/rich-text-react-renderer)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm
- Contentful account with API keys

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amal-chandran/better-sleep.git
   cd better-sleep
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Fill in your Contentful API credentials:
     ```
     CONTENTFUL_GRAPHQL_ENDPOINT=https://graphql.contentful.com/content/v1/spaces/YOUR_SPACE_ID
     CONTENTFUL_DELIVERY_API_TOKEN=your_delivery_api_token
     CONTENTFUL_PREVIEW_API_TOKEN=your_preview_api_token
     ```
   - Follow the [Contentful Authentication documentation](https://www.contentful.com/developers/docs/references/authentication/#the-content-management-api) for more details

### Running Locally

Start the development server with Turbopack:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### GraphQL Code Generation

After making changes to GraphQL queries or when the Contentful schema changes, run:

```bash
pnpm codegen
```

This will update the TypeScript types based on your GraphQL schema.

## Data Model

The application uses the following content models in Contentful:

### Main Content Types

1. **HomePage**: The main landing page

   - Title
   - Meta title and description
   - Carousel collection
   - Sections collection (can include TextSection, ImageSection, or TextImageSection)

2. **Page**: Custom pages with unique slugs
   - Title
   - Slug
   - Meta title and description
   - Sections collection

### Section Components

1. **TextSection**: Pure text content

   - Title
   - Content (Rich Text)

2. **ImageSection**: Image-focused section

   - Title
   - Image

3. **TextImageSection**: Combined text and image

   - Title
   - Content (Rich Text)
   - Image

4. **Carousel**: Slideshow component
   - Title
   - Image
