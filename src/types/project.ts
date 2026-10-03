export interface ProjectDto {
    id: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: string
}

export interface CreateProjectRequest {
    name: string
    description: string | null
}

export interface UpdateProjectRequest {
    name: string
    description: string | null
    isActive: boolean
}