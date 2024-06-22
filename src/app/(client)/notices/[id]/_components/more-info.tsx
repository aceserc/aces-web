import { INoticesSchemaResponse } from "@/services/notice";
import { CiCalendarDate } from "react-icons/ci";

const MoreInfo = (data: INoticesSchemaResponse) => {
  return (
    <>
      {/* event start date time */}
      <div className="flex flex-col lg:border-t border-muted-foreground/20 lg:pt-5">
        <h3 className="text-lg font-medium">Published At</h3>
        <div className="text-sm ml-1">
          <CiCalendarDate className="inline-block w-4 h-4 mr-2" />
          {new Date(data.createdAt).toDateString()}
        </div>
      </div>
      {/* event end date time */}
      <div className="flex flex-col lg:border-t border-muted-foreground/20 lg:pt-5">
        <h3 className="text-lg font-medium">Updated At</h3>
        <div className="text-sm ml-1">
          <CiCalendarDate className="inline-block w-4 h-4 mr-2" />
          {new Date(data.updatedAt).toDateString()}
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
