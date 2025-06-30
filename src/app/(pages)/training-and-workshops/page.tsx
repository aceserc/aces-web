import { MainLayout } from "@/components/layout/main-layout";
import { TrainingCard } from "./_components/training-card";
import { getCollection } from "@/lib/db";

const Trainings = async () => {
  const trainings = getCollection("trainings")

  return (
    <MainLayout >
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

