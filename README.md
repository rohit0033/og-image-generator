
# Dynamic Post Page with OG Image Generation

## Objective
Create a static post page using React that dynamically generates an Open Graph (og:image) based on the post content.

## Requirements

1. **Post Page:**
    - Develop a simple post page using React.
    - Include fields for title, content, and optionally an image, use any social media post design.
2. **OG Image Generation:**
    - Create a system to dynamically generate an og:image (1200x630 pixels) using the post content.
    - The og:image should include the post title, a snippet of the content, and any associated image. It should replicate the design of the post itself.
3. **Integration:**
    - Automatically add the og:image meta tag to the post page's HTML.
    - Ensure the generated image URL is accessible.
4. **Styling:**
    - Style the og:image to be visually appealing and readable.
    - Include branding elements (e.g., logo or color scheme).
5. **Performance:**
    - Optimize the image generation process for speed.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/og-image-generator.git
    cd og-image-generator
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the development server:**
    ```bash
    npm run dev
    ```

## Project Structure

```
og-image-generator/
├── public/
├── src/
│   ├── components/
│   │   ├── OGImage.tsx
│   │   └── PostPage.tsx
│   ├── utils/
│   │   └── ogImageGenerator.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


### Styling with Tailwind CSS

Ensure you have Tailwind CSS set up in your project. You can follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation) for Vite.

### Final Steps

1. **Build the project:**
    ```bash
    npm run build
    ```

2. **Deploy the build:**
    Deploy the contents of the `dist` directory to your web server or a static site hosting service like Vercel

## Notes

- If you encounter CORS issues while loading images, consider using a proxy solution or ensure the server hosting the images supports cross-origin requests.
- This guide does not cover the deployment of the CORS proxy server. 

