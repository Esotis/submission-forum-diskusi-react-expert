import { useState } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginUser } from '../states/auth/authSlice';
import useInput from '../hooks/useInput';
import FormField from '../components/FormField/FormField';
import Button from '../components/Button/Button';
import { PageContainer } from '../styles/shared';
import { Form, AuthCard, AuthCardFooter } from '../styles/Form.styles';

function LoginPage() {
  const email = useInput('');
  const password = useInput('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(loginUser({ email: email.value, password: password.value })).unwrap();
      router.push('/');
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Masuk — Ruang Diskusi</title>
      </Head>
      <PageContainer>
        <AuthCard>
          <h1>Masuk</h1>
          <Form onSubmit={handleSubmit}>
            <FormField
              id="login-email"
              label="Email"
              type="email"
              value={email.value}
              onChange={email.onChange}
              placeholder="nama@email.com"
              required
            />
            <FormField
              id="login-password"
              label="Kata Sandi"
              type="password"
              value={password.value}
              onChange={password.onChange}
              placeholder="Masukkan kata sandi"
              required
            />
            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Masuk'}
            </Button>
          </Form>
          <AuthCardFooter>
            Belum punya akun?
            {' '}
            <Link href="/register">Daftar di sini</Link>
          </AuthCardFooter>
        </AuthCard>
      </PageContainer>
    </>
  );
}

export default LoginPage;
