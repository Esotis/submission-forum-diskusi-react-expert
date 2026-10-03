import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { createThread } from '../../states/threads/threadsSlice';
import { setErrorMessage } from '../../states/message/messageSlice';
import useInput from '../../hooks/useInput';
import FormField from '../FormField/FormField';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import Button from '../Button/Button';
import { Form, FieldWrapper } from '../../styles/Form.styles';

function ThreadForm() {
  const title = useInput('');
  const category = useInput('');
  const bodyRef = useRef('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleBodyChange = useCallback((html) => {
    bodyRef.current = html;
  }, []);

  const isBodyEmpty = (html) => html.replace(/<[^>]+>/g, '').trim().length === 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isBodyEmpty(bodyRef.current)) {
      dispatch(setErrorMessage('Isi thread tidak boleh kosong.'));
      return;
    }

    setIsSubmitting(true);

    try {
      const thread = await dispatch(createThread({
        title: title.value.trim(),
        body: bodyRef.current,
        category: category.value.trim(),
      })).unwrap();

      router.push(`/threads/${thread.id}`);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        id="thread-title"
        label="Judul Thread"
        value={title.value}
        onChange={title.onChange}
        placeholder="Judul diskusi yang menarik"
        required
      />
      <FormField
        id="thread-category"
        label="Kategori"
        value={category.value}
        onChange={category.onChange}
        placeholder="mis. React, Redux, Umum"
        hint="Opsional — bantu pengguna lain menemukan thread ini."
      />
      <FieldWrapper>
        <span id="thread-body-label">Isi Thread</span>
        <RichTextEditor
          initialValue=""
          onChange={handleBodyChange}
          placeholder="Tuliskan detail diskusi Anda di sini..."
          ariaLabelledBy="thread-body-label"
        />
      </FieldWrapper>
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Thread'}
      </Button>
    </Form>
  );
}

export default ThreadForm;
