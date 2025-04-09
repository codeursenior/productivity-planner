import { inject, Injectable } from '@angular/core';
import { UserService } from '../port/user.service';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../entity/user.interface';

@Injectable()
export class UserFirebaseService implements UserService {
  readonly #http = inject(HttpClient);

  readonly #FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`;
  readonly #USER_COLLECTION_ID = 'users';
  readonly #FIREBASE_API_KEY = environment.firebaseConfig.apiKey;
  readonly #USER_COLLECTION_URL = `${this.#FIRESTORE_URL}/${
    this.#USER_COLLECTION_ID
  }?key=${this.#FIREBASE_API_KEY}&documentId=`;

  fetch(userId: string): Observable<User> {
    const url = `${this.#FIRESTORE_URL}/${this.#USER_COLLECTION_ID}/${userId}?key=${this.#FIREBASE_API_KEY}`;

    return this.#http.get<any>(url).pipe(
      map((response) => {
        console.log("Login firebase response");
        console.log(response);
        const fields = response.fields;
        return {
          id: userId,
          name: fields.name.stringValue,
          email: fields.email.stringValue,
        } as User;
      })
    );
  }

  create(user: User, bearerToken: string): Observable<void> {
    const url = `${this.#USER_COLLECTION_URL}${user.id}`;
    const body = {
      fields: {
        name: { stringValue: user.name },
        email: { stringValue: user.email },
      },
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });
    const options = { headers };
    return this.#http.post(url, body, options).pipe(map(()=> undefined));
  }
}
