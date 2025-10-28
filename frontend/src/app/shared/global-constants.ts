export class GlobalConstants {
  //message
  public static genricError: string = 'Something went wrong.';

  public static unauthorized: string = 'You are not authorized person to access this page.';

  //regex

  public static nameRegex:string ="[a-zA-Z0-9 ]*";

  public static emailRegex: string = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

  public static contactNumberRegex:string ="^[0-9]{10,10}$";

  //variable
  public static error: string = "error"
}
