import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable()
export class GitSearchService {
  cachedValue: string;
  search: Observable<GitSearch>;
  cachedUsers: Array<{
    [query: string]: GitUsers
  }> = [];

  constructor(private http: HttpClient) {
  }

  gitSearch: Function = (query: string): Observable<GitSearch> => {
    if (!this.search) {
      this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query).pipe(
        publishReplay(1),
        refCount()
      );
      this.cachedValue = query;
    } else if (this.cachedValue !== query) {
      this.search = null;
      this.gitSearch(query);
    }
    return this.search;
  }

  gitUsers = (query: string): Promise<GitUsers> => {
    const promise = new Promise<GitUsers>((resolve, reject) => {
        if (this.cachedUsers[query]) {
            resolve(this.cachedUsers[query]);
        } else {
            this.http.get('https://api.github.com/search/users?q=' + query)
            .toPromise()
            .then( (response) => {
                resolve(response as GitUsers);
            }, (error) => {
                reject(error);
            });
        }
    });
    return promise;
  }
}
