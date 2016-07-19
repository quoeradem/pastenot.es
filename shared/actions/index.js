require('isomorphic-fetch');
import cookie from 'react-cookie';

import config from '../config';

/* Action Types */
export const ABOUT_NAV       = 'ABOUT_NAV';
export const COPY_PASTE      = 'COPY_PASTE';
export const GET_AUTH_TOKEN  = 'GET_AUTH_TOKEN';
export const GET_PASTE       = 'GET_PASTE';
export const GET_PASTES      = 'GET_PASTES';
export const NEW_PASTE       = 'NEW_PASTE';
export const SAVE_PASTE      = 'SAVE_PASTE';
export const SET_AUTH_CODE   = 'SET_AUTH_CODE';
export const SET_CONTENT     = 'SET_CONTENT';
export const SET_MODE        = 'SET_MODE';
export const SET_LINEC       = 'SET_LINEC';
export const SET_USER        = 'SET_USER';
export const TOGGLE_DRAWER   = 'TOGGLE_DRAWER';
export const TOGGLE_MENU     = 'TOGGLE_MENU';
export const TOGGLE_READONLY = 'TOGGLE_READONLY';
export const TOGGLE_WRAP     = 'TOGGLE_WRAP';
export const UPDATE_ROUTER   = 'UPDATE_ROUTER';
export const USER_LOGIN      = 'USER_LOGIN';
export const USER_LOGOUT     = 'USER_LOGOUT';

/* Action Creators */
export function aboutNav() { return {
    type: 'ABOUT_NAV',
    promise: fetch(`${config.url}/api/about`).then(function(response) {return response.json()})
}}

export function copyPaste() { return {
    type: 'COPY_PASTE',
}}

export function getAuthToken(code) { return {
    type: 'GET_AUTH_TOKEN',
    promise: fetch("/auth/token", {
        credentials: 'same-origin',
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({code: code})
    }).then((response) => response.json())
    .then((data) => {
        cookie.save('authtoken', data.token);
        return data.token;
    })
}}

export function getPaste(id) { return {
    type: 'GET_PASTE',
    promise: fetch(`${config.url}/api/paste/v1/${id}`).then(function(response) {return response.json()})
}}

export function getPastes() { return {
    type: 'GET_PASTES',
    promise: fetch(`${config.url}/api/paste/v1/paste/history`, {
        credentials: 'include',
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    }).then(function(response) {
        return response.json()})
}}

export function putPaste(id) { return {
    type: 'GET_PASTE',
    promise: fetch(`${config.url}/api/paste/v1/${id}`, {
        method: 'PUT',
    }).then(function(response) {return response.json()})
}}

export function newPaste() { return {
    type: 'NEW_PASTE',
}}

export function savePaste(content, language) { return {
    type: 'SAVE_PASTE',
    promise: fetch("/api/paste/v1/paste", {
        credentials: 'include',
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content, language: language })
    }).then(function(response) {return response.json()})
}}

export function setAuthCode(code) { return {
    type: 'SET_AUTH_CODE',
    code
}}

export function setContent(text) { return {
    type: 'SET_CONTENT',
    text
}}

export function setMode(mode) { return {
    type: 'SET_MODE',
    mode
}}

export function setLineCount(lc) { return {
    type: 'SET_LINEC',
    lc
}}

export function setUser(login, avatar) { return {
    type: 'SET_USER',
    login,
    avatar
}}

export function toggleDrawer() { return {
    type: 'TOGGLE_DRAWER',
}}

export function toggleMenu() { return {
    type: 'TOGGLE_MENU',
}}

export function toggleReadOnly() { return {
    type: 'TOGGLE_READONLY',
}}

export function toggleWrap() { return {
    type: 'TOGGLE_WRAP',
}}

export function updateRouter(router) {
    let location = router.pathname;
    return {
        type: 'UPDATE_ROUTER',
        location
    }
}

export function userLogin() { return {
    type: 'USER_LOGIN',
    promise: fetch(`${config.url}/auth/verify`, {
        credentials: 'include',
        method: 'GET'
    }).then((response) => {return response.json()})
}}

export function userLogout() { return {
    type: 'USER_LOGOUT'
}}