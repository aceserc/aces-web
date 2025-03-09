import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import { zodValidator } from "@/middlewares/zod.middleware";
import certificateModel from "@/models/certificate.model";
import trainingAndWorkshopsModel from "@/models/training-and-workshops.model";
import {
  CertificateSchemaForApi,
  ICertificateSchemaForApi,
} from "@/zod/certificate.schema";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export const POST = applyMiddleware(
  isAdminMiddleware,
  connectToDBMiddleware,
  zodValidator(CertificateSchemaForApi),
  catchAsyncError(async (req: NextRequest) => {
    // @ts-ignore
    const body = req.data.body as ICertificateSchemaForApi;

    console.log(body);

    const event = await trainingAndWorkshopsModel.findById(body.eventId);

    if (!event) {
      return sendNextResponse({
        status: 404,
        message: "Event not found!",
      });
    }

    const certificates = await certificateModel.bulkSave(
      body.recipients?.map(
        (r) =>
          new certificateModel({
            event: new mongoose.Types.ObjectId(body.eventId),
            issuedAt: new Date(body.issuedAt),
            recipient: r,
          })
      )
    );

    return sendNextResponse({
      status: 201,
      message: "Certificates published successfully!",
      data: certificates,
    });
  })
);

export const GET = applyMiddleware(
  connectToDBMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const certificateId = req.nextUrl.searchParams.get("id");

    if (certificateId) {
      const certificate = await certificateModel
        .findById(certificateId)
        .populate("event", "title _id duration inShort");

      if (!certificate) {
        return sendNextResponse({
          status: 404,
          message: "Certificate not found!",
        });
      }

      return sendNextResponse({
        status: 200,
        data: certificate,
      });
    } else {
      const eventId = req.nextUrl.searchParams.get("eventId");

      const certificates = await certificateModel.find({ event: eventId });

      return sendNextResponse({
        status: 200,
        data: certificates,
      });
    }
  })
);
