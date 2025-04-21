export interface IFormResponseAssignmentWithReviewer {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  status: string;
  updated_at: string;
  university: string;
  assignedReviewers: IReviewer[] | [];
}

export interface IReviewer {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  role: string;
  description: string;
  avatar_url: string;
}

export interface IDataFormResponseAssignmentWithReviewer {
  responses: IFormResponseAssignmentWithReviewer[];
  total: number;
  current: number;
  pageSize: number;
}

export interface IDetailsReviewer {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  school: string | null;
  company: string | null;
  created_at: string;
  generation: string | null;
  major: string | null;
  job_title: string | null;
  is_external_guest: boolean;
  gender: string | null;
  end_date: string | null;
  start_date: string | null;
  role: {
    name: string;
    description: string;
    created_at: string;
  };
}
