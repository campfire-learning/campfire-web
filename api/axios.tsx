'use client'

import axios from "axios";

const cachedUser = JSON.parse((typeof window !== 'undefined') && localStorage.getItem('user') || "null");
export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILS_BASE_URL,
  headers: { Authorization: `Bearer ${cachedUser?.access_token ?? ''}` }
})
