import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { getString } from "@nativescript/core/application-settings";
import { AuthService } from '../../shared/auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: RouterExtensions, private auth: AuthService) { }

    canActivate() {
        if (this.auth.isAuthorized) {

            return true;
        } else {
            this.router.navigate(['/login']);
            
            return false;
        }
    }
}