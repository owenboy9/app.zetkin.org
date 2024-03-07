import { emailCreate, emailCreated } from '../store';
import { useApiClient, useAppDispatch } from 'core/hooks';
import { ZetkinEmail, ZetkinEmailPostBody } from 'utils/types/zetkin';

export default function useCreateEmail(orgId: number) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();

  return async (body: ZetkinEmailPostBody) => {
    dispatch(emailCreate);
    const email = await apiClient.post<ZetkinEmail, ZetkinEmailPostBody>(
      `/api/orgs/${orgId}/emails`,
      body
    );
    dispatch(emailCreated(email));
    return email;
  };
}
