declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";

            API_PORT: string;
            API_LOGLEVEL:
                | "silly"
                | "debug"
                | "verbose"
                | "http"
                | "info"
                | "warn"
                | "error";
            API_CACHE_LIFETIME: string;

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
