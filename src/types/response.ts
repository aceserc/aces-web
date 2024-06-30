import { IResponse } from "@/middlewares/send-response";

export interface IApiResponse<D> extends IResponse {
  data: D;
}
