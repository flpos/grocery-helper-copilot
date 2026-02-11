import 'dotenv/config';

export interface IConfig {
  env: string;
  port: number;
  host: string;
  database: {
    path: string;
  };
  logging: {
    level: string;
  };
}

const config: IConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',
  database: {
    path: process.env.DATABASE_PATH || './data/grocery.db',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

export default config;
