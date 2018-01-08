import { AbstractControl, ValidationErrors } from '@angular/forms';
export class PasswordValidators {
    static incorrectOldPassword(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (control.value !== '1234')
                    resolve({incorrectOldPassword: true});                    
                else 
                    resolve(null);
            }, 2000);
        });        
    }    

    static passwordsDontMatch(control: AbstractControl) :ValidationErrors | null {
        let newPassword = control.get('newPassword');
        let confirmPassword = control.get('confirmPassword');

        if (newPassword.value !== confirmPassword.value)
            return {passwordsDontMatch: true};                    
        return null;
    }

}