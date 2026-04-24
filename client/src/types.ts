export interface User {
  _id: string;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Job {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: 'full-time' | 'part-time' | 'internship';
  jobStatus: 'pending' | 'interview' | 'declined';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface JobsResponse {
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  currentPage: number;
}

export interface DefaultStats {
  pending: number;
  interview: number;
  declined: number;
}

export interface MonthlyApplication {
  date: string;
  count: number;
}

export interface StatsResponse {
  defaultStats: DefaultStats;
  monthlyApplications: MonthlyApplication[];
}

export interface SearchValues {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
  page?: string;
}

export interface DashboardOutletContext {
  user: User;
}
