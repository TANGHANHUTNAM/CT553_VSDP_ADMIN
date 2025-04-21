export interface IDataFormStatsResponse {
  form_id: string;
  scope: string;
  group_by: string;
  total_responses: number;
  response_trend: IResponseTrendDay[] | IResponseTrendMonth[];
  new_responses_today: number;
  university_distribution?: IUniversityStats[];
  status_distribution: {
    SUBMITTED: number;
    CHECKED: number;
    REJECTED: number;
    PASSED: number;
    INTERVIEWING: number;
    FAILED: number;
  };
}

export interface IDataFieldBlockStatsResponse {
  form_id: string;
  stats: Record<
    string,
    {
      label: string;
      blockType: string;
      options: Record<string, number>;
    }
  >;
}

export interface IDataFieldBlockResponse {
  form_id: string;
  fields: IFieldBlock[];
}

export interface IFieldBlock {
  field_id: string;
  label: string;
  blockType: string;
  options: string[];
}

export interface IResponseTrendDay {
  date: string;
  count: number;
}

export interface IResponseTrendMonth {
  year: string;
  month: string;
  count: number;
}

export interface IUniversityStats {
  university: string;
  count: number;
}

export interface IDataFormStatsRequest {
  form_id: string;
  group_by: string;
  start: string;
  end: string;
}
