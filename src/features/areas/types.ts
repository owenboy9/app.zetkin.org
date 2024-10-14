import { ZetkinPerson, ZetkinTag } from 'utils/types/zetkin';

export type ZetkinCanvassAssignmentStats = {
  metrics: {
    metric: ZetkinCanvassAssignment['metrics'][0];
    values: number[];
  }[];
  num_areas: number;
  num_households: number;
  num_places: number;
  num_successful_visited_households: number;
  num_visited_areas: number;
  num_visited_households: number;
  num_visited_households_outside_areas: number;
  num_visited_places: number;
  num_visited_places_outside_areas: number;
};

export type PointData = [number, number];

export type Visit = {
  canvassAssId: string | null;
  id: string;
  noteToOfficial: string | null;
  responses: {
    metricId: string;
    response: string;
  }[];
  timestamp: string;
};

export type Household = {
  id: string;
  title: string;
  visits: Visit[];
};

export type ZetkinArea = {
  description: string | null;
  id: string;
  organization: {
    id: number;
  };
  points: PointData[];
  tags: ZetkinTag[];
  title: string | null;
};

export type ZetkinPlace = {
  description: string | null;
  households: Household[];
  id: string;
  orgId: number;
  position: { lat: number; lng: number };
  title: string | null;
  type: 'address' | 'misc';
};

export type ZetkinMetric = {
  definesDone: boolean;
  description: string;
  id: string;
  kind: 'boolean' | 'scale5';
  question: string;
};

export type ZetkinCanvassAssignment = {
  campaign: {
    id: number;
  };
  id: string;
  metrics: ZetkinMetric[];
  organization: {
    id: number;
  };
  title: string | null;
};

export type ZetkinCanvassSession = {
  area: ZetkinArea;
  assignee: ZetkinPerson;
  assignment: {
    id: string;
    title: string | null;
  };
};

export type ZetkinCanvassSessionPostBody = {
  areaId: string;
  personId: number;
};

export type ZetkinAreaPostBody = Partial<Omit<ZetkinArea, 'id'>>;
export type ZetkinPlacePostBody = Partial<
  Omit<ZetkinPlace, 'id' | 'households'>
>;

export type ZetkinPlacePatchBody = Partial<
  Omit<ZetkinPlace, 'id' | 'households'>
> & {
  households?: Partial<Omit<Household, 'id' | 'visits'>> &
    { visits?: Partial<Omit<Visit, 'id'>>[] }[];
};
export type ZetkinCanvassAssignmentPostBody = Partial<
  Omit<ZetkinCanvassAssignment, 'id' | 'campaign' | 'organization' | 'metrics'>
> & {
  campaign_id: number;
  metrics: Omit<ZetkinMetric, 'id'>[];
};
export type ZetkinCanvassAssignmentPatchbody = Partial<
  Omit<ZetkinCanvassAssignment, 'id'>
>;

export type ZetkinCanvassAssignee = {
  canvassAssId: string;
  id: number;
};
export type ZetkinCanvassAssigneePatchBody = Partial<ZetkinCanvassAssignee>;

export type HouseholdPatchBody = Partial<Omit<Household, 'id'>>;
