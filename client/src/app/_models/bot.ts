export interface Bot {
    id: string;
    name: string;
    status: string;
    avatar: string;
    prefix: string;
    library?: string;
    invite?: string;
    short_desc: string;
    long_desc: string;
    support_server?: string;
    github?: string;
    website?: string;
    mod_notes?: string;
    ownerId: string;
    ownersIds: string[];
    approved?: boolean;
    verified?: boolean;
    server_count?: number;
    apiToken?: string;
}
