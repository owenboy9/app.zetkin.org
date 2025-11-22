import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';

import { MUIOnlyPersonSelect as PersonSelect } from 'zui/ZUIPersonSelect';
import UseViewDataTableMutations from '../hooks/useViewDataTableMutations';
import ViewSmartSearchDialog from './ViewSmartSearchDialog';
import { ZetkinView } from 'features/views/components/types';
import { Msg, useMessages } from 'core/i18n';
import messageIds from '../l10n/messageIds';
import zuiMessageIds from 'zui/l10n/messageIds';
import {
  FILTER_TYPE,
  OPERATION,
  ZetkinSmartSearchFilter,
} from 'features/smartSearch/components/types';

export interface EmptyViewProps {
  orgId: number;
  view: ZetkinView;
}

const EmptyView: FunctionComponent<EmptyViewProps> = ({ orgId, view }) => {
  const [queryDialogOpen, setQueryDialogOpen] = useState(false);
  const messages = useMessages(zuiMessageIds);

  const { addPerson, deleteContentQuery } = UseViewDataTableMutations(
    orgId,
    view.id
  );

  const [initialFilterSpec, setInitialFilterSpec] =
    useState<ZetkinSmartSearchFilter[]>();
  return (
    <Box m={2}>
      <Grid container spacing={2}>
        <Grid size={{ md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                <Msg id={messageIds.empty.static.headline} />
              </Typography>
              <Typography variant="body1">
                <Msg id={messageIds.empty.static.description} />
              </Typography>
              <Box marginTop={2}>
                <PersonSelect
                  createPersonLabels={{
                    submitLabel: messages.createPerson.submitLabel.add(),
                    title: messages.createPerson.title.addToList({
                      list: view.title,
                    }),
                  }}
                  name="person"
                  onChange={async (person) => {
                    await deleteContentQuery();
                    await addPerson(person.id);
                  }}
                  selectedPerson={null}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                <Msg id={messageIds.empty.dynamic.headline} />
              </Typography>
              <Typography variant="body1">
                <Msg id={messageIds.empty.dynamic.description} />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                data-testid="EmptyView-configureButton"
                onClick={() => {
                  setInitialFilterSpec(undefined);
                  setQueryDialogOpen(true);
                }}
              >
                <Msg id={messageIds.empty.dynamic.configureButton} />
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid size={{ md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                <Msg id={messageIds.empty.newPeople.headline} />
              </Typography>
              <Typography variant="body1">
                <Msg id={messageIds.empty.newPeople.description} />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                data-testid="EmptyView-configureButton"
                onClick={() => {
                  setInitialFilterSpec([
                    {
                      config: {
                        after: '-30d',
                        field: 'extra_date',
                      },
                      op: 'add' as OPERATION,
                      type: 'person_field' as FILTER_TYPE,
                    },
                  ]);
                  setQueryDialogOpen(true);
                }}
              >
                <Msg id={messageIds.empty.newPeople.configureButton} />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {queryDialogOpen && (
        <ViewSmartSearchDialog
          initialDialogState="edit"
          initialFilterSpec={initialFilterSpec}
          onDialogClose={() => setQueryDialogOpen(false)}
          orgId={orgId}
          view={view}
        />
      )}
    </Box>
  );
};

export default EmptyView;
