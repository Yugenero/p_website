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
import { blogEntries, extractTitleFromMarkdown } from './blogData';

const inlinePattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

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

const PostImage = styled('img')(({ theme }) => ({
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  maxHeight: 600,
  objectFit: 'cover',
  borderRadius: '10px',
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

export { BlogPostPage };
