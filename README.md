# E-commerce Product Listing Platform

## Overview

This project is an e-commerce product listing platform built using Next.js, TypeScript, and Tailwind CSS. The platform includes features for listing products, viewing individual product details, filtering products by category or price, and managing products (add, edit, delete). The project is optimized for SEO and responsive design.

## Setup and Installation

To set up and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Brunounyime/e-commerce

   ```

2. Navigate to the project directory:
   cd your-repo-name

3. Install dependencies:
   npm install

4. Run the development server:
   npm run dev
   Open your browser and navigate to http://localhost:3000.

Design Decisions and Trade-offs

Next.js and TypeScript: We chose Next.js for its hybrid rendering capabilities (SSG and SSR) and TypeScript for type safety and better developer experience.

Tailwind CSS: A utility-first CSS framework was used for rapid development and consistency in design.

SEO Optimization: Dynamic meta tags and title tags were implemented for better SEO. A sitemap and robots.txt file were generated for improved search engine crawling.

Performance: The platform is optimized with server-side rendering and static site generation where appropriate, ensuring fast load times and good SEO performance.

SEO Handling

The following steps were taken to ensure SEO compliance:

Meta Tags and Titles: Each page, especially product pages, has dynamically generated meta tags, including Open Graph tags for social media sharing.

Sitemap and robots.txt: A sitemap and robots.txt file are generated automatically using the next-sitemap package, ensuring search engines can crawl the site efficiently.

Responsive Design: The site is fully responsive and optimized for mobile devices, which is a critical factor for SEO ranking.

Live Demo
You can view the live demo of the application at Live Demo URL.