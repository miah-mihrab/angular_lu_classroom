import { AbstractControl } from "@angular/forms";

export class PasswordMatching {
    static passwordShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let confirmPassword = control.get('confirm_password');
        if (password.value != confirmPassword.value) {
            return { mismatch: true }
        } else {
            return null;
        }

    }
}