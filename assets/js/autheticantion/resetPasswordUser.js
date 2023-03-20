import { getAuth, sendPasswordResetEmail, confirmPasswordReset,verifyPasswordResetCode } from "firebase/auth";

export function SendCodeToEmail(email) {
    const auth = getAuth();
    // Envia o codigo de confirmação para o email do usuário
    return sendPasswordResetEmail(auth,email)
}

export async function VerifyConfirmationCode(email) {
    const auth = getAuth();
    // Verificar o código de confirmação
    const result = await verifyPasswordResetCode(auth,code)
    return result === email
}

export function ResetPassword(confirmationCode,newPassword='') {
    const auth = getAuth();
    // Reseta a senha
    return confirmPasswordReset(auth,confirmationCode,newPassword)
}
