import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from '../models/post';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostService {

    private postUrl = 'http://localhost:49164/api/Post';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
    }

  
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl)
            .pipe(
                tap(heroes => this.log('fetched posts')),
                catchError(this.handleError('getPosts', []))
            );
    }

   
    getPostNo404<Data>(id: number): Observable<Post> {
        const url = `${this.postUrl}/?id=${id}`;
        return this.http.get<Post[]>(url)
            .pipe(
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} post id=${id}`);
                }),
                catchError(this.handleError<Post>(`getPost id=${id}`))
            );
    }

   
    getPost(id: number): Observable<Post> {
        const url = `${this.postUrl}/${id}`;
        return this.http.get<Post>(url).pipe(
            tap(_ => this.log(`fetched post id=${id}`)),
            catchError(this.handleError<Post>(`getPost id=${id}`))
        );
    }
   
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); 
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
    private log(message: string) {
        this.messageService.add(`PostService: ${message}`);
    }
}
