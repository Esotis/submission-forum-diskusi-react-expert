import { useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { registerUser } from '../states/auth/authSlice';
import {
  setSuccessMessage,
  setErrorMessage,
} from '../states/message/messageSlice';
import useInput from '../hooks/useInput';
import FormField from '../components/FormField/FormField';
import Button from '../components/Button/Button';
import { PageContainer } from '../styles/shared';
import { Form, AuthCard, AuthCardFooter } from '../styles/Form.styles';

const MIN_PASSWORD_LENGTH = 6;

function RegisterPage() {
  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.value.length < MIN_PASSWORD_LENGTH) {
      dispatch(
        setErrorMessage(`Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter.`),
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(
        registerUser({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      ).unwrap();

      dispatch(setSuccessMessage('Akun berhasil dibuat. Silakan masuk.'));
      router.push('/login');
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Daftar — Ruang Diskusi</title>
      </Head>
      <PageContainer>
        <AuthCard>
          <h1>Buat Akun</h1>
          <Form onSubmit={handleSubmit}>
            <FormField
              id="register-name"
              label="Nama Lengkap"
              value={name.value}
              onChange={name.onChange}
              placeholder="Nama Anda"
              required
            />
            <FormField
              id="register-email"
              label="Email"
              type="email"
              value={email.value}
              onChange={email.onChange}
              placeholder="nama@email.com"
              required
            />
            <FormField
              id="register-password"
              label="Kata Sandi"
              type="password"
              value={password.value}
              onChange={password.onChange}
              placeholder="Minimal 6 karakter"
              hint={`Gunakan minimal ${MIN_PASSWORD_LENGTH} karakter.`}
              required
            />
            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Daftar'}
            </Button>
          </Form>
          <AuthCardFooter>
            Sudah punya akun? <Link href="/login">Masuk di sini</Link>
          </AuthCardFooter>
        </AuthCard>
      </PageContainer>
    </>
  );
}

export default RegisterPage;
