import api from './api'
import type { ProjectDto } from '../types/project'

export const projectService = {
    getAll: async (): Promise<ProjectDto[]> => {
        const { data } = await api.get<ProjectDto[]>('/Projects')
        return data
    },
}