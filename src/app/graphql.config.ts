import { HttpLink } from "apollo-angular/http";
import { setContext } from '@apollo/client/link/context';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
// @ts-ignore
import extractFiles from 'extract-files/extractFiles.mjs';
// @ts-ignore
import isExtractableFile from 'extract-files/isExtractableFile.mjs';

export const myUrl = 'http://127.0.0.1:8000/graphql';

export function createApollo(httpLink: HttpLink) {
    const basic = setContext((operation, context) => ({
        headers: {
            Accept: 'charset=utf-8',
        },
    }));

    const auth = setContext((operation, context) => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            return {};
        } else {
            return {
                headers: {
                    ...context['headers'],
                    authorization: token ? `Bearer ${token}` : "",
                }
            }
        }
    });
    const link = ApolloLink.from([basic, auth, httpLink.create({ uri: myUrl, useMultipart: true, extractFiles: (body) => extractFiles(body, isExtractableFile) })]);

    const cache = new InMemoryCache();

    return {
        link,
        cache,
    };
}