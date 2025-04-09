import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFirebaseService } from '../adapter/user-firebase.service';
import { User } from '../entity/user.interface';

@Injectable({
  providedIn: 'root',
  useClass: UserFirebaseService,
})
export abstract class UserService {
  abstract fetch(userId: string): Observable<User>;
  abstract create(user: User, bearerToken: string): Observable<void>;

  // delete(user: User): Observable<void> {};
  // update(user: User): Observable<void> {};
}
