import { Matches } from 'class-validator';

class RequestParams {
  @Matches(/^[1-9]\d*$/)
  id: string;

  @Matches(/^[\p{Alpha}\p{M}\p{Nd}\p{Join_C}.]+$/gu)
  host: string;
}

export class GetInfoById {
  @Matches(/^test\.getInfoById/)
  method: string;
  params: RequestParams;
}
