import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleStudent = ({ testimonial }: { testimonial: Testimonial }) => {
  const {  name, image, content, designation } = testimonial;
  return (
    <div className="w-full">
      <div
        className="wow fadeInUp rounded-md bg-white p-8 shadow-one dark:bg-[#1D2144] lg:px-5 xl:px-8"
        data-wow-delay=".1s"
      >
        <div className="flex items-center">
          <div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
            <Image src={image} alt={name} fill />
          </div>
          <div className="w-full">
            <h5 className="mb-1 text-lg font-semibold text-dark dark:text-white lg:text-base xl:text-lg">
              {name}
            </h5>
            <p className="text-sm text-body-color">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
