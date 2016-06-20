require('isomorphic-fetch');
import config from '../config';

/* Action Types */
export const ABOUT_NAV       = 'ABOUT_NAV';
export const COPY_PASTE      = 'COPY_PASTE';
export const GET_PASTE       = 'GET_PASTE';
export const NEW_PASTE       = 'NEW_PASTE';
export const SAVE_PASTE      = 'SAVE_PASTE';
export const SET_CONTENT     = 'SET_CONTENT';
export const SET_MODE        = 'SET_MODE';
export const SET_LINEC       = 'SET_LINEC';
export const TOGGLE_READONLY = 'TOGGLE_READONLY';
export const UPDATE_ROUTER   = 'UPDATE_ROUTER';
export const VIEW_TEXT       = 'VIEW_TEXT';

/* Action Creators */
export function aboutNav() { return {
    type: 'ABOUT_NAV',
    promise: fetch(`${config.url}/api/about`).then(function(response) {return response.json()})
}}

export function copyPaste() { return {
    type: 'COPY_PASTE',
}}

export function getPaste(id) { return {
    type: 'GET_PASTE',
    promise: fetch(`${config.url}/api/paste/v1/${id}`).then(function(response) {return response.json()})
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
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content, language: language })
    }).then(function(response) {return response.json()})
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

export function toggleReadOnly() { return {
    type: 'TOGGLE_READONLY',
}}

export function updateRouter(router) {
    let location = router.pathname;
    return {
        type: 'UPDATE_ROUTER',
        location
    }
}

export function viewText() { return {
    type: 'VIEW_TEXT',
}}