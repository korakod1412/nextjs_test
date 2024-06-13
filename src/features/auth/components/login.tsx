import { type LoginInput } from "../types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
//import { useAppStore } from '~/features/store';
import AuthForm from "./authForm";

const Login = () => {
  const router = useRouter();
  // const setUiToast = useAppStore((state) => state.setUiToast);

  const submit = async (credentials: LoginInput) => {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.ok) return router.replace("/manageuser");
    if (result?.error) {
      alert("login failed");
      //  setUiToast({ type: 'Error', message: 'Invalid LoginInput' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <AuthForm kind="login" onSubmit={submit}></AuthForm>;
};

export default Login;
