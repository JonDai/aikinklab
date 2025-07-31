### **Part 1: Project Rules for AI-Assisted Development**
**Important: the code structure must be modular and follow the rules defined in this document.**

**_This document defines the development standards and technical constraints for the current project. The AI assistant must strictly adhere to these rules when generating code._**

#### **1. General Rules & Project Dependencies**

1.1. **Project Name:** Modern Testing Website Platform
1.2. **Primary Languages:**
    - **Backend:** Java 8 LTS
    - **Frontend:** TypeScript 5.x
1.3. **Version Control:** Git
1.4. **Commit Message Convention:** All commit messages must follow the Conventional Commits specification. For AI-assisted commits, add an `[AI]` tag.
    - _Example: `feat(api): create endpoint for test submission [AI]`_

#### **2. Frontend Development (Next.js)**

2.1. **Framework & Core Dependencies:**
    - **Framework:** `Next.js v14.2.x`
    - **UI Library:** `React v18.2.x`
    - **State Management:**
        - Default to React Hooks (`useState`, `useContext`, `useReducer`).
        - For complex, global client state, use `Zustand`.
        - **Rule:** Avoid using Redux or MobX to maintain simplicity.

2.2. **Styling:**
    - **Framework:** `Tailwind CSS v3.4.x`
    - **Rule:** All styling must be implemented using Tailwind CSS utility classes. Avoid writing separate `.css` files or using CSS-in-JS libraries.

2.3. **UI Components & Icons:**
    - **Primary Source:** `Shadcn UI`
    - **Icons:** `lucide-react`
    - **Rule:** Before creating a new component, verify if a suitable primitive exists in Shadcn UI. Do not install other third-party component libraries to ensure consistency.

2.4. **Data Fetching:**
    - **Library:** Use `TanStack Query (React Query) v5` for all server state management.
    - **Rule:** Do not use raw `fetch()` or `useEffect` for data fetching directly within components. Wrap all API calls with `useQuery` or `useMutation`.

2.5. **Testing:**
    - **Framework:** `Jest` with `React Testing Library`.
    - **Rule:** Tests must target user-facing behavior. Query elements by accessible roles and text.

2.6. **APIs and Patterns to Avoid:**
    - **React Class Components:** All new components must be Functional Components.
    - **Default Exports:** Use named exports for all components and functions.

#### **3. Backend Development (Spring Boot)**

3.1. **Framework & Core Dependencies:**
    - **Framework:** `Spring Boot v2.7.x`
    - **Java Version:** `Java 8 LTS`
    - **Build Tool:** `Maven`
    - **Important:** **Spring Boot 2.7.x is the required version for compatibility with Java 8. Do not use Spring Boot 3.x.**

3.2. **Architecture & Design Patterns:**
    - **Structure:** Adhere strictly to a 3-layer architecture: `Controller` -> `Service` -> `Repository`.
    - **DTO Pattern:** API endpoints must only accept and return DTOs (Data Transfer Objects).
    - **Rule:** Never expose JPA `@Entity` objects directly through the API. Use a mapping library like `MapStruct`.

3.3. **Database & Persistence:**
    - **Framework:** `Spring Data JPA` (with Hibernate provider).
    - **Database:** `MySQL 8.x`
    - **Rule:** Prefer JPQL (`@Query`) or Query Methods. Avoid native SQL queries unless there is a clear performance justification.

3.4. **Testing:**
    - **Unit Testing:** `JUnit 5` with `Mockito`.
    - **Integration Testing:** `@SpringBootTest` with `Testcontainers` for managing a Dockerized MySQL instance.

3.5. **APIs and Libraries to Avoid:**
    - **Legacy Date/Time:** Prohibit `java.util.Date` and `java.util.Calendar`. Use only the `java.time` package.
    - **Lombok:** Prohibited. Use standard Java classes to ensure clarity and stability.

#### **4. Headless CMS (Strapi)**

4.1. **Version:** `Strapi v5.x`
4.2. **API Type:** Use the built-in REST API for all content delivery.
4.3. **Rule:** Strapi's role is strictly limited to content management. All business logic must reside in the Spring Boot application.

---

### **Part 2: UI/UX Design Specification (v3.0 - Midnight Radio)**

#### **1. Core Design Philosophy: Midnight Radio**

**Goal:** To create an extremely private online space for exploration, filled with intellectual allure and high-end sensory stimulation.

#### **2. Color Palette**

The soul of "Midnight Radio"—warm, deep, bold, and luxurious.

| Use Case | Name | HEX Value | Tailwind Reference | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Main Background | Warm Charcoal | `#1A1A1A` | `bg-[#1A1A1A]` | The base background; warmer and more textured than pure black. |
| Secondary Background | Layered Charcoal | `#2C2C2C` | `bg-[#2C2C2C]` | For cards, modals, etc., creating a subtle layer. |
| Core Accent | Neon Magenta | `#D946EF` | `bg-fuchsia-500` | All key interactive elements (buttons, highlights). |
| Hover Accent | Hover Magenta | `#E879F9` | `hover:bg-fuchsia-400` | Hover state for the core accent color. |
| Luxury Accent | Matte Gold | `#C0A062` | `text-[#C0A062]` | Used sparingly for logos or special titles to add a touch of luxury. |
| Main Text | Warm Off-white | `#F5F5F5` | `text-neutral-100` | Main headings and body copy for readability. |
| Secondary Text | Neutral Gray | `#A3A3A3` | `text-neutral-400` | Helper text, placeholders, timestamps. |

#### **3. Typography System**

A "Classical & Modern" strategy to create a dual personality of tension and harmony.

* **Headline Font (H1, H2):** `Playfair Display` (Google Fonts) - An elegant, luxurious serif font to set the brand tone.
* **UI & Body Font:** `Inter` (Google Fonts) - A clean, modern sans-serif font for functionality and readability.

**Type Scale:**
* **H1:** 48px, Playfair Display, Font-weight: Bold (700)
* **H2:** 36px, Playfair Display, Font-weight: Bold (700)
* **H3:** 24px, Inter, Font-weight: Semi-bold (600)
* **Body:** 16px, Inter, Font-weight: Regular (400), Line-height: 1.7
* **Button Text:** 16px, Inter, Font-weight: Medium (500)

#### **4. Layout & Core Components**

* **Layout:** A **"Spotlight" layout**. The main content is centered with ample dark space around it to create focus and a sense of privacy. Adhere to an **8px grid system** for spacing.

* **Buttons:**
    * **Primary CTA:**
        * **Shape:** Pill-shaped (`border-radius: 9999px`).
        * **Style:** `Neon Magenta` background (`#D946EF`) with `Warm Off-white` text (`#F5F5F5`).
        * **Interaction:** On hover, background changes to `Hover Magenta` (`#E879F9`) with a soft, same-colored `box-shadow` to create a "glowing" effect.
    * **Secondary Button:**
        * **Style:** Transparent background with a 1px `Neutral Gray` border (`#A3A3A3`).
        * **Interaction:** On hover, border and text color change to `Warm Off-white` (`#F5F5F5`).

* **Quiz Options:**
    * **Design:** Rounded rectangular cards (`border-radius: 12px`).
    * **Interaction States:**
        * **Default:** `Layered Charcoal` background (`#2C2C2C`) with a 1px border of the same color.
        * **Hover:** Border changes to `Neutral Gray` (`#A3A3A3`); card has a slight upward transform (`translate-y`).
        * **Selected:** Border changes to `Neon Magenta` (`#D946EF`) with a glowing `inset box-shadow` of the same color.

#### **5. Texture, Light & Motion**

This is key to visualizing the "premium, sensual" feel.

* **Background Texture:** On the main background, overlay a faint noise pattern with an opacity of `0.02` to add a cinematic, textured quality.

* **Imagery:**
    * **Rule:** Strictly no real-life human photos.
    * **AI Art Direction Keywords:** "Close-up, light and shadow, silhouette, texture."
    * **Examples:** Folds of silk under neon light; a body's curve silhouetted against a dark background; the moment liquid flows across glass. All visuals must strictly adhere to the project's color palette.

* **Motion Language:**
    * **Loading:** Elements use a **Slow Fade In** on load (`transition-duration: 500ms`) for a mysterious, elegant atmosphere.
    * **Hover:** Interactive elements have a `200ms` transition duration with an `ease-out` curve for swift, fluid feedback.
    * **Scrolling:** Implement **Parallax Scrolling** on key pages, where background elements move slower than foreground content to create a sense of depth.