
export interface Employee {
  name?: string;
  email?: string;
  department?: string;
  designation?: string;
  location?: string;
  salary?:number
  reportingManager?: string;
  reportingManagerMail?: string;
  joinedDate?: string;        // e.g., '2023-01-15'
  experience?: string;        // e.g., '2 yrs'
  currentlyWorking?: string;  // e.g., 'yes' | 'no'
  skills?: string;            // e.g., 'Java, Spring Boot'
  personalDetails?: string;   // e.g., 'Enjoys hiking'
  eid?: string;              // optional since not present in mock
}
