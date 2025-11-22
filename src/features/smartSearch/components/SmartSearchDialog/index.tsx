import { Dialog, DialogContent } from '@mui/material';

import SmartSearch from './SmartSearch';
import { ZetkinQuery, ZetkinSmartSearchFilter } from 'utils/types/zetkin';

export interface SmartSearchDialogProps {
  initialDialogState?: 'preview' | 'edit' | 'gallery' | 'start_with';
  initialFilterSpec?: ZetkinSmartSearchFilter[];
  onDialogClose: () => void;
  onSave: (query: Pick<ZetkinQuery, 'filter_spec'>) => void;
  query?: ZetkinQuery | null;
  readOnly?: boolean;
}

const SmartSearchDialog = ({
  initialFilterSpec,
  onDialogClose,
  onSave,
  query,
  readOnly,
}: SmartSearchDialogProps): JSX.Element => {
  return (
    <Dialog fullWidth maxWidth="xl" onClose={onDialogClose} open>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '85vh',
        }}
      >
        <SmartSearch
          initialFilterSpec={initialFilterSpec}
          onDialogClose={onDialogClose}
          onSave={onSave}
          query={query}
          readOnly={readOnly}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SmartSearchDialog;
