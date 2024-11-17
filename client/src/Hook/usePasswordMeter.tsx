import React, {useState} from "react";
import type { passwordInput} from "../Types/typeUsers";

export const usePasswordMeter = () => {
    const [passwordEntries, setPasswordEntries] = useState<passwordInput>({
        password: "",
    });
    const [isError, setError] = useState<string | null>(null);
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let password = e.target.value;
        setPasswordEntries({
            ...passwordEntries,
            password: e.target.value,
        });
        setError(null);
        let caps, small, num, specialSymbol;

        if (password.length < 4) {
            setError(
                "Au moins 4 caractères requis"
            );
            return;
        } else {
            caps = (password.match(/[A-Z]/g) || []).length;
            small = (password.match(/[a-z]/g) || []).length;
            num = (password.match(/[0-9]/g) || []).length;
            specialSymbol = (password.match(/\W/g) || []).length;
            if (caps < 1) {
                setError("Majuscule requise");
                return;
            } else if (small < 1) {
                setError("Ajoutez au moins une lettre minuscule");
                return;
            } else if (num < 1) {
                setError("Ajoutez un nombre");
                return;
            } else if (specialSymbol < 1) {
                setError("Ajoutez un symbol: @$! % * ? &");
                return;
            }
        }
    };
    return {
        onPasswordChange,
        isError
    }
}

