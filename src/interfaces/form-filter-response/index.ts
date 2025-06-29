export interface IDataFormFilterResponse {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  snapshot_version: string;
  created_at: string;
  form_id: string;
  status: string;
  university_id: number;
  final_scores: string[] | [];
  total_final_score: number | null;
  updated_at: string;
  notes: string | null;
  rejected_reason: string | null;
  university: {
    name: string;
  };
}
