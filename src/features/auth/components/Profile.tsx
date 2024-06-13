import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { getImagePath } from '~/features/shared/helpers/upload';
import { useAppStore } from '~/features/store';
import AvatarUploader from '~/features/ui/components/AvatarUploader';
import Button from '~/features/ui/components/Button';
import FormField from '~/features/ui/components/form/FormField';
import { api } from '~/utils/api';
import * as validators from '../helpers/validators';
import useAuthenticatedSession from '../hooks/useAuthenticatedSession';
import { type ProfileInput } from '../types';

export function Profile() {
  const router = useRouter();
  const { data: session, update: updateSession } = useAuthenticatedSession();
  const setUiToast = useAppStore((state) => state.setUiToast);
  const { mutateAsync: update } = api.auth.update.useMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileInput>({
    mode: 'onBlur',
    resolver: zodResolver(validators.profile),
    defaultValues: { image: undefined },
  });

  const updateProfile: SubmitHandler<ProfileInput> = async (profile) => {
    await update({ id: +session.user.id, ...profile });

    if (profile.image) {
      await updateSession(profile);
    }
    setUiToast({
      type: 'Success',
      message: 'Your profile has already updated.',
    });
    void router.push('/');
  };

  useEffect(() => {
    if (session.user.name) setValue('name', session.user.name);
    if (session.user.email) setValue('email', session.user.email);
  }, [session.user.email, session.user.name, setValue]);

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="center mx-auto py-3">
          <AvatarUploader
            defaultImage={
              session.user.image
                ? getImagePath(session.user.image)
                : '/assets/images/avatar.png'
            }
            onImageChanged={(image) => {
              setValue('image', image, { shouldValidate: true });
            }}
            error={errors.image?.message}
          ></AvatarUploader>
        </div>
        <FormField
          id="name"
          label="name"
          placeholder="Your awesome name"
          error={errors.name?.message}
          {...register('name')}
        ></FormField>
        <FormField
          id="email"
          type="email"
          label="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email')}
        ></FormField>
        <FormField
          id="password"
          type="password"
          label="password"
          placeholder="your-password-8-chars-at-least"
          error={errors.password?.message}
          {...register('password')}
        ></FormField>
        <Button type="submit" align="center">
          Update Profile
        </Button>
      </form>
    </div>
  );
}

export default Profile;
