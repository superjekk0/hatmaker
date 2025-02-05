import {jwtDecode} from 'jwt-decode';
import {InformationsConnexion} from "./Interface.ts";
import {RoutesBE} from "./Routes.ts";

interface DecodedToken {
    authorities: [
        {
            authority: string;
        }
    ];
    id: number;
    exp: number;
    iat: number;
    sub: string;
}

export const TOKEN_KEY = 'token';

export const isTokenPresent = (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const getDecodedToken = (): DecodedToken | null => {
    const rawToken = getToken();
    if (!rawToken) {
        return null;
    }
    return jwtDecode<DecodedToken>(rawToken);
};

export const isTokenExpired = (): boolean => {
    const token = getDecodedToken();
    if (!token) {
        return false
    }
    return token.exp < (new Date().getTime() + 1) / 1000;
}

export const isResponsable = (): boolean => {
    try {
        const decodedToken: DecodedToken | null = getDecodedToken();
        if (!decodedToken) {
            return false;
        }
        return decodedToken.authorities[0].authority === 'RESPONSABLE';
    } catch (error) {
        console.error('Failed to decode token', error);
        return false;
    }
};

export const getId = (): number | null => {
    const token = getToken();
    if (!token) {
        return null;
    }

    try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.id;
    } catch (error) {
        console.error('Failed to decode token', error);
        return null;
    }
}

export const connexion = async (infosConnexion: InformationsConnexion) => {
    const res = await fetch(RoutesBE.Connexion, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(infosConnexion),
    });
    if (!res.ok) {
        if (res.status >= 500) {
            throw "eServeur";
        }
        throw "eConnexion";
    } else {
        const data = await res.json()
        setToken(data.accessToken)
    }
}
