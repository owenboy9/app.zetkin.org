import copyEmail from '../rpc/copyEmail';
import { emailCreate, emailCreated, emailUpdate, emailUpdated } from '../store';
import { useApiClient, useAppDispatch } from 'core/hooks';

export default function useDuplicateEmail(orgId: number, emailId: number) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();

  return async () => {
    dispatch(emailCreate);
    const duplicatedEmail = await apiClient.rpc(copyEmail, {
      emailId,
      orgId,
    });
    dispatch(emailUpdate([duplicatedEmail.id, ['target']]));
    dispatch(emailCreated(duplicatedEmail));
    dispatch(
      emailUpdated([
        {
          ...duplicatedEmail,
          target: duplicatedEmail.target,
        },
        ['target'],
      ])
    );
  };
}
