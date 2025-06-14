export interface Investigation {
  id: string;
  title: string;
  type: {
			id: string
			title: string
		}
}

export interface Record {
  id: string;
  title: string;
  investigations: Investigation
}

export interface Category {
  id: string;
  name: string;
  investigations: Investigation[];
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SubmissionPayload {
  investigations: string[];
  patientInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}
