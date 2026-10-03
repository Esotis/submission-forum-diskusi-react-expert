/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchThreadDetail,
  selectThreadDetail,
  clearThreadDetail,
  voteThreadDetail,
} from '../../states/threadDetail/threadDetailSlice';
import Avatar from '../../components/Avatar/Avatar';
import VoteButton from '../../components/VoteButton/VoteButton';
import CommentItem from '../../components/CommentItem/CommentItem';
import CommentForm from '../../components/CommentForm/CommentForm';
import EmptyState from '../../components/EmptyState/EmptyState';
import Spinner from '../../components/Spinner/Spinner';
import { postedAt, formatFullDate } from '../../utils/time';
import { sanitizeHtml } from '../../utils/sanitizeHtml';
import { PageContainer, TextMuted } from '../../styles/shared';
import { CategoryBadge } from '../../components/ThreadItem/ThreadItem.styles';
import {
  ThreadDetailCard,
  Meta,
  OwnerName,
  Title,
  Body,
  CommentsSection,
  CommentListWrapper,
} from '../../styles/pages/ThreadDetailPage.styles';

function ThreadDetailPage() {
  const router = useRouter();
  const { threadId } = router.query;
  const dispatch = useDispatch();
  const threadDetail = useSelector(selectThreadDetail);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!router.isReady || !threadId) return undefined;

    async function loadDetail() {
      setStatus('loading');
      try {
        await dispatch(fetchThreadDetail(threadId)).unwrap();
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }

    loadDetail();

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, router.isReady, threadId]);

  useEffect(() => {
    if (status === 'error') {
      router.replace('/404');
    }
  }, [status, router]);

  if (status !== 'success' || !threadDetail) {
    return (
      <PageContainer>
        <Spinner label="Memuat detail thread..." />
      </PageContainer>
    );
  }

  return (
    <>
      <Head>
        <title>{threadDetail.title} — Ruang Diskusi</title>
      </Head>
      <PageContainer>
        <ThreadDetailCard>
          <Meta>
            <Avatar
              name={threadDetail.owner?.name}
              src={threadDetail.owner?.avatar}
            />
            <div>
              <OwnerName>{threadDetail.owner?.name}</OwnerName>
              <TextMuted
                as="time"
                dateTime={threadDetail.createdAt}
                title={formatFullDate(threadDetail.createdAt)}
              >
                {postedAt(threadDetail.createdAt)}
              </TextMuted>
            </div>
            {threadDetail.category && (
              <CategoryBadge>#{threadDetail.category}</CategoryBadge>
            )}
          </Meta>

          <Title>{threadDetail.title}</Title>

          <Body
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(threadDetail.body),
            }}
          />

          <VoteButton
            upVotesBy={threadDetail.upVotesBy}
            downVotesBy={threadDetail.downVotesBy}
            onVote={(voteType) =>
              dispatch(voteThreadDetail({ threadId, voteType }))
            }
          />
        </ThreadDetailCard>

        <CommentsSection>
          <h2>{threadDetail.comments.length} Komentar</h2>

          <CommentForm threadId={threadId} />

          {threadDetail.comments.length === 0 ? (
            <EmptyState
              title="Belum ada komentar"
              description="Jadilah orang pertama yang berkomentar pada thread ini."
            />
          ) : (
            <CommentListWrapper>
              {threadDetail.comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  threadId={threadId}
                />
              ))}
            </CommentListWrapper>
          )}
        </CommentsSection>
      </PageContainer>
    </>
  );
}

export default ThreadDetailPage;
