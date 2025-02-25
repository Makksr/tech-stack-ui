import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const API = publicRuntimeConfig.REACT_APP_API
export const APP_NAME = publicRuntimeConfig.REACT_APP_APP_NAME
export const DOMAIN = publicRuntimeConfig.REACT_APP_DOMAIN
export const PRODUCTION = publicRuntimeConfig.REACT_APP_PRODUCTION
export const FB_APP_ID = publicRuntimeConfig.REACT_APP_FB_APP_ID
