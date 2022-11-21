import { PasswordRequirement } from 'src/common/enums/PasswordRequirement';

export default interface WatchPasswordRequirements {
    [PasswordRequirement.OneLowerCaseLetter]: boolean;
    [PasswordRequirement.OneUpperCaseLetter]: boolean;
    [PasswordRequirement.OneDigit]: boolean;
    [PasswordRequirement.Min6Letters]: boolean;
}
