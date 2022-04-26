import { environment } from './environments/environment.prod';
import * as crypto from 'crypto-js'

export const stUser = () => {
    const stringUser = sessionStorage.getItem('user')
    if (stringUser) {
        return JSON.parse(decrypt(stringUser))
    } else {
        return null
    }
}

export const fncDateConvert = (stDate: string) => {

    let stReturn = ''
    const date = new Date(stDate)
    

    stReturn += date.getHours()
    stReturn += ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
    stReturn += ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())


    stReturn += " "

    stReturn += date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    stReturn += "." + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
    stReturn += "." + date.getFullYear()

    if (stReturn.includes("NaN")) {
        return stDate;
    }

    return stReturn
}

export const encrypt = (plainText: string) => {
    var ciphertext = crypto.AES.encrypt(plainText, environment.privateKey).toString();

    return ciphertext;
}

export const decrypt = (ciphertext: string) => {
    var bytes = crypto.AES.decrypt(ciphertext, environment.privateKey);
    var plainText = bytes.toString(crypto.enc.Utf8);
    return plainText
}

export const rememberControl = () => {
    const localUser = localStorage.getItem('user')
    if (localUser) {
        sessionStorage.setItem('user', localUser)
        return true
    } else {
        return false
    }
}