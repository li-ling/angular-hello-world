import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            //ValidationErrors can also contain a complex object
            //cannotContainSpace: minlength {
            //    requiredLength: 3,
            //    actualLength: control.value  
            // }
            return {cannotContainSpace: true};

        return null;
    }

    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        /* This async validator will not work as it will always return null */
        // setTimeout(() => {
        //     if (control.value === 'mosh')
        //         return {souldBeUniqu: true};
        //     return null;
        // }, 2000);
        // return null;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'mosh')
                    resolve({shouldBeUnique: true});                    
                else 
                    resolve(null);
            }, 2000);
        });

    }
}