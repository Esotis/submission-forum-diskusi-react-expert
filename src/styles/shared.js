import styled from 'styled-components';

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[5]};
`;

export const Page = styled.div`
  padding: ${({ theme }) => theme.space[7]} 0 ${({ theme }) => theme.space[8]};
`;

export const PageContainer = styled(Container)`
  padding-top: ${({ theme }) => theme.space[7]};
  padding-bottom: ${({ theme }) => theme.space[8]};
`;

export const PageHeading = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 0;
  }
`;

export const TextMuted = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const DotSeparator = styled.span`
  &::before {
    content: '·';
    margin: 0 ${({ theme }) => theme.space[2]};
    color: ${({ theme }) => theme.colors.textFaint};
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default {
  Container, Page, PageContainer, PageHeading, TextMuted, DotSeparator, VisuallyHidden,
};
