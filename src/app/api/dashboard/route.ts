import { applyMiddleware } from "@/middlewares/apply.middleware";
import { isAdminMiddleware } from "@/middlewares/auth.middleware";
import { connectToDBMiddleware } from "@/middlewares/db.middleware";
import catchAsyncError from "@/middlewares/error-handler.middleware";
import { sendNextResponse } from "@/middlewares/send-response";
import blogsModel from "@/models/blogs.model";
import committeesModel from "@/models/committees.model";
import contactModel from "@/models/contact.model";
import eventsModel from "@/models/events.model";
import galleryModel from "@/models/gallery.model";
import noticeModel from "@/models/notice.model";
import sponsorModel from "@/models/sponsor.model";
import testimonialModel from "@/models/testimonial.model";
import { NextRequest } from "next/server";

export const GET = applyMiddleware(
  connectToDBMiddleware,
  isAdminMiddleware,
  catchAsyncError(async (req: NextRequest) => {
    const totalBlogs = await blogsModel.countDocuments();
    const totalNotices = await noticeModel.countDocuments();
    const totalEvents = await eventsModel.countDocuments();
    const totalSponsors = await sponsorModel.countDocuments();
    const totalCommitteeMembers = await committeesModel.countDocuments();
    const totalGalleryImages = await galleryModel.countDocuments();
    const totalTestimonials = await testimonialModel.countDocuments();
    const totalContacts = await contactModel.countDocuments();

    const latestContacts = await contactModel
      .find()
      .sort({ createdAt: -1 })
      .limit(2);

    return sendNextResponse({
      status: 200,
      data: {
        totalBlogs,
        totalNotices,
        totalEvents,
        totalSponsors,
        totalCommitteeMembers,
        totalGalleryImages,
        totalTestimonials,
        totalContacts,
        latestContacts,
      },
    });
  })
);
