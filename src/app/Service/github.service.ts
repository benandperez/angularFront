import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private http: HttpClient) {}

  public getUsers(username: string ): Observable<any> {
    const url =`https://api.github.com/search/users?q=${username}`
    return this.http.get(url).pipe(
      map((data: any) => {
        if (data && data.items && Array.isArray(data.items)) {
          return data.items.slice(0, 10);
        } else {
          throw new Error('La respuesta de la API no es válida');
        }
      })
    );
  }
  public getTopUsersForChart(dataFoll: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      forkJoin(
        dataFoll.map((element: any) => {
          return this.http.get(element.followers_url).pipe(
            map((data: any) => {
              const topUsers = data.length;
              return {
                users: element.login,
                followers: topUsers,
              };
            })
          );
        })
      )
        .pipe(
          map((results: any[]) => {
            const users = results.map((result: any) => result.users);
            const followers = results.map((result: any) => result.followers);
            return [{ users, followers }];
          })
        )
        .subscribe(
          (data: any[]) => {
            resolve(data);
          },
          (error: any) => {
            reject(error);
          }
        );
    });
  }
  
  



}
