import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, map } from 'rxjs';
// @ts-ignore
// import isExtractableFile from 'extract-files/isExtractableFile.mjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) { }

  private cartCount = new BehaviorSubject<number>(0);
  cartCountState = this.cartCount.asObservable();

  getData(query: any, params: any = {}): Observable<any> {
    return this.apollo
      .query({ query: query, fetchPolicy: "network-only", variables: params })
      .pipe(map((value: any) => value.data));
  }

  mutateData(mutate: any, data: any, fileUpload: boolean = false): Observable<any> {
    let mutationObject = {
      mutation: mutate, variables: data
    };
    if (fileUpload) {
      const uploadObject = { context: { useMultipart: true } };
      mutationObject = { ...mutationObject, ...uploadObject };
    }
    return this.apollo.
      mutate(mutationObject);
  }

  setCartCount(value: number) {
    this.cartCount.next(value);
  }
}
