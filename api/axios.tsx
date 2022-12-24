'use client'

import axios from "axios";

const cachedUser = JSON.parse((typeof window !== 'undefined') && localStorage.getItem('user') || "null");

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Authorization: `Bearer ${cachedUser?.access_token ?? ''}` }
})
