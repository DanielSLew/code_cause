import { version } from 'helpers/api';

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const projectAPI = async ({ setState=() => {}, id='', params, method='GET' }) => {
  const options = { method, headers };
  if (params) options.body = JSON.stringify(params);

  const response = await fetch(`${version}/projects/${id}`, options);
  const projects = await response.json();
  
  if (projects.error) {
    return projects.error;
  } else {
    setState(projects);
  }
};

const APICall = (options) => {
  projectAPI(options);
};

export const getProjects = APICall;
export const getProject = APICall;
export const createProject = APICall;
export const updateProject = APICall;
export const deleteProject = APICall;

// export const getProject = async ({ setState, id }) => {
//   const response = await fetch(`${version}/projects/${id}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   const project = await response.json();
//   setState(project); 
// }

// export const createProject = async ({ setState, params }) => {
//   const response = await fetch(`${version}/projects/`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(params),
//   });
//   const project = await response.json();
//   setState(project); 
// }

// export const updateProject = async ({ setState, params }) => {
//   const response = await fetch(`${version}/projects/${id}`, {
//     method: 'PUT',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(params),
//   });
//   const project = await response.json();
//   setState(project); 
// }

// export const deleteProject = async ({ setState, id }) => {
//   const response = await fetch(`${version}/projects/${id}`, {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   const project = await response.json();
//   setState(project); 
// }