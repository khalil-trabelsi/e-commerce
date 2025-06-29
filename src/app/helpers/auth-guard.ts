import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "./storage.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const storageService = inject(StorageService);
    const router = inject(Router);
    const userRole = storageService.getUser().role.label
    const expectedRoles = route.data['roles'] as Array<string>
    if (!storageService.isLoggedIn()) {
        router.navigate(['/auth/login']);
        return false;
    }
    if (expectedRoles.includes(userRole)) {
        return true
    } 

    return false;
    
}