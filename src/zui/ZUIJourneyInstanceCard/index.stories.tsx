import { ComponentMeta, ComponentStory } from '@storybook/react';

import mockJourneyInstance from 'utils/testing/mocks/mockJourneyInstance';
import ZUIJourneyInstanceCard from '.';

export default {
  component: ZUIJourneyInstanceCard,
  title: 'Molecules/ZUIJourneyInstanceCard',
} as ComponentMeta<typeof ZUIJourneyInstanceCard>;

const Template: ComponentStory<typeof ZUIJourneyInstanceCard> = (args) => (
  <ZUIJourneyInstanceCard instance={args.instance} orgId={1} />
);

export const open = Template.bind({});
open.args = {
  instance: mockJourneyInstance(),
};

export const closed = Template.bind({});
closed.args = {
  instance: mockJourneyInstance({
    closed: new Date().toISOString(),
  }),
};
