import MainLayout from "@/components/layouts/main-layout";
import API from "@/services";
import { fetchData } from "@/services/fetch";
import { IApiResponse } from "@/types/response";

import { IHandleGetTrainingsServiceResponse } from "@/services/training-and-workshops";
import TrainingCard from "@/components/reusable/training-card";

const Trainings = async () => {
  const trainings = await getTrainings();

  return (
    <MainLayout className="max-w-7xl">
      <div className="flex flex-col gap-6 md:gap-12 xl:gap-24">
        {trainings.length === 0 && (
          <div className="flex items-center justify-center flex-col gap-3">
            <h1 className="text-lg md:text-2xl mt-20">
              No trainings/workshops available now!
            </h1>
          </div>
        )}
        <div className="grid grid-cols-1 mx-auto gap-6 md:grid-cols-2 w-full mt-12">
          {trainings.map((training, i) => (
            <TrainingCard key={i} {...training} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Trainings;

const getTrainings = async () => {
  const res = await fetchData<IApiResponse<IHandleGetTrainingsServiceResponse>>(
    `${API.trainingAndWorkshops}?limit=0`
  );
  return res?.data?.trainings || [];
};
