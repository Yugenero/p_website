import { ReactTyped } from 'react-typed';
import { styled } from '@mui/material/styles';
import { MetaText } from './primitives';

const TypedBinarySlot = styled('span')(({ theme }) => ({
  display: 'inline-block',
  minWidth: '6ch',
  '& .typed-cursor': {
    color: theme.palette.text.secondary,
  },
}));

const BinaryMetaText = ({ value }) => {
  return (
    <MetaText component="div">
      <TypedBinarySlot aria-label={value}>
        <ReactTyped
          strings={[value]}
          typeSpeed={60}
          startDelay={120}
          backSpeed={0}
          backDelay={0}
          cursorChar="|"
          loop={false}
          smartBackspace={false}
        />
      </TypedBinarySlot>
    </MetaText>
  );
};

export { BinaryMetaText };
