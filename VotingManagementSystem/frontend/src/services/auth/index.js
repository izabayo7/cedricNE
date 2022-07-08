import axios from 'axios';
import API_URL from '../../config/api-url';
import * as SecureStorage from 'expo-secure-store'

export const register = async (data) => {
    return axios.post(API_URL+'/users', data)
    .then((res) => {
        return {...res?.data,success: true}
    })
    .catch((err) => {
        return err?.response?.data;
    }
    )
    
}

export const createCandidate = async (data) => {
    return axios.post(API_URL+'/candidates', data, {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return {...res?.data,success: true}
    })
    .catch((err) => {
        return err?.response?.data;
    }
    )
    
}

export const createVote = async (data) => {
    return axios.post(API_URL+'/votes', data, {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return {...res?.data,success: true}
    })
    .catch((err) => {
        return err?.response?.data;
    }
    )
    
}

export const login = async (data) => {
    return axios.post(API_URL+'/users/login', data)
    .then((res) => {
        return res?.data
    })
    .catch((err) => {
        return err?.response?.data;
    }
    )
    
}

export const getProfile = async () => {
    return axios.get(API_URL+'/users/current', {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}

export const getCandidates = async () => {
    return axios.get(API_URL+'/candidates', {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}


const _getToken = async () => {
    return await SecureStorage.getItemAsync('token');
}

