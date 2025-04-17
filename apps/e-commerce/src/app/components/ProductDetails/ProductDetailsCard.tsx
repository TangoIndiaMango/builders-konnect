import { dartmoorewood } from '../../lib/assets/images';
import { productDetailsImage, categoriess } from '../../lib/Constants';
import Detail from './Details';

function ProductDetailsCard() {
  const product = productDetailsImage.find(
    (item) => item.imageUrl === dartmoorewood
  );

  const category = categoriess.find(
    (cat) => cat.slug === product?.categorySlug
  );
  const subcategory = category?.subcategories.find(
    (sub) => sub.slug === product?.subcategorySlug
  );

  return (
    <div>
      <h1 className="text-sm cursor-pointer text-[#00000073] py-8">
        Home /{' '}
        <span className="text-[#00000073]">
          {category?.name || product?.categorySlug}
        </span>{' '}
        /{' '}
        <span className="text-[#00000073]">
          {subcategory?.name || product?.subcategorySlug}
        </span>{' '}
        / <span className="text-[#000000D9]">Laminate Flooring</span>
      </h1>

      <div className="flex flex-col xl:flex-row gap-4 ">
        <div className="flex flex-col sm:flex-row p-4 gap-4 xl:gap-6 xl:h-full">
          <div className="hidden md:flex flex-col gap-4 w-[120px]">
            {productDetailsImage.map((item) => (
              <img
                key={item.id}
                src={item.imageUrl}
                alt="Thumbnail"
                className="object-cover w-full h-28"
              />
            ))}
          </div>
          <div className="w-full sm:w-[456px] h-[300px] sm:h-[400px] xl:h-full">
            <img
              src={dartmoorewood}
              alt="Main"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
        <div className="flex-1 max-w-full xl:max-w-2xl xl:h-full px-4">
          <Detail />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
