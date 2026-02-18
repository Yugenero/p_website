const blogEntries = [
  {
    slug: 'shipping-calm-product-systems',
    path: '/blog/shipping-calm-product-systems.md',
    imageUrl: '/images/blog-placeholder.svg',
  },
  {
    slug: 'what-i-am-optimizing-for',
    path: '/blog/what-i-am-optimizing-for.md',
    imageUrl: '/images/blog-placeholder.svg',
  },
  {
    slug: 'lorem-ipsum-playbook',
    path: '/blog/lorem-ipsum-playbook.md',
    imageUrl: 'https://cataas.com/cat?width=1400&height=700',
  },
];

const extractTitleFromMarkdown = (markdown, index) => {
  const lines = markdown.trim().split('\n');
  const headingLine = lines.find((line) => /^#{1,6}\s+/.test(line.trim()));

  if (headingLine) {
    return headingLine.replace(/^#{1,6}\s+/, '').trim();
  }

  return `Untitled Post ${index + 1}`;
};

export { blogEntries, extractTitleFromMarkdown };
