export class User
{
  constructor(public email:string, public id:string,
              private _token:string,
              private _tokenExpirationDate:Date) {  }

  get Token() //getter
  {
    if(this._tokenExpirationDate === null || new Date > this._tokenExpirationDate ) //expired, or does not exist.
    {
      return null;
    }
    return this._token;
  }
}
