/* 
    Copyright (C) 2021  
    Author: Aditya Pant
    Email: aditya.java6@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import React from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';

import '../theme/toastifyStyle.css';

const ToastMsg = (props) => {
    const stringify = (props.isJson || _.isPlainObject(props.body));

    return (
        <div>
            <div className="toastHeader">{props.header}</div>
            {
                stringify 
                    ? <pre>{JSON.stringify(props.body, null, 2)}</pre>
                    : <p>{props.body}</p>
            }
        </div>
    );
};

const defaultOptions = {
    type: toast.TYPE.DEFAULT
};

let defaultObject = {
    options: defaultOptions,
    header: 'Hello',
    body: 'World',
    isJson: false
};

export const showToastByObj = (obj = defaultObject) => {
    toast(
        <ToastMsg header={obj.header} body={obj.body} isJson={obj.isJson} />, 
        obj.options
    );
};

const showToastByType = (toastType = toast.TYPE.DEFAULT, heading = '', msg = '', isJson = false) => {
    defaultOptions['type'] = toastType;
    showToastByObj({
        options: defaultOptions,
        header: heading,
        body: msg,
        isJson: isJson
    });

};

export const showToastByOptions = (header = '', body = '', 
                        isJson= false, options = defaultOptions) => {
    toast(
        <ToastMsg header={header} body={body} isJson={isJson} />, 
        options
    );
};

export const defaultToast = (heading='', msg='', isJson=false) => {
    showToastByType(toast.TYPE.DEFAULT, heading, msg, isJson);
};

export const successToast = (heading='', msg='', isJson=false) => {
    showToastByType(toast.TYPE.SUCCESS, heading, msg, isJson);
};

export const infoToast = (heading='', msg='', isJson=false) => {
    showToastByType(toast.TYPE.INFO, heading, msg, isJson);
};

export const warnToast = (heading='', msg='', isJson=false) => {
    showToastByType(toast.TYPE.WARNING, heading, msg, isJson);
};

export const errorToast = (heading='', msg='', isJson=false) => {
    showToastByType(toast.TYPE.ERROR, heading, msg, isJson);
};

export const darkToast = (heading='', msg='', isJson=false) => {
    showToastByType(toast.TYPE.DARK, heading, msg, isJson);
};