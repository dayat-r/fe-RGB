import decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token-sion')!;
        const tokenPayload: any = decode(token);

        let status = expectedRole.some((roleExpec: any) => tokenPayload.role.includes(roleExpec));
        if (!status) {
            if (tokenPayload.role == 'IT') {
                this.router.navigate(['/']);
                return false;
            } else if (tokenPayload.role == 'ADMIN') {
                this.router.navigate(['/']);
                return false;
            } else if (tokenPayload.role == 'KARYAWAN') {
                this.router.navigate(['/sales']);
                return false;
            }
        }
        return true;
    }
}
