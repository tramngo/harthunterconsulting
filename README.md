# harthunterconsulting.com

The Harthunter Consulting website and blog. Built with [Eleventy](https://www.11ty.dev/),
hosted on Netlify, deployed from this repository.

**Live site:** https://www.harthunterconsulting.com

---

## The one rule

**A change is live when it is committed to `main`.** Netlify watches that branch,
rebuilds the site, and publishes in about a minute. That is the only trigger.
Nothing else publishes anything.

---

## Three ways to make a change

**1. Ask Claude Code.** Open Claude Code in this folder and say what you want
changed. It edits the files, shows a local preview, and pushes once you approve.
Best for anything touching design or the homepage.

**2. GitHub in your browser.** Open the repo, click the file, click the pencil
icon, edit, then **Commit changes**. No tools to install. Best for blog posts
and quick text fixes.

**3. Locally.** Edit the files on your computer, then `git add`, `git commit`,
`git push`.

---

## Where things live

| What you want to change | File |
|---|---|
| Homepage text (hero, audit, retainer, contact) | `src/index.html` |
| An existing blog post | `src/blog/<that-post>.md` |
| A new blog post | new file: `src/blog/your-title.md` |
| Blog page intro headline | `src/blog.njk` |
| Colors, fonts, spacing (the whole design) | `src/css/site.css` |
| Nav and footer on blog pages | `src/_includes/layouts/base.njk` |
| Layout of a blog post | `src/_includes/layouts/post.njk` |
| Site name, URL, contact email | `src/_data/site.json` |
| Build settings | `netlify.toml` |

Leave these alone: `_site/` is regenerated on every build, and `node_modules/`
is installed rather than written. Neither is committed.

---

## Writing a new blog post

1. Create a file at `src/blog/your-title-here.md`.
2. Start it with this block, then write the post below it:

```text
---
title: Your headline
date: 2026-11-03
description: One sentence for the blog list and Google results.
---
```

3. Commit. It is live in about a minute.

**The file name becomes the URL.** `your-title-here.md` publishes at
`/blog/your-title-here/`. Renaming the file later breaks any link anyone has
shared and loses that page's search ranking, so choose it carefully up front.
Editing the post text, including the headline, never changes the URL.

**Formatting:** `## Heading`, `**bold**`, `*italic*`, blank line between
paragraphs, `- item` for bullets. That is the whole syntax.

Posts are listed newest first, by the `date:` line.

---

## How to know it worked

Wait about a minute, load the page, and hard-refresh (Ctrl+Shift+R). If the
change is not there, open **Builds** in Netlify: the top entry should say
**Completed**.

**If a build fails, the site does not go down.** Netlify keeps serving the last
good version, so a broken commit means the change does not appear, not that the
site breaks.

---

## Running it locally

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install          # once, after cloning
npm run serve        # preview at http://localhost:4321
npm run build        # build into _site/ without serving
```

Stop the preview server before running `npm run build` on Windows, or the build
fails with an `EPERM` error because the server still holds the stylesheet open.

---

## How the build works

Eleventy reads everything in `src/` and writes a finished static site into
`_site/`, which is what Netlify publishes.

- `src/index.html` is copied through as the homepage.
- Markdown files in `src/blog/` become post pages, wrapped in
  `src/_includes/layouts/post.njk`.
- `src/blog.njk` builds the post list at `/blog/`.
- `src/feed.njk` and `src/sitemap.njk` generate `/feed.xml` and `/sitemap.xml`
  from the posts, with no manual upkeep.
- `src/css/site.css` is copied across untouched and is shared by every page.

The build command and publish directory come from `netlify.toml`, not from the
Netlify dashboard. **Settings changed in the dashboard are ignored** — change
them in that file instead.
