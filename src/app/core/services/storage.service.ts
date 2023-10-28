import { Injectable, Inject } from "@angular/core";
import { enc, AES, mode, pad } from "crypto-js";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  LOCAL_STORAGE_PREFIX: string = "siid-app";
  KEY_TEXT: string = environment.key;
  IV_TEXT: string = environment.iv;

  constructor(@Inject("LOCALSTORAGE") private localStorage: Storage) {}

  getItem(key: string, parse: boolean = true): any {
    let value = this.localStorage.getItem(
      `${this.LOCAL_STORAGE_PREFIX}$${key}`
    );
    value = value ? JSON.parse(this.decrypt(value)) : null;

    return parse && value ? JSON.parse(value) : value;
  }
  setItem(key: string, value: string): void {
    let encryptedValue = this.encrypt(value);
    this.localStorage.setItem(
      `${this.LOCAL_STORAGE_PREFIX}$${key}`,
      encryptedValue
    );
  }
  removeItem(key: string): void {
    this.localStorage.removeItem(`${this.LOCAL_STORAGE_PREFIX}$${key}`);
  }

  //Encrypting text
  encrypt(text: string): string {
    let _key = enc.Utf8.parse(this.KEY_TEXT);
    let _iv = enc.Utf8.parse(this.IV_TEXT);
    let encrypted = AES.encrypt(JSON.stringify(text), _key, {
      keySize: 32,
      iv: _iv,
      mode: mode.ECB,
      padding: pad.Pkcs7,
    });

    return encrypted.toString();
  }

  // Decrypting text
  decrypt(text: string): string {
    let _key = enc.Utf8.parse(this.KEY_TEXT);
    let _iv = enc.Utf8.parse(this.IV_TEXT);

    let decrypted = AES.decrypt(text, _key, {
      keySize: 32,
      iv: _iv,
      mode: mode.ECB,
      padding: pad.Pkcs7,
    });
    return decrypted.toString(enc.Utf8);
  }
}
