import jwtDecode from 'jwt-decode';

export function parseJSON(response) {
    return response.data;
}

export function decodeToken(token) {
    return jwtDecode(token)
}

export function getRoleFromToken(token) {
    return decodeToken(token).user.role
}