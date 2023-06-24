'use client'
import { signIn } from "next-auth/react";
import { fetcher } from "@/utils/fetchData";
import { getError } from "@/utils/error";

interface SignUpData {
    email: string;
    password: string;
}

export const handleSignIn = async ({ email, password }: SignUpData) => {
    try {
        await signIn('credentials', {
            redirect: true,
            email,
            password,
            callbackUrl: '/'
        });
    } catch (error) {

    }
};


/************ */


interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginRequest {
    name: string;
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export async function handleSignUp(data: SignUpData) {
    if (data.password === data.confirmPassword) {
        const request: LoginRequest = {
            name: data.name,
            email: data.email,
            password: data.password,
        };
        try {
            const response: LoginResponse = await fetcher<LoginRequest, LoginResponse>(
                '/api/auth/register',
                'POST',
                request
            );

        } catch (error) {

        }
    }
}