import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { User } from '@shared/models';

import * as fromStore from "../store";

describe('AuthService', () => {
    // Services
    let authService: AuthService;
    let http: HttpClient;
    let store: MockStore<fromStore.IAuthState>;

    // Spy objects
    let onHttpPostSpy: jasmine.Spy;
    let onDispatchActionSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, provideMockStore()]
        })
    }))

    beforeEach(() => {
        // Store init
        store = TestBed.get(Store)

        // Services init
        authService = TestBed.get(AuthService);
        http = TestBed.get(HttpClient)

        // Spy objects init
        onHttpPostSpy = spyOn(http, 'post').and.returnValue(of({ data: { token: 'token', username: 'Username' } }))
        onDispatchActionSpy = spyOn(store, 'dispatch')

        // Helpers
        authService.login({ username: 'test', password: 'test' }).pipe(take(1)).subscribe();
    })

    it('should create', () => {
        expect(authService).toBeTruthy()
    })

    it('should call the login endpoint with proper params', () => {
        expect(onHttpPostSpy).toHaveBeenCalledWith('http://localhost:3000/api/login', { username: 'test', password: 'test' })
    })

    it('should dispatch persistToken action on login response', () => {
        expect(onDispatchActionSpy).toHaveBeenCalledWith(fromStore.persistToken({
            payload: { token: 'token' }
        }))
    })

    it('should dispatch loginSuccess action on login response', () => {
        expect(onDispatchActionSpy).toHaveBeenCalledTimes(2)

        expect(onDispatchActionSpy.calls.allArgs()).toEqual(
            [[fromStore.persistToken({
                payload: { token: 'token' }
            })],
            [fromStore.loginSuccess({
                payload: { user: new User({ username: 'Username' }) }
            })]]
        )
    })
});