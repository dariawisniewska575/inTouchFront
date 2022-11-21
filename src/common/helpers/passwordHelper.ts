import { PasswordRequirement } from '../enums/PasswordRequirement';
import WatchPasswordRequirements from '../models/WatchPasswordRequirements';

export const getPasswordRequirements = (watchPassword: string): WatchPasswordRequirements => {
    const requirements: { [key in PasswordRequirement]: boolean } = {
        [PasswordRequirement.OneLowerCaseLetter]: /(.*[a-z].*)/.test(watchPassword),
        [PasswordRequirement.OneUpperCaseLetter]: /(.*[A-Z].*)/.test(watchPassword),
        [PasswordRequirement.OneDigit]: /(.*\d.*)/.test(watchPassword),
        [PasswordRequirement.Min6Letters]: watchPassword.length >= 6,
    };
    return requirements;
};
