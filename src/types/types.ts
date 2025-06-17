export interface Job {
  job_id: string;
  location: string;
  job_title: string;
  min_salary: number;
  max_salary: number;
  median_salary: number;
  min_base_salary: number;
  max_base_salary: number;
  median_base_salary: number;
  min_additional_pay: number;
  max_additional_pay: number;
  median_additional_pay: number;
  salary_period: string;
  salary_currency: string;
  salary_count: number;
  salaries_updated_at: string;
  publisher_name: string;
  publisher_link: string;
  confidence: string;
}

export interface JobDetailsParameters {
  job_id: string;
  country: string;
  language: string;
}

export interface JobApplyOption {
  publisher: string;
  apply_link: string;
  is_direct: boolean;
}

export interface JobHighlights {
  Qualifications?: string[];
  Responsibilities?: string[];
  [key: string]: string[] | undefined;
}

export interface JobDetails {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  job_publisher: string;
  job_employment_type: string;
  job_employment_types: string[];
  job_apply_link: string;
  job_apply_is_direct: boolean;
  apply_options: JobApplyOption[];
  job_description: string;
  job_is_remote: boolean | null;
  job_posted_at: string;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_location: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string[] | null;
  job_google_link: string;
  job_salary: string | null;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_period: string | null;
  job_highlights: JobHighlights;
  job_onet_soc: string;
  job_onet_job_zone: string;
}

export interface JobDetailsResponse {
  status: string;
  request_id: string;
  parameters: JobDetailsParameters;
  data: JobDetails[];
}

