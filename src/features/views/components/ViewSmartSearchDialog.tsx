import { FunctionComponent } from 'react';

import useViewDataTableMutations from '../hooks/useViewDataTableMutations';
import { ZetkinView } from 'features/views/components/types';
import SmartSearchDialog, {
  SmartSearchDialogProps,
} from 'features/smartSearch/components/SmartSearchDialog';
import { ZetkinSmartSearchFilter } from 'features/smartSearch/components/types';

interface ViewSmartSearchDialogProps {
  initialDialogState?: 'preview' | 'edit' | 'gallery' | 'start_with';
  initialFilterSpec?: ZetkinSmartSearchFilter[];
  onDialogClose: SmartSearchDialogProps['onDialogClose'];
  orgId: number;
  view: ZetkinView;
}

const ViewSmartSearchDialog: FunctionComponent<ViewSmartSearchDialogProps> = ({
  initialDialogState,
  initialFilterSpec,
  orgId,
  view,
  onDialogClose,
}) => {
  const { updateContentQuery } = useViewDataTableMutations(orgId, view.id);

  return (
    <SmartSearchDialog
      initialDialogState={initialDialogState}
      initialFilterSpec={initialFilterSpec}
      onDialogClose={onDialogClose}
      onSave={(query) => {
        updateContentQuery(query);
        onDialogClose();
      }}
      query={view.content_query}
    />
  );
};

export default ViewSmartSearchDialog;
