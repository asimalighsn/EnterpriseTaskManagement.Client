import api from './api'
import type { ProjectDto, CreateProjectRequest, UpdateProjectRequest } from '../types/project'

export const projectService = {
    getAll: async (): Promise<ProjectDto[]> => {
        const { data } = await api.get<ProjectDto[]>('/projects')
        return data
    },

    getById: async (id: string): Promise<ProjectDto> => {
        const { data } = await api.get<ProjectDto>(`/projects/${id}`)
        return data
    },

    create: async (payload: CreateProjectRequest): Promise<ProjectDto> => {
        const { data } = await api.post<ProjectDto>('/projects', payload)
        return data
    },

    update: async (id: string, payload: UpdateProjectRequest): Promise<ProjectDto> => {
        const { data } = await api.put<ProjectDto>(`/projects/${id}`, payload)
        return data
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/projects/${id}`)
    },
}