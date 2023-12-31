// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedGroups = (next.data as { allowedGroups?: string[] })['allowedGroups'] || [];

    const userGroupsString = sessionStorage.getItem('userGroups');
    if (userGroupsString) {
      const userGroups = JSON.parse(userGroupsString) as string[];

      if (allowedGroups.some(group => userGroups.includes(group))) {
        return true;
      }
    }
    //unauthorized
    this.router.navigate(['/dangnhap']);
    return false;
  }
}
