### **aikinklab.com - Professional SEO Action Plan (SOP v1.1)**

**Core Strategic Principle:**
Our core strategy is a **bottom-up approach to establishing Topical Authority.** We will first dominate thousands of low-competition, long-tail keywords (the 'countryside') to build our site's authority and relevance in Google's eyes. Then, we will leverage this authority to rank for the highly competitive, high-volume head terms (the 'cities').

This plan is built on four foundational pillars:

#### **Pillar 1: Technical SEO Specifications**

This is the technical foundation of our site. Your expertise in web development is a major advantage here.

1.  **URL Standards:**

      * **Format:** Always use lowercase letters. Use hyphens `-` to separate words.
      * **Structure:** URLs must be clean, short, and contain the primary keyword.
          * **Incorrect:** `aikinklab.com/blog/post?id=123`
          * **Correct:** `aikinklab.com/lab/how-to-start-kink-exploration`
      * **Depth:** Keep the URL structure flat, preferably with no more than two directory levels.

2.  **XML Sitemap Standards:**

      * **Generation:** The site must automatically generate and update the `sitemap.xml` file.
      * **Content:** The sitemap must **only include** high-quality, indexable pages. The following pages **must be excluded**: `/test` (quiz process pages), `/results/{id}` (private results), login/signup pages, thank you pages, etc.
      * **Submission:** Add the sitemap URL to the `robots.txt` file and submit it directly in Google Search Console (GSC).

3.  **Robots.txt Standards:**

      * **Purpose:** To instruct search engine crawlers on what they can and cannot crawl.
      * **Basic Configuration (Copy and use directly):**
        ```
        User-agent: *
        Disallow: /wp-admin/
        Disallow: /test/
        Disallow: /results/
        Allow: /wp-admin/admin-ajax.php

        Sitemap: https://aikinklab.com/sitemap.xml
        ```

4.  **Schema Markup Standards (Structured Data):**

      * **Format:** Implement using `JSON-LD` format, embedded in the `<head>` of the page.
      * **Article Schema:** Every blog post must include the following properties:
          * `@type: "Article"`
          * `headline:` (The article's title)
          * `image:` (URL of the main article image)
          * `datePublished:`
          * `dateModified:`
          * `author: { "@type": "Person", "name": "[Your Pen Name]" }`
          * `publisher: { "@type": "Organization", "name": "AIKinkLab", "logo": { "@type": "ImageObject", "url": "https://looka.com/logo-maker/" } }`
      * **FAQPage Schema:** On pages with Q\&A sections (like `/bdsm-test` or `/about`), add this schema for each Q\&A pair to be eligible for Rich Snippets in search results.

5.  **Performance Optimization Checklist:**

      * **Images:** All images must be compressed before upload and served in `WebP` format.
      * **Lazy Loading:** Add the `loading="lazy"` attribute to all images and iframes that are not in the initial viewport.
      * **CDN:** Enable a Content Delivery Network. Cloudflare's free plan is an excellent starting point.
      * **Testing:** Use Google PageSpeed Insights weekly on core pages to ensure scores remain in the "Good" range, focusing on Core Web Vitals (LCP, INP, CLS).

#### **Pillar 2: On-Page SEO Specifications**

This covers the optimization of individual pages.

1.  **Title Tag Formulas:**

      * **Homepage:** `AI Kink Test: Discover Your Inner Profile | AIKinkLab`
      * **/bdsm-test Page:** `The #1 AI BDSM Test - Private & Insightful | AIKinkLab`
      * **Blog Post Page:** `[Full Post Title] - AIKinkLab`
      * **Rule:** Keep length under **60 characters**.

2.  **Meta Description Formulas:**

      * **Purpose:** To entice users to click, not for ranking.
      * **Formula:** `[Engaging summary that includes the primary keyword]. Take our free, AI-powered test at AIKinkLab for a private and enlightening analysis. [Clear Call-to-Action, e.g., 'Start Your Journey Now.']`
      * **Rule:** Keep length under **160 characters**.

3.  **Internal Linking SOP:**

      * **Rule 1:** For every new "countryside" blog post published, you **must** add at least 1-2 contextual links from the article body pointing to our "city" pages (the Homepage or the `/bdsm-test` page).
      * **Rule 2:** After publishing a new post, you **must** find 1-2 older, relevant articles and edit them to add a link *to* the new post. This creates a powerful internal link web.

#### **Pillar 3: Content Strategy Specifications**

1.  **Keyword Research SOP:**

    1.  Enter a seed keyword (e.g., `kink`) into Semrush.
    2.  Go to the "Keyword Magic Tool" and select the "Questions" filter.
    3.  Add filters: KD% \< 40, Volume \> 50.
    4.  **Analyze the SERP:** Before writing, perform an incognito Google search for your chosen keyword. Analyze the top 5 results to understand the format, angle, and depth required. Plan how you will create something 10x better.
    5.  Finalize your exact article title and outline.

2.  **Content Creation Checklist:**

      * ✅ Is the target keyword in the URL, Page Title, H1 Tag, and within the first 100 words?
      * ✅ Does the article include 2-3 synonyms or related terms (LSI keywords) found in Semrush or Google's "People also ask"?
      * ✅ Does the article provide unique value (e.g., original AI art, a unique perspective, a more detailed guide)?
      * ✅ Has the Internal Linking SOP been completed?
      * ✅ Does the article link out to 1-2 authoritative, non-competitive external sources (e.g., Wikipedia, a major psychology publication)?
      * ✅ Has the entire text been checked for grammar and spelling using a tool like Grammarly?

