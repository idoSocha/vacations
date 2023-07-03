export class ClientError {
  public status: number;
  public message: string;

  public constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(404, `route ${route} not found`);
  }
}

//"child" video error class
export class VacationNotFoundError extends ClientError {
  public constructor(vacation_code: number) {
    super(404, `vacation code:${vacation_code} was not found`);
  }
}
