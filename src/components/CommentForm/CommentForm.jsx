import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { createComment } from '../../states/threadDetail/threadDetailSlice';
import { selectAuthUser } from '../../states/auth/authSlice';
import useInput from '../../hooks/useInput';
import Button from '../Button/Button';
import { VisuallyHidden } from '../../styles/shared';
import {
  Form, FieldWrapper, CommentFormWrapper, CommentFormActions, CommentLoginPrompt,
} from '../../styles/Form.styles';

function CommentForm({ threadId }) {
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const content = useInput('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authUser) {
    return (
      <CommentLoginPrompt>
        <Link href="/login">Masuk</Link>
        {' '}
        terlebih dahulu untuk menulis komentar.
      </CommentLoginPrompt>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.value.trim()) return;

    setIsSubmitting(true);
    try {
      await dispatch(createComment({ threadId, content: content.value.trim() })).unwrap();
      content.reset();
    } catch (error) {
      // Pesan kegagalan sudah ditampilkan lewat message banner secara global.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommentFormWrapper>
      <Form onSubmit={handleSubmit}>
        <FieldWrapper>
          <VisuallyHidden as="label" htmlFor="comment-content">Tulis komentar</VisuallyHidden>
          <textarea
            id="comment-content"
            placeholder="Tulis komentar Anda..."
            value={content.value}
            onChange={content.onChange}
            required
          />
        </FieldWrapper>
        <CommentFormActions>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
          </Button>
        </CommentFormActions>
      </Form>
    </CommentFormWrapper>
  );
}

export default CommentForm;
