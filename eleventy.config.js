/* Eleventy builds the site: it reads everything in src/ and writes finished
   HTML into _site/, which is what Netlify publishes. Blog posts are the
   Markdown files in src/blog/. */

module.exports = function (eleventyConfig) {
  // The stylesheet is plain CSS, so copy it across untouched.
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // "October 21, 2026" for reading, "2026-10-21" for machines.
  eleventyConfig.addFilter("readableDate", (value) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value).toISOString()
  );

  eleventyConfig.addFilter("dateOnly", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  // Newest post first.
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/blog/*.md").reverse()
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
