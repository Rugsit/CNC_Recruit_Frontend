import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' { 
    interface Session extends DefaultSession { 
        backendToken: string;
        user: {
            id: string,
        } & DefaultSession['user'];
    }
}
declare module 'next-auth/jwt' { 
    interface JWT {
        backendToken?: string;
        id?: string;
    }
}