declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;

            API_PORT: string;
            API_LOGLEVEL: string;
            API_CACHE_LIFETIME: number;

            TYPEORM_CONNECTION: string;
            TYPEORM_HOST: string;
            TYPEORM_USERNAME: string;
            TYPEORM_PASSWORD: string;
            TYPEORM_DATABASE: string;
            TYPEORM_PORT: string;
            TYPEORM_SYNCHRONIZE: string;
            TYPEORM_LOGGING: string;
            TYPEORM_ENTITIES: string;
        }
    }
}

export {};
