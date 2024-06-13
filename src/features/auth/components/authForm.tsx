import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterInput, type LoginInput } from "../types";
import Link from "next/link";
import Button from "~/features/ui/components/Button";
import InputMain from "~/features/ui/components/form/InputNormal";
import * as validators from "../helpers/validators";
import { capitalize } from "lodash";

export type AuthFormProps =
  | {
      kind: "register";
      onSubmit: SubmitHandler<RegisterInput>;
    }
  | {
      kind: "login";
      onSubmit: SubmitHandler<LoginInput>;
    };

const AuthForm = ({ kind, onSubmit }: AuthFormProps) => {
  const isRegisterForm = kind === "register";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    typeof onSubmit extends SubmitHandler<RegisterInput>
      ? RegisterInput
      : LoginInput
  >({
    resolver: zodResolver(
      kind === "register" ? validators.register : validators.login,
    ),
  });

  return (
    <form className="mx-auto max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-4 text-center text-2xl text-primary-500">
        {capitalize(kind)}
      </h2>
      {isRegisterForm && (
        <InputMain
          id="name"
          label="name"
          placeholder="Your  name"
          error={errors.name?.message}
          {...register("name")}
        ></InputMain>
      )}
      <InputMain
        id="email"
        type="email"
        label="email"
        placeholder="your@email.com"
        error={errors.email?.message}
        {...register("email")}
      ></InputMain>
      <InputMain
        id="password"
        type="password"
        label="password"
        placeholder="your-password"
        error={errors.password?.message}
        {...register("password")}
      ></InputMain>
      <div className="flex items-center justify-between">
        <Button type="submit" color="danger">
          {kind}
        </Button>
        <Link
          href={isRegisterForm ? "/auth/signin" : "/auth/signup"}
          className="inline-block align-baseline text-sm font-bold text-gray-500 hover:text-gray-900"
        >
          {isRegisterForm
            ? "Already have an account?"
            : "Do not have an account yet?"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
