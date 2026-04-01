export interface Employee {
  name?: string;
  email?: string;
  department?: string;
  designation?: string;
  location?: string;
  salary?: number;
  reportingManager?: string;
  reportingManagerMail?: string;
  joinedDate?: string; // e.g., '2023-01-15'
  experience?: string; // e.g., '2 yrs'
  currentlyWorking?: string; // e.g., 'yes' | 'no'
  skills?: string; // e.g., 'Java, Spring Boot'
  personalDetails?: string; // e.g., 'Enjoys hiking'
  eid?: string; // optional since not present in mock
  roles: Role
}

export enum Role {
  ADMIN = 'ADMIN',      
  MANAGER = 'MANAGER',  
  EMPLOYEE = 'EMPLOYEE'
}

export enum Permission {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  CREATE = 'CREATE',
  CREATE_EMPLOYEE = 'CREATE_EMPLOYEE',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  CREATE_USER = 'CREATE_USER',
  EDIT_USER = 'EDIT_USER',
  DELETE_USER = 'DELETE_USER',
  CREATE_ATTENDANCE = 'CREATE_ATTENDANCE',
  EDIT_ATTENDANCE = 'EDIT_ATTENDANCE',
}
