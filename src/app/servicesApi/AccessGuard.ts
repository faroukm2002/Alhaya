import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    const requiresLogin = route.data.requiresLogin || false;
    const notLogged = route.data.notLogged || false;
    if (requiresLogin) {
      if (!localStorage.getItem('user')) {
        this.router.navigate(['login']);
      }
    }
    if (notLogged) {
      if (localStorage.getItem('user')) {
        this.router.navigate(['/']);
      }
    }
    return  true;
  }
}
