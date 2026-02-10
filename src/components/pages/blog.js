import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Container,
  MetaText,
  Section,
  SectionHeader,
  SectionTitle,
} from '../ui/primitives';

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

const inlinePattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

const extractTitleFromMarkdown = (markdown, index) => {
  const lines = markdown.trim().split('\n');
  const headingLine = lines.find((line) => /^#{1,6}\s+/.test(line.trim()));

  if (headingLine) {
    return headingLine.replace(/^#{1,6}\s+/, '').trim();
  }

  return `Untitled Post ${index + 1}`;
};

const parseInlineMarkdown = (text, keyPrefix) => {
  const segments = text.split(inlinePattern).filter(Boolean);

  return segments.map((segment, index) => {
    const key = `${keyPrefix}-inline-${index}`;

    if (segment.startsWith('**') && segment.endsWith('**')) {
      return <InlineStrong key={key}>{segment.slice(2, -2)}</InlineStrong>;
    }

    if (segment.startsWith('*') && segment.endsWith('*')) {
      return <InlineEmphasis key={key}>{segment.slice(1, -1)}</InlineEmphasis>;
    }

    if (segment.startsWith('`') && segment.endsWith('`')) {
      return <InlineCode key={key}>{segment.slice(1, -1)}</InlineCode>;
    }

    const linkMatch = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <InlineAnchor key={key} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </InlineAnchor>
      );
    }

    return <React.Fragment key={key}>{segment}</React.Fragment>;
  });
};

const renderMarkdown = (markdown, entryKey) => {
  const lines = markdown.trim().split('\n');
  const blocks = [];
  let paragraphLines = [];
  let listItems = [];

  const flushParagraph = (lineIndex) => {
    if (!paragraphLines.length) {
      return;
    }

    const text = paragraphLines.join(' ').trim();
    blocks.push(
      <EntryParagraph key={`${entryKey}-paragraph-${lineIndex}`}>
        {parseInlineMarkdown(text, `${entryKey}-paragraph-${lineIndex}`)}
      </EntryParagraph>
    );
    paragraphLines = [];
  };

  const flushList = (lineIndex) => {
    if (!listItems.length) {
      return;
    }

    blocks.push(
      <EntryList key={`${entryKey}-list-${lineIndex}`}>
        {listItems.map((item, itemIndex) => (
          <EntryListItem key={`${entryKey}-list-${lineIndex}-item-${itemIndex}`}>
            {parseInlineMarkdown(item, `${entryKey}-list-${lineIndex}-item-${itemIndex}`)}
          </EntryListItem>
        ))}
      </EntryList>
    );
    listItems = [];
  };

  lines.forEach((rawLine, lineIndex) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph(lineIndex);
      flushList(lineIndex);
      return;
    }

    if (line.startsWith('- ')) {
      flushParagraph(lineIndex);
      listItems.push(line.slice(2).trim());
      return;
    }

    flushList(lineIndex);

    if (line.startsWith('### ')) {
      flushParagraph(lineIndex);
      blocks.push(
        <EntryHeadingThree key={`${entryKey}-h3-${lineIndex}`}>
          {parseInlineMarkdown(line.replace(/^###\s+/, ''), `${entryKey}-h3-${lineIndex}`)}
        </EntryHeadingThree>
      );
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph(lineIndex);
      blocks.push(
        <EntryHeadingTwo key={`${entryKey}-h2-${lineIndex}`}>
          {parseInlineMarkdown(line.replace(/^##\s+/, ''), `${entryKey}-h2-${lineIndex}`)}
        </EntryHeadingTwo>
      );
      return;
    }

    if (line.startsWith('# ')) {
      flushParagraph(lineIndex);
      blocks.push(
        <EntryHeadingOne key={`${entryKey}-h1-${lineIndex}`}>
          {parseInlineMarkdown(line.replace(/^#\s+/, ''), `${entryKey}-h1-${lineIndex}`)}
        </EntryHeadingOne>
      );
      return;
    }

    paragraphLines.push(line);
  });

  flushParagraph(lines.length);
  flushList(lines.length);

  return blocks;
};

const BlogPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadEntries = async () => {
      const loadedEntries = await Promise.all(
        blogEntries.map(async (entry, index) => {
          try {
            const response = await fetch(entry.path);
            if (!response.ok) {
              throw new Error(`Failed to load ${entry.path}`);
            }

            const markdown = await response.text();
            return {
              ...entry,
              title: extractTitleFromMarkdown(markdown, index),
            };
          } catch (error) {
            return {
              ...entry,
              title: `Untitled Post ${index + 1}`,
            };
          }
        })
      );

      if (isMounted) {
        setEntries(loadedEntries);
      }
    };

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BlogWrap>
      <BlogContent>
        <SectionHeader>
          <MetaText>Blog</MetaText>
          <SectionTitle variant="h2">Writing</SectionTitle>
        </SectionHeader>

        <SubstackLine variant="body1">
          Checkout my{' '}
          <SubstackLink href="https://placeholder.substack.com" target="_blank" rel="noopener noreferrer">
            Substack
          </SubstackLink>
          .
        </SubstackLine>

        <EntryStack>
          {entries.map((entry) => (
            <EntryCardLink key={entry.slug} component={RouterLink} to={`/blog/${entry.slug}`}>
              <EntryTitle variant="h3">{entry.title}</EntryTitle>
            </EntryCardLink>
          ))}
        </EntryStack>
      </BlogContent>
    </BlogWrap>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const entry = useMemo(() => blogEntries.find((item) => item.slug === slug), [slug]);

  useEffect(() => {
    let isMounted = true;

    const loadEntry = async () => {
      if (!entry) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(entry.path);
        if (!response.ok) {
          throw new Error(`Failed to load ${entry.path}`);
        }

        const text = await response.text();
        if (isMounted) {
          setMarkdown(text);
        }
      } catch (error) {
        if (isMounted) {
          setMarkdown('');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadEntry();

    return () => {
      isMounted = false;
    };
  }, [entry]);

  if (!entry) {
    return (
      <BlogWrap>
        <BlogContent>
          <SectionHeader>
            <MetaText>Blog</MetaText>
            <SectionTitle variant="h2">Post not found</SectionTitle>
          </SectionHeader>
          <BackLink component={RouterLink} to="/blog">
            Back to blog
          </BackLink>
        </BlogContent>
      </BlogWrap>
    );
  }

  return (
    <BlogWrap>
      <BlogContent>
        <SectionHeader>
          <MetaText>Blog Post</MetaText>
          <SectionTitle variant="h2">
            {isLoading ? 'Loading...' : extractTitleFromMarkdown(markdown || '', 0)}
          </SectionTitle>
        </SectionHeader>

        <PostImage src={entry.imageUrl} alt="Blog post visual" />

        {isLoading ? (
          <LoadingText variant="body1">Loading post...</LoadingText>
        ) : (
          <PostBody>{renderMarkdown(markdown, `post-${entry.slug}`)}</PostBody>
        )}

        <BackLink component={RouterLink} to="/blog">
          Back to blog
        </BackLink>
      </BlogContent>
    </BlogWrap>
  );
};

const BlogWrap = styled(Section)(() => ({
  minHeight: 'calc(100vh - 72px)',
  overflowY: 'auto',
  position: 'relative',
}));

const BlogContent = styled(Container)(() => ({
  position: 'relative',
}));

const SubstackLine = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
}));

const SubstackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const EntryStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const EntryCardLink = styled(Link)(({ theme }) => ({
  display: 'block',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2.5),
  textDecoration: 'none',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
    borderColor: theme.palette.text.primary,
  },
}));

const EntryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h3.fontFamily,
  fontSize: '1.3rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
}));

const PostImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 320,
  objectFit: 'cover',
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(4),
}));

const PostBody = styled(Box)(() => ({
  width: '100%',
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

const BackLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  marginTop: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const EntryHeadingOne = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h2.fontFamily,
  fontSize: '2rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
}));

const EntryHeadingTwo = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h2.fontFamily,
  fontSize: '1.55rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1.25),
}));

const EntryHeadingThree = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h3.fontFamily,
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const EntryParagraph = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.9,
  marginBottom: theme.spacing(1.5),
}));

const EntryList = styled('ul')(({ theme }) => ({
  margin: theme.spacing(0, 0, 2, 0),
  paddingLeft: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const EntryListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(0.8),
  lineHeight: 1.8,
}));

const InlineStrong = styled('strong')(() => ({
  fontWeight: 700,
}));

const InlineEmphasis = styled('em')(() => ({
  fontStyle: 'italic',
}));

const InlineCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.divider,
  padding: theme.spacing(0.1, 0.7),
  fontSize: '0.9em',
}));

const InlineAnchor = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export { BlogPage, BlogPostPage };
