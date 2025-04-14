type CoreValue = {
  id: string;
  title: string;
  description: string;
  icon: string;
};


interface CoreValuesProps {
  heading?: string;
  values: CoreValue[];
}

export default function CoreValues({
  heading,
  values,
}: CoreValuesProps) {
  return (
    <div className="py-16">
      <div className="mb-8">
        <h2 className="md:text-3xl text-lg font-medium leading-[40px] text-[#000000D9] flex items-center">
          <span className="w-1.5 h-8 bg-red-600 mr-4 inline-block"></span>
          {heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-3 gap-x-12 gap-y-12">
        {values.map((value) => (
          <div key={value.id} className="flex flex-col">
            <div className="w-36 mb-4">
              <img src={value.icon} alt={value.title} className="w-8 h-8" />{' '}
            </div>
            <h3 className="text-xl text-[#000000D9] font-medium mb-3">
              {value.title}
            </h3>
            <p className="text-[#00000073] text-sm md:text-base max-w-xl leading-[24px]">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

