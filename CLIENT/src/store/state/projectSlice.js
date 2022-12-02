import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addAllProjects: (state, action) => {
      state.value = action.payload;
    },
    addProject: (state, action) => {
      state.value.push(action.payload);
    },
    updateProject: (state, action) => {
      state.value = state.value.map((project) => {
        if (project.id === action.payload.id) {
          return {
            ...project,
            ...action.payload,
          };
        } else {
          return {
            ...project
          };
        }
      });
    },
    updateFabricProject: (state, action) => {
      state.value = state.value.map((project) => {
        if (project.id === action.payload.id) {
          return {
            ...project,
            ...action.payload,
          };
        } else {
          return {
            ...project
          }
        }
      }

      );
    },
    addFabricProject: (state, action) => {
      state.value.push(action.payload);
    },
    updateHaberdasheryProject: (state, action) => {
      state.value = state.value.map((project) => {
        if (project.id === action.payload.id) {
          return {
            ...project,
            ...action.payload,
          };
        } else {
          return {
            ...project
          }
        }
      }

      );
    },
    addHaberdasheryProject: (state, action) => {
      state.value.push(action.payload);
    },
    updatePatternProject: (state, action) => {
      state.value = state.value.map((project) => {
        if (project.id === action.payload.id) {
          return {
            ...project,
            ...action.payload,
          };
        } else {
          return {
            ...project
          }
        }
      }

      );
    },
    addPatternProject: (state, action) => {
      state.value.push(action.payload);
    },
    deleteProject: (state, action) => {
      state.value = state.value.filter((project) => {
        return project.id !== action.payload;
      });
    },
    projectsDefaultState: (state) => {
      state = initialState;
    }
  },
});

export const {
  addAllProjects,
  addProject,
  updateProject,
  updateFabricProject,
  addFabricProject,
  updateHaberdasheryProject,
  addHaberdasheryProject,
  updatePatternProject,
  addPatternProject,
  deleteProject,
  projectsDefaultState,
} = projectSlice.actions;

export default projectSlice.reducer;
