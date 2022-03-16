import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ):| Observable<boolean | UrlTree> | Promise<boolean | UrlTree>| boolean| UrlTree {
        if (localStorage.getItem('token-sion')) {
          return state.url.startsWith('/')
          ? true
          : (this.router.navigate(['/login']), false);
        } else {
          return state.url.startsWith('/')
          ? (this.router.navigate(['/login']), false)
          : true;
        }
      }
}
